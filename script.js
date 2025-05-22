document.addEventListener('DOMContentLoaded', function() {
  // Establecer el año actual en el footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Menú móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      
      // Cambiar el aspecto del botón de menú
      const spans = this.querySelectorAll('span');
      if (mainNav.classList.contains('active')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        
        // Mostrar el menú
        mainNav.style.display = 'block';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Ocultar el menú
        mainNav.style.display = '';
      }
    });
  }
  
  // Cerrar el menú móvil al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-list a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 768 && mainNav.classList.contains('active')) {
        menuToggle.click();
      }
    });
  });
  
  // Desplazamiento suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Añadir estilos para el menú móvil
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 767px) {
      .main-nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: var(--shadow-md);
        padding: 1rem;
      }
      
      .main-nav.active {
        display: block;
      }
      
      .nav-list {
        flex-direction: column;
        gap: 0;
      }
      
      .nav-list li {
        width: 100%;
      }
      
      .nav-list a {
        display: block;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--color-border);
      }
      
      .nav-list li:last-child a {
        border-bottom: none;
      }
    }
  `;
  document.head.appendChild(style);
});