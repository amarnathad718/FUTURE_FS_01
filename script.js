// Theme toggle and persistent preference
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateToggleIcon(theme);
}

function updateToggleIcon(theme) {
  const sun = document.querySelector('.theme-toggle .sun');
  const moon = document.querySelector('.theme-toggle .moon');
  if (!sun || !moon) return;
  if (theme === 'dark') {
    sun.style.display = 'none';
    moon.style.display = 'inline';
  } else {
    sun.style.display = 'inline';
    moon.style.display = 'none';
  }
}

const toggle = document.getElementById('theme-toggle');
if (toggle) {
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    console.log('switching theme from', current, 'to', next);
    setTheme(next);
  });
}

// update copyright year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// timeline reveal
const timelineEntries = document.querySelectorAll('.timeline-entry');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
timelineEntries.forEach(el => timelineObserver.observe(el));

// Testimonials slider
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');

function showSlide(index) {
  testimonialCards.forEach(card => card.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  testimonialCards[index].classList.add('active');
  testimonialDots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonialCards.length;
  showSlide(currentSlide);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Dot click handlers
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => showSlide(index));
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation for progress bars
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const perc = bar.dataset.percentage;
      setTimeout(() => {
        bar.style.width = perc + '%';
      }, 200);
      progressObserver.unobserve(bar);
    }
  });
}, observerOptions);

const progressBars = document.querySelectorAll('.progress-bar');
progressBars.forEach(bar => progressObserver.observe(bar));

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Simulate form submission (in a real app, you'd send to a server)
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
  });
}

// Optional smooth scrolling polyfill if needed (CSS covers basic cases)
