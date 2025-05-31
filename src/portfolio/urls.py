"""
URL configuration for AI & Cybersecurity Portfolio.

Django project URLs with i18n support.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns

# URLs sin prefijo de idioma (APIs, etc.)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('src.portfolio.api_urls')),
]

# URLs con prefijo de idioma
urlpatterns += i18n_patterns(
    path('', include('src.portfolio.portfolio_urls')),
    prefix_default_language=False,
)

# Servir archivos estáticos en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 