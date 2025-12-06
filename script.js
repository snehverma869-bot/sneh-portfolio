

const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const themeToggle = document.getElementById('theme-toggle');
const scrollTop = document.getElementById('scroll-top');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');// ===== MOBILE MENU =====
if (navToggle) {
navToggle.addEventListener('click', () => {
navMenu.classList.add('show-menu');
});
}if (navClose) {
navClose.addEventListener('click', () => {
navMenu.classList.remove('show-menu');
});
}// Close menu when clicking nav links
navLinks.forEach(link => {
link.addEventListener('click', () => {
navMenu.classList.remove('show-menu');
});
});// ===== SCROLL HEADER =====
window.addEventListener('scroll', () => {
if (window.scrollY >= 50) {
header.classList.add('scroll-header');
} else {
header.classList.remove('scroll-header');
}
});// ===== ACTIVE SECTION HIGHLIGHTING =====
function scrollActive() {
const scrollY = window.pageYOffset;sections.forEach(section => {
const sectionHeight = section.offsetHeight;
const sectionTop = section.offsetTop - 100;
const sectionId = section.getAttribute('id');
const navLink = document.querySelector(nav__link[href="#${sectionId}"]);if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
  navLink?.classList.add('active-link');
} else {
  navLink?.classList.remove('active-link');
}
});
}window.addEventListener('scroll', scrollActive);// ===== DARK MODE =====
const darkMode = localStorage.getItem('darkMode');
const themeIcon = themeToggle.querySelector('i');// Check for saved theme preference or default to light mode
if (darkMode === 'enabled') {
document.body.classList.add('dark-mode');
themeIcon.classList.replace('fa-moon', 'fa-sun');
}themeToggle.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');if (document.body.classList.contains('dark-mode')) {
themeIcon.classList.replace('fa-moon', 'fa-sun');
localStorage.setItem('darkMode', 'enabled');
} else {
themeIcon.classList.replace('fa-sun', 'fa-moon');
localStorage.setItem('darkMode', null);
}
});// ===== TYPING EFFECT =====
const typingElement = document.querySelector('.typing-text');
const titles = ['Front-end Developer', 'Web Designer', 'HDWT Student', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;function type() {
const currentTitle = titles[titleIndex];if (isDeleting) {
typingElement.textContent = currentTitle.substring(0, charIndex - 1);
charIndex--;
} else {
typingElement.textContent = currentTitle.substring(0, charIndex + 1);
charIndex++;
}let typeSpeed = isDeleting ? 50 : 100;if (!isDeleting && charIndex === currentTitle.length) {
typeSpeed = 2000;
isDeleting = true;
} else if (isDeleting && charIndex === 0) {
isDeleting = false;
titleIndex = (titleIndex + 1) % titles.length;
typeSpeed = 500;
}setTimeout(type, typeSpeed);
}// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', type);// ===== SCROLL ANIMATIONS =====
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';  // Animate skill bars
  if (entry.target.classList.contains('skill')) {
    const progressBar = entry.target.querySelector('.skill__progress');
    const progress = progressBar.getAttribute('data-progress');
    setTimeout(() => {
      progressBar.style.width = progress + '%';
    }, 200);
  }
}
});
}, observerOptions);// Observe elements for animation
const animateElements = document.querySelectorAll('.about__card, .skill, .project__card');
animateElements.forEach(el => {
el.style.opacity = '0';
el.style.transform = 'translateY(30px)';
el.style.transition = 'all 0.6s ease-out';
observer.observe(el);
});// ===== PROJECT FILTERS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project__card');filterButtons.forEach(button => {
button.addEventListener('click', () => {
// Remove active class from all buttons
filterButtons.forEach(btn => btn.classList.remove('active'));
// Add active class to clicked button
button.classList.add('active');const filterValue = button.getAttribute('data-filter');projectCards.forEach(card => {
  const category = card.getAttribute('data-category');  if (filterValue === 'all' || category === filterValue) {
    card.classList.remove('hide');
    card.style.animation = 'fadeInUp 0.6s ease-out';
  } else {
    card.classList.add('hide');
  }
});
});
});// ===== PROJECT MODALS =====
const modalButtons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const modalCloseButtons = document.querySelectorAll('.modal__close');modalButtons.forEach(button => {
button.addEventListener('click', () => {
const modalId = button.getAttribute('data-modal') + '-modal';
const modal = document.getElementById(modalId);
if (modal) {
modal.classList.add('active');
document.body.style.overflow = 'hidden';
}
});
});modalCloseButtons.forEach(button => {
button.addEventListener('click', () => {
const modal = button.closest('.modal');
modal.classList.remove('active');
document.body.style.overflow = '';
});
});// Close modal when clicking outside
modals.forEach(modal => {
modal.addEventListener('click', (e) => {
if (e.target === modal) {
modal.classList.remove('active');
document.body.style.overflow = '';
}
});
});// Close modal with Escape key
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
modals.forEach(modal => {
modal.classList.remove('active');
document.body.style.overflow = '';
});
}
});// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;function validateField(input) {
const value = input.value.trim();
const errorElement = input.nextElementSibling;if (value === '') {
input.classList.add('error');
errorElement.textContent = 'This field is required';
return false;
}if (input.type === 'email' && !emailRegex.test(value)) {
input.classList.add('error');
errorElement.textContent = 'Please enter a valid email';
return false;
}input.classList.remove('error');
errorElement.textContent = '';
return true;
}// Real-time validation
const formInputs = contactForm.querySelectorAll('.form__input, .form__textarea');
formInputs.forEach(input => {
input.addEventListener('blur', () => validateField(input));
input.addEventListener('input', () => {
if (input.classList.contains('error')) {
validateField(input);
}
});
});contactForm.addEventListener('submit', (e) => {
e.preventDefault();let isValid = true;
formInputs.forEach(input => {
if (!validateField(input)) {
isValid = false;
}
});if (isValid) {
// Get form data
const formData = new FormData(contactForm);
const data = Object.fromEntries(formData);// Show success message
formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
formMessage.classList.remove('error');
formMessage.classList.add('success');// Reset form
contactForm.reset();// Hide message after 5 seconds
setTimeout(() => {
  formMessage.classList.remove('success');
}, 5000);// Optional: Send form data to backend
// You can integrate with Formspree, Netlify Forms, or your own backend
// Example with Formspree:
/*
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: formData,
  headers: {
    'Accept': 'application/json'
  }
}).then(response => {
  if (response.ok) {
    formMessage.textContent = 'Message sent successfully!';
    formMessage.classList.add('success');
    contactForm.reset();
  } else {
    formMessage.textContent = 'Oops! There was a problem sending your message.';
    formMessage.classList.add('error');
  }
}).catch(error => {
  formMessage.textContent = 'Oops! There was a problem sending your message.';
  formMessage.classList.add('error');
});
*/
}
});// ===== SCROLL TO TOP =====
window.addEventListener('scroll', () => {
if (window.scrollY >= 560) {
scrollTop.classList.add('show-scroll');
} else {
scrollTop.classList.remove('show-scroll');
}
});// ===== SMOOTH SCROLLING =====
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
});// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
const imageObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const img = entry.target;
img.src = img.dataset.src || img.src;
img.classList.add('loaded');
observer.unobserve(img);
}
});
});document.querySelectorAll('img[loading="lazy"]').forEach(img => {
imageObserver.observe(img);
});
}// ===== PERFORMANCE: Debounce scroll events =====
function debounce(func, wait = 10) {
let timeout;
return function executedFunction(...args) {
const later = () => {
clearTimeout(timeout);
func(...args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}// Apply debounce to scroll events
window.addEventListener('scroll', debounce(scrollActive, 10));
window.addEventListener('scroll', debounce(() => {
if (window.scrollY >= 560) {
scrollTop.classList.add('show-scroll');
} else {
scrollTop.classList.remove('show-scroll');
}
}, 10));// ===== ACCESSIBILITY: Focus management =====
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';modals.forEach(modal => {
modal.addEventListener('keydown', (e) => {
if (e.key === 'Tab') {
const focusables = modal.querySelectorAll(focusableElements);
const firstFocusable = focusables[0];
const lastFocusable = focusables[focusables.length - 1];  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) {
      lastFocusable.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  }
}
});
});// ===== CONSOLE MESSAGE =====
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Sneh Verma', 'color: #10b981; font-size: 14px;');