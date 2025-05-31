"""
API URL patterns for AI & Cybersecurity Portfolio.

Migrated from Flask api_controller.py blueprint routes to Django REST Framework
URL patterns while maintaining the exact same API structure and functionality.
"""

from django.urls import path
from . import api_views

app_name = 'api'

urlpatterns = [
    # Portfolio data endpoints
    path('portfolio/', api_views.get_portfolio_data, name='portfolio_data'),
    path('projects/', api_views.get_projects, name='projects'),
    path('skills/', api_views.get_skills, name='skills'),
    path('experience/', api_views.get_experience, name='experience'),
    path('certifications/', api_views.get_certifications, name='certifications'),
    
    # Contact form endpoint
    path('contact/', api_views.submit_contact_form, name='contact_form'),
    
    # Chatbot endpoint
    path('chat/', api_views.chat_with_openai, name='chat'),
] 