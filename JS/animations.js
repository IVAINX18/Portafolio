function initProjectHoverEffects() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    document.querySelectorAll('.proyecto').forEach(project => {
        const preview = project.querySelector('.proyecto-preview');
        if (!preview) return;

        if (!isTouchDevice) {
            project.addEventListener('mouseenter', () => {
                preview.style.transform = 'scale(1.05) translateY(-10px)';
                preview.style.transition = 'transform 0.4s ease-out';
            });

            project.addEventListener('mouseleave', () => {
                preview.style.transform = 'scale(1) translateY(0)';
                preview.style.transition = 'transform 0.4s ease-in';
            });
        }
    });
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initProjectHoverEffects);
