"""
Constants module for AI & Cybersecurity Portfolio.

This module contains all application-wide constants used throughout the project.
All constants follow PEP 8 naming conventions (UPPERCASE).
"""

from typing import Dict, List

# Navigation menu items
NAVIGATION_ITEMS: List[Dict[str, str]] = [
    {'name': 'Home', 'url': '#home', 'icon': 'fas fa-home'},
    {'name': 'About', 'url': '#home', 'icon': 'fas fa-user'},
    {'name': 'Timeline', 'url': '#timeline', 'icon': 'fas fa-clock'},
    {'name': 'Studies', 'url': '#estudios', 'icon': 'fas fa-graduation-cap'},
    {'name': 'Certifications', 'url': '#certificaciones', 'icon': 'fas fa-certificate'},
    {'name': 'Projects', 'url': '#projects', 'icon': 'fas fa-laptop-code'},
    {'name': 'Experience', 'url': '#experience', 'icon': 'fas fa-briefcase'},
    {'name': 'Skills', 'url': '#skills', 'icon': 'fas fa-code'},
    {'name': 'Contact', 'url': '#contact', 'icon': 'fas fa-envelope'}
]

# Skills categories
SKILLS_CATEGORIES = {
    '🤖 Artificial Intelligence': [
        'Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing',
        'Reinforcement Learning', 'AI Model Optimization', 'Neural Networks', 'Transfer Learning'
    ],
    '🧠 Machine Learning Frameworks': [
        'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'XGBoost', 'LightGBM', 'CatBoost', 'Hugging Face'
    ],
    '☁️ Cloud & MLOps': [
        'AWS', 'Google Cloud', 'Azure', 'MLflow', 'Kubeflow', 'Docker', 'Kubernetes', 'Apache Airflow'
    ],
    '🔐 Cybersecurity & Pentesting': [
        'Ethical Hacking', 'Penetration Testing', 'Vulnerability Assessment', 'Network Security',
        'OSINT', 'Digital Forensics', 'Security Analysis', 'Incident Response'
    ],
    '💻 Programming Languages': [
        'Python', 'R', 'SQL', 'JavaScript', 'Bash', 'PowerShell', 'Java', 'C++'
    ],
    '🛠️ Development Tools': [
        'Git', 'GitHub', 'GitLab', 'Jupyter', 'VS Code', 'PyCharm', 'Postman', 'JIRA'
    ]
}

# Project categories
PROJECT_CATEGORIES: List[str] = [
    'Machine Learning',
    'Ciberseguridad',
    'Desarrollo Web',
    'Análisis de Datos',
    'Automatización',
    'Investigación'
]

# Social media links
SOCIAL_LINKS: Dict[str, Dict[str, str]] = {
    'github': {
        'url': 'https://github.com/infantesromeroadrian',
        'icon': 'fab fa-github',
        'name': 'GitHub'
    },
    'linkedin': {
        'url': 'https://www.linkedin.com/in/adrianinfantes/',
        'icon': 'fab fa-linkedin',
        'name': 'LinkedIn'
    },
    'email': {
        'url': 'mailto:infantesromeroadrian@gmail.com',
        'icon': 'fas fa-envelope',
        'name': 'Email'
    }
}

# Contact form field validation
CONTACT_FORM_FIELDS: Dict[str, Dict[str, any]] = {
    'name': {
        'required': True,
        'min_length': 2,
        'max_length': 50,
        'pattern': r'^[a-zA-Z\s]+$'
    },
    'email': {
        'required': True,
        'pattern': r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    },
    'subject': {
        'required': True,
        'min_length': 5,
        'max_length': 100
    },
    'message': {
        'required': True,
        'min_length': 10,
        'max_length': 1000
    }
}

# Theme configuration
THEME_COLORS: Dict[str, str] = {
    'primary': '#0066cc',
    'secondary': '#ff6b35',
    'dark': '#1a1a1a',
    'light': '#f8f9fa',
    'accent': '#00d4aa',
    'warning': '#ffc107',
    'danger': '#dc3545',
    'success': '#28a745'
}

# API response messages
API_MESSAGES: Dict[str, str] = {
    'contact_success': '¡Mensaje enviado exitosamente!',
    'contact_error': 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    'validation_error': 'Por favor, revisa tus datos e inténtalo de nuevo.',
    'server_error': 'Error interno del servidor. Por favor, inténtalo más tarde.'
}

# Default user skills for demonstration
DEFAULT_SKILLS = [
    # AI & Machine Learning
    {'name': 'Machine Learning', 'category': '🤖 Artificial Intelligence', 'proficiency': 95},
    {'name': 'Deep Learning', 'category': '🤖 Artificial Intelligence', 'proficiency': 90},
    {'name': 'Computer Vision', 'category': '🤖 Artificial Intelligence', 'proficiency': 85},
    {'name': 'Natural Language Processing', 'category': '🤖 Artificial Intelligence', 'proficiency': 88},
    
    # ML Frameworks
    {'name': 'TensorFlow', 'category': '🧠 Machine Learning Frameworks', 'proficiency': 92},
    {'name': 'PyTorch', 'category': '🧠 Machine Learning Frameworks', 'proficiency': 88},
    {'name': 'Scikit-learn', 'category': '🧠 Machine Learning Frameworks', 'proficiency': 95},
    {'name': 'Hugging Face', 'category': '🧠 Machine Learning Frameworks', 'proficiency': 85},
    
    # Cloud & MLOps
    {'name': 'AWS', 'category': '☁️ Cloud & MLOps', 'proficiency': 90},
    {'name': 'Azure', 'category': '☁️ Cloud & MLOps', 'proficiency': 85},
    {'name': 'Docker', 'category': '☁️ Cloud & MLOps', 'proficiency': 88},
    {'name': 'MLflow', 'category': '☁️ Cloud & MLOps', 'proficiency': 80},
    
    # Cybersecurity
    {'name': 'Ethical Hacking', 'category': '🔐 Cybersecurity & Pentesting', 'proficiency': 85},
    {'name': 'Penetration Testing', 'category': '🔐 Cybersecurity & Pentesting', 'proficiency': 80},
    {'name': 'OSINT', 'category': '🔐 Cybersecurity & Pentesting', 'proficiency': 90},
    {'name': 'Network Security', 'category': '🔐 Cybersecurity & Pentesting', 'proficiency': 82},
    
    # Programming
    {'name': 'Python', 'category': '💻 Programming Languages', 'proficiency': 95},
    {'name': 'SQL', 'category': '💻 Programming Languages', 'proficiency': 90},
    {'name': 'R', 'category': '💻 Programming Languages', 'proficiency': 85},
    {'name': 'JavaScript', 'category': '💻 Programming Languages', 'proficiency': 78},
    
    # Tools
    {'name': 'Git', 'category': '🛠️ Development Tools', 'proficiency': 92},
    {'name': 'Jupyter', 'category': '🛠️ Development Tools', 'proficiency': 95},
    {'name': 'VS Code', 'category': '🛠️ Development Tools', 'proficiency': 90},
    {'name': 'GitHub', 'category': '🛠️ Development Tools', 'proficiency': 88}
] 