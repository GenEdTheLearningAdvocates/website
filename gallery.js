// ========================================
// GenEd The Learning Advocates
// Gallery Page Complete JavaScript (Standalone)
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
    if (linkPage === currentPage || (currentPage === 'gallery.html' && linkPage === 'gallery.html')) {
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
  // GALLERY FILTERING
  // ========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter category
        const filterValue = this.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach((item, index) => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || itemCategory === filterValue) {
            // Show item with stagger animation
            setTimeout(() => {
              item.classList.remove('hide');
              item.style.animation = 'fadeIn 0.5s ease forwards';
            }, index * 50);
          } else {
            // Hide item
            item.classList.add('hide');
          }
        });
      });
    });
  }
  
  // ========================================
  // LIGHTBOX FUNCTIONALITY
  // ========================================
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-content img');
  const lightboxTitle = document.querySelector('.lightbox-info h3');
  const lightboxCategory = document.querySelector('.lightbox-info p');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  let visibleImages = [];
  
  // Update visible images array based on current filter
  function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
  }
  
  // Open lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      updateVisibleImages();
      currentImageIndex = visibleImages.indexOf(this);
      showLightbox(this);
    });
  });
  
  function showLightbox(item) {
    const imgSrc = item.querySelector('img').src;
    const title = item.querySelector('.gallery-title').textContent;
    const category = item.querySelector('.gallery-category').textContent;
    
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
  
  // Navigate to previous image
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function(e) {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
      showLightbox(visibleImages[currentImageIndex]);
    });
  }
  
  // Navigate to next image
  if (lightboxNext) {
    lightboxNext.addEventListener('click', function(e) {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
      showLightbox(visibleImages[currentImageIndex]);
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
      lightboxPrev.click();
    } else if (e.key === 'ArrowRight') {
      lightboxNext.click();
    }
  });
  
  // ========================================
  // GALLERY ITEM HOVER EFFECTS
  // ========================================
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // ========================================
  // LAZY LOADING IMAGES (Optional)
  // ========================================
  const images = document.querySelectorAll('.gallery-item img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
  
  // ========================================
  // FADE IN ANIMATION
  // ========================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Initial animation for all items
  galleryItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation = 'fadeIn 0.5s ease forwards';
    }, index * 50);
  });
  
  // ========================================
  // PAGE LOAD COMPLETE
  // ========================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    updateVisibleImages();
  });
  
});