/*
Interactive Effects and Animations for AI & Cybersecurity Portfolio
Professional tech-focused animations and particle systems - Clean Version
*/

// Global variables
let isWelcomeMode = true;
let lastScrollTop = 0;
let scrollTimeout;

// ===== WELCOME SCREEN FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWelcomeScreen();
    initializePortfolioEffects();
    initializeTimelineFeatures();
    initializeSpotifyComponents();
    console.log('🚀 Portfolio effects initialized successfully');
});

function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const portfolioContent = document.getElementById('portfolio-content');
    const enterButton = document.getElementById('enter-portfolio');
    
    if (!welcomeScreen || !portfolioContent) return;
    
    // Show welcome screen initially
    showWelcome();
    
    // Enter portfolio button click handler
    if (enterButton) {
        enterButton.addEventListener('click', enterPortfolio);
    }
    
    // Theme indicators click handlers
    initializeThemeIndicators();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (isWelcomeMode && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            enterPortfolio();
        }
    });
    
    function showWelcome() {
        welcomeScreen.classList.remove('hidden');
        portfolioContent.classList.remove('visible');
        document.body.style.overflow = 'hidden';
        isWelcomeMode = true;
    }
    
    function showPortfolio() {
        welcomeScreen.classList.add('hidden');
        portfolioContent.classList.add('visible');
        document.body.style.overflow = 'auto';
        isWelcomeMode = false;
        initializePortfolioAnimations();
    }
    
    function enterPortfolio() {
        if (enterButton) {
            enterButton.style.transform = 'scale(0.95)';
            enterButton.innerHTML = '<span>Loading...</span><i class="fas fa-spinner fa-spin"></i>';
        }
        
        setTimeout(showPortfolio, 800);
    }
    
    function initializePortfolioAnimations() {
        const sections = document.querySelectorAll('.section, .hero');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.animation = 'slideInUp 0.8s ease-out forwards';
            }, index * 100);
        });
    }
}

// ===== THEME INDICATORS FUNCTIONALITY =====
function initializeThemeIndicators() {
    const aiIndicator = document.querySelector('.theme-indicator.ai');
    const cyberIndicator = document.querySelector('.theme-indicator.cyber');
    
    if (!aiIndicator || !cyberIndicator) {
        console.warn('Theme indicators not found');
        return;
    }
    
    // AI Engineer indicator click
    aiIndicator.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🤖 AI Engineer theme selected');
        
        // Set theme to AI Engineer
        if (window.themeSwitcher) {
            window.themeSwitcher.setTheme('ai');
        }
        
        // Add click effect
        addClickEffect(this, 'ai');
        
        // Enter portfolio with AI theme
        setTimeout(() => {
            enterPortfolioWithTheme('ai');
        }, 600);
    });
    
    // Cybersecurity indicator click
    cyberIndicator.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔐 Cybersecurity theme selected');
        
        // Set theme to Cybersecurity
        if (window.themeSwitcher) {
            window.themeSwitcher.setTheme('cyber');
        }
        
        // Add click effect
        addClickEffect(this, 'cyber');
        
        // Enter portfolio with Cybersecurity theme
        setTimeout(() => {
            enterPortfolioWithTheme('cyber');
        }, 600);
    });
    
    // Add hover sound effects (optional)
    [aiIndicator, cyberIndicator].forEach(indicator => {
        indicator.addEventListener('mouseenter', () => {
            // Haptic feedback for mobile
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }
        });
    });
}

function addClickEffect(element, theme) {
    // Add temporary click effect class
    element.classList.add('clicked');
    
    // Scale and glow effect
    element.style.transform = 'translateY(-10px) scale(1.1)';
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    if (theme === 'ai') {
        element.style.boxShadow = '0 25px 50px rgba(0, 128, 255, 0.6), 0 0 60px rgba(0, 128, 255, 0.8)';
    } else {
        element.style.boxShadow = '0 25px 50px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.8)';
    }
    
    // Create ripple effect
    createRippleEffect(element, theme);
    
    // Remove effect after animation
    setTimeout(() => {
        element.classList.remove('clicked');
        element.style.transform = '';
        element.style.boxShadow = '';
    }, 400);
}

function createRippleEffect(element, theme) {
    const ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    
    const color = theme === 'ai' ? 'rgba(0, 128, 255, 0.6)' : 'rgba(255, 0, 0, 0.6)';
    
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: ${color};
        transform: translate(-50%, -50%);
        animation: ripple-expand 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple-expand {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.8;
                }
                50% {
                    width: 100px;
                    height: 100px;
                    opacity: 0.4;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

function enterPortfolioWithTheme(selectedTheme) {
    const welcomeScreen = document.getElementById('welcome-screen');
    const portfolioContent = document.getElementById('portfolio-content');
    const enterButton = document.getElementById('enter-portfolio');
    
    if (!welcomeScreen || !portfolioContent) return;
    
    // Update enter button to show theme selection
    if (enterButton) {
        const themeName = selectedTheme === 'ai' ? 'AI Engineer' : 'Cybersecurity';
        const themeIcon = selectedTheme === 'ai' ? '🤖' : '🔐';
        
        enterButton.innerHTML = `<span>Loading ${themeName} ${themeIcon}</span><i class="fas fa-spinner fa-spin"></i>`;
        enterButton.style.transform = 'scale(0.95)';
    }
    
    // Hide welcome screen and show portfolio
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        portfolioContent.classList.add('visible');
        document.body.style.overflow = 'auto';
        isWelcomeMode = false;
        
        // Initialize portfolio animations
        const sections = document.querySelectorAll('.section, .hero');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.animation = 'slideInUp 0.8s ease-out forwards';
            }, index * 100);
        });
        
        // Show theme confirmation notification
        setTimeout(() => {
            showThemeConfirmation(selectedTheme);
        }, 500);
    }, 800);
}

function showThemeConfirmation(theme) {
    // This will be handled by the theme switcher if available
    if (window.themeSwitcher && window.themeSwitcher.showThemeNotification) {
        window.themeSwitcher.showThemeNotification();
    }
}

// ===== TIMELINE ENHANCED FUNCTIONALITY =====
function initializeTimelineFeatures() {
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineProgressFill = document.getElementById('timeline-progress-fill');
    const timelineNavigator = document.getElementById('timeline-navigator');
    const timelineSection = document.getElementById('timeline');
    
    if (!timelineProgress || !timelineSection) return;
    
    // Timeline scroll tracking
    function updateTimelineIndicators() {
        const timelineRect = timelineSection.getBoundingClientRect();
        const isVisible = timelineRect.top < window.innerHeight && timelineRect.bottom > 0;
        
        if (isVisible) {
            timelineProgress.classList.add('visible');
            timelineNavigator.classList.add('visible');
            updateProgressFill();
            updateActiveNavItem();
        } else {
            timelineProgress.classList.remove('visible');
            timelineNavigator.classList.remove('visible');
        }
    }
    
    function updateProgressFill() {
        const timelineRect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineHeight = timelineRect.height;
        const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - timelineRect.top) / (timelineHeight + windowHeight)
        ));
        
        if (timelineProgressFill) {
            timelineProgressFill.style.height = `${scrollProgress * 100}%`;
        }
    }
    
    function updateActiveNavItem() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const navItems = document.querySelectorAll('.timeline-nav-item');
        
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isActive = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            
            if (isActive && navItems[index]) {
                navItems.forEach(nav => nav.classList.remove('active'));
                navItems[index].classList.add('active');
            }
        });
    }
    
    // Initialize timeline details in collapsed state
    const allDetails = document.querySelectorAll('.timeline-details');
    allDetails.forEach(details => details.classList.remove('expanded'));
    
    const allExpandBtns = document.querySelectorAll('.timeline-expand-btn');
    allExpandBtns.forEach(btn => {
        btn.classList.remove('expanded');
        const expandText = btn.querySelector('.expand-text');
        if (expandText) expandText.textContent = 'View full details';
        
        // Add accessibility
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-expanded', 'false');
        
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Scroll event listener
    window.addEventListener('scroll', updateTimelineIndicators);
    updateTimelineIndicators();
}

// Timeline Navigation
function scrollToTimeline(company) {
    const targetElement = document.getElementById(`timeline-${company}`);
    if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Highlight effect
        targetElement.style.transform = 'scale(1.02)';
        targetElement.style.transition = 'transform 0.3s ease';
        setTimeout(() => targetElement.style.transform = 'scale(1)', 1000);
    }
}

// Timeline Expand/Collapse
function toggleTimelineDetails(detailsId) {
    const details = document.getElementById(detailsId);
    const button = details?.previousElementSibling;
    const icon = button?.querySelector('.expand-icon');
    const text = button?.querySelector('.expand-text');
    
    if (!details || !button) return;
    
    const isExpanded = details.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        details.classList.remove('expanded');
        button.classList.remove('expanded');
        icon.style.transform = 'rotate(0deg)';
        text.textContent = 'View full details';
        button.setAttribute('aria-expanded', 'false');
    } else {
        // Expand
        details.classList.add('expanded');
        button.classList.add('expanded');
        icon.style.transform = 'rotate(180deg)';
        text.textContent = 'Hide details';
        button.setAttribute('aria-expanded', 'true');
        
        // Staggered animations
        setTimeout(() => {
            const cards = details.querySelectorAll('.achievement-card');
            cards.forEach((card, index) => {
                card.style.animation = `slideInUp 0.4s ease-out ${0.1 + index * 0.05}s both`;
            });
            
            const techStack = details.querySelector('.tech-stack');
            if (techStack) {
                techStack.style.animation = `slideInUp 0.4s ease-out ${0.1 + cards.length * 0.05 + 0.1}s both`;
            }
        }, 50);
        
        // Scroll to keep expanded content in view
        setTimeout(() => {
            button.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    }
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(isExpanded ? 50 : 100);
    }
}

// ===== SPOTIFY-STYLE COMPONENTS =====
function initializeSpotifyComponents() {
    initializeSpotifyStudies();
    initializeSpotifyCertifications();
}

function initializeSpotifyStudies() {
    const studyCards = document.querySelectorAll('.spotify-card[data-study-id]');
    const modal = document.getElementById('study-modal');
    const modalOverlay = document.getElementById('study-modal-overlay');
    const modalClose = document.getElementById('study-modal-close');
    
    const studyData = {
        'trinity-bachelors-degree': {
            title: "Bachelor's Degree in Computer Science",
            institution: "Trinity College",
            description: "Bachelor's degree in Computer Science with specialization in programming, algorithms, and fundamentals of computer science.",
            duration: "4 years",
            specialization: "Computer Science",
            grade: "Cum Laude",
            imageUrl: "/static/images/Adrian_Infantes_Trinity_Bachelors_Degree.jpeg",
            skills: ["Programming Fundamentals", "Data Structures", "Algorithms", "Software Engineering", "Database Management", "Computer Networks", "Operating Systems", "Web Development", "Mathematics", "Logic"]
        },
        'master-big-data-data-science': {
            title: "Master's in Big Data & Data Science",
            institution: "Mioti Tech School",
            description: "Specialized master's in big data analysis, machine learning, and data science applied to business environments.",
            duration: "12 months",
            specialization: "Big Data Analytics & Data Science",
            grade: "Excellent",
            imageUrl: "/static/images/Adrian_Infantes_MasterDataScience_BigData.png",
            skills: ["Apache Spark", "Hadoop", "Python", "R", "SQL", "Machine Learning", "Data Visualization", "Statistical Analysis", "Business Intelligence", "Data Mining"]
        },
        'master-deep-learning-gen-ai': {
            title: "Master's in Deep Learning & Generative AI",
            institution: "Mioti Tech School",
            description: "Advanced master's in deep neural networks, generative artificial intelligence, and large language models (LLMs).",
            duration: "12 months",
            specialization: "Deep Learning & Generative AI",
            grade: "Summa Cum Laude",
            imageUrl: "/static/images/Adrian_Infantes_MasterDeepLearning_GenAI.png",
            skills: ["PyTorch", "TensorFlow", "Transformers", "GANs", "VAEs", "LLMs", "Hugging Face", "OpenAI", "Neural Architecture Search", "Computer Vision", "NLP", "Reinforcement Learning"]
        }
    };
    
    studyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const studyId = this.getAttribute('data-study-id');
            
            // Get data from either hardcoded data or DOM
            let studyInfo = studyData[studyId];
            
            if (!studyInfo) {
                // Fallback: extract data from the card DOM
                studyInfo = extractStudyDataFromCard(this);
            }
            
            if (studyInfo) {
                openModal('study', studyId, studyInfo);
            } else {
                console.warn(`Study data not found for ID: ${studyId}`);
            }
        });
        
        // Hover effects
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
    });
    
    // Modal events
    if (modalClose) modalClose.addEventListener('click', () => closeModal('study'));
    if (modalOverlay) modalOverlay.addEventListener('click', () => closeModal('study'));
}

// Helper function to extract study data from DOM card
function extractStudyDataFromCard(card) {
    const titleElement = card.querySelector('.spotify-title');
    const institutionElement = card.querySelector('.spotify-artist');
    const yearElement = card.querySelector('.spotify-year');
    const gradeElement = card.querySelector('.spotify-grade');
    const imageElement = card.querySelector('img');
    
    if (!titleElement || !institutionElement) {
        return null;
    }
    
    return {
        title: titleElement.textContent.trim(),
        institution: institutionElement.textContent.trim(),
        description: `Academic training in ${titleElement.textContent.trim()} at ${institutionElement.textContent.trim()}.`,
        duration: yearElement ? `Completed in ${yearElement.textContent.trim()}` : "Duration not specified",
        specialization: titleElement.textContent.trim(),
        grade: gradeElement ? gradeElement.textContent.trim() : "Grade not specified",
        imageUrl: imageElement ? imageElement.src : "/static/images/b64551a3-0078-4b1a-8a88-76958aca08f1.png", // Fallback to profile image
        skills: ["Program-specific competencies", "Theoretical knowledge", "Practical application", "Modern methodologies"]
    };
}

function initializeSpotifyCertifications() {
    const certCards = document.querySelectorAll('.spotify-card[data-cert-id]');
    const modal = document.getElementById('cert-modal');
    const modalOverlay = document.getElementById('cert-modal-overlay');
    const modalClose = document.getElementById('cert-modal-close');
    
    const certData = {
        'azure-ai-102': {
            title: "Microsoft Certified: Azure AI Engineer Associate",
            issuer: "Microsoft",
            description: "Validation of competencies in artificial intelligence and machine learning on the Azure platform, including cognitive services, computer vision, and natural language processing.",
            issuedDate: "March 2024",
            status: "Active",
            validity: "No expiry",
            type: "microsoft-cert",
            icon: "fab fa-microsoft",
            typeLabel: "Azure AI",
            skills: ["Azure Cognitive Services", "Computer Vision", "Natural Language Processing", "Machine Learning", "AI Solutions", "Azure Bot Service", "Speech Services", "Custom Vision", "LUIS", "QnA Maker"],
            credentialUrl: "/static/images/Adrian_Infantes_Azure_AI102_Certificate.pdf",
            verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/adrianinfantes"
        }
    };
    
    certCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const certId = this.getAttribute('data-cert-id');
            openModal('cert', certId, certData[certId]);
        });
        
        // Hover effects
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
    });
    
    // Modal events
    if (modalClose) modalClose.addEventListener('click', () => closeModal('cert'));
    if (modalOverlay) modalOverlay.addEventListener('click', () => closeModal('cert'));
}

// Unified Modal System
function openModal(type, id, data) {
    const modal = document.getElementById(`${type}-modal`);
    if (!modal || !data) return;
    
    // Populate modal based on type
    if (type === 'study') {
        populateStudyModal(data);
    } else if (type === 'cert') {
        populateCertModal(data);
    }
    
    // Show modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    const modalContent = modal.querySelector('.spotify-modal-content');
    if (modalContent) {
        modalContent.style.transform = 'scale(0.8) translateY(50px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1) translateY(0)';
            modalContent.style.opacity = '1';
            modalContent.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 10);
    }
}

function closeModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (!modal) return;
    
    const modalContent = modal.querySelector('.spotify-modal-content');
    if (modalContent) {
        modalContent.style.transform = 'scale(0.8) translateY(50px)';
        modalContent.style.opacity = '0';
        modalContent.style.transition = 'all 0.2s ease-out';
    }
    
    setTimeout(() => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        if (modalContent) {
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
            modalContent.style.transition = '';
        }
    }, 200);
}

function populateStudyModal(study) {
    const elements = {
        title: document.getElementById('modal-study-title'),
        institution: document.getElementById('modal-study-institution'),
        description: document.getElementById('modal-study-description'),
        duration: document.getElementById('modal-study-duration'),
        specialization: document.getElementById('modal-study-specialization'),
        grade: document.getElementById('modal-study-grade'),
        image: document.getElementById('modal-study-image'),
        skills: document.getElementById('modal-study-skills')
    };
    
    if (elements.title) elements.title.textContent = study.title;
    if (elements.institution) elements.institution.textContent = study.institution;
    if (elements.description) elements.description.textContent = study.description;
    if (elements.duration) elements.duration.textContent = study.duration;
    if (elements.specialization) elements.specialization.textContent = study.specialization;
    if (elements.grade) elements.grade.textContent = study.grade;
    
    // Update modal image
    if (elements.image && study.imageUrl) {
        elements.image.src = study.imageUrl;
        elements.image.alt = study.title;
        // Add error handling for missing images
        elements.image.onerror = function() {
            this.style.display = 'none';
            console.warn(`Study image not found: ${study.imageUrl}`);
        };
        elements.image.onload = function() {
            this.style.display = 'block';
        };
    }
    
    if (elements.skills) {
        elements.skills.innerHTML = '';
        study.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'spotify-skill-tag';
            skillTag.textContent = skill;
            elements.skills.appendChild(skillTag);
        });
    }
}

function populateCertModal(cert) {
    const elements = {
        title: document.getElementById('modal-cert-title'),
        issuer: document.getElementById('modal-cert-issuer'),
        description: document.getElementById('modal-cert-description'),
        issued: document.getElementById('modal-cert-issued'),
        status: document.getElementById('modal-cert-status'),
        validity: document.getElementById('modal-cert-validity'),
        image: document.getElementById('modal-cert-image'),
        icon: document.getElementById('modal-cert-icon'),
        type: document.getElementById('modal-cert-type'),
        skills: document.getElementById('modal-cert-skills'),
        actions: document.getElementById('cert-modal-actions')
    };
    
    if (elements.title) elements.title.textContent = cert.title;
    if (elements.issuer) elements.issuer.textContent = cert.issuer;
    if (elements.description) elements.description.textContent = cert.description;
    if (elements.issued) elements.issued.textContent = cert.issuedDate;
    if (elements.status) elements.status.textContent = cert.status;
    if (elements.validity) elements.validity.textContent = cert.validity;
    
    if (elements.image) {
        elements.image.className = 'cert-modal-placeholder';
        elements.image.classList.add(cert.type);
    }
    
    if (elements.icon) elements.icon.className = cert.icon;
    if (elements.type) elements.type.textContent = cert.typeLabel;
    
    if (elements.skills) {
        elements.skills.innerHTML = '';
        cert.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'spotify-skill-tag';
            skillTag.textContent = skill;
            elements.skills.appendChild(skillTag);
        });
    }
    
    if (elements.actions) {
        elements.actions.innerHTML = '';
        if (cert.credentialUrl) {
            const viewBtn = document.createElement('a');
            viewBtn.href = cert.credentialUrl;
            viewBtn.target = '_blank';
            viewBtn.className = 'cert-action-btn';
            viewBtn.innerHTML = '<i class="fas fa-file-pdf"></i> View Certificate';
            elements.actions.appendChild(viewBtn);
        }
        if (cert.verifyUrl) {
            const verifyBtn = document.createElement('a');
            verifyBtn.href = cert.verifyUrl;
            verifyBtn.target = '_blank';
            verifyBtn.className = 'cert-action-btn secondary';
            verifyBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Verify Online';
            elements.actions.appendChild(verifyBtn);
        }
    }
}

// ===== GENERAL PORTFOLIO EFFECTS =====
function initializePortfolioEffects() {
    initializeSmoothScrolling();
    initializeParticleSystem();
    initializeScrollEffects();
    initializeInteractionEffects();
    initializeChatbot();
    initializeKeyboardShortcuts();
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.spotify-modal.show');
            if (openModal) {
                const modalType = openModal.id.replace('-modal', '');
                closeModal(modalType);
            }
        }
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initializeParticleSystem() {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.left = Math.random() * 100 + '%';
        const size = Math.random() * 4 + 2;
        particle.style.width = particle.style.height = size + 'px';
        
        const colors = [
            'rgba(0, 212, 170, 0.4)',
            'rgba(75, 172, 254, 0.4)',
            'rgba(0, 102, 204, 0.3)',
            'rgba(255, 255, 255, 0.2)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.boxShadow = `0 0 ${size * 3}px ${particle.style.background}`;
        
        const container = document.querySelector('.floating-particles');
        if (container) {
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 25000);
        }
    }
    
    setInterval(createParticle, 4000);
}

function initializeScrollEffects() {
    // Header hide/show
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (header) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.style.transform = 'translateY(-100%)';
                    header.style.opacity = '0.8';
                } else {
                    header.style.transform = 'translateY(0)';
                    header.style.opacity = '1';
                }
            }
            lastScrollTop = scrollTop;
        }, 10);
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.section, .hero').forEach(section => {
        observer.observe(section);
    });
}

function initializeInteractionEffects() {
    // Enhanced hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => tag.style.transform = 'translateY(-2px) scale(1.05)', index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
            this.querySelectorAll('.tech-tag').forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
    
    // Tech tag ripple effects
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.3);
                transform: scale(0); animation: ripple 0.6s linear; left: 50%; top: 50%;
                width: 20px; height: 20px; margin-left: -10px; margin-top: -10px;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeChatbot() {
    const chatbotBubble = document.getElementById('chatbot-bubble');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    
    if (!chatbotBubble || !chatbotWindow || !chatbotClose) return;
    
    let isWindowOpen = false;
    
    chatbotBubble.addEventListener('click', function() {
        if (!isWindowOpen) {
            chatbotWindow.classList.add('open');
            isWindowOpen = true;
            this.style.transform = 'scale(0.9)';
            setTimeout(() => this.style.transform = '', 150);
        }
    });
    
    chatbotClose.addEventListener('click', function() {
        if (isWindowOpen) {
            chatbotWindow.classList.remove('open');
            isWindowOpen = false;
            this.style.transform = 'scale(0.9)';
            setTimeout(() => this.style.transform = '', 150);
        }
    });
    
    // Close on outside click
    document.addEventListener('click', function(event) {
        if (isWindowOpen && 
            !chatbotWindow.contains(event.target) && 
            !chatbotBubble.contains(event.target)) {
            chatbotWindow.classList.remove('open');
            isWindowOpen = false;
        }
    });
    
    chatbotWindow.addEventListener('click', (e) => e.stopPropagation());
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Chatbot toggle (Ctrl + /)
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const chatbotBubble = document.getElementById('chatbot-bubble');
            if (chatbotBubble) chatbotBubble.click();
        }
        
        // Navigation shortcuts (Alt + number)
        if (e.altKey) {
            const shortcuts = {
                '1': '#skills',
                '2': '#projects',
                '3': '#timeline',
                '4': '#contact'
            };
            
            if (shortcuts[e.key]) {
                e.preventDefault();
                document.querySelector(shortcuts[e.key])?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Export functions for global access
window.scrollToTimeline = scrollToTimeline;
window.toggleTimelineDetails = toggleTimelineDetails;

// Console greeting
console.log(`
🔐 AI & Cybersecurity Portfolio - Clean Version
🤖 Developed by Adrian Infantes
🔧 Tech Stack: Django, Docker, Glassmorphism CSS
🚀 Secure. Modern. Professional.
`); 