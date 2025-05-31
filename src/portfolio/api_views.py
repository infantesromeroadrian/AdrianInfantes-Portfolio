"""
API views for AI & Cybersecurity Portfolio.

Migrated from Flask api_controller.py while maintaining the exact same
functionality and API structure. Updated to use Django REST Framework patterns.
"""

import logging
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from dotenv import load_dotenv

from src.models.portfolio_models import ContactMessage
from src.services.portfolio_service import PortfolioService
from src.utils.constants import API_MESSAGES, PROJECT_CATEGORIES

# Load environment variables
load_dotenv()

# Initialize OpenAI client with error handling
client = None
try:
    import openai
    api_key = os.getenv('OPENAI_API_KEY')
    if api_key and api_key.strip():
        # Version 0.28.1 uses global configuration
        openai.api_key = api_key.strip()
        client = openai  # Use the module directly
        logger = logging.getLogger(__name__)
        logger.info("OpenAI client initialized successfully")
    else:
        logger = logging.getLogger(__name__)
        logger.warning("OpenAI API key not found or empty - chatbot functionality will be disabled")
except ImportError as e:
    logger = logging.getLogger(__name__)
    logger.error(f"OpenAI package not installed: {str(e)} - chatbot functionality will be disabled")
except Exception as e:
    logger = logging.getLogger(__name__)
    logger.error(f"Failed to initialize OpenAI client: {type(e).__name__}: {str(e)} - chatbot functionality will be disabled")
    # Log more details about the error
    import traceback
    logger.error(f"OpenAI client initialization traceback: {traceback.format_exc()}")

# Setup logging
logger = logging.getLogger(__name__)

# Initialize portfolio service
portfolio_service = PortfolioService()


@api_view(['GET'])
def get_portfolio_data(request):
    """
    Get complete portfolio data as JSON.
    
    Args:
        request: Django request object
        
    Returns:
        Response: Portfolio data in JSON format
    """
    try:
        portfolio = portfolio_service.get_portfolio()
        
        # Convert portfolio data to serializable format
        portfolio_data = {
            'personal_info': {
                'name': portfolio.personal_info.name,
                'title': portfolio.personal_info.title,
                'subtitle': portfolio.personal_info.subtitle,
                'email': portfolio.personal_info.email,
                'phone': portfolio.personal_info.phone,
                'location': portfolio.personal_info.location,
                'bio': portfolio.personal_info.bio,
                'avatar_url': portfolio.personal_info.avatar_url
            },
            'skills': _serialize_skills(portfolio.skills),
            'projects': _serialize_projects(portfolio.projects),
            'experience': _serialize_experience(portfolio.experience),
            'education': _serialize_education(portfolio.education),
            'certifications': _serialize_certifications(portfolio.certifications)
        }
        
        return Response({
            'status': 'success',
            'data': portfolio_data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error retrieving portfolio data: {str(e)}")
        return Response({
            'status': 'error',
            'message': API_MESSAGES['server_error']
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_projects(request):
    """
    Get projects with optional category filter.
    
    Args:
        request: Django request object
        
    Returns:
        Response: Projects data in JSON format
    """
    try:
        category = request.GET.get('category')
        featured_only = request.GET.get('featured', 'false').lower() == 'true'
        
        if featured_only:
            projects = portfolio_service.get_featured_projects()
        else:
            projects = portfolio_service.get_projects_by_category(category)
        
        return Response({
            'status': 'success',
            'data': _serialize_projects(projects),
            'total': len(projects)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error retrieving projects: {str(e)}")
        return Response({
            'status': 'error',
            'message': API_MESSAGES['server_error']
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_skills(request):
    """
    Get skills organized by category.
    
    Args:
        request: Django request object
        
    Returns:
        Response: Skills data in JSON format
    """
    try:
        skills_by_category = portfolio_service.get_skills_by_category()
        
        # Serialize skills data
        serialized_skills = {}
        for category, skills in skills_by_category.items():
            serialized_skills[category] = _serialize_skills(skills)
        
        return Response({
            'status': 'success',
            'data': serialized_skills
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error retrieving skills: {str(e)}")
        return Response({
            'status': 'error',
            'message': API_MESSAGES['server_error']
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def submit_contact_form(request):
    """
    Handle contact form submission.
    
    Args:
        request: Django request object
        
    Returns:
        Response: Response message in JSON format
    """
    try:
        # Get form data
        data = request.data
        
        if not data:
            return Response({
                'status': 'error',
                'message': API_MESSAGES['validation_error']
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data or not str(data[field]).strip():
                return Response({
                    'status': 'error',
                    'message': f'{field.title()} is required'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create and validate contact message
        try:
            contact_message = ContactMessage(
                name=str(data['name']).strip(),
                email=str(data['email']).strip(),
                subject=str(data['subject']).strip(),
                message=str(data['message']).strip()
            )
        except ValueError as ve:
            return Response({
                'status': 'error',
                'message': str(ve)
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Here you would typically save to database or send email
        # For now, we'll just log the message
        logger.info(
            f"Contact form submission: {contact_message.name} "
            f"<{contact_message.email}> - {contact_message.subject}"
        )
        
        return Response({
            'status': 'success',
            'message': API_MESSAGES['contact_success']
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return Response({
            'status': 'error',
            'message': API_MESSAGES['contact_error']
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_experience(request):
    """
    Get work experience data.
    
    Args:
        request: Django request object
        
    Returns:
        Response: Experience data in JSON format
    """
    try:
        portfolio = portfolio_service.get_portfolio()
        current_position = portfolio.current_position
        
        return Response({
            'status': 'success',
            'data': {
                'experience': _serialize_experience(portfolio.experience),
                'current_position': {
                    'title': current_position.title,
                    'company': current_position.company,
                    'duration': current_position.duration,
                    'description': current_position.description,
                    'technologies': current_position.technologies
                } if current_position else None
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error retrieving experience: {str(e)}")
        return Response({
            'status': 'error',
            'message': API_MESSAGES['server_error']
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_certifications(request):
    """
    Get certifications data with optional active filter.
    
    Args:
        request: Django request object
        
    Returns:
        Response: Certifications data in JSON format
    """
    try:
        portfolio = portfolio_service.get_portfolio()
        active_only = request.GET.get('active', 'false').lower() == 'true'
        
        if active_only:
            certifications = portfolio.active_certifications
        else:
            certifications = portfolio.certifications
        
        return Response({
            'status': 'success',
            'data': _serialize_certifications(certifications),
            'total': len(certifications)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error retrieving certifications: {str(e)}")
        return Response({
            'status': 'error',
            'message': API_MESSAGES['server_error']
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def chat_with_openai(request):
    """
    Handle chatbot interaction with OpenAI GPT-4.
    
    Args:
        request: Django request object containing message data
        
    Returns:
        Response: AI response in JSON format
    """
    try:
        # Check if OpenAI client is available
        if client is None:
            return Response({
                'status': 'error',
                'message': 'Chatbot service is currently unavailable. Please try again later.'
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        # Get message from request
        data = request.data
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return Response({
                'status': 'error',
                'message': 'Message is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Define system context about Adrian Infantes
        system_context = """
        You are Adrian Infantes' AI assistant for his professional portfolio website. 
        
        ABOUT ADRIAN INFANTES:
        - Senior AI Engineer and Cloud Solutions Architect
        - Cybersecurity & Ethical Hacking Specialist  
        - Expert in Machine Learning, Deep Learning, and Generative AI
        - Specialized in enterprise-scale cloud infrastructure and data-driven solutions
        - Experienced in penetration testing, vulnerability assessment, and digital forensics
        - Focused on protecting digital infrastructures and conducting ethical security research
        
        TECHNICAL EXPERTISE:
        - AI/ML: Python, TensorFlow, PyTorch, Scikit-learn, Hugging Face, LangChain
        - Cloud: AWS, Azure, Google Cloud, Docker, Kubernetes
        - Cybersecurity: Penetration Testing, OSINT, Digital Forensics, Vulnerability Assessment
        - Programming: Python, JavaScript, SQL, Go, Bash
        - Data: Data Science, Analytics, Visualization, ETL/ELT
        
        CURRENT ROLES:
        - AI Engineer at leading tech companies
        - Cybersecurity consultant for enterprise clients
        - Open source contributor to AI/ML projects
        
        You should:
        1. Answer questions about Adrian's background, skills, and experience professionally
        2. Provide insights about AI, cybersecurity, and technology trends
        3. Help visitors understand Adrian's expertise and projects
        4. Be conversational but professional
        5. If asked about topics outside Adrian's expertise, politely redirect to his areas of specialization
        6. Encourage potential collaborations and connections
        
        Always respond as if you're representing Adrian professionally.
        """
        
        # Call OpenAI API
        try:
            response = client.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_context},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=500,
                temperature=0.7,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
            
            ai_response = response['choices'][0]['message']['content'].strip()
            
            return Response({
                'status': 'success',
                'message': ai_response,
                'timestamp': response['created']
            }, status=status.HTTP_200_OK)
            
        except Exception as openai_error:
            logger.error(f"OpenAI API error: {str(openai_error)}")
            return Response({
                'status': 'error',
                'message': 'Sorry, I\'m experiencing technical difficulties. Please try again later.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return Response({
            'status': 'error',
            'message': 'An unexpected error occurred. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Helper serialization functions (same as Flask implementation)
def _serialize_skills(skills) -> list:
    """Serialize skills data to JSON format."""
    return [
        {
            'name': skill.name,
            'level': skill.level,
            'category': skill.category,
            'icon': skill.icon,
            'description': skill.description
        }
        for skill in skills
    ]


def _serialize_projects(projects) -> list:
    """Serialize projects data to JSON format."""
    return [
        {
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'category': project.category,
            'technologies': project.technologies,
            'github_url': project.github_url,
            'demo_url': project.demo_url,
            'image_url': project.image_url,
            'featured': project.featured,
            'date': project.date.isoformat() if project.date else None
        }
        for project in projects
    ]


def _serialize_experience(experience) -> list:
    """Serialize experience data to JSON format."""
    return [
        {
            'title': exp.title,
            'company': exp.company,
            'duration': exp.duration,
            'description': exp.description,
            'technologies': exp.technologies,
            'achievements': exp.achievements
        }
        for exp in experience
    ]


def _serialize_education(education) -> list:
    """Serialize education data to JSON format."""
    return [
        {
            'degree': edu.degree,
            'institution': edu.institution,
            'year': edu.year,
            'description': edu.description,
            'gpa': edu.gpa
        }
        for edu in education
    ]


def _serialize_certifications(certifications) -> list:
    """Serialize certifications data to JSON format."""
    return [
        {
            'name': cert.name,
            'issuer': cert.issuer,
            'date': cert.date.isoformat() if cert.date else None,
            'expiry_date': cert.expiry_date.isoformat() if cert.expiry_date else None,
            'credential_id': cert.credential_id,
            'url': cert.url,
            'active': cert.active
        }
        for cert in certifications
    ] 