"""
Portfolio URLs for AI & Cybersecurity Portfolio.

URL patterns for portfolio views.
"""

from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    # Health check
    path('health/', views.health, name='health'),
    
    # Home routes
    path('', views.home, name='home'),
    path('home/', views.home, name='home_alt'),
    
    # Main portfolio pages
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('projects/<str:category>/', views.projects, name='projects_category'),
    path('experience/', views.experience, name='experience'),
    path('skills/', views.skills, name='skills'),
    path('contact/', views.contact, name='contact'),
    
    # Health check endpoints
    path('health/ready/', views.readiness, name='readiness'),
    path('health/live/', views.liveness, name='liveness'),
] 