// ========================================
// GenEd The Learning Advocates
// Blog Page Complete JavaScript (Standalone)
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
    if (linkPage === currentPage || 
        (currentPage === 'blog.html' && linkPage === 'blog.html') ||
        (currentPage.includes('post') && linkPage === 'blog.html')) {
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
  // SOCIAL SHARE FUNCTIONALITY
  // ========================================
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const platform = this.classList.contains('facebook') ? 'facebook' :
                      this.classList.contains('twitter') ? 'twitter' :
                      this.classList.contains('linkedin') ? 'linkedin' :
                      this.classList.contains('whatsapp') ? 'whatsapp' : '';
      
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl = '';
      
      switch(platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${title}%20${url}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
  
  // ========================================
  // BLOG CARD HOVER EFFECTS
  // ========================================
  const blogCards = document.querySelectorAll('.blog-card');
  
  blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // ========================================
  // READ TIME ESTIMATION (Optional)
  // ========================================
  const postContent = document.querySelector('.post-content');
  
  if (postContent) {
    const wordCount = postContent.textContent.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
    
    const postMeta = document.querySelector('.post-meta');
    if (postMeta && readTime > 0) {
      const readTimeElement = document.createElement('span');
      readTimeElement.className = 'post-read-time';
      readTimeElement.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        ${readTime} min read
      `;
      postMeta.appendChild(readTimeElement);
    }
  }
  
  // ========================================
  // PAGE LOAD COMPLETE
  // ========================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
});