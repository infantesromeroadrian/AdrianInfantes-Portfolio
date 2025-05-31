"""
Data models for AI & Cybersecurity Portfolio.

This module defines the data structures used throughout the application
using dataclasses for immutability and type safety.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from datetime import datetime
import re
from src.utils.constants import CONTACT_FORM_FIELDS


@dataclass(frozen=True)
class PersonalInfo:
    """Model representing personal information."""
    
    name: str
    subtitle: str
    bio: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    avatar_url: Optional[str] = None


@dataclass(frozen=True)
class Skill:
    """Model representing a skill with proficiency level."""
    
    name: str
    category: str
    proficiency: int  # 1-100 scale
    description: Optional[str] = None
    
    def __post_init__(self):
        """Validate skill proficiency level."""
        if not 0 <= self.proficiency <= 100:
            raise ValueError("Proficiency must be between 0 and 100")


@dataclass(frozen=True)
class Project:
    """Model representing a portfolio project."""
    
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    id: Optional[str] = None
    category: Optional[str] = None
    created_date: Optional[datetime] = None
    featured: bool = False
    
    def __post_init__(self):
        """Validate project data."""
        if not self.title.strip():
            raise ValueError("Project title cannot be empty")
        if not self.description.strip():
            raise ValueError("Project description cannot be empty")


@dataclass(frozen=True)
class Experience:
    """Model representing work experience."""
    
    company: str
    position: str
    duration: str
    description: str
    technologies: List[str] = field(default_factory=list)
    achievements: List[str] = field(default_factory=list)
    id: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    
    @property
    def is_current(self) -> bool:
        """Check if this is current position."""
        return self.end_date is None
    
    @property
    def duration_months(self) -> int:
        """Calculate duration in months."""
        if not self.start_date:
            return 0
        end = self.end_date or datetime.now()
        return (end.year - self.start_date.year) * 12 + end.month - self.start_date.month


@dataclass(frozen=True)
class Education:
    """Model representing educational background."""
    
    id: str
    institution: str
    degree: str
    field_of_study: str
    start_date: datetime
    end_date: Optional[datetime] = None
    gpa: Optional[float] = None
    description: Optional[str] = None
    achievements: List[str] = field(default_factory=list)


@dataclass(frozen=True)
class Certification:
    """Model representing professional certifications."""
    
    id: str
    name: str
    issuer: str
    issue_date: datetime
    expiry_date: Optional[datetime] = None
    credential_id: Optional[str] = None
    credential_url: Optional[str] = None
    verification_url: Optional[str] = None
    description: Optional[str] = None
    skills_validated: List[str] = field(default_factory=list)
    
    @property
    def is_valid(self) -> bool:
        """Check if certification is still valid."""
        if self.expiry_date is None:
            return True
        return datetime.now() < self.expiry_date


@dataclass(frozen=True)
class Study:
    """Model representing academic studies/masters."""
    
    id: str
    title: str
    institution: str
    description: str
    year_completed: str
    grade: str
    duration: str
    specialization: str
    image_url: str
    skills: List[str] = field(default_factory=list)
    completion_date: Optional[datetime] = None
    skills_acquired: List[str] = field(default_factory=list)


@dataclass
class ContactMessage:
    """Model representing a contact form message."""
    
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = field(default_factory=datetime.now)
    
    def __post_init__(self):
        """Validate contact message data."""
        self._validate_field('name', self.name)
        self._validate_field('email', self.email)
        self._validate_field('subject', self.subject)
        self._validate_field('message', self.message)
    
    def _validate_field(self, field_name: str, value: str) -> None:
        """
        Validate a specific field according to constraints.
        
        Args:
            field_name: Name of the field to validate
            value: Value to validate
            
        Raises:
            ValueError: If validation fails
        """
        field_config = CONTACT_FORM_FIELDS.get(field_name, {})
        
        # Check required
        if field_config.get('required', False) and not value.strip():
            raise ValueError(f"{field_name.title()} is required")
        
        # Check length constraints
        min_length = field_config.get('min_length')
        max_length = field_config.get('max_length')
        
        if min_length and len(value) < min_length:
            raise ValueError(f"{field_name.title()} must be at least {min_length} characters")
        
        if max_length and len(value) > max_length:
            raise ValueError(f"{field_name.title()} must not exceed {max_length} characters")
        
        # Check pattern
        pattern = field_config.get('pattern')
        if pattern and not re.match(pattern, value):
            raise ValueError(f"{field_name.title()} format is invalid")


@dataclass(frozen=True)
class Portfolio:
    """Complete portfolio model aggregating all information."""
    
    personal_info: PersonalInfo
    skills: List[Skill]
    projects: List[Project]
    experience: List[Experience]
    education: List[Education]
    certifications: List[Certification]
    studies: List[Study] = field(default_factory=list)
    featured_projects: List[Project] = field(default_factory=list)
    
    @property
    def current_position(self) -> Optional[Experience]:
        """Get current work position."""
        current_positions = [exp for exp in self.experience if exp.is_current]
        return current_positions[0] if current_positions else None
    
    @property
    def active_certifications(self) -> List[Certification]:
        """Get active (non-expired) certifications."""
        return [cert for cert in self.certifications if cert.is_valid] 