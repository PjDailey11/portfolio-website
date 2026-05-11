(function () {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    const status = form.querySelector('[data-form-status]');
    const submitButton = form.querySelector('button[type="submit"]');

    function showStatus(message, type) {
        status.textContent = message;
        status.classList.remove('hidden', 'border-emerald-300', 'bg-emerald-100/70', 'text-emerald-900', 'border-rose-300', 'bg-rose-100/70', 'text-rose-900');
        if (type === 'success') {
            status.classList.add('border-emerald-300', 'bg-emerald-100/70', 'text-emerald-900');
        } else {
            status.classList.add('border-rose-300', 'bg-rose-100/70', 'text-rose-900');
        }
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const payload = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim(),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Unable to send message.');
            }

            form.reset();
            showStatus(data.message || 'Message sent successfully.', 'success');
        } catch (error) {
            showStatus(error.message || 'Something went wrong. Please try again later.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Book a Call';
        }
    });
})();
