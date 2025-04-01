document.addEventListener('DOMContentLoaded', function() {
  // Gallery Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Lightbox Gallery
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxCaptionTitle = lightboxCaption.querySelector('h3');
  const lightboxCaptionText = lightboxCaption.querySelector('p');
  const galleryExpandButtons = document.querySelectorAll('.gallery-expand');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  const images = Array.from(galleryItems);
  
  // Open lightbox
  function openLightbox(index) {
    currentImageIndex = index;
    const item = images[currentImageIndex];
    const imgSrc = item.querySelector('img').getAttribute('src');
    const title = item.querySelector('h3').textContent;
    const text = item.querySelector('p').textContent;
    
    lightboxImage.setAttribute('src', imgSrc);
    lightboxImage.setAttribute('alt', title);
    lightboxCaptionTitle.textContent = title;
    lightboxCaptionText.textContent = text;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Navigate to previous image
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const item = images[currentImageIndex];
    const imgSrc = item.querySelector('img').getAttribute('src');
    const title = item.querySelector('h3').textContent;
    const text = item.querySelector('p').textContent;
    
    lightboxImage.setAttribute('src', imgSrc);
    lightboxImage.setAttribute('alt', title);
    lightboxCaptionTitle.textContent = title;
    lightboxCaptionText.textContent = text;
  }
  
  // Navigate to next image
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const item = images[currentImageIndex];
    const imgSrc = item.querySelector('img').getAttribute('src');
    const title = item.querySelector('h3').textContent;
    const text = item.querySelector('p').textContent;
    
    lightboxImage.setAttribute('src', imgSrc);
    lightboxImage.setAttribute('alt', title);
    lightboxCaptionTitle.textContent = title;
    lightboxCaptionText.textContent = text;
  }
  
  // Event listeners
  galleryExpandButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(index);
    });
  });
  
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevImage);
  lightboxNext.addEventListener('click', nextImage);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  });
  
  // Animate gallery items on scroll
  const animateOnScroll = function() {
    galleryItems.forEach(item => {
      const itemPosition = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (itemPosition < windowHeight - 100) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});