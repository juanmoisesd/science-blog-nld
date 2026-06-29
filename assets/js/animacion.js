/**
 * Neuro-Sync Engine v5.0 - "The Psychological Synapse"
 * Una evolución dinámica que integra conceptos psicológicos y estados mentales.
 */

const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

let particles = [];
let conceptNodes = [];
let pulses = [];
let mouse = { x: -1000, y: -1000, radius: 280, active: false };

const PSYCH_CONCEPTS = [
    "Memoria", "Percepción", "Emoción", "Conciencia", "Conducta", "Cognición"
];

const STATES = {
    ENFOQUE: {
        name: "Enfoque",
        primary: '#38bdf8',
        secondary: '#0ea5e9',
        pulse: '#fb923c',
        speed: 1.2
    },
    CREATIVIDAD: {
        name: "Creatividad",
        primary: '#c084fc',
        secondary: '#a855f7',
        pulse: '#f472b6',
        speed: 1.8
    },
    CALMA: {
        name: "Calma",
        primary: '#2dd4bf',
        secondary: '#0d9488',
        pulse: '#94a3b8',
        speed: 0.6
    }
};

let currentState = STATES.ENFOQUE;

const CONFIG = {
    particleCount: 140,
    connectionDist: 200,
    pulseSpeed: 0.015,
    bgAlpha: 0.1
};

class Particle {
    constructor(isConcept = false, label = '') {
        this.isConcept = isConcept;
        this.label = label;
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random();
        this.baseSize = (this.isConcept ? 6 : 2) * (0.5 + this.z * 0.5);
        this.size = this.baseSize;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.pulseTimer = Math.random() * 500 + 100;
        this.neighbors = [];
        this.glow = 0;
    }

    update() {
        const speedMult = currentState.speed;
        this.x += this.vx * speedMult;
        this.y += this.vy * speedMult;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.vx += dx * force * 0.0004;
            this.vy += dy * force * 0.0004;
            this.glow = force;
        } else {
            this.glow *= 0.95;
        }

        this.pulseTimer -= speedMult;
        if (this.pulseTimer <= 0) {
            this.emitPulse();
            this.pulseTimer = Math.random() * 400 + 200;
        }
    }

    draw() {
        const opacity = 0.3 + this.z * 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + (this.glow * 4), 0, Math.PI * 2);

        ctx.fillStyle = this.isConcept ? currentState.primary : '#94a3b8';
        ctx.globalAlpha = opacity;

        if (this.isConcept || this.z > 0.8 || this.glow > 0.5) {
            ctx.shadowBlur = (this.isConcept ? 20 : 10) * (opacity + this.glow);
            ctx.shadowColor = currentState.primary;
        }

        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (this.isConcept) {
            ctx.font = `bold ${12 + this.z * 4}px Inter, sans-serif`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(this.label, this.x, this.y - 15);

            // Halo de concepto
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.strokeStyle = currentState.primary;
            ctx.setLineDash([2, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }

    emitPulse() {
        if (this.neighbors.length > 0) {
            const num = this.isConcept ? 3 : 1;
            for(let i=0; i<num; i++) {
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
        this.speed = CONFIG.pulseSpeed * (0.8 + Math.random() * 0.4);
        this.color = currentState.pulse;
    }

    update() {
        this.progress += this.speed * currentState.speed;
        return this.progress < 1;
    }

    draw() {
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = 0.2 * (1 - this.progress);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

function init() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    particles = [];
    conceptNodes = [];

    // Crear nodos de conceptos
    PSYCH_CONCEPTS.forEach(label => {
        const p = new Particle(true, label);
        particles.push(p);
        conceptNodes.push(p);
    });

    // Crear partículas normales
    for(let i=0; i<CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }
}

function connect() {
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
                const alpha = (1 - dist / CONFIG.connectionDist) * 0.12 * p1.z * p2.z;
                ctx.strokeStyle = p1.isConcept || p2.isConcept ? currentState.primary : '#475569';
                ctx.globalAlpha = alpha;
                ctx.lineWidth = (p1.isConcept || p2.isConcept) ? 1 : 0.4;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
}

function animate() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fondo dinámico (Auroras mentales)
    const time = Date.now() * 0.001;
    const grad = ctx.createRadialGradient(
        canvas.width/2 + Math.sin(time*0.5)*100,
        canvas.height/2 + Math.cos(time*0.3)*100,
        0,
        canvas.width/2,
        canvas.height/2,
        canvas.width
    );
    grad.addColorStop(0, `${currentState.secondary}11`);
    grad.addColorStop(1, '#020617');
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

// Interfaz de cambio de estado
window.changeState = (stateKey) => {
    if (STATES[stateKey]) {
        currentState = STATES[stateKey];
        // Notificar visualmente con pulsos masivos
        conceptNodes.forEach(c => c.emitPulse());
    }
};

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('mousedown', () => {
    conceptNodes.forEach(c => {
        const dx = mouse.x - c.x;
        const dy = mouse.y - c.y;
        if(Math.sqrt(dx*dx + dy*dy) < 100) {
            for(let i=0; i<10; i++) c.emitPulse();
        }
    });
});

window.addEventListener('resize', init);

init();
animate();
