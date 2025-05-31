# Adrian Infantes - AI & Cybersecurity Portfolio

A modern, minimalist portfolio website for an AI and Cybersecurity Engineer built with Flask and containerized with Docker.

## 🏗️ Architecture

This project follows a modular architecture with clear separation of concerns:

```
src/
├── controllers/     # Route handlers and request processing
├── services/        # Business logic and data processing  
├── models/          # Data structures and validation
├── utils/           # Helper functions and configuration
├── templates/       # HTML templates
├── static/          # CSS, JavaScript, and assets
└── main.py         # Application entry point
```

## 🚀 Quick Start with Docker Compose

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

### Development Environment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AdrianInfantes-Portfolio
   ```

2. **Build and start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Portfolio: http://localhost:5000
   - Health check: http://localhost:5000/health

4. **Stop the application**
   ```bash
   docker-compose down
   ```

### Production Environment

1. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Start with production profile**
   ```bash
   docker-compose --profile production up -d
   ```

3. **View logs**
   ```bash
   docker-compose logs -f portfolio
   ```

## 🐳 Docker Commands Reference

### Development Commands
```bash
# Build and start in development mode
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View real-time logs
docker-compose logs -f portfolio

# Restart specific service
docker-compose restart portfolio

# Execute shell in running container
docker-compose exec portfolio /bin/bash

# Stop all services
docker-compose down

# Remove volumes (data will be lost)
docker-compose down -v
```

### Production Commands
```bash
# Start production environment with nginx
docker-compose --profile production up -d

# Scale application (if needed)
docker-compose --profile production up -d --scale portfolio=3

# Update application
docker-compose pull
docker-compose --profile production up -d

# Backup logs
docker-compose exec portfolio tar -czf /app/logs/backup-$(date +%Y%m%d).tar.gz /app/logs/*.log
```

### Maintenance Commands
```bash
# Check container health
docker-compose ps

# View resource usage
docker stats adrianinfantes-portfolio

# Clean up unused resources
docker system prune -a

# Update base images
docker-compose pull
docker-compose up --build -d
```

## 🛠️ Development Setup

### Local Development (without Docker)
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export FLASK_ENV=development
export SECRET_KEY=your-secret-key

# Run application
python src/main.py
```

### Environment Variables
Create a `.env` file in the root directory:
```env
SECRET_KEY=your-super-secret-key-here
PORTFOLIO_EMAIL=your-email@domain.com
FLASK_ENV=development
```

## 📁 Project Structure

```
AdrianInfantes-Portfolio/
├── src/
│   ├── controllers/         # Flask blueprints and route handlers
│   ├── services/           # Business logic layer
│   ├── models/             # Data models and validation
│   ├── utils/              # Configuration and helpers
│   ├── templates/          # Jinja2 HTML templates
│   ├── static/             # CSS, JS, images
│   └── main.py            # Application entry point
├── assets/                 # Portfolio assets (images, documents)
├── docs/                   # Documentation and architecture
├── Dockerfile             # Container definition
├── docker-compose.yml     # Multi-service configuration
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## 🎨 Features

- **Responsive Design**: Modern, mobile-first CSS Grid/Flexbox layout
- **Modular Architecture**: Clean separation with SOLID principles
- **Docker Ready**: Containerized for easy deployment
- **Security First**: Input validation, CSRF protection, secure headers
- **Performance**: Optimized images, minified assets, caching headers
- **SEO Optimized**: Meta tags, structured data, sitemap

## 🔧 Technology Stack

### Backend
- **Flask 3.0**: Modern Python web framework
- **Jinja2**: Template engine for dynamic content
- **WTForms**: Form handling and validation
- **Gunicorn**: Production WSGI server

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid/Flexbox
- **JavaScript ES6**: Interactive components
- **Font Awesome**: Icon library

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-service orchestration
- **Nginx**: Reverse proxy (production)

## 📊 Monitoring & Health Checks

The application includes health check endpoints:
- `GET /health` - Application health status
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

Monitor with:
```bash
curl http://localhost:5000/health
```

## 🚦 Status

- ✅ **Sprint 1 Completed**: Architecture, Docker setup, base modules
- 🔄 **Sprint 2 In Progress**: Services, controllers, frontend
- ⏳ **Sprint 3 Planned**: UI/UX, animations, deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Adrian Infantes**
- AI & Cybersecurity Engineer
- Email: contact@adrianinfantes.com
- LinkedIn: [adrianinfantes](https://linkedin.com/in/adrianinfantes)
- GitHub: [adrianinfantes](https://github.com/adrianinfantes) 