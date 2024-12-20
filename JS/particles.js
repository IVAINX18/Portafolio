function createParticles() {
    const hero = document.querySelector('#hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${Math.random() > 0.5 ? '#00fff2' : '#0066ff'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random()};
            animation: float ${Math.random() * 3 + 2}s infinite;
        `;
        hero.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);