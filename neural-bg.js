/**
 * Neural Network Background Animation
 * Creates an aesthetic, animated neural network visualization
 */

class NeuralBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.animationId = null;

        // Configuration
        this.config = {
            nodeCount: 80,
            nodeMinRadius: 1.5,
            nodeMaxRadius: 3,
            connectionDistance: 180,
            nodeSpeed: 0.3,
            pulseSpeed: 0.02,
            colors: {
                node: 'rgba(0, 212, 255, 0.8)',
                nodeGlow: 'rgba(0, 212, 255, 0.3)',
                connection: 'rgba(0, 212, 255, 0.15)',
                connectionActive: 'rgba(168, 85, 247, 0.4)',
                pulse: 'rgba(236, 72, 153, 0.6)'
            }
        };

        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'neural-bg';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        document.body.prepend(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        // Set canvas size
        this.resize();

        // Create nodes
        this.createNodes();

        // Event listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseout', () => this.handleMouseOut());

        // Start animation
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Recreate nodes on significant resize
        if (this.nodes.length > 0) {
            this.nodes.forEach(node => {
                if (node.x > this.canvas.width) node.x = Math.random() * this.canvas.width;
                if (node.y > this.canvas.height) node.y = Math.random() * this.canvas.height;
            });
        }
    }

    createNodes() {
        this.nodes = [];

        // Adjust node count based on screen size
        const area = this.canvas.width * this.canvas.height;
        const nodeCount = Math.floor(this.config.nodeCount * (area / (1920 * 1080)));

        for (let i = 0; i < Math.max(nodeCount, 40); i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.nodeSpeed,
                vy: (Math.random() - 0.5) * this.config.nodeSpeed,
                radius: this.config.nodeMinRadius + Math.random() * (this.config.nodeMaxRadius - this.config.nodeMinRadius),
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.01 + Math.random() * 0.02,
                isActive: false
            });
        }
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    handleMouseOut() {
        this.mouse.x = null;
        this.mouse.y = null;
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    updateNodes() {
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges with slight randomization
            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -1;
                node.vx += (Math.random() - 0.5) * 0.1;
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -1;
                node.vy += (Math.random() - 0.5) * 0.1;
            }

            // Keep within bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));

            // Update pulse phase
            node.pulsePhase += node.pulseSpeed;

            // Check mouse proximity
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dist = this.getDistance(node.x, node.y, this.mouse.x, this.mouse.y);
                node.isActive = dist < this.mouse.radius;

                // Gentle repulsion from mouse
                if (dist < this.mouse.radius && dist > 0) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius * 0.02;
                    node.vx += (node.x - this.mouse.x) / dist * force;
                    node.vy += (node.y - this.mouse.y) / dist * force;
                }
            } else {
                node.isActive = false;
            }

            // Limit velocity
            const maxVel = 1;
            const vel = Math.sqrt(node.vx ** 2 + node.vy ** 2);
            if (vel > maxVel) {
                node.vx = (node.vx / vel) * maxVel;
                node.vy = (node.vy / vel) * maxVel;
            }
        });
    }

    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];
                const dist = this.getDistance(nodeA.x, nodeA.y, nodeB.x, nodeB.y);

                if (dist < this.config.connectionDistance) {
                    const opacity = 1 - (dist / this.config.connectionDistance);
                    const isActive = nodeA.isActive || nodeB.isActive;

                    this.ctx.beginPath();
                    this.ctx.moveTo(nodeA.x, nodeA.y);
                    this.ctx.lineTo(nodeB.x, nodeB.y);

                    if (isActive) {
                        // Create gradient for active connections
                        const gradient = this.ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
                        gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity * 0.5})`);
                        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${opacity * 0.6})`);
                        gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity * 0.5})`);
                        this.ctx.strokeStyle = gradient;
                        this.ctx.lineWidth = 1.5;
                    } else {
                        this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.12})`;
                        this.ctx.lineWidth = 0.8;
                    }

                    this.ctx.stroke();
                }
            }
        }
    }

    drawNodes() {
        this.nodes.forEach(node => {
            const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.3;
            const radius = node.radius * pulseScale;

            // Glow effect
            if (node.isActive) {
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, radius * 8
                );
                gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
                gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, radius * 8, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }

            // Outer glow
            const glowGradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, radius * 3
            );
            glowGradient.addColorStop(0, node.isActive ? 'rgba(168, 85, 247, 0.5)' : 'rgba(0, 212, 255, 0.3)');
            glowGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = glowGradient;
            this.ctx.fill();

            // Core node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.isActive ? 'rgba(168, 85, 247, 1)' : this.config.colors.node;
            this.ctx.fill();
        });
    }

    drawDataPulses() {
        // Occasionally send data pulses along connections
        const time = Date.now() * 0.001;

        this.nodes.forEach((node, i) => {
            if (Math.sin(time + i * 0.5) > 0.95) {
                // Find nearest neighbor
                let nearest = null;
                let nearestDist = Infinity;

                this.nodes.forEach((other, j) => {
                    if (i !== j) {
                        const dist = this.getDistance(node.x, node.y, other.x, other.y);
                        if (dist < this.config.connectionDistance && dist < nearestDist) {
                            nearestDist = dist;
                            nearest = other;
                        }
                    }
                });

                if (nearest) {
                    const progress = (Math.sin(time * 3 + i) + 1) / 2;
                    const pulseX = node.x + (nearest.x - node.x) * progress;
                    const pulseY = node.y + (nearest.y - node.y) * progress;

                    // Draw pulse
                    const gradient = this.ctx.createRadialGradient(
                        pulseX, pulseY, 0,
                        pulseX, pulseY, 6
                    );
                    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
                    gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
                    gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

                    this.ctx.beginPath();
                    this.ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2);
                    this.ctx.fillStyle = gradient;
                    this.ctx.fill();
                }
            }
        });
    }

    animate() {
        // Clear canvas with slight fade for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Clear completely every few frames to prevent buildup
        if (Math.random() < 0.1) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.updateNodes();
        this.drawConnections();
        this.drawDataPulses();
        this.drawNodes();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on larger screens for performance
    if (window.innerWidth > 768) {
        window.neuralBg = new NeuralBackground();
    }
});

// Handle visibility change to pause/resume animation
document.addEventListener('visibilitychange', () => {
    if (window.neuralBg) {
        if (document.hidden) {
            cancelAnimationFrame(window.neuralBg.animationId);
        } else {
            window.neuralBg.animate();
        }
    }
});
