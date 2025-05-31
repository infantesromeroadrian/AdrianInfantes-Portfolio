/*
Advanced AI Chatbot Integration with OpenAI GPT-4
Handles chat interface, API communication, and enhanced UX
*/

class AdvancedChatbot {
    constructor() {
        this.apiEndpoint = '/api/chat/';
        this.isTyping = false;
        this.messageHistory = [];
        this.maxMessages = 50;
        this.currentTheme = 'ai'; // Default theme
        this.isMaximized = false; // Track maximized state
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadChatHistory();
        this.initializeThemeDetection();
        this.addWelcomeMessage();
        
        console.log('🤖 Advanced AI Chatbot initialized successfully');
    }

    initializeThemeDetection() {
        // Detect current theme from body class
        const body = document.body;
        if (body.classList.contains('cybersecurity-theme')) {
            this.currentTheme = 'cyber';
        } else {
            this.currentTheme = 'ai';
        }

        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    this.currentTheme = body.classList.contains('cybersecurity-theme') ? 'cyber' : 'ai';
                    this.updateChatTheme();
                }
            });
        });

        observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    }

    updateChatTheme() {
        const chatWindow = document.getElementById('chatbot-window');
        const chatBubble = document.getElementById('chatbot-bubble');
        
        if (chatWindow && chatBubble) {
            // Theme-specific styling is handled by CSS, but we can trigger effects here
            console.log(`🎨 Chat theme updated to: ${this.currentTheme}`);
        }
    }

    setupEventListeners() {
        // Chat input handling
        const chatInput = document.getElementById('chatbot-input');
        const sendButton = document.getElementById('chatbot-send');

        if (chatInput && sendButton) {
            // Send on Enter key (but not Shift+Enter for multiline)
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Send button click
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });

            // Auto-resize textarea
            chatInput.addEventListener('input', () => {
                this.autoResizeTextarea(chatInput);
            });
        }

        // Maximize/Minimize button
        const maximizeButton = document.getElementById('chatbot-maximize');
        if (maximizeButton) {
            maximizeButton.addEventListener('click', () => {
                this.toggleMaximize();
            });
        }

        // Quick action buttons
        this.setupQuickActions();
    }

    setupQuickActions() {
        const quickActions = document.querySelectorAll('.chat-quick-action');
        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const message = action.getAttribute('data-message');
                if (message) {
                    this.sendPredefinedMessage(message);
                }
            });
        });
    }

    addWelcomeMessage() {
        // Only add welcome message if no chat history exists
        if (this.messageHistory.length === 0) {
            const welcomeMessage = this.getWelcomeMessage();
            this.addMessageToChat('assistant', welcomeMessage, false);
        }
    }

    getWelcomeMessage() {
        if (this.currentTheme === 'cyber') {
            return `🔐 **Cybersecurity Mode Activated**

Greetings! I'm Adrian's AI assistant, specialized in cybersecurity and ethical hacking. I can help you learn about:

• **Penetration Testing** & Vulnerability Assessment
• **Digital Forensics** & Incident Response  
• **OSINT** & Threat Intelligence
• **Security Architecture** & Risk Management
• Adrian's **cybersecurity projects** and expertise

Feel free to ask about cybersecurity topics, or say **"Tell me about Adrian's security work"** to get started!`;
        } else {
            return `🤖 **AI Engineering Mode Active**

Hello! I'm Adrian's AI assistant. I'm here to help you learn about Adrian's expertise and discuss exciting topics in:

• **Machine Learning** & Deep Learning
• **Generative AI** & Large Language Models
• **Cloud Architecture** & MLOps
• **Data Science** & Analytics
• Adrian's **AI projects** and innovations

Ask me anything about AI, or try **"What's Adrian's experience with AI?"** to begin!`;
        }
    }

    async sendMessage() {
        const chatInput = document.getElementById('chatbot-input');
        const sendButton = document.getElementById('chatbot-send');
        
        if (!chatInput || !sendButton) return;

        const message = chatInput.value.trim();
        if (!message || this.isTyping) return;

        // Disable input during processing
        this.setInputState(false);
        
        // Add user message to chat
        this.addMessageToChat('user', message);
        
        // Clear input
        chatInput.value = '';
        this.autoResizeTextarea(chatInput);

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Send to OpenAI API
            const response = await this.callOpenAI(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            if (response.status === 'success') {
                // Add AI response to chat
                this.addMessageToChat('assistant', response.message);
            } else {
                // Handle error response
                this.addMessageToChat('assistant', 
                    '❌ I apologize, but I encountered an issue. Please try asking your question again.', 
                    true
                );
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            this.addMessageToChat('assistant', 
                '⚠️ I\'m experiencing technical difficulties. Please try again in a moment.', 
                true
            );
        }

        // Re-enable input
        this.setInputState(true);
    }

    async sendPredefinedMessage(message) {
        const chatInput = document.getElementById('chatbot-input');
        if (chatInput) {
            chatInput.value = message;
            await this.sendMessage();
        }
    }

    async callOpenAI(message) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken(),
            },
            body: JSON.stringify({
                message: message,
                theme: this.currentTheme
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    addMessageToChat(sender, message, isError = false) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        messageElement.className = `chatbot-message ${sender}-message`;
        
        if (isError) {
            messageElement.classList.add('error-message');
        }

        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (sender === 'user') {
            messageElement.innerHTML = `
                <div class="message-content user-content">
                    <div class="message-text">${this.escapeHtml(message)}</div>
                    <div class="message-time">${timestamp}</div>
                </div>
                <div class="message-avatar user-avatar">
                    <i class="fas fa-user"></i>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-avatar assistant-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content assistant-content">
                    <div class="message-text">${this.parseMarkdown(message)}</div>
                    <div class="message-time">${timestamp}</div>
                </div>
            `;
        }

        // Add with animation
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        messagesContainer.appendChild(messageElement);

        // Trigger animation
        requestAnimationFrame(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        });

        // Scroll to bottom
        this.scrollToBottom();

        // Save to history
        this.messageHistory.push({
            sender,
            message,
            timestamp: Date.now()
        });

        // Limit history size
        if (this.messageHistory.length > this.maxMessages) {
            this.messageHistory = this.messageHistory.slice(-this.maxMessages);
        }

        // Save to localStorage
        this.saveChatHistory();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        this.isTyping = true;

        const typingElement = document.createElement('div');
        typingElement.className = 'chatbot-message assistant-message typing-indicator';
        typingElement.id = 'typing-indicator';
        
        typingElement.innerHTML = `
            <div class="message-avatar assistant-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content assistant-content">
                <div class="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    setInputState(enabled) {
        const chatInput = document.getElementById('chatbot-input');
        const sendButton = document.getElementById('chatbot-send');

        if (chatInput && sendButton) {
            chatInput.disabled = !enabled;
            sendButton.disabled = !enabled;
            
            if (enabled) {
                chatInput.focus();
            }
        }
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }

    parseMarkdown(text) {
        // Simple markdown parsing for basic formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/•/g, '•')
            .replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCSRFToken() {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
        return csrfToken ? csrfToken.value : '';
    }

    saveChatHistory() {
        try {
            localStorage.setItem('chatbot_history', JSON.stringify(this.messageHistory));
        } catch (error) {
            console.warn('Could not save chat history:', error);
        }
    }

    loadChatHistory() {
        try {
            const history = localStorage.getItem('chatbot_history');
            if (history) {
                this.messageHistory = JSON.parse(history);
                
                // Restore messages (limit to last 10 for performance)
                const recentMessages = this.messageHistory.slice(-10);
                recentMessages.forEach(msg => {
                    this.addMessageToChat(msg.sender, msg.message, false);
                });
            }
        } catch (error) {
            console.warn('Could not load chat history:', error);
            this.messageHistory = [];
        }
    }

    clearChatHistory() {
        this.messageHistory = [];
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
        localStorage.removeItem('chatbot_history');
        this.addWelcomeMessage();
    }

    // Public methods for external control
    openChat() {
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow) {
            chatWindow.classList.add('open');
            const chatInput = document.getElementById('chatbot-input');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chatbot-window');
        if (chatWindow) {
            chatWindow.classList.remove('open');
            // Also minimize when closing
            if (this.isMaximized) {
                this.isMaximized = false;
                chatWindow.classList.remove('maximized');
                this.updateMaximizeButton();
            }
        }
    }

    // Maximize/Minimize functionality
    toggleMaximize() {
        const chatWindow = document.getElementById('chatbot-window');
        if (!chatWindow) return;

        this.isMaximized = !this.isMaximized;
        
        // Add transition class for smooth animation
        chatWindow.classList.add('transitioning');
        
        if (this.isMaximized) {
            chatWindow.classList.add('maximized');
            console.log('🔍 Chatbot maximized');
        } else {
            chatWindow.classList.remove('maximized');
            console.log('🔍 Chatbot minimized');
        }

        // Update maximize button icon and tooltip
        this.updateMaximizeButton();

        // Remove transition class after animation
        setTimeout(() => {
            chatWindow.classList.remove('transitioning');
        }, 400);

        // Scroll to bottom after resize
        setTimeout(() => {
            this.scrollToBottom();
        }, 450);
    }

    updateMaximizeButton() {
        const maximizeButton = document.getElementById('chatbot-maximize');
        if (!maximizeButton) return;

        const icon = maximizeButton.querySelector('i');
        if (this.isMaximized) {
            icon.className = 'fas fa-compress-alt';
            maximizeButton.title = 'Minimize chatbot';
        } else {
            icon.className = 'fas fa-expand-alt';
            maximizeButton.title = 'Maximize chatbot';
        }
    }

    maximize() {
        if (!this.isMaximized) {
            this.toggleMaximize();
        }
    }

    minimize() {
        if (this.isMaximized) {
            this.toggleMaximize();
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if chatbot elements exist
    const chatbotBubble = document.getElementById('chatbot-bubble');
    const chatbotWindow = document.getElementById('chatbot-window');
    
    if (chatbotBubble && chatbotWindow) {
        window.advancedChatbot = new AdvancedChatbot();
        
        // Connect bubble click to open chat
        chatbotBubble.addEventListener('click', () => {
            window.advancedChatbot.openChat();
        });
        
        // Connect close button
        const closeButton = document.getElementById('chatbot-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                window.advancedChatbot.closeChat();
            });
        }
        
        console.log('🚀 Advanced Chatbot fully loaded and ready!');
        console.log('💡 Use ChatbotAPI.maximize() to maximize the chatbot programmatically');
    } else {
        console.warn('⚠️ Chatbot elements not found in DOM');
    }
});

// Expose chatbot globally for external control
window.ChatbotAPI = {
    send: (message) => {
        if (window.advancedChatbot) {
            return window.advancedChatbot.sendPredefinedMessage(message);
        }
    },
    open: () => {
        if (window.advancedChatbot) {
            window.advancedChatbot.openChat();
        }
    },
    close: () => {
        if (window.advancedChatbot) {
            window.advancedChatbot.closeChat();
        }
    },
    clear: () => {
        if (window.advancedChatbot) {
            window.advancedChatbot.clearChatHistory();
        }
    },
    maximize: () => {
        if (window.advancedChatbot) {
            window.advancedChatbot.maximize();
        }
    },
    minimize: () => {
        if (window.advancedChatbot) {
            window.advancedChatbot.minimize();
        }
    },
    toggleMaximize: () => {
        if (window.advancedChatbot) {
            window.advancedChatbot.toggleMaximize();
        }
    },
    isMaximized: () => {
        if (window.advancedChatbot) {
            return window.advancedChatbot.isMaximized;
        }
        return false;
    }
}; 