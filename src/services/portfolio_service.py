"""
Portfolio service module for AI & Cybersecurity Portfolio.

This module implements the business logic for portfolio data management
following the Service Layer pattern and SOLID principles.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from src.models.portfolio_models import (
    Portfolio, PersonalInfo, Skill, Project, 
    Experience, Education, Certification, Study
)
from src.utils.constants import SKILLS_CATEGORIES, PROJECT_CATEGORIES


class PortfolioService:
    """Service class for portfolio data management and business logic."""
    
    def __init__(self):
        """Initialize the portfolio service with sample data."""
        self._portfolio_data = self._create_sample_portfolio()
    
    def get_portfolio(self) -> Portfolio:
        """
        Get complete portfolio data.
        
        Returns:
            Portfolio: Complete portfolio object with all information
        """
        return self._portfolio_data
    
    def get_personal_info(self) -> PersonalInfo:
        """
        Get personal information only.
        
        Returns:
            PersonalInfo: Personal information object
        """
        return self._portfolio_data.personal_info
    
    def get_skills_by_category(self) -> Dict[str, List[Skill]]:
        """
        Get skills organized by category.
        
        Returns:
            Dict[str, List[Skill]]: Skills grouped by category
        """
        skills_by_category = {}
        for skill in self._portfolio_data.skills:
            category = skill.category
            if category not in skills_by_category:
                skills_by_category[category] = []
            skills_by_category[category].append(skill)
        return skills_by_category
    
    def get_featured_projects(self) -> List[Project]:
        """
        Get featured projects only.
        
        Returns:
            List[Project]: List of featured projects
        """
        return self._portfolio_data.featured_projects
    
    def get_projects_by_category(self, category: Optional[str] = None) -> List[Project]:
        """
        Get projects filtered by category.
        
        Args:
            category: Optional category filter
            
        Returns:
            List[Project]: Filtered list of projects
        """
        if category is None:
            return self._portfolio_data.projects
        return [p for p in self._portfolio_data.projects if p.category == category]
    
    def get_current_experience(self) -> Optional[Experience]:
        """
        Get current work experience.
        
        Returns:
            Optional[Experience]: Current position or None
        """
        return self._portfolio_data.current_position
    
    def get_active_certifications(self) -> List[Certification]:
        """
        Get active (non-expired) certifications.
        
        Returns:
            List[Certification]: List of active certifications
        """
        return self._portfolio_data.active_certifications
    
    def get_studies(self) -> List[Study]:
        """
        Get all studies/masters.
        
        Returns:
            List[Study]: List of academic studies
        """
        return self._portfolio_data.studies
    
    def _create_sample_portfolio(self) -> Portfolio:
        """
        Create sample portfolio data for demonstration.
        
        Returns:
            Portfolio: Sample portfolio object
        """
        # Personal Information
        personal_info = PersonalInfo(
            name="Adrian Infantes",
            subtitle="AI Engineer & Cybersecurity Specialist",
            bio="Senior AI Engineer specialized in developing scalable AI and machine learning solutions for enterprise environments. Expert in cybersecurity, generative AI models, and MLOps infrastructure. Currently architecting intelligent cloud solutions at BBVA AI Factory.",
            location="Madrid, Spain",
            email="adrian.infantes@protonmail.com",
            phone="+34 600 000 000",
            linkedin="https://www.linkedin.com/in/adrian-infantes-romero/",
            github="https://github.com/infantesromeroadrian"
        )
        
        # Skills
        skills = self._create_sample_skills()
        
        # Projects
        projects = self._create_sample_projects()
        
        # Experience
        experience = self._create_sample_experience()
        
        # Education
        education = self._create_sample_education()
        
        # Certifications
        certifications = self._create_sample_certifications()
        
        # Studies
        studies = self._create_sample_studies()
        
        # Initialize featured projects
        featured_projects = [
            Project(
                title="🤖 AI Agents Hospital",
                description="Intelligent multi-agent hospital simulation system with AI agents specialized in different medical roles. Uses advanced prompt engineering and coordination between autonomous agents for realistic healthcare simulations.",
                technologies=["Python", "LangChain", "OpenAI GPT-4", "Streamlit", "Multi-Agent Systems", "Healthcare AI", "Prompt Engineering", "Docker"],
                github_url="https://github.com/infantesromeroadrian/Hospital-Agentes-AI",
                demo_url="http://127.0.0.1:3567",
                image_url="/static/images/ai-hospital-langgraph.gif"
            ),
            Project(
                title="🗺️ OSINT Geographic Analysis Tool",
                description="Advanced geographic intelligence platform that combines OSINT techniques with geospatial analysis. Features interactive mapping, location-based threat assessment, and comprehensive geographic data visualization for cybersecurity investigations.",
                technologies=["Python", "Streamlit", "Folium", "GeoPandas", "OSINT", "Geographic Analysis", "Cybersecurity", "Intelligence Gathering", "Interactive Maps", "Docker"],
                github_url="https://github.com/infantesromeroadrian/Herramienta-Analisis-Geografico-OSINT",
                demo_url="http://localhost:4001",
                image_url="/static/images/drone-geo-analysis.gif"
            ),
            Project(
                title="🧠 Advanced RAG System",
                description="Next-generation Retrieval Augmented Generation system combining vector databases, semantic search, and large language models. Features advanced document processing, intelligent chunking, and contextual response generation.",
                technologies=["Python", "ChromaDB", "Sentence Transformers", "OpenAI", "LangChain", "Vector Search", "RAG", "NLP", "Semantic Search", "FastAPI"],
                github_url="https://github.com/infantesromeroadrian/LLM-RAG-System-Advances",
                image_url="/static/images/rag_system_demo.gif"
            ),
            Project(
                title="📊 Multi-Agent Data Analysis",
                description="Intelligent data analysis system using multiple AI agents specialized in different analytical tasks. Features automated data exploration, pattern recognition, and comprehensive reporting through agent collaboration.",
                technologies=["Python", "Pandas", "Multi-Agent Systems", "OpenAI", "Data Science", "Automated Analysis", "Agent Coordination", "Streamlit", "Machine Learning"],
                github_url="https://github.com/infantesromeroadrian/Analisis-Datos-MultiAgente",
                image_url="/static/images/multi_agent_analysis_demo.gif"
            )
        ]
        
        return Portfolio(
            personal_info=personal_info,
            skills=skills,
            projects=projects,
            experience=experience,
            education=education,
            certifications=certifications,
            studies=studies,
            featured_projects=featured_projects
        )
    
    def _create_sample_skills(self) -> List[Skill]:
        """Create consolidated AI/ML stack skills organized in aesthetic categories."""
        skills = []
        
        # 1. 🐍 Core Programming & Data Foundation
        programming_foundation = [
            ("Python", 98), ("SQL", 92), ("JavaScript", 87), ("HTML/CSS", 82),
            ("Pandas", 98), ("NumPy", 97), ("Polars", 88)
        ]
        for skill_name, proficiency in programming_foundation:
            skills.append(Skill(
                name=skill_name,
                category="🐍 Programming Foundation",
                proficiency=proficiency,
                description="Core programming languages and data manipulation frameworks"
            ))
        
        # 2. 🧠 Machine Learning & Deep Learning Core
        ml_deep_learning = [
            ("scikit-learn", 95), ("PyTorch", 92), ("TensorFlow", 90),
            ("Keras", 88), ("XGBoost", 85), ("LightGBM", 83)
        ]
        for skill_name, proficiency in ml_deep_learning:
            skills.append(Skill(
                name=skill_name,
                category="🧠 ML & Deep Learning",
                proficiency=proficiency,
                description="Advanced machine learning and neural network frameworks"
            ))
        
        # 3. 🤖 Generative AI & LLM Ecosystem
        generative_ai_stack = [
            ("OpenAI GPT", 98), ("Gemini", 95), ("Claude", 90),
            ("Transformers (HF)", 95), ("Hugging Face PEFT", 95),
            ("LangChain", 98), ("LangGraph", 92), ("LlamaIndex", 88)
        ]
        for skill_name, proficiency in generative_ai_stack:
            skills.append(Skill(
                name=skill_name,
                category="🤖 Generative AI & LLMs",
                proficiency=proficiency,
                description="Large language models and generative AI technologies"
            ))
        
        # 4. 🔍 AI Infrastructure & Vector Technologies
        ai_infrastructure = [
            ("Vector Databases", 95), ("Pinecone", 90), ("Chroma", 88),
            ("Weaviate", 85), ("FAISS", 92), ("Embedding Models", 93),
            ("Retrieval-Augmented Generation", 95)
        ]
        for skill_name, proficiency in ai_infrastructure:
            skills.append(Skill(
                name=skill_name,
                category="🔍 AI Infrastructure & RAG",
                proficiency=proficiency,
                description="Vector databases and retrieval-augmented generation systems"
            ))
        
        # 5. ☁️ Enterprise Cloud & MLOps
        cloud_mlops = [
            ("Azure Cognitive Services", 95), ("Azure Machine Learning", 92), 
            ("Azure Functions", 90), ("Azure DevOps", 88), ("MLflow", 92),
            ("Docker", 95), ("Kubernetes", 88), ("CI/CD", 90)
        ]
        for skill_name, proficiency in cloud_mlops:
            skills.append(Skill(
                name=skill_name,
                category="☁️ Cloud & MLOps",
                proficiency=proficiency,
                description="Enterprise cloud architecture and ML operations"
            ))
        
        # 6. 🎨 Data Visualization & Analytics
        data_visualization = [
            ("Plotly", 90), ("Matplotlib", 88), ("Seaborn", 85),
            ("Streamlit", 85), ("Tableau", 80), ("Power BI", 88)
        ]
        for skill_name, proficiency in data_visualization:
            skills.append(Skill(
                name=skill_name,
                category="🎨 Data Visualization",
                proficiency=proficiency,
                description="Advanced data visualization and business intelligence"
            ))
        
        # 7. 🔐 Cybersecurity & Ethical Hacking
        cyber_security = [
            ("Penetration Testing", 90), ("Vulnerability Assessment", 85),
            ("Network Security", 88), ("Web Application Security", 92),
            ("Metasploit", 92), ("Burp Suite", 90), ("Nmap", 95), 
            ("Kali Linux", 93), ("Wireshark", 88), ("OWASP ZAP", 85)
        ]
        for skill_name, proficiency in cyber_security:
            skills.append(Skill(
                name=skill_name,
                category="🔐 Cybersecurity & Pentesting",
                proficiency=proficiency,
                description="Cybersecurity, penetration testing, and ethical hacking"
            ))
        
        # 8. 🚀 Backend & API Development
        backend_development = [
            ("FastAPI", 95), ("Flask", 90), ("Django", 87),
            ("REST APIs", 92), ("GraphQL", 80), ("Microservices", 85),
            ("Apache Spark", 85), ("Redis", 83)
        ]
        for skill_name, proficiency in backend_development:
            skills.append(Skill(
                name=skill_name,
                category="🚀 Backend & APIs",
                proficiency=proficiency,
                description="Backend development and API architecture"
            ))
        
        return skills
    
    def _create_sample_projects(self) -> List[Project]:
        """Create sample projects data."""
        return [
            Project(
                id="ai-medical-center-langgraph",
                title="Hospital de Agentes de AI",
                description="Sistema multiagente de IA médica construido con LangGraph que coordina agentes especializados en diferentes especialidades médicas para proporcionar diagnósticos y consultas integrales",
                category="Machine Learning",
                technologies=["LangGraph", "LangChain", "OpenAI", "Groq", "Flask", "Docker", "Python"],
                github_url="https://github.com/infantesromeroadrian/AI-MedicalCenter-LangGraph",
                demo_url="http://localhost:3567",
                image_url="/static/images/ai-hospital-langgraph.gif",
                created_date=datetime(2024, 12, 1),
                featured=True
            ),
            Project(
                id="drone-geo-analysis-osint",
                title="Herramienta de Análisis Geográfico OSINT",
                description="Sistema avanzado de análisis geográfico militar que utiliza GPT-4 Vision para determinar ubicaciones geográficas basándose en características visuales como arquitectura, señalización, vegetación y estructura urbana",
                category="Cybersecurity",
                technologies=["Python", "GPT-4 Vision", "OpenAI API", "Docker", "OSINT", "Geospatial Analysis", "HTML"],
                github_url="https://github.com/infantesromeroadrian/Drone-Geo-Analysis",
                demo_url="http://localhost:5000",
                image_url="/static/images/drone-geo-analysis.gif",
                created_date=datetime(2024, 11, 15),
                featured=True
            ),
            Project(
                id="enterprise-ai-platform",
                title="Enterprise AI Conversational Platform",
                description="Scalable conversational AI platform with advanced NLU capabilities serving enterprise clients with 24/7 multilingual support",
                category="Machine Learning",
                technologies=["Azure Bot Service", "Azure Cognitive Services", "Python", "Azure Functions"],
                github_url="https://github.com/infantesromeroadrian",
                demo_url="https://demo.adrianinfantes.com/ai-platform",
                image_url="/static/images/projects/ai-platform.jpg",
                created_date=datetime(2024, 2, 15),
                featured=True
            ),
            Project(
                id="executive-analytics-suite",
                title="Real-Time Executive Analytics Suite",
                description="Comprehensive business intelligence platform delivering real-time insights and predictive analytics for C-level decision making",
                category="Data Analysis",
                technologies=["Power BI", "Azure Data Factory", "SQL Server", "Azure Synapse"],
                github_url="https://github.com/infantesromeroadrian",
                demo_url="https://demo.adrianinfantes.com/analytics-suite",
                image_url="/static/images/projects/analytics-suite.jpg",
                created_date=datetime(2024, 1, 20),
                featured=True
            ),
            Project(
                id="automated-ml-framework",
                title="Automated ML Operations Framework",
                description="End-to-end MLOps pipeline with automated model training, validation, and deployment for financial risk assessment at enterprise scale",
                category="Machine Learning",
                technologies=["Azure ML Studio", "Azure DevOps", "Python", "Docker", "Kubernetes"],
                github_url="https://github.com/infantesromeroadrian",
                demo_url="https://demo.adrianinfantes.com/mlops-framework",
                image_url="/static/images/projects/mlops-framework.jpg",
                created_date=datetime(2024, 3, 10),
                featured=True
            )
        ]
    
    def _create_sample_experience(self) -> List[Experience]:
        """Create sample experience data."""
        return [
            # BBVA Current Position
            Experience(
                company="BBVA AI Factory",
                position="AI/ML Engineer - Senior",
                duration="Jan 2024 - Present",
                description="Development of advanced generative AI, NLP and MLOps solutions for critical applications in banking and customer experience.",
                technologies=["GPT-4", "LLaMA-3", "PyTorch", "Hugging Face", "LangChain", "Azure ML", "MLflow", "Kubernetes"],
                achievements=[
                    "LLM Banking Architectures (RAG + CUDA): Designed financial systems with GPT-4 and LLaMA-3, integrating Pinecone and Azure Cognitive Search",
                    "GPU NVIDIA optimization with GGUF quantization (-20% latency)",
                    "+15% accuracy in hybrid models (PyTorch + Hugging Face)",
                    "Conversational NLP & Customer Experience: Real-time sentiment analysis with BERT (+18% satisfaction)",
                    "Scalable multilingual pipelines (spaCy + Azure Speech), +10M interactions",
                    "-35% in inference costs thanks to model optimization",
                    "Conversational Core with LangChain: AI assistant with Dialogflow + LangChain, +500K queries/month",
                    "Auto-scaling with Kubernetes, 99.95% availability",
                    "Intent clustering: -40% repetitive tasks",
                    "Enterprise MLOps (AzureML + MLflow): Automated CI/CD, -40% production time",
                    "Drift monitoring with Evidently AI, 99.9% SLA",
                    "Unification of +50 cloud-native models",
                    "Credit Risk Models: +22% AUC-ROC with XGBoost + NLP",
                    "Processing 50K documents/day with ElasticSearch"
                ]
            ),
            
            # Ecoembes Previous Position
            Experience(
                company="Ecoembes",
                position="Machine Learning Engineer - Mid",
                duration="Feb 2020 - Jan 2024",
                description="Implementation of artificial intelligence solutions applied to sustainability, logistics efficiency and conversational experience.",
                technologies=["Python", "TensorFlow 2.4", "BERT", "OpenCV 4.2", "Azure Databricks", "Azure ML Studio", "MLflow", "Google OR-Tools"],
                achievements=[
                    "Pre-Transformer Chatbot Evolution (2020–2022): Migration from RNN/LSTM architectures to multilingual BERT-base (Esp/Eng)",
                    "Complete pipeline from Azure Databricks to Azure Container Instances",
                    "First Spanish banking chatbot: 89% accuracy in intent detection",
                    "40% reduction in false positives applying Word2Vec + CRF for NER",
                    "Waste Classification Revolution (2021–2023): Hybrid architecture: Inception-v3 (TensorFlow 2.4) + Random Forest for 12 classes",
                    "Dataset of 45K images, preprocessed with OpenCV 4.2 and Azure Synapse",
                    "IoT integration: Industrial cameras via Azure IoT Hub",
                    "85% accuracy in production, +15% over manual solutions",
                    "Historical Logistics Optimization (2020–2024): Phase 1: GRASP + Tabu Search algorithms in pure Python",
                    "Phase 2: Migration to Google OR-Tools with Azure Batch",
                    "Integration +50 REST telemetry APIs via Azure API Management",
                    "Results: -25% km traveled, -18% CO₂ emissions",
                    "Evolving MLOps (2020–2024): 2020: Initial pipelines in Azure ML Studio Classic",
                    "2022: Transition to MLflow + Azure DevOps for CI/CD",
                    "2023: Monitoring with Application Insights + custom alerts",
                    "90% automation of retraining with Azure Functions v3"
                ]
            ),
            
            # Capgemini First Position
            Experience(
                company="Capgemini",
                position="Data Scientist - Junior",
                duration="Jan 2017 - Feb 2020",
                description="Collaboration on data analysis projects applied to product development, market trend identification and key insight visualization.",
                technologies=["Python", "R", "SQL", "Tableau", "Looker Studio", "pandas", "numpy", "scikit-learn", "statsmodels", "SQLAlchemy"],
                achievements=[
                    "Data Collection & Integration: Built data repositories from multiple sources through efficient ETL processes",
                    "Designed a centralized data repository for market trend analysis and exploration",
                    "SQL database administration to ensure efficient queries",
                    "Collaboration with technical teams for data structure optimization",
                    "Advanced Analysis & Modeling: Applied statistical models and machine learning to identify patterns",
                    "Generated actionable insights to guide customer-centric product improvements",
                    "Evaluated historical and current data to detect emerging opportunities",
                    "Developed predictive analytics using scikit-learn and statsmodels",
                    "Visualization & Dashboards: Designed interactive dashboards in Tableau and Looker Studio",
                    "Developed executive dashboards for communicating key KPIs",
                    "Facilitated executive decision-making through clear visualizations",
                    "Created analytical reports for various stakeholders",
                    "Data Management & Reporting: Created analytical reports and detailed documentation",
                    "Developed analysis and strategic reporting tools",
                    "Trend analysis for market opportunity identification",
                    "Effective collaboration with multidisciplinary teams"
                ]
            )
        ]
    
    def _create_sample_education(self) -> List[Education]:
        """Create sample education data."""
        return [
            Education(
                id="msc-cybersecurity",
                institution="Universidad Politécnica de Madrid",
                degree="Master of Science",
                field_of_study="Cybersecurity and AI",
                start_date=datetime(2019, 9, 1),
                end_date=datetime(2021, 6, 30),
                gpa=8.7,
                description="Specialized in AI applications for cybersecurity",
                achievements=[
                    "Graduated Magna Cum Laude",
                    "Research focus on ML for malware detection",
                    "Published thesis on neural networks in threat detection"
                ]
            ),
            Education(
                id="bsc-computer-science",
                institution="Universidad Complutense Madrid",
                degree="Bachelor of Science",
                field_of_study="Computer Science",
                start_date=datetime(2015, 9, 1),
                end_date=datetime(2019, 6, 30),
                gpa=8.2,
                description="Foundation in computer science and programming",
                achievements=[
                    "Dean's List for 4 consecutive semesters",
                    "Winner of university programming contest",
                    "Leader of cybersecurity student group"
                ]
            )
        ]
    
    def _create_sample_certifications(self) -> List[Certification]:
        """Create sample certifications data."""
        return [
            Certification(
                id="azure-ai-102",
                name="Microsoft Certified: Azure AI Engineer Associate (AI-102)",
                issuer="Microsoft",
                issue_date=datetime(2024, 3, 15),
                expiry_date=None,  # No expiry
                credential_id="AI-102-2024",
                credential_url="/static/images/Adrian_Infantes_Azure_AI102_Certificate.pdf"
            ),
            Certification(
                id="azure-solutions-architect",
                name="Microsoft Certified: Azure Solutions Architect Expert (AZ-305)",
                issuer="Microsoft",
                issue_date=datetime(2024, 1, 20),
                expiry_date=None,  # No expiry
                credential_id="AZ-305-2024",
                credential_url=None
            ),
            Certification(
                id="azure-data-scientist",
                name="Microsoft Certified: Azure Data Scientist Associate (DP-100)",
                issuer="Microsoft",
                issue_date=datetime(2023, 11, 10),
                expiry_date=None,  # No expiry
                credential_id="DP-100-2023",
                credential_url=None
            ),
            Certification(
                id="power-platform-fundamentals",
                name="Microsoft Certified: Power Platform Fundamentals (PL-900)",
                issuer="Microsoft",
                issue_date=datetime(2023, 9, 15),
                expiry_date=None,  # No expiry
                credential_id="PL-900-2023",
                credential_url=None
            ),
            Certification(
                id="azure-fundamentals",
                name="Microsoft Certified: Azure Fundamentals (AZ-900)",
                issuer="Microsoft",
                issue_date=datetime(2023, 6, 20),
                expiry_date=None,  # No expiry
                credential_id="AZ-900-2023",
                credential_url=None
            ),
            Certification(
                id="python-its",
                name="Python Programming Certificate",
                issuer="Instructional Technology Solutions (ITS)",
                issue_date=datetime(2023, 9, 15),
                expiry_date=None,  # No expiry
                credential_id="ITS-PYTHON-2023",
                credential_url="/static/images/ITS-Badges_Python_1200px.png"
            )
        ]
    
    def _create_sample_studies(self) -> List[Study]:
        """Create sample studies data."""
        return [
            Study(
                id="trinity-bachelors-degree",
                title="Bachelor's Degree in Computer Science",
                institution="Trinity College",
                year_completed="2016",
                grade="Cum Laude",
                description="Bachelor's degree in Computer Science with specialization in programming, algorithms, and fundamentals of computer science.",
                duration="4 years",
                specialization="Computer Science",
                image_url="/static/images/Adrian_Infantes_Trinity_Bachelors_Degree.jpeg",
                skills=["Programming Fundamentals", "Data Structures", "Algorithms", "Software Engineering", "Database Management", "Computer Networks", "Operating Systems", "Web Development", "Mathematics", "Logic"]
            ),
            Study(
                id="master-big-data-data-science",
                title="Master's in Big Data & Data Science",
                institution="Mioti Tech School",
                year_completed="2020",
                grade="Excellent",
                description="Specialized master's in big data analysis, machine learning, and data science applied to business environments.",
                duration="12 months",
                specialization="Big Data Analytics & Data Science",
                image_url="/static/images/Adrian_Infantes_MasterDataScience_BigData.png",
                skills=["Apache Spark", "Hadoop", "Python", "R", "SQL", "Machine Learning", "Data Visualization", "Statistical Analysis", "Business Intelligence", "Data Mining"]
            ),
            Study(
                id="master-deep-learning-gen-ai",
                title="Master's in Deep Learning & Generative AI",
                institution="Mioti Tech School",
                year_completed="2023",
                grade="Summa Cum Laude",
                description="Advanced master's in deep neural networks, generative artificial intelligence, and large language models (LLMs).",
                duration="12 months",
                specialization="Deep Learning & Generative AI",
                image_url="/static/images/Adrian_Infantes_MasterDeepLearning_GenAI.png",
                skills=["PyTorch", "TensorFlow", "Transformers", "GANs", "VAEs", "LLMs", "Hugging Face", "OpenAI", "Neural Architecture Search", "Computer Vision", "NLP", "Reinforcement Learning"]
            )
        ] 