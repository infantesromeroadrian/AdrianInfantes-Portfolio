/*
Simplified Theme Switcher for AI Engineer vs Cybersecurity Modes
Focus on core functionality with robust error handling
*/

class SimpleThemeSwitcher {
    constructor() {
        this.currentTheme = 'ai'; // Default theme
        this.isInitialized = false;
        this.init();
    }

    init() {
        console.log('🎯 Initializing Simple Theme Switcher...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initAfterDOM());
        } else {
            this.initAfterDOM();
        }
    }

    initAfterDOM() {
        try {
            // Create switcher UI
            this.createSwitcher();
            
            // Load saved theme
            this.loadSavedTheme();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Apply initial theme
            this.applyTheme();
            
            // Update content immediately
            this.updateContent();
            
            this.isInitialized = true;
            console.log('✅ Simple Theme Switcher initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing theme switcher:', error);
        }
    }

    createSwitcher() {
        // Remove existing switcher
        const existing = document.querySelector('.theme-switcher');
        if (existing) existing.remove();

        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <div class="theme-switcher-container">
                <span class="theme-label ai-label active" data-theme="ai">
                    🤖 AI
                </span>
                <div class="toggle-switch" id="theme-toggle">
                    <div class="toggle-slider"></div>
                </div>
                <span class="theme-label cyber-label" data-theme="cyber">
                    🔐 Cyber
                </span>
            </div>
        `;

        // Add CSS if not exists
        if (!document.querySelector('#theme-switcher-styles')) {
            const styles = document.createElement('style');
            styles.id = 'theme-switcher-styles';
            styles.textContent = `
                .theme-switcher {
                    position: fixed;
                    top: 15px;
                    right: 15px;
                    z-index: 1000;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 6px 12px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    font-size: 12px;
                }
                .theme-switcher-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .theme-label {
                    font-size: 11px;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    white-space: nowrap;
                    font-weight: 500;
                }
                .theme-label.active {
                    opacity: 1;
                    font-weight: bold;
                }
                .theme-switcher .toggle-switch {
                    width: 38px !important;
                    height: 20px !important;
                    background: rgba(255, 255, 255, 0.2) !important;
                    border-radius: 10px !important;
                    position: relative !important;
                    cursor: pointer !important;
                    transition: all 0.3s ease !important;
                    padding: 2px !important;
                    box-sizing: border-box !important;
                }
                .theme-switcher .toggle-slider {
                    width: 16px !important;
                    height: 16px !important;
                    background: #0066cc !important;
                    border-radius: 50% !important;
                    position: absolute !important;
                    top: 2px !important;
                    left: 2px !important;
                    transition: all 0.3s ease !important;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3) !important;
                }
                .theme-switcher .toggle-switch.cybersecurity .toggle-slider {
                    left: 18px !important;
                    background: #00ff00 !important;
                }
                body.cybersecurity-theme .theme-switcher {
                    background: rgba(0, 255, 0, 0.1);
                    border-color: rgba(0, 255, 0, 0.3);
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(switcher);
        
        // Force apply styles directly to elements
        this.forceApplyStyles();
        
        console.log('🎨 Theme switcher UI created');
    }

    setupEventListeners() {
        // Main toggle button
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.switchTheme();
            });
        }

        // Theme labels
        document.querySelectorAll('.theme-label').forEach(label => {
            label.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                if (theme && theme !== this.currentTheme) {
                    this.switchTheme();
                }
            });
        });

        // Keyboard shortcut (Ctrl + T)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                this.switchTheme();
            }
        });

        console.log('🎧 Event listeners attached');
    }

    forceApplyStyles() {
        // Force apply styles directly to avoid CSS conflicts
        setTimeout(() => {
            const toggle = document.getElementById('theme-toggle');
            const slider = document.querySelector('.toggle-slider');
            
            if (toggle && slider) {
                // Apply toggle styles directly
                toggle.style.width = '38px';
                toggle.style.height = '20px';
                toggle.style.borderRadius = '10px';
                toggle.style.position = 'relative';
                toggle.style.padding = '2px';
                toggle.style.boxSizing = 'border-box';
                
                // Apply slider styles directly
                slider.style.width = '16px';
                slider.style.height = '16px';
                slider.style.borderRadius = '50%';
                slider.style.position = 'absolute';
                slider.style.top = '2px';
                slider.style.transition = 'all 0.3s ease';
                
                // Set initial position
                if (this.currentTheme === 'cyber') {
                    slider.style.left = '18px';
                    slider.style.background = '#00ff00';
                } else {
                    slider.style.left = '2px';
                    slider.style.background = '#0066cc';
                }
                
                console.log('🎯 Styles forced directly to elements');
            }
        }, 100);
    }

    switchTheme() {
        console.log(`🔄 Switching from ${this.currentTheme} to ${this.currentTheme === 'ai' ? 'cyber' : 'ai'}`);
        
        this.currentTheme = this.currentTheme === 'ai' ? 'cyber' : 'ai';
        
        this.applyTheme();
        this.updateContent();
        this.saveTheme();
        this.showNotification();
        
        console.log(`✅ Theme switched to: ${this.currentTheme}`);
    }

    applyTheme() {
        const body = document.body;
        const toggle = document.getElementById('theme-toggle');
        const slider = document.querySelector('.toggle-slider');
        const labels = document.querySelectorAll('.theme-label');

        // Apply theme class to body
        if (this.currentTheme === 'cyber') {
            body.classList.add('cybersecurity-theme');
            toggle?.classList.add('cybersecurity');
            
            // Force slider position for cyber theme
            if (slider) {
                slider.style.left = '18px';
                slider.style.background = '#00ff00';
            }
        } else {
            body.classList.remove('cybersecurity-theme');
            toggle?.classList.remove('cybersecurity');
            
            // Force slider position for AI theme  
            if (slider) {
                slider.style.left = '2px';
                slider.style.background = '#0066cc';
            }
        }

        // Update label states
        labels.forEach(label => {
            const theme = label.dataset.theme;
            if (theme === this.currentTheme) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
        
        // Re-force styles to ensure they stick
        this.forceApplyStyles();
    }

    updateContent() {
        console.log('📝 Updating content for theme:', this.currentTheme);

        const heroContent = {
            ai: {
                subtitle: "AI Engineer & Machine Learning Specialist",
                description: "Senior AI Engineer and Cloud Solutions Architect with proven experience in enterprise-scale cloud infrastructure, machine learning systems, and data-driven solutions. Specialized in designing robust and scalable architectures that drive operational excellence and business innovation.",
                bio: "Specialized in designing and implementing AI solutions that transform business processes. Expert in machine learning algorithms, deep learning architectures, and MLOps practices."
            },
            cyber: {
                subtitle: "Cybersecurity & Ethical Hacking Specialist", 
                description: "Cybersecurity expert specialized in penetration testing, vulnerability assessment, and digital forensics. Focused on protecting digital infrastructures and conducting ethical security research.",
                bio: "Specialized in advanced cybersecurity techniques, digital forensics, and ethical hacking. Expert in vulnerability assessment and security infrastructure protection."
            }
        };

        const currentContent = heroContent[this.currentTheme];
        
        // Update sidebar subtitle
        const sidebarSubtitle = document.querySelector('.sidebar-title');
        if (sidebarSubtitle) {
            sidebarSubtitle.textContent = currentContent.subtitle;
        }

        // Update hero subtitle
        const heroSubtitle = document.querySelector('.text-highlight');
        if (heroSubtitle) {
            heroSubtitle.textContent = 
                this.currentTheme === 'ai' 
                ? 'AI Engineer & Machine Learning Specialist'
                : 'Cybersecurity & Ethical Hacking Specialist';
        }

        // Update main description
        const descriptions = document.querySelectorAll('.hero p:not(.text-highlight)');
        descriptions.forEach(desc => {
            if (desc.textContent.length > 50) { // Assume it's the main description
                desc.textContent = currentContent.description;
                console.log('✏️ Updated description');
            }
        });

        // Update bio sections
        const bioElements = document.querySelectorAll('.bio, .description, .about-text');
        bioElements.forEach(bio => {
            bio.textContent = currentContent.bio;
        });

        // Update welcome screen
        const welcomeSubtitle = document.querySelector('.welcome-subtitle');
        if (welcomeSubtitle) {
            welcomeSubtitle.textContent = this.currentTheme === 'ai' 
                ? 'AI Engineer & Machine Learning Specialist'
                : 'Cybersecurity & Ethical Hacking Specialist';
        }

        console.log('📝 Content updated successfully');
    }

    showNotification() {
        // Remove existing notification
        const existing = document.querySelector('.theme-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <div class="notification-content">
                ${this.currentTheme === 'ai' ? '🤖' : '��'} 
                Changed to mode ${this.currentTheme === 'ai' ? 'AI Engineer' : 'Cybersecurity'}
            </div>
        `;

        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .theme-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    z-index: 10001;
                    animation: slideInRight 0.5s ease-out;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.5s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }, 3000);
    }

    saveTheme() {
        try {
            localStorage.setItem('portfolioTheme', this.currentTheme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }

    loadSavedTheme() {
        try {
            const saved = localStorage.getItem('portfolioTheme');
            if (saved === 'cyber') {
                this.currentTheme = 'cyber';
                console.log('🔄 Loaded saved theme: cybersecurity');
            }
        } catch (error) {
            console.warn('Could not load theme from localStorage:', error);
        }
    }
}

// Initialize theme switcher
let themeSwitcher;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeSwitcher = new SimpleThemeSwitcher();
    });
} else {
    themeSwitcher = new SimpleThemeSwitcher();
}

// Global access for debugging
window.themeSwitcher = themeSwitcher;

console.log('🚀 Simple Theme Switcher script loaded'); 