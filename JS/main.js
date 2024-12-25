// Selecciona todos los enlaces dentro de la navegación y les añade un evento de clic
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Obtiene el atributo href del enlace clicado
        const targetId = link.getAttribute('href');
        
        // Asegurarse de que solo los enlaces internos sean interceptados
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            const targetSection = document.querySelector(targetId); // Selecciona la sección objetivo
            
            // Verifica si la sección objetivo existe
            if (targetSection) {
                // Desplaza suavemente la ventana hacia la sección objetivo
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Ajusta la posición para un mejor visual
                    behavior: 'smooth' // Desplazamiento suave
                });
            }
        }
    });
});

// Efecto sutil para las tarjetas de proyectos
document.querySelectorAll('.proyecto').forEach(card => {
    // Añade un evento de movimiento del mouse sobre cada tarjeta
    card.addEventListener('mousemove', (e) => {
        // Aplicamos un efecto de zoom al pasar el mouse
        card.style.transform = 'scale(1.05)'; // Aumentamos el tamaño de la tarjeta
        card.style.transition = 'transform 0.2s ease-out'; // Transición más rápida y fluida
    });

    // Añade un evento cuando el mouse sale de la tarjeta
    card.addEventListener('mouseleave', () => {
        // Vuelve al tamaño original de la tarjeta
        card.style.transform = 'scale(1)'; // Volvemos al tamaño original
        card.style.transition = 'transform 0.4s ease-in-out'; // Transición más suave al volver a la posición original
    });
});