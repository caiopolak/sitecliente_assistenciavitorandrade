/* ========================================
   VITOR ANDRADE ASSISTÊNCIA TÉCNICA
   Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    const handleNavbarScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ===== MOBILE MENU =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const animateElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ===== COUNTER ANIMATION =====
    const counterElements = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, 0, target, 2000);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    function animateCounter(el, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + range * eased);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ===== HERO PARTICLES =====
    const particlesContainer = document.getElementById('heroParticles');

    if (particlesContainer) {
        createParticles(particlesContainer, 30);
    }

    function createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 1;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(79, 195, 247, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${Math.random() * 20 + 15}s linear infinite;
                animation-delay: ${Math.random() * -20}s;
                pointer-events: none;
            `;

            container.appendChild(particle);
        }

        // Add keyframes dynamically
        if (!document.getElementById('particleStyles')) {
            const style = document.createElement('style');
            style.id = 'particleStyles';
            style.textContent = `
                @keyframes particle-float {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200 + 50}px, -${Math.random() * 400 + 200}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ===== NAVBAR LINK ACTIVE STYLE =====
    const navActiveStyle = document.createElement('style');
    navActiveStyle.textContent = `
        .nav-link.active {
            color: #fff !important;
            background: rgba(255,255,255,0.1);
        }
    `;
    document.head.appendChild(navActiveStyle);

    // ===== PRELOADER REMOVE =====
    // In case a preloader is added later
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ===== GALLERY LIGHTBOX (Simple) =====
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: zoom-out;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 2rem;
            `;

            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxImg.style.cssText = `
                max-width: 90vw;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 12px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;

            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);

            // Trigger animation
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            });

            // Close lightbox
            lightbox.addEventListener('click', () => {
                lightbox.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.9)';
                setTimeout(() => lightbox.remove(), 300);
            });

            // Close on Escape
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    lightbox.style.opacity = '0';
                    lightboxImg.style.transform = 'scale(0.9)';
                    setTimeout(() => lightbox.remove(), 300);
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    });

    // ===== SAVINGS RING ANIMATION =====
    const savingsRing = document.querySelector('.savings-ring circle:nth-child(2)');
    if (savingsRing) {
        const ringObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    savingsRing.style.transition = 'stroke-dashoffset 2s ease-out';
                    savingsRing.style.strokeDashoffset = '85';
                    ringObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Start with full offset, animate to target
        savingsRing.style.strokeDashoffset = '339.29';
        ringObserver.observe(savingsRing.closest('.preventive-savings'));
    }

    // ===== TILT EFFECT ON SERVICE CARDS =====
    if (window.matchMedia('(hover: hover)').matches) {
        const cards = document.querySelectorAll('.service-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

});
