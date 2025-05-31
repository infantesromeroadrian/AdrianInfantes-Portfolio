"""
Portfolio views for AI & Cybersecurity Portfolio.

Migrated from Flask portfolio_controller.py while maintaining the exact same
functionality and architectural patterns. Updated to use Django patterns.
"""

import logging
from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from src.services.portfolio_service import PortfolioService
from src.utils.constants import NAVIGATION_ITEMS, SOCIAL_LINKS, THEME_COLORS

# Setup logging
logger = logging.getLogger(__name__)

# Initialize portfolio service
portfolio_service = PortfolioService()


def home(request):
    """
    Home page view handler.
    
    Args:
        request: Django request object
        
    Returns:
        HttpResponse: Rendered home page template
    """
    try:
        # Get portfolio data
        portfolio = portfolio_service.get_portfolio()
        personal_info = portfolio.personal_info
        featured_projects = portfolio.featured_projects
        current_position = portfolio.current_position
        skills_by_category = portfolio_service.get_skills_by_category()
        studies = portfolio_service.get_studies()
        
        context = {
            'personal_info': personal_info,
            'featured_projects': featured_projects,
            'current_position': current_position,
            'skills_by_category': skills_by_category,
            'studies': studies,
            'portfolio': portfolio,
            'navigation': NAVIGATION_ITEMS,
            'social_links': SOCIAL_LINKS,
            'theme_colors': THEME_COLORS,
            'config': settings.PORTFOLIO_CONFIG
        }
        
        return render(request, 'index.html', context)
    except Exception as e:
        logger.error(f"Error loading home page: {str(e)}")
        return render(request, 'error.html', {'error': "Page loading error"}, status=500)


def about(request):
    """
    About page view handler.
    
    Args:
        request: Django request object
        
    Returns:
        HttpResponse: Rendered about page template
    """
    try:
        personal_info = portfolio_service.get_personal_info()
        portfolio = portfolio_service.get_portfolio()
        
        context = {
            'personal_info': personal_info,
            'education': portfolio.education,
            'certifications': portfolio.active_certifications,
            'navigation': NAVIGATION_ITEMS,
            'config': settings.PORTFOLIO_CONFIG
        }
        
        return render(request, 'about.html', context)
    except Exception as e:
        logger.error(f"Error loading about page: {str(e)}")
        return render(request, 'error.html', {'error': "About page error"}, status=500)


def projects(request, category=None):
    """
    Projects page view handler with optional category filter.
    
    Args:
        request: Django request object
        category: Optional project category filter
        
    Returns:
        HttpResponse: Rendered projects page template
    """
    try:
        projects_list = portfolio_service.get_projects_by_category(category)
        featured_projects = portfolio_service.get_featured_projects()
        
        context = {
            'projects': projects_list,
            'featured_projects': featured_projects,
            'selected_category': category,
            'navigation': NAVIGATION_ITEMS,
            'config': settings.PORTFOLIO_CONFIG
        }
        
        return render(request, 'projects.html', context)
    except Exception as e:
        logger.error(f"Error loading projects page: {str(e)}")
        return render(request, 'error.html', {'error': "Projects page error"}, status=500)


def experience(request):
    """
    Experience page view handler.
    
    Args:
        request: Django request object
        
    Returns:
        HttpResponse: Rendered experience page template
    """
    try:
        portfolio = portfolio_service.get_portfolio()
        
        context = {
            'experience': portfolio.experience,
            'current_position': portfolio.current_position,
            'navigation': NAVIGATION_ITEMS,
            'config': settings.PORTFOLIO_CONFIG
        }
        
        return render(request, 'experience.html', context)
    except Exception as e:
        logger.error(f"Error loading experience page: {str(e)}")
        return render(request, 'error.html', {'error': "Experience page error"}, status=500)


def skills(request):
    """
    Skills page view handler.
    
    Args:
        request: Django request object
        
    Returns:
        HttpResponse: Rendered skills page template
    """
    try:
        skills_by_category = portfolio_service.get_skills_by_category()
        
        context = {
            'skills_by_category': skills_by_category,
            'navigation': NAVIGATION_ITEMS,
            'config': settings.PORTFOLIO_CONFIG
        }
        
        return render(request, 'skills.html', context)
    except Exception as e:
        logger.error(f"Error loading skills page: {str(e)}")
        return render(request, 'error.html', {'error': "Skills page error"}, status=500)


def contact(request):
    """
    Contact page view handler.
    
    Args:
        request: Django request object
        
    Returns:
        HttpResponse: Rendered contact page template
    """
    try:
        personal_info = portfolio_service.get_personal_info()
        
        context = {
            'personal_info': personal_info,
            'social_links': SOCIAL_LINKS,
            'navigation': NAVIGATION_ITEMS,
            'config': settings.PORTFOLIO_CONFIG
        }
        
        return render(request, 'contact.html', context)
    except Exception as e:
        logger.error(f"Error loading contact page: {str(e)}")
        return render(request, 'error.html', {'error': "Contact page error"}, status=500)


def health(request):
    """
    Health check endpoint for monitoring.
    
    Args:
        request: Django request object
        
    Returns:
        JsonResponse: Health status information
    """
    try:
        # Basic health check
        portfolio_service.get_personal_info()
        
        response_data = {
            'status': 'healthy',
            'service': 'AI & Cybersecurity Portfolio',
            'version': '2.0.0',
            'framework': 'Django',
            'timestamp': portfolio_service._portfolio_data.personal_info.name
        }
        
        return JsonResponse(response_data, status=200)
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return JsonResponse({
            'status': 'unhealthy',
            'error': str(e)
        }, status=500)


def readiness(request):
    """
    Readiness check endpoint for container orchestration.
    
    Args:
        request: Django request object
        
    Returns:
        JsonResponse: Readiness status information
    """
    try:
        # Check if all services are ready
        portfolio_service.get_personal_info()
        
        response_data = {
            'status': 'ready',
            'service': 'AI & Cybersecurity Portfolio',
            'checks': {
                'portfolio_service': 'ready',
                'templates': 'ready',
                'static_files': 'ready'
            }
        }
        
        return JsonResponse(response_data, status=200)
    except Exception as e:
        logger.error(f"Readiness check failed: {str(e)}")
        return JsonResponse({
            'status': 'not_ready',
            'error': str(e)
        }, status=503)


def liveness(request):
    """
    Liveness check endpoint for container orchestration.
    
    Args:
        request: Django request object
        
    Returns:
        JsonResponse: Liveness status information
    """
    try:
        response_data = {
            'status': 'alive',
            'service': 'AI & Cybersecurity Portfolio',
            'framework': 'Django 4.2.7'
        }
        
        return JsonResponse(response_data, status=200)
    except Exception as e:
        logger.error(f"Liveness check failed: {str(e)}")
        return JsonResponse({
            'status': 'dead',
            'error': str(e)
        }, status=500) 