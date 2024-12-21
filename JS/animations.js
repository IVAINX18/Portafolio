function initProjectHoverEffects() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    document.querySelectorAll('.proyecto').forEach(project => {
        const preview = project.querySelector('.proyecto-preview');
        if (!preview) return;

        if (!isTouchDevice) {
            project.addEventListener('mouseenter', () => {
                preview.style.transform = `
                    perspective(1000px)
                    scale3d(1.02, 1.02, 1.02)
                    rotateX(-2deg)
                    rotateY(2deg)
                `;
                preview.style.transition = 'transform 0.4s ease-out';
            });

            project.addEventListener('mouseleave', () => {
                preview.style.transform = 'none';
                preview.style.transition = 'transform 0.4s ease-in';
            });
        }
    });
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initProjectHoverEffects);