document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema inicializado. ¡Bienvenido a Anti-Procrastination Quest!");

    // ==========================================================================
    // 1. GESTIÓN DE NAVEGACIÓN ACTIVA
    // Detecta la URL actual y aplica la clase 'active' a la pestaña correcta
    // ==========================================================================
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.rpg-nav-link');

    navLinks.forEach(link => {
        // Primero quitamos la clase 'active' por defecto
        link.classList.remove('active');
        
        const linkPath = link.getAttribute('href');
        
        // Si la URL actual incluye el destino del enlace, lo marcamos como activo.
        // También evaluamos si estamos en la raíz para marcar el index.
        if (currentPath.includes(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ==========================================================================
    // 2. LÓGICA DE VENTANAS MODALES (Nueva Quest)
    // ==========================================================================
    const modal = document.getElementById('quest-modal');
    const btnOpenModal = document.getElementById('btn-open-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelQuest = document.getElementById('btn-cancel-quest');

    // Función para abrir el modal (quitando la clase oculta)
    if (btnOpenModal && modal) {
        btnOpenModal.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    // Función para cerrar el modal (agregando la clase oculta)
    const closeModal = () => {
        if (modal) modal.classList.add('hidden');
    };

    // Asignamos el evento de cierre tanto a la X (arriba) como al botón rojo de abortar
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if (btnCancelQuest) btnCancelQuest.addEventListener('click', closeModal);

});