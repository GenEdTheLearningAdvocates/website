// ========================================
// GenEd The Learning Advocates
// Leadership Page Complete JavaScript (Standalone)
// No dependencies - Fully independent
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // ========================================
  // ACTIVE MENU HIGHLIGHTING
  // ========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');
  
  allNavLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === 'leadership.html' && linkPage === 'leadership.html')) {
      link.classList.add('active');
    }
  });
  
  // ========================================
  // STICKY HEADER ON SCROLL
  // ========================================
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  const revealElements = document.querySelectorAll('.fade-in, .leader-card-large, .member-card, .advisor-card');
  
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        if (!element.classList.contains('visible')) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('visible');
          }, index * 50);
        }
      }
    });
  }
  
  revealElements.forEach(element => {
    if (!element.style.opacity) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
  });
  
  if (revealElements.length > 0) {
    window.addEventListener('scroll', debounce(revealOnScroll, 50));
    revealOnScroll();
  }
  
  // ========================================
  // MEMBER CARD HOVER EFFECTS
  // ========================================
  const memberCards = document.querySelectorAll('.member-card, .leader-card-large, .advisor-card');
  
  memberCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // ========================================
  // SOCIAL ICON ANIMATIONS
  // ========================================
  const socialIcons = document.querySelectorAll('.social-icon, .contact-link');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // ========================================
  // PAGE LOAD COMPLETE
  // ========================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
      revealOnScroll();
    }, 100);
  });
  
});

// ========================================
// UTILITY: DEBOUNCE FUNCTION
// ========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}