function initProjectHoverEffects() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    document.querySelectorAll('.proyecto').forEach(project => {
        const preview = project.querySelector('.proyecto-preview');
        if (!preview) return;

        // Solo aplicar efectos en dispositivos no táctiles
        if (!isTouchDevice) {
            project.addEventListener('mousemove', (e) => {
                const rect = preview.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Reducir el ángulo de rotación para un efecto más sutil
                const rotateX = ((y - centerY) / rect.height) * 3;
                const rotateY = ((x - centerX) / rect.width) * 3;
                
                preview.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });

            project.addEventListener('mouseleave', () => {
                preview.style.transform = 'none';
                preview.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }
    });
}