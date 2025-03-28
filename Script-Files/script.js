// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((element) => {
        observer.observe(element);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth Scroll for Navigation Links
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

    // Add hover effect to team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Add animation to mission and vision cards
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('animate-pulse');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('animate-pulse');
        });
    });

    // Add animation to value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('animate-shake');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('animate-shake');
        });
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
        navbar.classList.add('hide');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
        navbar.classList.remove('hide');
    }
    
    navbar.classList.add('scrolled');
    lastScroll = currentScroll;
});

// Animate Elements on Scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

// Add animation classes to elements
document.querySelectorAll('.feature-item, .program-card, .about-image, .section-header').forEach(element => {
    element.classList.add('reveal');
    animateOnScroll.observe(element);
});

// Form Submission Handling
const volunteerForm = document.querySelector('.volunteer-form');
const newsletterForm = document.querySelector('.newsletter-form');

if (volunteerForm) {
    volunteerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = volunteerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
            
            // Success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
            submitBtn.classList.add('success');
            volunteerForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('success');
            }, 3000);
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            submitBtn.classList.add('error');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('error');
            }, 3000);
        }
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            // Add your newsletter subscription logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.classList.add('success');
            newsletterForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('success');
            }, 3000);
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            submitBtn.classList.add('error');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('error');
            }, 3000);
        }
    });
}

// Parallax effect for hero section
const heroSection = document.querySelector('.modern-hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scroll * 0.5}px`;
    });
}

// Animate numbers
function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize number animations
document.querySelectorAll('[data-number]').forEach(element => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(element.dataset.number);
                animateNumber(element, 0, target, 2000);
                observer.unobserve(element);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    observer.observe(element);
});

// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        if (isTransitioning) return;
        isTransitioning = true;

        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = '1';
        dots[currentSlide].classList.add('active');

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        currentSlide = index;
        updateSlides();
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideshow();
    });

    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideshow();
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.hero-slideshow').addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);

    document.querySelector('.hero-slideshow').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }

    // Pause slideshow on hover
    document.querySelector('.hero-slideshow').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    document.querySelector('.hero-slideshow').addEventListener('mouseleave', () => {
        startSlideshow();
    });

    // Start the slideshow
    startSlideshow();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            const errorElements = document.querySelectorAll('.form-error');
            errorElements.forEach(error => error.style.display = 'none');
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => input.classList.remove('error'));

            let isValid = true;

            // Validate Name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                document.getElementById('nameError').textContent = 'Name is required';
                document.getElementById('nameError').style.display = 'block';
                nameInput.classList.add('error');
                isValid = false;
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                document.getElementById('emailError').style.display = 'block';
                emailInput.classList.add('error');
                isValid = false;
            }

            // Validate Subject
            const subjectInput = document.getElementById('subject');
            if (!subjectInput.value) {
                document.getElementById('subjectError').textContent = 'Please select a subject';
                document.getElementById('subjectError').style.display = 'block';
                subjectInput.classList.add('error');
                isValid = false;
            }

            // Validate Message
            const messageInput = document.getElementById('message');
            if (!messageInput.value.trim()) {
                document.getElementById('messageError').textContent = 'Message is required';
                document.getElementById('messageError').style.display = 'block';
                messageInput.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#28a745';
                submitBtn.disabled = true;

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });

        // Real-time validation
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorElement = document.getElementById(this.id + 'Error');
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                }
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
}); 