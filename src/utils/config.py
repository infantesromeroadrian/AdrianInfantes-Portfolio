"""
Configuration module for AI & Cybersecurity Portfolio.

This module implements the configuration settings using environment variables
and provides different configuration classes for different environments.
"""

import os
from typing import Dict, Any


class Config:
    """Base configuration class with common settings."""
    
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = False
    TESTING = False
    
    # Portfolio specific settings
    PORTFOLIO_TITLE = "Adrian Infantes - AI & Cybersecurity Engineer"
    PORTFOLIO_SUBTITLE = "Artificial Intelligence | Cybersecurity | Ethical Hacking"
    PORTFOLIO_EMAIL = os.environ.get('PORTFOLIO_EMAIL') or 'infantesromeroadrian@gmail.com'
    
    # Static file configuration
    STATIC_FOLDER = 'static'
    TEMPLATE_FOLDER = 'templates'
    
    @classmethod
    def get_config_dict(cls) -> Dict[str, Any]:
        """
        Get configuration as dictionary for easy access.
        
        Returns:
            Dict[str, Any]: Configuration dictionary
        """
        return {
            'title': cls.PORTFOLIO_TITLE,
            'subtitle': cls.PORTFOLIO_SUBTITLE,
            'email': cls.PORTFOLIO_EMAIL,
            'debug': cls.DEBUG
        }


class DevelopmentConfig(Config):
    """Development environment configuration."""
    
    DEBUG = True


class ProductionConfig(Config):
    """Production environment configuration."""
    
    DEBUG = False
    TESTING = False


class TestingConfig(Config):
    """Testing environment configuration."""
    
    DEBUG = True
    TESTING = True


# Configuration mapping for environment selection
config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
} 