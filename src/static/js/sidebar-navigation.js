/**
 * Sidebar Navigation - Hamburger Menu
 * Handles sidebar toggle, active section detection, and smooth scrolling
 */

class SidebarNavigation {
    constructor() {
        this.hamburgerBtn = document.getElementById('hamburger-btn');
        this.sidebar = document.getElementById('sidebar-nav');
        this.overlay = document.getElementById('sidebar-overlay');
        this.menuLinks = document.querySelectorAll('.sidebar-nav .sidebar-menu-link');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.detectActiveSection();
        this.handleSmoothScrolling();
        
        // Close sidebar on page load
        this.closeSidebar();
    }
    
    bindEvents() {
        // Toggle sidebar on hamburger click
        this.hamburgerBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSidebar();
        });
        
        // Close sidebar on overlay click
        this.overlay?.addEventListener('click', () => {
            this.closeSidebar();
        });
        
        // Close sidebar on menu link click
        this.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close if it's an external link
                if (!link.getAttribute('href').startsWith('#')) {
                    return;
                }
                
                this.closeSidebar();
                this.setActiveLink(link);
            });
        });
        
        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSidebar();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeSidebar();
            }
        });
        
        // Detect active section on scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.detectActiveSection();
        }, 100));
    }
    
    toggleSidebar() {
        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }
    
    openSidebar() {
        this.isOpen = true;
        this.hamburgerBtn?.classList.add('active');
        this.sidebar?.classList.add('active');
        this.overlay?.classList.add('active');
        
        // Prevent body scroll when sidebar is open
        document.body.style.overflow = 'hidden';
        
        // Add animation delay to menu items
        this.animateMenuItems();
    }
    
    closeSidebar() {
        this.isOpen = false;
        this.hamburgerBtn?.classList.remove('active');
        this.sidebar?.classList.remove('active');
        this.overlay?.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    animateMenuItems() {
        const menuItems = this.sidebar?.querySelectorAll('.sidebar-menu-item');
        menuItems?.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + (index * 50));
        });
    }
    
    detectActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });
        
        // Update active menu link
        this.updateActiveMenuLink(activeSection);
    }
    
    updateActiveMenuLink(activeSectionId) {
        this.menuLinks.forEach(link => {
            link.classList.remove('active');
            
            if (activeSectionId) {
                const href = link.getAttribute('href');
                if (href === `#${activeSectionId}`) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    setActiveLink(clickedLink) {
        this.menuLinks.forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    }
    
    handleSmoothScrolling() {
        this.menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80; // Account for header space
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }
    
    // Utility function to throttle scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Public method to close sidebar (can be called from other scripts)
    close() {
        this.closeSidebar();
    }
    
    // Public method to open sidebar
    open() {
        this.openSidebar();
    }
    
    // Check if sidebar is open
    isOpened() {
        return this.isOpen;
    }
}

// Initialize sidebar navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarNav = new SidebarNavigation();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.sidebarNav && window.sidebarNav.isOpened()) {
        window.sidebarNav.close();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SidebarNavigation;
} 