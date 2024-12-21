document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) { // Solo aplicar scroll si es un enlace interno
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Efecto sutil para las tarjetas de proyectos
document.querySelectorAll('.proyecto').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Reducimos la intensidad del efecto 3D
        const rotateX = (y - centerY) / 50; // Cambiado de 20 a 50
        const rotateY = -(x - centerX) / 50; // Cambiado de 20 a 50

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`; // Reducido el scale
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.transition = 'transform 0.5s ease';
    });
});