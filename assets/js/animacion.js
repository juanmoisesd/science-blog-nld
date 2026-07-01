/**
 * Neuro-Sync Engine v7.0 - "Deep Mind Emergence"
 * Arquitectura de nivel doctoral con plasticidad sináptica, neurotransmisores y avalanchas neurales.
 */

const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

let particles = [];
let backgroundNeurons = [];
let connections = [];
let neurotransmitters = [];
let pulses = [];
let insightEvents = [];
let mouse = { x: -1000, y: -1000, radius: 250, down: false };

const PSYCH_CONCEPTS = [
    { label: "Memoria", desc: "Almacenamiento y recuperación de información." },
    { label: "Percepción", desc: "Organización sensorial del mundo." },
    { label: "Emoción", desc: "Respuesta psicofisiológica compleja." },
    { label: "Conciencia", desc: "Conocimiento del ser y del entorno." },
    { label: "Conducta", desc: "Acción observable del organismo." },
    { label: "Cognición", desc: "Procesamiento mental superior." }
];

const STATES = {
    ENFOQUE: {
        name: "Enfoque",
        primary: '#38bdf8',
        secondary: '#0ea5e9',
        pulse: '#fb923c',
        speed: 1.1,
        friction: 0.94,
        repulsion: 0.0003,
        neuroDensity: 5,
        clusterPower: 0.02 // Atrae nodos al centro
    },
    CREATIVIDAD: {
        name: "Creatividad",
        primary: '#c084fc',
        secondary: '#a855f7',
        pulse: '#f472b6',
        speed: 1.6,
        friction: 0.88,
        repulsion: 0.0007,
        neuroDensity: 15,
        entropy: 0.3 // Movimiento aleatorio extra
    },
    CALMA: {
        name: "Calma",
        primary: '#2dd4bf',
        secondary: '#0d9488',
        pulse: '#94a3b8',
        speed: 0.5,
        friction: 0.98,
        repulsion: 0.0001,
        neuroDensity: 4,
        rhythm: 0.002 // Respiración de la red
    }
};

let currentState = STATES.ENFOQUE;
let scrollIntensity = 0;

const CONFIG = {
    particleCount: 100,
    connectionDist: 200,
    pulseSpeed: 0.015,
    springStiffness: 0.04,
    springDamping: 0.85,
    plasticityRatio: 0.005, // Crecimiento sináptico
    decayRatio: 0.001,     // Poda sináptica
    insightThreshold: 0.85
};

class Particle {
    constructor(isConcept = false, conceptData = null) {
        this.isConcept = isConcept;
        this.label = conceptData ? conceptData.label : '';
        this.desc = conceptData ? conceptData.desc : '';
        this.isDragging = false;
        this.activity = 0; // 0 a 1
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.z = Math.random();
        this.baseSize = (this.isConcept ? 8 : 2.5) * (0.6 + this.z * 0.4);
        this.size = this.baseSize;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.pulseTimer = Math.random() * 400 + 100;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        if (this.isDragging) {
            this.x += (mouse.x - this.x) * 0.25;
            this.y += (mouse.y - this.y) * 0.25;
            this.vx = 0;
            this.vy = 0;
        } else {
            const speedMult = currentState.speed * (1 + scrollIntensity);

            if (currentState.entropy) {
                this.vx += (Math.random() - 0.5) * currentState.entropy;
                this.vy += (Math.random() - 0.5) * currentState.entropy;
            }

            if (currentState.clusterPower) {
                const dx = canvas.width / 2 - this.x;
                const dy = canvas.height / 2 - this.y;
                this.vx += dx * currentState.clusterPower * 0.01;
                this.vy += dy * currentState.clusterPower * 0.01;
            }

            if (this.isConcept) {
                const r = currentState.rhythm ? Math.sin(Date.now() * currentState.rhythm) * 50 : 40;
                this.angle += 0.003 * speedMult;
                const targetX = this.baseX + Math.cos(this.angle) * r;
                const targetY = this.baseY + Math.sin(this.angle) * r;
                this.vx += (targetX - this.x) * CONFIG.springStiffness;
                this.vy += (targetY - this.y) * CONFIG.springStiffness;
            }

            this.x += this.vx * speedMult;
            this.y += this.vy * speedMult;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -0.8;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -0.8;

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                const dirX = dx / dist;
                const dirY = dy / dist;

                if (mouse.down && this.isConcept) {
                    this.vx += dirX * force * 0.6;
                    this.vy += dirY * force * 0.6;
                } else {
                    this.vx -= dirX * force * currentState.repulsion * 600;
                    this.vy -= dirY * force * currentState.repulsion * 600;
                }
                this.activity = Math.max(this.activity, force);
            }

            this.vx *= currentState.friction;
            this.vy *= currentState.friction;
        }

        this.activity *= 0.98;
        this.pulseTimer -= (currentState.speed + scrollIntensity * 2);
        if (this.pulseTimer <= 0) {
            this.emitPulse();
            this.pulseTimer = (Math.random() * 300 + 150) / (1 + this.activity);
        }
    }

    draw() {
        const opacity = 0.4 + this.z * 0.6;
        ctx.beginPath();

        const glowSize = this.isConcept ? 15 : 5;
        const currentSize = this.baseSize + (this.activity * 10);

        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);

        ctx.fillStyle = this.isConcept ? currentState.primary : '#cbd5e1';
        ctx.globalAlpha = opacity;

        if (this.isConcept || this.activity > 0.5) {
            ctx.shadowBlur = (this.isConcept ? 30 : 15) * (opacity + this.activity);
            ctx.shadowColor = currentState.primary;
        }

        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        if (this.isConcept) {
            // Texto con efecto de "brillo"
            ctx.font = `bold ${14 + this.z * 4}px 'Playfair Display', serif`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255,255,255,0.5)';
            ctx.fillText(this.label, this.x, this.y - 25);
            ctx.shadowBlur = 0;

            if (this.activity > 0.4 || this.isDragging) {
                ctx.font = `italic 11px Inter, sans-serif`;
                ctx.fillStyle = `${currentState.primary}cc`;
                ctx.fillText(this.desc, this.x, this.y + 25);
            }
        }
    }

    emitPulse() {
        const activeConnections = connections.filter(c => c.p1 === this || c.p2 === this);
        if (activeConnections.length > 0) {
            const count = this.isConcept ? 2 : 1;
            for(let i=0; i<count; i++) {
                const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
                const target = conn.p1 === this ? conn.p2 : conn.p1;
                pulses.push(new Pulse(this, target, conn));
                conn.strengthen();
            }
        }
    }
}

class Connection {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.strength = 0.1 + Math.random() * 0.2;
        this.life = 1.0;
        this.isImportant = p1.isConcept || p2.isConcept;
    }

    update() {
        this.strength -= CONFIG.decayRatio;
        if (this.isImportant) this.strength += CONFIG.decayRatio * 0.5; // Los conceptos son más estables

        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        // Poda si se alejan demasiado o se debilitan
        if (dist > CONFIG.connectionDist * 1.5) this.strength -= 0.01;

        this.strength = Math.max(0, Math.min(1, this.strength));
        return this.strength > 0;
    }

    strengthen() {
        this.strength += CONFIG.plasticityRatio * 10;
        if (this.strength > CONFIG.insightThreshold && Math.random() > 0.98) {
            triggerInsight(this.p1.x, this.p1.y);
        }
    }

    draw() {
        if (this.strength <= 0.05) return;

        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);

        const cp1x = this.p1.x + (this.p2.x - this.p1.x) * 0.5;
        const cp1y = this.p1.y;
        const cp2x = this.p1.x + (this.p2.x - this.p1.x) * 0.5;
        const cp2y = this.p2.y;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, this.p2.x, this.p2.y);

        const alpha = this.strength * 0.3 * this.p1.z * this.p2.z;
        ctx.strokeStyle = this.isImportant ? currentState.primary : '#475569';
        ctx.globalAlpha = alpha;
        ctx.lineWidth = this.isImportant ? 2 * this.strength : 0.5 * this.strength;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

class Pulse {
    constructor(start, end, connection) {
        this.start = start;
        this.end = end;
        this.connection = connection;
        this.progress = 0;
        this.speed = CONFIG.pulseSpeed * (0.7 + Math.random() * 0.6);
        this.color = currentState.pulse;
    }

    update() {
        this.progress += this.speed * (currentState.speed + scrollIntensity);
        if (this.progress >= 1) {
            this.end.activity += 0.15;
            return false;
        }
        return true;
    }

    draw() {
        const t = this.progress;
        const cp1x = this.start.x + (this.end.x - this.start.x) * 0.5;
        const cp1y = this.start.y;
        const cp2x = this.start.x + (this.end.x - this.start.x) * 0.5;
        const cp2y = this.end.y;

        const x = Math.pow(1-t, 3) * this.start.x + 3 * Math.pow(1-t, 2) * t * cp1x + 3 * (1-t) * Math.pow(t, 2) * cp2x + Math.pow(t, 3) * this.end.x;
        const y = Math.pow(1-t, 3) * this.start.y + 3 * Math.pow(1-t, 2) * t * cp1y + 3 * (1-t) * Math.pow(t, 2) * cp2y + Math.pow(t, 3) * this.end.y;

        ctx.beginPath();
        ctx.arc(x, y, 3 * this.connection.strength, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15 * this.connection.strength;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Neurotransmitter {
    constructor(type) {
        this.type = type; // 'dopamine' (yellow/fast) o 'serotonin' (blue/slow)
        this.history = [];
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * (this.type === 'dopamine' ? 2.5 : 1.0);
        this.vy = (Math.random() - 0.5) * (this.type === 'dopamine' ? 2.5 : 1.0);
        this.size = this.type === 'dopamine' ? 2 : 3.5;
        this.color = this.type === 'dopamine' ? '#fde047' : '#38bdf8';
        this.life = 1.0;
        this.history = [];
    }

    update() {
        // Guardar estela
        this.history.push({x: this.x, y: this.y});
        if (this.history.length > 8) this.history.shift();

        this.x += this.vx * (1 + scrollIntensity);
        this.y += this.vy * (1 + scrollIntensity);
        this.life -= 0.003;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Interacción profunda con partículas
        particles.forEach(p => {
            const dx = p.x - this.x;
            const dy = p.y - this.y;
            const distSq = dx*dx + dy*dy;

            if (distSq < 1600) { // Radio de influencia
                const force = (40 - Math.sqrt(distSq)) / 40;
                if (this.type === 'dopamine') {
                    p.activity += 0.02 * force;
                    // Atracción sutil hacia la dopamina
                    p.vx += (this.x - p.x) * 0.001;
                    p.vy += (this.y - p.y) * 0.001;
                } else {
                    // Serotonina calma y estabiliza
                    p.vx *= (1 - 0.1 * force);
                    p.vy *= (1 - 0.1 * force);
                    p.activity *= (1 - 0.05 * force);
                }
            }
        });

        return this.life > 0;
    }

    draw() {
        // Dibujar estela
        if (this.history.length > 1) {
            ctx.beginPath();
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for(let i=1; i<this.history.length; i++) {
                ctx.lineTo(this.history[i].x, this.history[i].y);
            }
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = this.life * 0.2;
            ctx.lineWidth = this.size * 0.5;
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life * 0.8;

        ctx.shadowBlur = 10 * this.life;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

function triggerInsight(x, y) {
    insightEvents.push({
        x, y,
        radius: 0,
        maxRadius: 150 + Math.random() * 100,
        life: 1.0
    });
}

function updateInsight() {
    insightEvents = insightEvents.filter(e => {
        e.radius += 10;
        e.life -= 0.02;

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${e.life * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Efecto de distorsión sutil (simulado con gradiente)
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.radius);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.9, `${currentState.primary}${Math.floor(e.life * 20).toString(16)}`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();

        return e.life > 0;
    });
}

function init() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    particles = [];
    connections = [];
    neurotransmitters = [];
    backgroundNeurons = [];

    PSYCH_CONCEPTS.forEach(data => {
        particles.push(new Particle(true, data));
    });

    for(let i=0; i<CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }

    // Inicializar algunas conexiones
    for(let i=0; i<particles.length; i++) {
        for(let j=i+1; j<particles.length; j++) {
            const dist = Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2));
            if (dist < CONFIG.connectionDist * 0.8 && Math.random() > 0.5) {
                connections.push(new Connection(particles[i], particles[j]));
            }
        }
    }
}

function maintainConnections() {
    // Poda
    connections = connections.filter(c => c.update());

    // Crecimiento (nuevas conexiones potenciales)
    if (connections.length < particles.length * 2.5) {
        const p1 = particles[Math.floor(Math.random() * particles.length)];
        const p2 = particles[Math.floor(Math.random() * particles.length)];
        if (p1 !== p2) {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < CONFIG.connectionDist) {
                const existing = connections.find(c => (c.p1 === p1 && c.p2 === p2) || (c.p1 === p2 && c.p2 === p1));
                if (!existing) connections.push(new Connection(p1, p2));
            }
        }
    }
}

function spawnNeurotransmitters() {
    if (neurotransmitters.length < currentState.neuroDensity + (scrollIntensity * 20)) {
        neurotransmitters.push(new Neurotransmitter(Math.random() > 0.4 ? 'dopamine' : 'serotonin'));
    }
}

function updateDashboard() {
    const connectivity = (connections.length / (particles.length * 2.5)) * 100;
    const dopamine = (neurotransmitters.filter(n => n.type === 'dopamine').length / 20) * 100;
    const plasticity = CONFIG.plasticityRatio * 10000;

    document.getElementById('bar-connectivity').style.width = `${Math.min(100, connectivity)}%`;
    document.getElementById('bar-dopamine').style.width = `${Math.min(100, dopamine)}%`;
    document.getElementById('bar-plasticity').style.width = `${Math.min(100, plasticity)}%`;
    document.getElementById('display-state').innerText = currentState.name.toUpperCase();
}

function animate() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Date.now() % 10 === 0) updateDashboard();

    // Fondo ambiental
    const time = Date.now() * 0.0008;
    const grad = ctx.createRadialGradient(
        canvas.width/2 + Math.sin(time)*100,
        canvas.height/2 + Math.cos(time*0.5)*100,
        0,
        canvas.width/2,
        canvas.height/2,
        canvas.width
    );
    grad.addColorStop(0, `${currentState.secondary}10`);
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    maintainConnections();
    spawnNeurotransmitters();

    connections.forEach(c => c.draw());

    neurotransmitters = neurotransmitters.filter(n => {
        const active = n.update();
        if (active) n.draw();
        return active;
    });

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    pulses = pulses.filter(p => {
        const active = p.update();
        if (active) p.draw();
        return active;
    });

    updateInsight();

    requestAnimationFrame(animate);
}

window.changeState = (stateKey) => {
    if (STATES[stateKey]) {
        currentState = STATES[stateKey];
        document.documentElement.style.setProperty('--accent-primary', currentState.primary);
        document.documentElement.style.setProperty('--accent-secondary', currentState.secondary);

        // Ráfaga de actividad al cambiar de estado
        particles.forEach(p => {
            if (p.isConcept) {
                p.activity = 1.0;
                for(let i=0; i<10; i++) setTimeout(() => p.emitPulse(), i * 50);
            }
        });
    }
};

// Scroll Sync Enhanced
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    scrollIntensity = scrollPercent * 3; // Escala el impacto

    // Aumentar plasticidad con el scroll (simula aprendizaje)
    CONFIG.plasticityRatio = 0.005 + (scrollPercent * 0.01);

    // Disparar pulsos aleatorios al hacer scroll rápido
    if (Math.random() < scrollPercent * 0.1) {
        const p = particles[Math.floor(Math.random() * particles.length)];
        p.emitPulse();
    }
});

window.addEventListener('mousedown', (e) => {
    mouse.down = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    particles.forEach(p => {
        if (p.isConcept) {
            const dx = p.x - x;
            const dy = p.y - y;
            if (Math.sqrt(dx*dx + dy*dy) < 50) p.isDragging = true;
        }
    });
});

window.addEventListener('mouseup', () => {
    mouse.down = false;
    particles.forEach(p => p.isDragging = false);
});

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('resize', init);

init();
animate();
