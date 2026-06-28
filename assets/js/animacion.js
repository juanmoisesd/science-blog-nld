/**
 * Neuro-Sync Engine v4.0 - "The Synaptic Web"
 * Animación ultra-avanzada con efectos de resplandor (bloom),
 * profundidad de campo cinemática y propagación de señales bio-eléctricas.
 */

const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

let particles = [];
let pulses = [];
let mouse = { x: -1000, y: -1000, radius: 280, active: false };

const CONFIG = {
    particleCount: 150,
    connectionDist: 220,
    pulseSpeed: 0.015,
    bgAlpha: 0.1,
    colors: {
        nodes: ['#38bdf8', '#818cf8', '#6366f1', '#0ea5e9'],
        pulse: '#fb923c',
        glow: 'rgba(56, 189, 248, 0.4)'
    }
};

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random(); // 0 (lejos) a 1 (cerca)
        this.baseSize = (Math.random() * 2.5 + 0.5) * (0.3 + this.z);
        this.size = this.baseSize;
        this.vx = (Math.random() - 0.5) * (0.2 + this.z * 0.4);
        this.vy = (Math.random() - 0.5) * (0.2 + this.z * 0.4);
        this.color = CONFIG.colors.nodes[Math.floor(Math.random() * CONFIG.colors.nodes.length)];
        this.pulseTimer = Math.random() * 600 + 200;
        this.neighbors = [];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Warp effect
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Mouse Interactivity
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.vx += dx * force * 0.0005;
            this.vy += dy * force * 0.0005;
            this.size = this.baseSize * (1 + force * 0.8);
        } else {
            this.size = this.baseSize;
        }

        this.pulseTimer--;
        if (this.pulseTimer <= 0) {
            this.emitPulse();
            this.pulseTimer = Math.random() * 500 + 300;
        }
    }

    draw() {
        const opacity = 0.2 + this.z * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = opacity;

        if (this.z > 0.7) {
            ctx.shadowBlur = 15 * this.z;
            ctx.shadowColor = this.color;
        }

        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }

    emitPulse() {
        if (this.neighbors.length > 0) {
            const numPulses = Math.floor(Math.random() * 2) + 1;
            for(let i=0; i<numPulses; i++) {
                const target = this.neighbors[Math.floor(Math.random() * this.neighbors.length)];
                pulses.push(new Pulse(this, target));
            }
        }
    }
}

class Pulse {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.progress = 0;
        this.speed = CONFIG.pulseSpeed * (0.7 + Math.random() * 0.6);
        this.width = 1.5 + Math.random() * 2;
    }

    update() {
        this.progress += this.speed;
        return this.progress < 1;
    }

    draw() {
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;

        // El pulso es un cometa de luz
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.width * 4);
        gradient.addColorStop(0, CONFIG.colors.pulse);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, this.width, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = CONFIG.colors.pulse;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Estela
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(251, 146, 60, ${0.3 * (1 - this.progress)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
}

function init() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    particles = [];
    for(let i=0; i<CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    ctx.lineCap = 'round';
    for (let i = 0; i < particles.length; i++) {
        particles[i].neighbors = [];
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < CONFIG.connectionDist) {
                p1.neighbors.push(p2);
                const alpha = (1 - dist / CONFIG.connectionDist) * 0.15 * p1.z * p2.z;
                ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                ctx.lineWidth = 0.2 + (p1.z + p2.z) * 0.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fondo ambiental (niebla neural)
    const midX = canvas.width / 2;
    const midY = canvas.height / 2;
    const grad = ctx.createRadialGradient(midX, midY, 0, midX, midY, canvas.width);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    connect();

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    pulses = pulses.filter(p => {
        const active = p.update();
        if (active) p.draw();
        return active;
    });

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
});

window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
});

window.addEventListener('mousedown', () => {
    // Al hacer clic, enviamos ondas masivas
    particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        if(Math.sqrt(dx*dx + dy*dy) < mouse.radius) {
            p.emitPulse();
            p.emitPulse();
        }
    });
});

window.addEventListener('resize', init);

init();
animate();
