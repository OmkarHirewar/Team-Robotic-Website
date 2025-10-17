/* Particle Circle Animation */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Disable legacy animations
        document.body.classList.add('legacy-animations-disabled');
        document.body.classList.remove('disable-bg-animations');

        // Hide old background elements
        const oldCanvas = document.getElementById('particle-canvas');
        const oldTrailCanvas = document.getElementById('mouse-trail-canvas');
        if (oldCanvas) oldCanvas.style.display = 'none';
        if (oldTrailCanvas) oldTrailCanvas.style.display = 'none';

        // Initialize particle circle
        const canvas = document.getElementById('particle-circle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Set up canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particleArray = [];
        
        // Mouse tracking
        let mouse = {
            x: null,
            y: null,
            radius:500
        };
        
        function handleMouseMove(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        }
        
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.radius = 2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }
            
            draw() {
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = forceDirectionX * force * this.density * FORCE_MULTIPLIER;
                    let directionY = forceDirectionY * force * this.density * FORCE_MULTIPLIER;
                    
                    this.x += directionX;
                    this.y += directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx * (1 - FRICTION);
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy * (1 - FRICTION);
                    }
                }
            }
        }
        
        const FORCE_MULTIPLIER = 5.0; // Force multiplier for stronger attraction
        const FRICTION = 0.99; // Friction coefficient for smoother return

        function init() {
            particleArray = [];
            for (let i = 0; i < 1200; i++) {  // Increased to 1200 particles
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particleArray.push(new Particle(x, y));
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particleArray.length; i++) {
                particleArray[i].draw();
                particleArray[i].update();
            }
            requestAnimationFrame(animate);
        }
        
        // Event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
        
        // Start animation
        init();
        animate();
    });
})();

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.card, .team-card, .achievement-card, .gallery-item, .project-tile');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.querySelector('.lightbox-close');

// Gallery filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Gallery lightbox functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h4').textContent;
        const desc = item.querySelector('.gallery-overlay p').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});



// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
        border: 1px solid ${type === 'success' ? '#00ff00' : '#ff0000'};
        border-radius: 10px;
        color: ${type === 'success' ? '#00ff00' : '#ff0000'};
        font-family: var(--body-font);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Interactive Holographic Display and Mouse Effects
const holographicDisplay = document.getElementById('holographic-display');
const mouseTrailCanvas = document.getElementById('mouse-trail-canvas');
const dynamicBackground = document.getElementById('dynamic-background');
const mouseTrailCtx = mouseTrailCanvas.getContext('2d');

// Set canvas size
mouseTrailCanvas.width = window.innerWidth;
mouseTrailCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    mouseTrailCanvas.width = window.innerWidth;
    mouseTrailCanvas.height = window.innerHeight;
});

// Mouse trail particles
let trailParticles = [];
const maxTrailParticles = 30;

class TrailParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.life = 1.0;
        this.decay = Math.random() * 0.03 + 0.01;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.color = `hsl(${Math.floor(Math.random() * 60 + 20)}, 100%, ${Math.floor(Math.random() * 30 + 50)}%)`;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.vx *= 0.98;
        this.vy *= 0.98;
    }
    
    draw() {
        mouseTrailCtx.save();
        mouseTrailCtx.globalAlpha = this.life;
        mouseTrailCtx.fillStyle = this.color;
        mouseTrailCtx.beginPath();
        mouseTrailCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        mouseTrailCtx.fill();
        mouseTrailCtx.restore();
    }
}

// Mouse tracking variables
let mouseX = 0;
let mouseY = 0;

// Mouse move handler
document.addEventListener('mousemove', (e) => {
    // if background animations disabled, only update dynamic background (no trails)
    const bgDisabled = document.body.classList.contains('disable-bg-animations');
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add trail particles (only if not disabled)
    if (!bgDisabled) {
        if (trailParticles.length < maxTrailParticles) {
            trailParticles.push(new TrailParticle(mouseX, mouseY));
        }
    }
    
    // Update dynamic background
    const centerX = (mouseX / window.innerWidth) * 100;
    const centerY = (mouseY / window.innerHeight) * 100;
    dynamicBackground.style.background = `radial-gradient(circle at ${centerX}% ${centerY}%, rgba(255, 102, 0, 0.08) 0%, transparent 70%)`;
    
    // Holographic display interaction
    if (holographicDisplay) {
        const displayRect = holographicDisplay.getBoundingClientRect();
        const displayCenterX = displayRect.left + displayRect.width / 2;
        const displayCenterY = displayRect.top + displayRect.height / 2;
        
        const deltaX = mouseX - displayCenterX;
        const deltaY = mouseY - displayCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Display tilt based on mouse position
        const maxTilt = 8;
        const tiltX = (deltaY / distance) * maxTilt;
        const tiltY = (deltaX / distance) * maxTilt;
        
        holographicDisplay.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
        
        // Display brightness based on mouse proximity
        const maxDistance = 400;
        const intensity = Math.max(0.5, 1 - (distance / maxDistance) * 0.5);
        
        holographicDisplay.style.filter = `brightness(${1 + intensity * 0.3}) saturate(${1 + intensity * 0.2})`;
        
        // Data bars animation based on mouse proximity
        const dataItems = document.querySelectorAll('.data-item');
        dataItems.forEach((item, index) => {
            const proximity = Math.max(0, 1 - (distance / maxDistance));
            const delay = index * 0.1;
            
            setTimeout(() => {
                const dataFill = item.querySelector('.data-fill');
                if (dataFill) {
                    dataFill.style.animation = 'none';
                    dataFill.offsetHeight; // Trigger reflow
                    dataFill.style.animation = `dataFill ${1 + proximity}s ease-out forwards`;
                }
            }, delay * 1000);
        });
        
        // Particle effects intensity
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const particleIntensity = Math.min(1, distance / 300);
            particle.style.opacity = 0.3 + (1 - particleIntensity) * 0.7;
            particle.style.transform = `scale(${1 + (1 - particleIntensity) * 0.5})`;
        });
        
        // Scan line speed adjustment removed (scan-line hidden via CSS)
        // noop placeholder kept intentionally
        void 0;
    }
});

// Mouse leave handler
document.addEventListener('mouseleave', () => {
    if (holographicDisplay) {
        holographicDisplay.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        holographicDisplay.style.filter = 'brightness(1) saturate(1)';
    }
    
    // Reset background
    dynamicBackground.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 102, 0, 0.05) 0%, transparent 70%)';
});

// Animation loop for trail particles
function animateTrail() {
    // Don't run trail animation if legacy animations are disabled
    if (document.body.classList.contains('legacy-animations-disabled')) return;
    if (document.body.classList.contains('disable-bg-animations')) return;
    mouseTrailCtx.clearRect(0, 0, mouseTrailCanvas.width, mouseTrailCanvas.height);
    
    // Update and draw particles
    trailParticles = trailParticles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.life > 0;
    });
    
    requestAnimationFrame(animateTrail);
}

// Only start trail animation if not legacy-disabled
if (!document.body.classList.contains('legacy-animations-disabled')) {
    animateTrail();
}

// Data counter animation
function animateDataCounters() {
    const dataValues = document.querySelectorAll('.data-value');
    
    dataValues.forEach((value, index) => {
        const target = value.textContent.replace(/\D/g, '');
        const suffix = value.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            value.textContent = Math.floor(current) + suffix;
        }, 50 + index * 20);
    });
}

// Trigger counter animation when hologram is visible
const hologramObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                animateDataCounters();
            }, 1000);
            hologramObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    if (holographicDisplay) {
        hologramObserver.observe(holographicDisplay);
    }
});
// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hologramContainer = document.querySelector('.hologram-container');
    
    if (hologramContainer) {
        hologramContainer.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Team card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Achievement timeline animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
});

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .input-group.focused label {
        top: -0.75rem !important;
        left: 1rem !important;
        font-size: 0.8rem !important;
        color: var(--secondary-color) !important;
    }
`;
document.head.appendChild(style);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.faq-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        item.classList.toggle('active');
    });
});

// Initialize everything
// Legacy animations are permanently disabled, hide their canvases
const pc = document.getElementById('particle-canvas');
const mt = document.getElementById('mouse-trail-canvas');
if (pc) pc.style.display = 'none';
if (mt) mt.style.display = 'none';

// Loading screen functionality
const loadingScreen = document.getElementById('loading-screen');

// Show loading screen initially
document.body.style.opacity = '0';

// Hide loading screen, initialize particles, and setup modal popup in a single DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
        // Hide loading screen
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.5s ease';
        }, 500);

        // Initialize particle circle
        init();
        animate();



        // Animate team cards on hover
        document.querySelectorAll('.team-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                        card.style.transform = 'translateY(-15px) scale(1.02)';
                });
                card.addEventListener('mouseleave', () => {
                        card.style.transform = 'translateY(0) scale(1)';
                });
        });

        // Achievement timeline animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                                setTimeout(() => {
                                        entry.target.style.opacity = '1';
                                        entry.target.style.transform = 'translateX(0)';
                                }, index * 200);
                        }
                });
        }, { threshold: 0.3 });
        timelineItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-50px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                timelineObserver.observe(item);
        });

        // Stats counter animation
        animateCounters();
});