/*
Simplified Effects Script for Portfolio
Focus on reliable core effects
*/

class SimpleEffects {
    constructor() {
        this.particleInterval = null;
        this.init();
    }

    init() {
        console.log('🎨 Initializing Simple Effects...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initAfterDOM());
        } else {
            this.initAfterDOM();
        }
    }

    initAfterDOM() {
        try {
            this.initWelcomeScreen();
            this.initParticleSystem();
            this.initScrollEffects();
            this.initSkillBars();
            this.initChatbot();
            
            console.log('✅ Simple Effects initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing effects:', error);
        }
    }

    // Welcome Screen Management
    initWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const portfolioContent = document.getElementById('portfolio-content');
        const enterButton = document.getElementById('enter-portfolio');
        
        if (!welcomeScreen || !portfolioContent || !enterButton) {
            console.warn('⚠️ Welcome screen elements not found');
            return;
        }

        // Show welcome screen initially
        welcomeScreen.classList.remove('hidden');
        portfolioContent.classList.remove('visible');
        document.body.style.overflow = 'hidden';

        // Enter button handler
        enterButton.addEventListener('click', () => {
            enterButton.innerHTML = '<span>Cargando...</span><i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                welcomeScreen.classList.add('hidden');
                portfolioContent.classList.add('visible');
                document.body.style.overflow = 'auto';
                
                // Trigger entry animations
                this.triggerEntryAnimations();
            }, 800);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!welcomeScreen.classList.contains('hidden')) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    enterButton.click();
                }
            }
        });

        console.log('🎭 Welcome screen initialized');
    }

    triggerEntryAnimations() {
        const sections = document.querySelectorAll('.section, .hero');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.animation = 'slideInUp 0.8s ease-out forwards';
            }, index * 100);
        });
    }

    // Enhanced Particle System
    initParticleSystem() {
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) {
            console.warn('⚠️ Particle container not found');
            return;
        }

        // Create initial particles
        this.createInitialParticles();
        
        // Generate new particles periodically
        this.particleInterval = setInterval(() => {
            this.createParticle();
        }, 3000);

        console.log('✨ Particle system initialized');
    }

    createInitialParticles() {
        const container = document.querySelector('.floating-particles');
        if (!container) return;

        // Create 20 initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 200);
        }
    }

    createParticle() {
        const container = document.querySelector('.floating-particles');
        if (!container) return;

        const particle = document.createElement('div');
        particle.className = 'particle dynamic-particle';
        
        // Random properties
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 20;
        const delay = Math.random() * 5;

        // Theme-aware colors
        const isThemeAware = window.themeSwitcher && window.themeSwitcher.currentTheme;
        const colors = isThemeAware && window.themeSwitcher.currentTheme === 'cyber' 
            ? ['rgba(0, 255, 0, 0.6)', 'rgba(0, 200, 0, 0.4)', 'rgba(0, 150, 0, 0.3)']
            : ['rgba(0, 102, 255, 0.6)', 'rgba(0, 150, 255, 0.4)', 'rgba(75, 172, 254, 0.3)'];
        
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${color};
            border-radius: 50%;
            animation: floatUp ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${color};
            pointer-events: none;
        `;

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (animationDuration + delay) * 1000);
    }

    // Scroll Effects
    initScrollEffects() {
        let lastScrollTop = 0;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Header hide/show
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const header = document.querySelector('header');
                if (header) {
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                }
                lastScrollTop = scrollTop;
            }, 10);

            // Parallax particles
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = 0.3 + (index * 0.05);
                particle.style.transform = `translateY(${scrollTop * speed}px)`;
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        console.log('📜 Scroll effects initialized');
    }

    // Skill Bars Animation
    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        if (skillBars.length === 0) {
            console.warn('⚠️ No skill bars found');
            return;
        }

        // Intersection Observer for skill bars
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.style.width;
                    
                    // Reset and animate
                    skillBar.style.width = '0%';
                    skillBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 100);
                    
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
        console.log('📊 Skill bars animation initialized');
    }

    // Simple Chatbot
    initChatbot() {
        const bubble = document.getElementById('chatbot-bubble');
        const window = document.getElementById('chatbot-window');
        const closeBtn = document.getElementById('chatbot-close');
        
        if (!bubble || !window || !closeBtn) {
            console.warn('⚠️ Chatbot elements not found');
            return;
        }

        let isOpen = false;

        bubble.addEventListener('click', () => {
            if (!isOpen) {
                window.classList.add('open');
                isOpen = true;
            }
        });

        closeBtn.addEventListener('click', () => {
            if (isOpen) {
                window.classList.remove('open');
                isOpen = false;
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (isOpen && !window.contains(e.target) && !bubble.contains(e.target)) {
                window.classList.remove('open');
                isOpen = false;
            }
        });

        console.log('💬 Chatbot initialized');
    }

    // Cleanup method
    destroy() {
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
            this.particleInterval = null;
        }
        console.log('🧹 Effects cleaned up');
    }
}

// CSS Animations
if (!document.querySelector('#simple-effects-styles')) {
    const styles = document.createElement('style');
    styles.id = 'simple-effects-styles';
    styles.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes slideInUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .dynamic-particle {
            z-index: 1;
        }

        .fade-in {
            animation: slideInUp 0.8s ease-out forwards;
        }

        header {
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .skill-progress {
            transform-origin: left;
        }

        .chatbot-window.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styles);
}

// Initialize effects
let simpleEffects;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        simpleEffects = new SimpleEffects();
    });
} else {
    simpleEffects = new SimpleEffects();
}

// Global access
window.simpleEffects = simpleEffects;

console.log('🎯 Simple Effects script loaded'); 