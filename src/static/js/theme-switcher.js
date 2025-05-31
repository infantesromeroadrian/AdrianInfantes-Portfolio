/*
Theme Switcher Logic for AI Engineer vs Cybersecurity Modes
Handles theme switching, localStorage persistence, and dynamic content updates
Enhanced with intensive particle effects
*/

class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'ai'; // Default to AI Engineer
        this.particleIntervals = [];
        this.init();
    }

    init() {
        this.createSwitcher();
        this.loadSavedTheme();
        this.setupEventListeners();
        this.updateParticleColors();
        this.initializeEnhancedParticles();
        
        // Apply initial theme and content
        this.applyTheme();
        this.updateContent();
        
        // Apply initial skill filtering
        setTimeout(() => {
            this.filterSkillsByTheme();
        }, 500);
        
        // Initialize enhanced chatbot effects after DOM is ready
        setTimeout(() => {
            this.initializeChatbotEffects();
        }, 1000);
    }

    createSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        this.switcherHTML = `
            <div class="theme-switcher-content">
                <span class="theme-label" id="ai-label">🤖 AI Engineer</span>
                <div class="theme-toggle" id="theme-toggle">
                    <div class="toggle-slider" id="toggle-slider"></div>
                </div>
                <span class="theme-label" id="cyber-label">🔐 Cybersecurity</span>
            </div>
        `;
        switcher.innerHTML = this.switcherHTML;
        
        document.body.appendChild(switcher);
    }

    setupEventListeners() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => this.switchTheme());
        
        // Keyboard shortcut: Ctrl + T
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                this.switchTheme();
            }
        });
    }

    switchTheme() {
        this.currentTheme = this.currentTheme === 'ai' ? 'cyber' : 'ai';
        
        // Efecto especial de hackeo al cambiar a Cybersecurity
        if (this.currentTheme === 'cyber') {
            this.triggerHackingEffect();
        }
        
        this.applyTheme();
        this.updateContent();
        this.saveTheme();
        this.updateParticleColors();
        this.restartParticleSystem();
        this.showThemeNotification();
    }

    applyTheme() {
        const body = document.body;
        const toggle = document.getElementById('theme-toggle');
        const aiLabel = document.getElementById('ai-label');
        const cyberLabel = document.getElementById('cyber-label');

        if (this.currentTheme === 'cyber') {
            body.classList.add('cybersecurity-theme');
            toggle.classList.add('cybersecurity');
            aiLabel.classList.remove('active');
            cyberLabel.classList.add('active');
        } else {
            body.classList.remove('cybersecurity-theme');
            toggle.classList.remove('cybersecurity');
            aiLabel.classList.add('active');
            cyberLabel.classList.remove('active');
        }

        // Apply skill filtering for new theme
        setTimeout(() => {
            this.filterSkillsByTheme();
        }, 100);

        // Recreate pulse waves for theme
        setTimeout(() => {
            this.createPulseWaves();
        }, 500);

        // Trigger reflow for smooth transition
        document.body.offsetHeight;
    }

    updateContent() {
        this.themeContent = {
            ai: {
                subtitle: "AI Engineer & Machine Learning Specialist",
                heroDescription: "Senior AI Engineer and Cloud Solutions Architect with proven experience in enterprise-scale cloud infrastructure, machine learning systems, and data-driven solutions. Specialized in designing robust and scalable architectures that drive operational excellence and business innovation.",
                heroImage: "/static/images/b64551a3-0078-4b1a-8a88-76958aca08f1.png",
                heroImageAlt: "Adrian Infantes AI Engineer Professional",
                skillsTitle: "🤖 AI & ML Technology Stack",
                projectsTitle: "🧠 AI Projects",
                contactTitle: "🚀 Ready to Innovate?",
                contactText: "Let's build the future with artificial intelligence"
            },
            cyber: {
                subtitle: "Cybersecurity & Ethical Hacking Specialist",
                heroDescription: "Cybersecurity expert specialized in penetration testing, vulnerability assessment, and digital forensics. Focused on protecting digital infrastructures and conducting ethical security research.",
                heroImage: "/static/images/13ad9e79-4e4c-4b7d-a4a3-ef4d8afca3b2.png",
                heroImageAlt: "Adrian Infantes Cybersecurity Hacker Specialist",
                skillsTitle: "🔐 Cybersecurity & Pentesting Arsenal",
                projectsTitle: "🛡️ Security Projects",
                contactTitle: "🛡️ Secure Your Infrastructure?",
                contactText: "Let's strengthen your digital defenses"
            }
        };

        const content = this.themeContent[this.currentTheme];
        
        // Update subtitle if element exists
        const subtitleElement = document.querySelector('.text-highlight');
        if (subtitleElement) {
            subtitleElement.textContent = content.subtitle;
        }

        // Update hero description
        const heroDescriptions = document.querySelectorAll('.hero p');
        if (heroDescriptions.length > 1) {
            heroDescriptions[1].textContent = content.heroDescription;
        }

        // Update hero banner image with smooth transition
        const heroBannerImage = document.querySelector('.hero-banner-image img');
        const heroBannerContainer = document.querySelector('.hero-banner-image');
        if (heroBannerImage && heroBannerContainer) {
            // Crear efecto de transición suave
            heroBannerImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease';
            heroBannerImage.style.opacity = '0';
            heroBannerImage.style.transform = 'scale(0.95)';
            
            // Preparar el contenedor para la nueva imagen
            heroBannerContainer.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                heroBannerImage.src = content.heroImage;
                heroBannerImage.alt = content.heroImageAlt;
                
                // Ajustar estilos específicos para cada tema
                if (this.currentTheme === 'cyber') {
                    // Configuración para imagen vertical de cybersecurity
                    heroBannerImage.style.objectFit = 'contain';
                    heroBannerImage.style.objectPosition = 'center';
                    heroBannerImage.style.width = 'auto';
                    heroBannerImage.style.height = 'auto';
                    heroBannerImage.style.maxHeight = '100%';
                    heroBannerImage.style.filter = 'none'; // Sin filtros - mantener imagen original
                    
                    // Ajustar contenedor
                    heroBannerContainer.style.minHeight = '350px';
                    heroBannerContainer.style.display = 'flex';
                    heroBannerContainer.style.alignItems = 'center';
                    heroBannerContainer.style.justifyContent = 'center';
                } else {
                    // Configuración para imagen de AI Engineer - Mostrar completa sin cortar
                    heroBannerImage.style.objectFit = 'contain';
                    heroBannerImage.style.objectPosition = 'center';
                    heroBannerImage.style.width = 'auto';
                    heroBannerImage.style.height = 'auto';
                    heroBannerImage.style.maxHeight = '100%';
                    heroBannerImage.style.filter = 'none';
                    
                    // Ajustar contenedor para imagen completa
                    heroBannerContainer.style.minHeight = '350px';
                    heroBannerContainer.style.display = 'flex';
                    heroBannerContainer.style.alignItems = 'center';
                    heroBannerContainer.style.justifyContent = 'center';
                }
                
                // Esperar un frame para que la imagen se cargue
                heroBannerImage.onload = () => {
                    // Fade in de vuelta
                    setTimeout(() => {
                        heroBannerImage.style.opacity = '1';
                        heroBannerImage.style.transform = 'scale(1)';
                    }, 50);
                };
                
                // Fallback si la imagen ya está cargada
                if (heroBannerImage.complete) {
                    setTimeout(() => {
                        heroBannerImage.style.opacity = '1';
                        heroBannerImage.style.transform = 'scale(1)';
                    }, 50);
                }
            }, 300);
        }

        // Update banner title and subtitle with theme-specific content
        const bannerTitle = document.querySelector('.banner-title');
        const bannerSubtitle = document.querySelector('.banner-subtitle');
        
        if (bannerTitle && bannerSubtitle) {
            if (this.currentTheme === 'cyber') {
                bannerTitle.textContent = 'Securing Digital Frontiers';
                bannerSubtitle.textContent = 'Cybersecurity specialist with advanced expertise in penetration testing, vulnerability assessment, and digital forensics. Dedicated to protecting critical infrastructures and conducting comprehensive security research in enterprise environments.';
            } else {
                bannerTitle.textContent = 'Architecting Intelligent Cloud Solutions';
                bannerSubtitle.textContent = 'Senior AI Engineer and Cloud Solutions Architect with proven experience in enterprise-scale cloud infrastructure, machine learning systems, and data-driven solutions. Specialized in designing robust and scalable architectures that drive operational excellence and business innovation.';
            }
        }

        // Update section titles with icons
        this.updateSectionTitle('#skills', content.skillsTitle);
        this.updateSectionTitle('#projects', content.projectsTitle);
        this.updateSectionTitle('#experience', content.experienceTitle);
        
        // Filter skills by current theme
        this.filterSkillsByTheme();
    }

    updateSectionTitle(sectionId, newTitle) {
        const section = document.querySelector(sectionId);
        if (section) {
            const titleElement = section.querySelector('h2');
            if (titleElement) {
                titleElement.innerHTML = newTitle;
            }
        }
    }

    filterSkillsByTheme() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach((category, index) => {
            const categoryName = category.getAttribute('data-category');
            const categoryTheme = category.getAttribute('data-theme');
            
            // Enhanced category detection for new aesthetic categories
            const isAICategory = categoryName.includes('Programming') || 
                                categoryName.includes('ML & Deep') || 
                                categoryName.includes('Generative AI') || 
                                categoryName.includes('AI Infrastructure') || 
                                categoryName.includes('Cloud') || 
                                categoryName.includes('Visualization') || 
                                categoryName.includes('Backend');
            
            const isCyberCategory = categoryName.includes('Cybersecurity') || 
                                   categoryName.includes('Pentesting');
            
            // Apply theme-specific styling
            if (categoryTheme === this.currentTheme) {
                // Show category with enhanced animation
                category.style.display = 'block';
                category.style.opacity = '0';
                category.style.transform = 'translateY(30px) scale(0.95)';
                
                setTimeout(() => {
                    category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    category.style.opacity = '1';
                    category.style.transform = 'translateY(0) scale(1)';
                    
                    // Add category-specific entrance effects
                    if (categoryName.includes('Generative AI')) {
                        category.style.boxShadow = '0 20px 40px rgba(231, 76, 60, 0.3)';
                        // Add shimmer effect
                        setTimeout(() => {
                            category.classList.add('shimmer-active');
                        }, 600);
                    } else if (categoryName.includes('ML & Deep')) {
                        category.style.boxShadow = '0 20px 40px rgba(155, 89, 182, 0.3)';
                    } else if (categoryName.includes('AI Infrastructure')) {
                        category.style.boxShadow = '0 20px 40px rgba(26, 188, 156, 0.3)';
                    }
                }, index * 150);
            } else {
                // Hide category with smooth animation
                category.style.transition = 'all 0.4s ease';
                category.style.opacity = '0';
                category.style.transform = 'translateY(-20px) scale(0.95)';
                
                setTimeout(() => {
                    category.style.display = 'none';
                    category.classList.remove('shimmer-active');
                }, 400);
            }
        });
        
        // Update skill legend items with category-specific colors
        this.updateSkillLegendColors();
    }

    updateSkillLegendColors() {
        const visibleCategories = document.querySelectorAll('.skill-category[style*="opacity: 1"]');
        
        visibleCategories.forEach(category => {
            const categoryName = category.getAttribute('data-category');
            const legendItems = category.querySelectorAll('.skill-legend-item');
            const statValues = category.querySelectorAll('.skill-stat-value');
            
            // Apply category-specific colors
            if (categoryName.includes('Programming')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(52, 152, 219, 0.9)');
            } else if (categoryName.includes('ML & Deep')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(155, 89, 182, 0.9)');
            } else if (categoryName.includes('Generative AI')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(231, 76, 60, 0.9)');
            } else if (categoryName.includes('AI Infrastructure')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(26, 188, 156, 0.9)');
            } else if (categoryName.includes('Cloud')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(52, 73, 94, 0.9)');
            } else if (categoryName.includes('Visualization')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(241, 196, 15, 0.9)');
            } else if (categoryName.includes('Cybersecurity')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(46, 125, 50, 0.9)');
            } else if (categoryName.includes('Backend')) {
                this.applyColorScheme(legendItems, statValues, 'rgba(103, 58, 183, 0.9)');
            }
        });
    }

    applyColorScheme(legendItems, statValues, color) {
        legendItems.forEach(item => {
            const valueElement = item.querySelector('.skill-legend-value');
            if (valueElement) {
                valueElement.style.color = color;
            }
        });
        
        statValues.forEach(stat => {
            if (!stat.textContent.includes('★')) {
                stat.style.color = color;
            }
        });
    }

    updateParticleColors() {
        // Update existing particles with theme colors
        const particles = document.querySelectorAll('.particle');
        const colors = this.getThemeColors();

        particles.forEach(particle => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
            particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px ${randomColor}`;
        });
    }

    getThemeColors() {
        return this.currentTheme === 'cyber' 
            ? [
                'rgba(51, 6, 6, 0.4)', 
                'rgba(102, 12, 12, 0.3)', 
                'rgba(77, 9, 9, 0.2)',
                'rgba(204, 20, 20, 0.4)',
                'rgba(255, 0, 0, 0.3)'
              ]
            : [
                'rgba(0, 64, 255, 0.8)', 
                'rgba(0, 128, 255, 0.7)', 
                'rgba(0, 64, 255, 0.6)',
                'rgba(26, 117, 255, 0.8)',
                'rgba(0, 102, 255, 0.7)'
              ];
    }

    initializeEnhancedParticles() {
        // Clear existing intervals
        this.clearParticleIntervals();
        
        // Enhanced particle generation frequencies
        const frequencies = {
            normal: 1500,    // Every 1.5 seconds
            burst: 500,      // Every 0.5 seconds during burst
            micro: 200       // Every 0.2 seconds for micro particles
        };

        // Normal particle generation
        this.particleIntervals.push(
            setInterval(() => this.createThemeParticle('normal'), frequencies.normal)
        );

        // Micro particles for ambience
        this.particleIntervals.push(
            setInterval(() => this.createThemeParticle('micro'), frequencies.micro)
        );

        // Random burst particles
        this.particleIntervals.push(
            setInterval(() => {
                if (Math.random() < 0.3) { // 30% chance every interval
                    this.createParticleBurst();
                }
            }, 3000)
        );

        // Floating orbs
        this.particleIntervals.push(
            setInterval(() => this.createFloatingOrb(), 4000)
        );

        // Theme-specific effects
        if (this.currentTheme === 'ai') {
            this.particleIntervals.push(
                setInterval(() => this.createCircuitParticle(), 2500)
            );
        } else {
            this.particleIntervals.push(
                setInterval(() => this.createMatrixDrop(), 2000)
            );
        }
    }

    createThemeParticle(type = 'normal') {
        const particle = document.createElement('div');
        particle.className = `particle ${type}`;
        
        const iscyber = document.body.classList.contains('cybersecurity-theme');
        const colors = this.getThemeColors();
        
        // Position and size based on type
        const config = {
            normal: { size: [3, 8], opacity: [0.4, 0.8], duration: [15, 25] },
            micro: { size: [1, 3], opacity: [0.2, 0.5], duration: [10, 20] },
            burst: { size: [2, 5], opacity: [0.6, 1], duration: [8, 15] }
        };
        
        const settings = config[type] || config.normal;
        const size = Math.random() * (settings.size[1] - settings.size[0]) + settings.size[0];
        const opacity = Math.random() * (settings.opacity[1] - settings.opacity[0]) + settings.opacity[0];
        const duration = Math.random() * (settings.duration[1] - settings.duration[0]) + settings.duration[0];
        
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            animation: float ${duration}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${opacity};
            box-shadow: 0 0 ${size * 4}px ${colors[Math.floor(Math.random() * colors.length)]};
            z-index: 1;
        `;
        
        const particleContainer = document.querySelector('.floating-particles') || document.body;
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + 5) * 1000);
    }

    createParticleBurst() {
        const burstCount = Math.random() * 5 + 3; // 3-8 particles
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                this.createThemeParticle('burst');
            }, i * 100);
        }
    }

    createFloatingOrb() {
        const orb = document.createElement('div');
        orb.className = 'floating-orb';
        
        const colors = this.getThemeColors();
        const size = Math.random() * 20 + 15; // 15-35px
        
        orb.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${colors[0]}, transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: floatOrb ${Math.random() * 20 + 20}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.6;
            box-shadow: 
                0 0 ${size}px ${colors[0]},
                inset 0 0 ${size/2}px ${colors[1]};
            z-index: 1;
        `;

        // Add floating orb animation
        if (!document.querySelector('#orb-animation')) {
            const style = document.createElement('style');
            style.id = 'orb-animation';
            style.textContent = `
                @keyframes floatOrb {
                    0% {
                        transform: translateY(100vh) translateX(0) scale(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        transform: translateY(50vh) translateX(${Math.random() * 200 - 100}px) scale(1.2);
                    }
                    90% {
                        opacity: 0.6;
                        transform: scale(0.8);
                    }
                    100% {
                        transform: translateY(-10vh) translateX(${Math.random() * 300 - 150}px) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        const particleContainer = document.querySelector('.floating-particles') || document.body;
        particleContainer.appendChild(orb);
        
        setTimeout(() => {
            if (orb.parentNode) {
                orb.remove();
            }
        }, 45000);
    }

    createCircuitParticle() {
        const circuit = document.createElement('div');
        circuit.className = 'circuit-particle';
        
        const size = Math.random() * 6 + 2;
        
        circuit.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: #0080ff;
            border-radius: 2px;
            pointer-events: none;
            animation: circuitMove ${Math.random() * 15 + 10}s linear infinite;
            opacity: 0.8;
            box-shadow: 
                0 0 ${size * 3}px #0040ff,
                0 0 ${size * 6}px #0080ff;
            z-index: 1;
        `;

        if (!document.querySelector('#circuit-animation')) {
            const style = document.createElement('style');
            style.id = 'circuit-animation';
            style.textContent = `
                @keyframes circuitMove {
                    0% {
                        transform: translateY(100vh) translateX(0);
                        opacity: 0;
                    }
                    10%, 90% {
                        opacity: 0.8;
                    }
                    25% {
                        transform: translateY(75vh) translateX(50px);
                    }
                    50% {
                        transform: translateY(50vh) translateX(-30px);
                    }
                    75% {
                        transform: translateY(25vh) translateX(80px);
                    }
                    100% {
                        transform: translateY(-10vh) translateX(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        const particleContainer = document.querySelector('.floating-particles') || document.body;
        particleContainer.appendChild(circuit);
        
        setTimeout(() => {
            if (circuit.parentNode) {
                circuit.remove();
            }
        }, 25000);
    }

    createMatrixDrop() {
        const drop = document.createElement('div');
        drop.className = 'matrix-drop';
        
        const symbols = ['0', '1', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ'];
        
        drop.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            color: #cc1414;
            font-family: 'Courier New', monospace;
            font-size: ${Math.random() * 8 + 12}px;
            font-weight: bold;
            pointer-events: none;
            animation: matrixFall ${Math.random() * 8 + 12}s linear infinite;
            opacity: 0.4;
            text-shadow: 0 0 5px #660c0c;
            z-index: 1;
        `;
        
        drop.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        if (!document.querySelector('#matrix-animation')) {
            const style = document.createElement('style');
            style.id = 'matrix-animation';
            style.textContent = `
                @keyframes matrixFall {
                    0% {
                        transform: translateY(-10vh);
                        opacity: 0;
                    }
                    10%, 90% {
                        opacity: 0.9;
                    }
                    100% {
                        transform: translateY(110vh);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        const particleContainer = document.querySelector('.floating-particles') || document.body;
        particleContainer.appendChild(drop);
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.remove();
            }
        }, 20000);
    }

    restartParticleSystem() {
        this.clearParticleIntervals();
        setTimeout(() => {
            this.initializeEnhancedParticles();
        }, 500);
    }

    clearParticleIntervals() {
        this.particleIntervals.forEach(interval => clearInterval(interval));
        this.particleIntervals = [];
    }

    showThemeNotification() {
        const notification = document.createElement('div');
        const themeName = this.currentTheme === 'ai' ? 'AI Engineer' : 'Cybersecurity';
        const icon = this.currentTheme === 'ai' ? '🤖' : '🔐';
        
        if (this.currentTheme === 'cyber') {
            // Notificación especial para modo Cybersecurity
            notification.innerHTML = `
                <div class="cyber-notification-content">
                    <div class="hack-icon">🔥</div>
                    <div class="hack-text">
                        <span class="main-text">SYSTEM COMPROMISED</span>
                        <span class="sub-text">Cybersecurity Mode Active</span>
                    </div>
                    <div class="status-indicator"></div>
                </div>
            `;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.95);
                color: #00ff00;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 1002;
                backdrop-filter: blur(10px);
                box-shadow: 
                    0 10px 30px rgba(0, 0, 0, 0.8),
                    0 0 20px rgba(255, 0, 0, 0.6),
                    inset 0 1px 0 rgba(0, 255, 0, 0.3);
                border: 2px solid #ff0000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                animation: cyber-notification-glitch 0.2s linear infinite;
                font-family: 'Courier New', monospace;
            `;
            
            // Agregar estilos específicos para la notificación cyber
            if (!document.querySelector('#cyber-notification-styles')) {
                const cyberStyles = document.createElement('style');
                cyberStyles.id = 'cyber-notification-styles';
                cyberStyles.textContent = `
                    .cyber-notification-content {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    
                    .hack-icon {
                        font-size: 1.5rem;
                        animation: icon-pulse 0.8s ease-in-out infinite alternate;
                    }
                    
                    .hack-text {
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                    }
                    
                    .main-text {
                        font-size: 0.9rem;
                        font-weight: bold;
                        color: #ff0000;
                        text-shadow: 0 0 10px #ff0000;
                        animation: text-flicker 0.3s linear infinite;
                    }
                    
                    .sub-text {
                        font-size: 0.7rem;
                        color: #00ff00;
                        text-shadow: 0 0 5px #00ff00;
                    }
                    
                    .status-indicator {
                        width: 8px;
                        height: 8px;
                        background: #ff0000;
                        border-radius: 50%;
                        animation: status-blink 0.5s ease-in-out infinite alternate;
                        box-shadow: 0 0 10px #ff0000;
                    }
                    
                    @keyframes cyber-notification-glitch {
                        0%, 95% { filter: none; }
                        96% { filter: hue-rotate(90deg) brightness(1.5); }
                        97% { filter: hue-rotate(180deg) brightness(0.7); }
                        98% { filter: hue-rotate(270deg) brightness(1.2); }
                        99% { filter: invert(1); }
                        100% { filter: none; }
                    }
                    
                    @keyframes icon-pulse {
                        0% { transform: scale(1); text-shadow: 0 0 5px #ff6600; }
                        100% { transform: scale(1.2); text-shadow: 0 0 15px #ff0000, 0 0 25px #ff6600; }
                    }
                    
                    @keyframes text-flicker {
                        0%, 98% { opacity: 1; }
                        99% { opacity: 0.7; }
                        100% { opacity: 1; }
                    }
                    
                    @keyframes status-blink {
                        0% { opacity: 1; transform: scale(1); }
                        100% { opacity: 0.5; transform: scale(1.3); }
                    }
                `;
                document.head.appendChild(cyberStyles);
            }
        } else {
            // Notificación limpia para modo AI Engineer
            notification.innerHTML = `
                <div class="ai-notification-content">
                    <div class="ai-icon">🤖</div>
                    <div class="ai-text">
                        <span class="main-text">SYSTEM SECURED</span>
                        <span class="sub-text">AI Engineer Mode Active</span>
                    </div>
                    <div class="ai-indicator"></div>
                </div>
            `;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 64, 255, 0.15);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 1002;
                backdrop-filter: blur(15px);
                box-shadow: 
                    0 10px 30px rgba(0, 64, 255, 0.4),
                    inset 0 1px 0 rgba(0, 128, 255, 0.3);
                border: 1px solid rgba(0, 128, 255, 0.5);
                transform: translateX(100%);
                transition: transform 0.3s ease;
                font-family: system-ui, -apple-system, sans-serif;
            `;
            
            // Agregar estilos para notificación AI
            if (!document.querySelector('#ai-notification-styles')) {
                const aiStyles = document.createElement('style');
                aiStyles.id = 'ai-notification-styles';
                aiStyles.textContent = `
                    .ai-notification-content {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    
                    .ai-icon {
                        font-size: 1.3rem;
                        animation: ai-glow 2s ease-in-out infinite alternate;
                    }
                    
                    .ai-text {
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                    }
                    
                    .ai-text .main-text {
                        font-size: 0.9rem;
                        font-weight: bold;
                        color: #0080ff;
                        text-shadow: 0 0 10px rgba(0, 128, 255, 0.6);
                    }
                    
                    .ai-text .sub-text {
                        font-size: 0.7rem;
                        color: rgba(255, 255, 255, 0.8);
                    }
                    
                    .ai-indicator {
                        width: 8px;
                        height: 8px;
                        background: #00ff7f;
                        border-radius: 50%;
                        animation: ai-pulse 1.5s ease-in-out infinite;
                        box-shadow: 0 0 8px #00ff7f;
                    }
                    
                    @keyframes ai-glow {
                        0% { text-shadow: 0 0 5px rgba(0, 128, 255, 0.6); }
                        100% { text-shadow: 0 0 15px rgba(0, 128, 255, 1), 0 0 25px rgba(0, 64, 255, 0.8); }
                    }
                    
                    @keyframes ai-pulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.7; transform: scale(1.2); }
                    }
                `;
                document.head.appendChild(aiStyles);
            }
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        const duration = this.currentTheme === 'cyber' ? 4000 : 3000; // Cyber mode se queda más tiempo
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
                // Limpiar estilos después de un tiempo
                setTimeout(() => {
                    const styles = document.querySelectorAll('#cyber-notification-styles, #ai-notification-styles');
                    styles.forEach(style => {
                        if (style.parentNode) {
                            style.remove();
                        }
                    });
                }, 1000);
            }, 300);
        }, duration);
    }

    saveTheme() {
        localStorage.setItem('portfolio-theme', this.currentTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && savedTheme !== this.currentTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme();
        } else {
            // Apply default theme
            this.applyTheme();
        }
    }

    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'ai' || theme === 'cyber') {
            this.currentTheme = theme;
            this.applyTheme();
            this.updateContent();
            this.saveTheme();
            this.updateParticleColors();
            this.restartParticleSystem();
        }
    }

    // Cleanup method
    destroy() {
        this.clearParticleIntervals();
    }

    // Method to create pulse waves
    createPulseWaves() {
        const chatbotBubble = document.getElementById('chatbot-bubble');
        if (!chatbotBubble) return;

        // Remove existing pulse waves
        const existingWaves = chatbotBubble.querySelectorAll('.pulse-wave');
        existingWaves.forEach(wave => wave.remove());

        // Create new pulse waves
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'pulse-wave';
            wave.style.animationDelay = `${i}s`;
            chatbotBubble.appendChild(wave);
        }
    }

    // Enhanced particle burst for chatbot interaction
    createChatbotParticleBurst() {
        const chatbotBubble = document.getElementById('chatbot-bubble');
        if (!chatbotBubble) return;

        const colors = this.getThemeColors();
        const burstCount = 8;
        
        for (let i = 0; i < burstCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'chatbot-burst-particle';
            
            const angle = (360 / burstCount) * i;
            const distance = 80 + Math.random() * 40;
            const size = Math.random() * 4 + 2;
            
            particle.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: chatbot-particle-burst 1.5s ease-out forwards;
                transform: translate(-50%, -50%);
            `;
            
            // Set CSS custom properties for animation
            particle.style.setProperty('--angle', `${angle}deg`);
            particle.style.setProperty('--distance', `${distance}px`);
            
            chatbotBubble.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1500);
        }

        // Add burst animation keyframes if not exists
        if (!document.querySelector('#chatbot-burst-animation')) {
            const style = document.createElement('style');
            style.id = 'chatbot-burst-animation';
            style.textContent = `
                @keyframes chatbot-particle-burst {
                    0% {
                        transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--distance)) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize enhanced chatbot effects
    initializeChatbotEffects() {
        this.createPulseWaves();
        
        // Create pulse waves periodically
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 5 seconds
                this.createPulseWaves();
            }
        }, 5000);

        // Add click burst effect
        const chatbotBubble = document.getElementById('chatbot-bubble');
        if (chatbotBubble) {
            chatbotBubble.addEventListener('click', () => {
                this.createChatbotParticleBurst();
            });
        }
    }

    triggerHackingEffect() {
        console.log('🔥 INITIATING HACKING SEQUENCE...');
        
        // Efecto especial en la imagen del hero durante el hackeo
        const heroBannerImage = document.querySelector('.hero-banner-image img');
        const heroBannerContainer = document.querySelector('.hero-banner-image');
        
        if (heroBannerImage && heroBannerContainer) {
            // Añadir clase de hacking a la imagen
            heroBannerContainer.classList.add('hacking-mode');
            
            // Efecto de glitch en la imagen
            heroBannerImage.style.animation = 'image-hack-glitch 0.1s linear infinite';
            
            // Crear overlay de hack en la imagen
            const imageHackOverlay = document.createElement('div');
            imageHackOverlay.className = 'image-hack-overlay';
            imageHackOverlay.innerHTML = `
                <div class="hack-scan-line"></div>
                <div class="hack-grid"></div>
                <div class="hack-text">ACCESSING...</div>
            `;
            heroBannerContainer.appendChild(imageHackOverlay);
        }
        
        // Crear overlay de hackeo
        const hackOverlay = document.createElement('div');
        hackOverlay.className = 'hacking-overlay';
        hackOverlay.innerHTML = `
            <div class="hacking-content">
                <div class="terminal-lines">
                    <div class="line">BREACH DETECTED...</div>
                    <div class="line">ACCESSING MAINFRAME...</div>
                    <div class="line">BYPASSING SECURITY...</div>
                    <div class="line">INJECTION SUCCESSFUL</div>
                    <div class="line">TAKING CONTROL...</div>
                    <div class="line green">CYBERSECURITY MODE ACTIVATED</div>
                </div>
                <div class="glitch-noise"></div>
                <div class="scan-lines"></div>
            </div>
        `;
        
        // Agregar estilos dinámicos
        const hackStyles = document.createElement('style');
        hackStyles.id = 'hacking-styles';
        hackStyles.textContent = `
            .hacking-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: hack-flicker 0.1s linear infinite;
            }
            
            .hacking-content {
                position: relative;
                text-align: center;
                font-family: 'Courier New', monospace;
                color: #ff0000;
                text-shadow: 0 0 10px #ff0000;
            }
            
            .terminal-lines {
                font-size: 1.2rem;
                line-height: 1.8;
            }
            
            .line {
                opacity: 0;
                animation: type-line 0.5s ease-out forwards;
                color: #ff0000;
                text-shadow: 0 0 5px #ff0000;
            }
            
            .line.green {
                color: #ff0000;
                text-shadow: 0 0 10px #ff0000;
                font-weight: bold;
                font-size: 1.4rem;
                animation: glow-pulse 0.5s ease-in-out infinite alternate;
            }
            
            .line:nth-child(1) { animation-delay: 0.2s; }
            .line:nth-child(2) { animation-delay: 0.6s; }
            .line:nth-child(3) { animation-delay: 1.0s; }
            .line:nth-child(4) { animation-delay: 1.4s; }
            .line:nth-child(5) { animation-delay: 1.8s; }
            .line:nth-child(6) { animation-delay: 2.2s; }
            
            .glitch-noise {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 0, 0, 0.03) 2px,
                    rgba(255, 0, 0, 0.03) 4px
                );
                animation: noise-scroll 0.1s linear infinite;
                pointer-events: none;
            }
            
            .scan-lines {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 100px,
                    rgba(255, 0, 0, 0.1) 100px,
                    rgba(255, 0, 0, 0.1) 102px
                );
                animation: scan-lines-move 2s linear infinite;
                pointer-events: none;
            }
            
            /* Efectos para la imagen del hero */
            .hero-banner-image.hacking-mode {
                position: relative;
                overflow: hidden;
            }
            
            .image-hack-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                z-index: 2;
                pointer-events: none;
            }
            
            .hack-scan-line {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ff0000, transparent);
                animation: scan-line-move 1s linear infinite;
                box-shadow: 0 0 10px #ff0000;
            }
            
            .hack-grid {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
                background-size: 20px 20px;
                animation: grid-pulse 0.5s ease-in-out infinite alternate;
            }
            
            .hack-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #ff0000;
                font-family: 'Courier New', monospace;
                font-size: 1.2rem;
                font-weight: bold;
                text-shadow: 0 0 10px #ff0000;
                animation: text-flicker 0.2s linear infinite;
            }
            
            @keyframes image-hack-glitch {
                0%, 95% { 
                    filter: none !important; /* Sin filtros - mantener imagen original */
                    transform: translate(0, 0);
                }
                96% { 
                    filter: none !important; /* Mantener imagen original durante glitch */
                    transform: translate(2px, -1px);
                }
                97% { 
                    filter: none !important; /* Mantener imagen original durante glitch */
                    transform: translate(-1px, 2px);
                }
                98% { 
                    filter: none !important; /* Mantener imagen original durante glitch */
                    transform: translate(1px, -2px);
                }
                99% { 
                    filter: none !important; /* Mantener imagen original durante glitch */
                    transform: translate(-2px, 1px);
                }
                100% { 
                    filter: none !important; /* Mantener imagen original */
                    transform: translate(0, 0);
                }
            }
            
            @keyframes scan-line-move {
                0% { top: 0; }
                100% { top: 100%; }
            }
            
            @keyframes grid-pulse {
                0% { opacity: 0.3; }
                100% { opacity: 0.8; }
            }
            
            @keyframes hack-flicker {
                0%, 98% { opacity: 1; }
                99% { opacity: 0.8; filter: hue-rotate(10deg) contrast(1.5); }
                100% { opacity: 1; filter: hue-rotate(0deg) contrast(1); }
            }
            
            @keyframes type-line {
                0% { 
                    opacity: 0; 
                    transform: translateX(-10px);
                    filter: blur(2px);
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0);
                    filter: blur(0);
                }
            }
            
            @keyframes glow-pulse {
                0% { 
                    text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000; 
                    transform: scale(1);
                }
                100% { 
                    text-shadow: 0 0 15px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000; 
                    transform: scale(1.05);
                }
            }
            
            @keyframes noise-scroll {
                0% { transform: translateY(0); }
                100% { transform: translateY(10px); }
            }
            
            @keyframes scan-lines-move {
                0% { transform: translateX(-100px); }
                100% { transform: translateX(100px); }
            }
            
            @keyframes text-flicker {
                0%, 95% { opacity: 1; }
                96% { opacity: 0.3; }
                97% { opacity: 1; }
                98% { opacity: 0.5; }
                99% { opacity: 1; }
                100% { opacity: 0.7; }
            }
        `;
        
        document.head.appendChild(hackStyles);
        document.body.appendChild(hackOverlay);
        
        // Efecto de glitch en todo el body
        document.body.style.animation = 'screen-glitch 3s ease-out';
        
        // Agregar estilos para glitch de pantalla
        const glitchStyles = document.createElement('style');
        glitchStyles.id = 'screen-glitch-styles';
        glitchStyles.textContent = `
            @keyframes screen-glitch {
                0%, 90%, 100% { 
                    filter: none; 
                    transform: translate(0);
                }
                1% { 
                    filter: hue-rotate(90deg) saturate(2) brightness(1.2);
                    transform: translate(2px, 1px);
                }
                3% { 
                    filter: hue-rotate(180deg) saturate(3) brightness(0.8);
                    transform: translate(-1px, -2px);
                }
                5% { 
                    filter: hue-rotate(270deg) saturate(1.5) brightness(1.5);
                    transform: translate(-2px, 1px);
                }
                7% { 
                    filter: hue-rotate(45deg) saturate(2.5) brightness(0.9);
                    transform: translate(1px, -1px);
                }
                15% { 
                    filter: invert(1) hue-rotate(180deg);
                    transform: translate(-1px, 2px);
                }
                17% { 
                    filter: none;
                    transform: translate(0);
                }
            }
        `;
        document.head.appendChild(glitchStyles);
        
        // Sonidos de teclado simulados (visual)
        this.simulateTypingSounds();
        
        // Remover el overlay después del efecto
        setTimeout(() => {
            // Limpiar efectos de la imagen
            if (heroBannerImage && heroBannerContainer) {
                heroBannerContainer.classList.remove('hacking-mode');
                heroBannerImage.style.animation = '';
                heroBannerImage.style.filter = 'none !important'; // Asegurar que no queden filtros
                const imageOverlay = heroBannerContainer.querySelector('.image-hack-overlay');
                if (imageOverlay) {
                    imageOverlay.remove();
                }
            }
            
            if (hackOverlay.parentNode) {
                hackOverlay.remove();
            }
            if (hackStyles.parentNode) {
                hackStyles.remove();
            }
            if (glitchStyles.parentNode) {
                glitchStyles.remove();
            }
            document.body.style.animation = '';
        }, 3000);
    }

    simulateTypingSounds() {
        // Crear partículas de código en movimiento
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createCodeParticle();
            }, i * 100);
        }
    }

    createCodeParticle() {
        const codes = ['01010', '11001', 'HACK', 'ROOT', '0xFF', 'sudo', 'rm -rf', '>>> ACCESS', 'ERROR', 'BREACH'];
        const particle = document.createElement('div');
        particle.textContent = codes[Math.floor(Math.random() * codes.length)];
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            color: #ff0000;
            font-family: 'Courier New', monospace;
            font-size: ${Math.random() * 10 + 8}px;
            font-weight: bold;
            z-index: 10000;
            pointer-events: none;
            text-shadow: 0 0 5px #ff0000;
            animation: code-particle-float 2s ease-out forwards;
        `;
        
        // Agregar animación de partícula
        if (!document.querySelector('#code-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'code-particle-animation';
            style.textContent = `
                @keyframes code-particle-float {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1) rotate(0deg);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translateY(-50px) scale(1.2) rotate(180deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) scale(0.5) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 2000);
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.themeSwitcher = new ThemeSwitcher();
    
    console.log(`
🎨 Enhanced Theme Switcher Initialized!
🔄 Switch between AI Engineer and Cybersecurity modes
⌨️  Keyboard shortcut: Ctrl + T
💾 Theme preference saved automatically
🎆 Enhanced particle effects activated
    `);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (window.themeSwitcher) {
        window.themeSwitcher.destroy();
    }
});

// Expose theme switcher globally for debugging
window.setTheme = function(theme) {
    if (window.themeSwitcher) {
        window.themeSwitcher.setTheme(theme);
    }
};

window.getCurrentTheme = function() {
    return window.themeSwitcher ? window.themeSwitcher.getCurrentTheme() : 'ai';
}; 