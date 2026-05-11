(function () {
    'use strict';

    const display = document.getElementById('display');
    const subdisplay = document.getElementById('subdisplay');
    const grid = document.getElementById('calc-keys');

    /** @type {'idle'|'error'} */
    let mode = 'idle';
    /** @type {string} */
    let displayValue = '0';
    /** @type {number | null} */
    let stored = null;
    /** @type {string | null} */
    let pendingOp = null;
    let waitingForOperand = false;
    /** Last RHS used in a binary op — makes "=" correct after chained ops like 5+3+ (= 11, not 16). */
    /** @type {number | null} */
    let lastRhs = null;

    const OP_LABEL = { '+': '+', '-': '−', '*': '×', '/': '÷' };

    function formatNumber(n) {
        if (!Number.isFinite(n)) return 'Error';
        const s = String(n);
        if (/e/i.test(s)) return Number.parseFloat(n.toPrecision(12)).toString();
        const rounded = Math.round(n * 1e12) / 1e12;
        let out = String(rounded);
        if (out === '-0') out = '0';
        return out;
    }

    function updateSubline() {
        if (mode === 'error') {
            subdisplay.textContent = '';
            return;
        }
        if (stored !== null && pendingOp !== null && waitingForOperand) {
            subdisplay.textContent = `${formatNumber(stored)} ${OP_LABEL[pendingOp] || pendingOp}`;
        } else if (stored !== null && pendingOp !== null) {
            subdisplay.textContent = `${formatNumber(stored)} ${OP_LABEL[pendingOp] || pendingOp} …`;
        } else {
            subdisplay.textContent = '';
        }
    }

    function syncDisplay() {
        display.textContent = displayValue;
        updateSubline();
    }

    function resetAll() {
        mode = 'idle';
        displayValue = '0';
        stored = null;
        pendingOp = null;
        waitingForOperand = false;
        lastRhs = null;
        syncDisplay();
    }

    function setError() {
        mode = 'error';
        displayValue = 'Error';
        stored = null;
        pendingOp = null;
        waitingForOperand = false;
        lastRhs = null;
        syncDisplay();
    }

    /**
     * @param {number} a
     * @param {number} b
     * @param {string} op
     */
    function compute(a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b === 0 ? NaN : a / b;
            default:
                return b;
        }
    }

    function flushPending(withNextOp) {
        const input = Number.parseFloat(displayValue);
        if (!Number.isFinite(input)) {
            setError();
            return false;
        }
        if (stored === null) {
            stored = input;
        } else if (pendingOp !== null) {
            const result = compute(stored, input, pendingOp);
            if (!Number.isFinite(result)) {
                setError();
                return false;
            }
            lastRhs = input;
            stored = result;
            displayValue = formatNumber(result);
        } else {
            stored = input;
        }
        pendingOp = withNextOp;
        waitingForOperand = true;
        syncDisplay();
        return true;
    }

    function inputDigit(d) {
        if (mode === 'error') resetAll();
        if (waitingForOperand) {
            displayValue = d;
            waitingForOperand = false;
        } else if (displayValue === '0' && d !== '0') {
            displayValue = d;
        } else if (displayValue === '0' && d === '0') {
            return;
        } else if (displayValue === '-0' && d !== '0') {
            displayValue = '-' + d;
        } else if (displayValue === '-0' && d === '0') {
            displayValue = '-0';
        } else {
            const maxLen = 14;
            const normalized = displayValue.replace('.', '');
            if (normalized.replace('-', '').length >= maxLen) return;
            displayValue += d;
        }
        syncDisplay();
    }

    function inputDecimal() {
        if (mode === 'error') resetAll();
        if (waitingForOperand) {
            displayValue = '0.';
            waitingForOperand = false;
            syncDisplay();
            return;
        }
        if (!displayValue.includes('.')) {
            displayValue += '.';
            syncDisplay();
        }
    }

    function clearEntry() {
        if (mode === 'error') {
            resetAll();
            return;
        }
        displayValue = '0';
        syncDisplay();
    }

    function backspace() {
        if (mode === 'error') {
            resetAll();
            return;
        }
        if (waitingForOperand) return;
        if (displayValue.length <= 1 || (displayValue.startsWith('-') && displayValue.length <= 2)) {
            displayValue = '0';
        } else {
            displayValue = displayValue.slice(0, -1);
        }
        syncDisplay();
    }

    function toggleSign() {
        if (mode === 'error') resetAll();
        if (waitingForOperand) {
            displayValue = '-0';
            waitingForOperand = false;
            syncDisplay();
            return;
        }
        if (displayValue.startsWith('-')) displayValue = displayValue.slice(1);
        else if (displayValue !== '0') displayValue = '-' + displayValue;
        syncDisplay();
    }

    /** @param {string | null} nextOp */
    function handleOperator(nextOp) {
        if (mode === 'error') return;
        if (!waitingForOperand && pendingOp !== null && stored !== null) {
            if (!flushPending(nextOp)) return;
        } else if (!flushPending(nextOp)) {
            return;
        }
    }

    function equals() {
        if (mode === 'error') return;
        if (pendingOp === null || stored === null) return;

        let rhs;
        if (waitingForOperand) {
            rhs = lastRhs !== null ? lastRhs : stored;
        } else {
            rhs = Number.parseFloat(displayValue);
        }
        if (!Number.isFinite(rhs)) {
            setError();
            return;
        }

        const result = compute(stored, rhs, pendingOp);
        if (!Number.isFinite(result)) {
            setError();
            return;
        }
        subdisplay.textContent = `${formatNumber(stored)} ${OP_LABEL[pendingOp]} ${formatNumber(rhs)} =`;
        lastRhs = rhs;
        displayValue = formatNumber(result);
        stored = null;
        pendingOp = null;
        waitingForOperand = true;
        mode = 'idle';
        syncDisplay();
    }

    grid.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.getAttribute('data-action');

        switch (action) {
            case 'digit':
                inputDigit(btn.getAttribute('data-value') || '');
                break;
            case 'decimal':
                inputDecimal();
                break;
            case 'operator':
                handleOperator(btn.getAttribute('data-value'));
                break;
            case 'equals':
                equals();
                break;
            case 'clear':
                resetAll();
                break;
            case 'clear-entry':
                clearEntry();
                break;
            case 'backspace':
                backspace();
                break;
            case 'toggle-sign':
                toggleSign();
                break;
            default:
                break;
        }
    });

    window.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        const k = e.key;

        if (k >= '0' && k <= '9') {
            e.preventDefault();
            inputDigit(k);
            return;
        }

        if (k === '.' || k === ',') {
            e.preventDefault();
            inputDecimal();
            return;
        }

        if (k === '+' || k === '-' || k === '*' || k === '/') {
            e.preventDefault();
            handleOperator(k);
            return;
        }

        if (k === 'Enter' || k === '=') {
            e.preventDefault();
            equals();
            return;
        }

        if (k === 'Escape') {
            e.preventDefault();
            resetAll();
            return;
        }

        if (k === 'Backspace') {
            e.preventDefault();
            backspace();
            return;
        }

        if (k === 'Delete') {
            e.preventDefault();
            clearEntry();
            return;
        }
    });

    syncDisplay();
})();
