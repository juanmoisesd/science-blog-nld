/**
 * Animación de Red Neuronal Dinámica para Science Blog NLD
 * Representa la conectividad cerebral y la neuroplasticidad.
 */

const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;
const connectionDistance = 150;
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

window.addEventListener('resize', () => {
    resizeCanvas();
});

function resizeCanvas() {
    const parent = canvas.parentElement;
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    if (particles.length === 0) {
        init();
    } else {
        // Ajustar posición de partículas existentes para evitar el "salto" visual
        const scaleX = canvas.width / oldWidth;
        const scaleY = canvas.height / oldHeight;

        for (let p of particles) {
            p.x *= scaleX;
            p.y *= scaleY;
        }
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Interacción con el ratón
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 0.5;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 0.5;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 0.5;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 0.5;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(230, 126, 34, 0.8)'; // Color de acento (naranja)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(44, 62, 80, ${opacity * 0.2})`; // Color primario con transparencia
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

resizeCanvas();
animate();
