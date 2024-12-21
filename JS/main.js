document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        // Asegurarse de que solo los enlaces internos sean interceptados
        if (targetId && targetId.startsWith('#')) {
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

        // Reducimos la intensidad del efecto 3D para hacerlo más sutil
        const rotateX = (y - centerY) / 80; // Cambiado de 50 a 80 para menor intensidad
        const rotateY = -(x - centerX) / 80; // Cambiado de 50 a 80 para menor intensidad

        // Aplicamos una escala más sutil y reducimos la duración de la animación
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`; // Escala aumentada ligeramente
        card.style.transition = 'transform 0.2s ease-out'; // Transición más rápida y fluida
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.transition = 'transform 0.4s ease-in-out'; // Transición más suave al volver a la posición original
    });
});

