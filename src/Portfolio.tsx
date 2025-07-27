import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Code, Brain, Database, Cloud, ExternalLink, ChevronDown, Terminal, Zap, Layers, GitBranch, Download, GraduationCap, BookOpen, Award, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = {
    languages: ['Python'],
    frameworks: ['FastAPI', 'TensorFlow', 'PyTorch', 'Streamlit'],
    tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'VS Code'],
    mlops: ['MLflow', 'AWS SageMaker'],
    libraries: ['NumPy', 'pandas', 'Scikit-Learn', 'OpenCV', 'Hugging Face']
  };

  const projects = [
  {
      title: 'rd-sharma-extraction',
      tech: ['Hugging Face', 'PyTorch', 'Pandas', 'Pillow', 'Python', 'Tesseract OCR', 'Requests', 'NumPy', 'Flask'],
      description: 'A software project implementing rd-sharma-extraction',
      highlights: ['Built rd-sharma-extraction with modern development practices',
      'Features clean, maintainable code architecture',
      'Demonstrates technical problem-solving skills']
    },
    {
      title: 'RD Sharma Question Extraction Pipeline',
      tech: ['Python', 'Transformers', 'PyMuPDF', 'Tesseract OCR', 'EasyOCR', 'Flask', 'NLTK', 'Regex'],
      description: 'AI-driven pipeline that extracts mathematical questions from RD Sharma Class 12 textbook using advanced OCR, LLM processing, and LaTeX generation',
      highlights: ['Advanced OCR with Tesseract and EasyOCR', 'LLM-powered question identification', 'Topic-specific extraction with confidence scoring', 'Professional LaTeX output generation']
    },
    {
      title: 'AI-Powered Virtual Assistant for Object Detection',
      tech: ['Python', 'OpenCV', 'YOLOv9', 'Hugging Face', 'FastAPI', 'MLflow'],
      description: 'Combines real-time object detection with natural language explanations using LLM',
      highlights: ['Real-time YOLOv9 object detection', 'LLM-powered query answering', 'MLOps with MLflow tracking', 'Dockerized microservices']
    },
    {
      title: 'Leaf Disease Detection System',
      tech: ['TensorFlow', 'FastAPI', 'Flask', 'Docker'],
      description: 'Neural network for plant disease classification using PlantVillage dataset',
      highlights: ['CNN-based classification', 'REST API deployment', 'Containerized architecture', 'Interactive web interface']
    },
    {
      title: 'Movie Recommender System',
      tech: ['Python', 'Streamlit', 'Scikit-Learn', 'pandas'],
      description: 'TMDB-based movie recommendation using cosine similarity',
      highlights: ['Feature vector similarity', 'Interactive Streamlit UI', 'Real-time recommendations', 'TMDB5000 dataset']
    }
  ];

  const experience = {
    title: 'Deep Learning and MLOps Intern',
    company: 'Basava Pracheena Vaidya Anveshana Pvt Ltd.',
    duration: 'May 2024 – Dec 2024',
    location: 'Bengaluru, Karnataka',
    achievements: [
      'Developed scalable deep learning models for Tongue and Pulse Diagnosis using YOLO and CNN',
      'Deployed ML models using Docker and AWS SageMaker',
      'Implemented MLOps workflows on AWS EC2',
      'Optimized data preprocessing and model evaluation pipelines'
    ]
  };

  const TypewriterEffect = ({ text, delay = 100 }: { text: string; delay?: number }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, delay]);

    return <span>{displayText}<span className={currentIndex < text.length ? 'animate-pulse' : ''}>|</span></span>;
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );

  const GlowCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-gray-900 rounded-lg border border-gray-800">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Aniruddha HD
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-blue-400 transition-colors duration-300 relative group ${
                    activeSection === item.toLowerCase() ? 'text-blue-400' : ''
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                    activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="py-4 space-y-4 border-t border-gray-700 mt-4">
              {['About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                    activeSection === item.toLowerCase() 
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-blue-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="text-center z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Aniruddha HD
            </h1>
            <div className="text-lg sm:text-2xl md:text-3xl text-gray-300 mb-8 min-h-[4rem] sm:min-h-[6rem] md:min-h-[8rem] flex items-center justify-center">
              <TypewriterEffect text="AI/ML Engineer & Deep Learning Specialist" delay={80} />
            </div>
            <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Crafting intelligent solutions with cutting-edge deep learning models and scalable MLOps pipelines
            </p>
            <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12">
              <a href="mailto:aniruddhahdkedlaya@gmail.com" className="group" target="_blank" rel="noopener noreferrer">
                <div className="p-3 sm:p-4 border border-gray-700 rounded-full hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-blue-400" />
                </div>
              </a>
              <a href="https://linkedin.com/in/Aniruddha-HD" className="group" target="_blank" rel="noopener noreferrer">
                <div className="p-3 sm:p-4 border border-gray-700 rounded-full hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-blue-400" />
                </div>
              </a>
              <a href="https://github.com/Ani-2003-HD" className="group" target="_blank" rel="noopener noreferrer">
                <div className="p-3 sm:p-4 border border-gray-700 rounded-full hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-blue-400" />
                </div>
              </a>
            </div>
            
            {/* Download Resume Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 px-4">
              <a 
                href="/Aniruddha-portfolio/Aniruddha_HD_Resume.pdf" 
                download="Aniruddha_HD_Resume.pdf"
                className="inline-flex items-center justify-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-lg border border-green-500 hover:border-green-400 transition-all duration-300 group transform hover:scale-105"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                <span className="text-base sm:text-lg font-semibold">Download PDF</span>
              </a>
              <a 
                href="/Aniruddha-portfolio/resume.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-300 group transform hover:scale-105"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                <span className="text-base sm:text-lg font-semibold">View Online</span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm a passionate AI/ML Engineer specializing in deep learning and MLOps, having completed my Bachelor's in 
                Artificial Intelligence and Machine Learning at Jyothy Institute of Technology, Bengaluru.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                With hands-on experience in deploying scalable deep learning models and implementing robust MLOps workflows, 
                I bridge the gap between cutting-edge AI research and production-ready solutions.
              </p>
              <div className="flex items-center space-x-4 text-gray-400 mb-6">
                <MapPin className="w-5 h-5" />
                <span>Bengaluru, Karnataka</span>
              </div>
              
              {/* Resume Download in About Section */}
              <div className="flex items-center space-x-4">
                                <a
                  href="/Aniruddha-portfolio/Aniruddha_HD_Resume.pdf"
                  download="Aniruddha_HD_Resume.pdf"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-lg border border-green-500 hover:border-green-400 transition-all duration-300 group transform hover:scale-105"
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span className="font-semibold text-sm">PDF</span>
                </a>
                <a
                  href="/Aniruddha-portfolio/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-300 group transform hover:scale-105"
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span className="font-semibold text-sm">Online</span>
                </a>
                <span className="text-sm text-gray-500">Professional Format</span>
              </div>
            </div>
            <div className="space-y-6">
              <GlowCard>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Brain className="w-8 h-8 text-blue-400" />
                    <h3 className="text-xl font-semibold">Deep Learning Expertise</h3>
                  </div>
                  <p className="text-gray-300">Specialized in computer vision, NLP, and neural network architectures</p>
                </div>
              </GlowCard>
              <GlowCard>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Cloud className="w-8 h-8 text-purple-400" />
                    <h3 className="text-xl font-semibold">MLOps & Deployment</h3>
                  </div>
                  <p className="text-gray-300">Proficient in model deployment, monitoring, and scalable cloud solutions</p>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <GlowCard className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                  <p className="text-xl text-blue-400 mb-2">{experience.company}</p>
                  <p className="text-gray-400">{experience.location}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-sm font-semibold mt-4 md:mt-0">
                  {experience.duration}
                </div>
              </div>
              <div className="space-y-4">
                {experience.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <GlowCard key={index} className="h-full">
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-6 flex-grow">{project.description}</p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start space-x-2">
                          <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-400">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
          
          {/* Current Projects Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🚀 Currently Working On
            </h3>
            <GlowCard className="max-w-4xl mx-auto">
              <div className="p-8 text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Terminal className="w-12 h-12 text-green-400 animate-pulse" />
                  <h4 className="text-2xl font-bold text-white">Hobby Projects in Development</h4>
                </div>
                <p className="text-lg text-gray-300 mb-6">
                  Exciting new projects are currently under development! Stay tuned for innovative AI/ML solutions 
                  that showcase cutting-edge deep learning techniques and MLOps best practices.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm border border-green-600/30 animate-pulse">
                    🔬 Research Phase
                  </div>
                  <div className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-600/30">
                    💡 Innovation Lab
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
          
          {/* GitHub Portfolio Link */}
          <div className="mt-12 text-center">
            <a href="https://github.com/Ani-2003-HD" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
              <Github className="w-6 h-6 group-hover:text-blue-400 transition-colors duration-300" />
              <span className="text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300">
                Explore All Projects on GitHub
              </span>
              <ExternalLink className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <GlowCard key={category}>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    {category === 'languages' && <Code className="w-8 h-8 text-green-400" />}
                    {category === 'frameworks' && <Layers className="w-8 h-8 text-blue-400" />}
                    {category === 'tools' && <Terminal className="w-8 h-8 text-purple-400" />}
                    {category === 'mlops' && <GitBranch className="w-8 h-8 text-orange-400" />}
                    {category === 'libraries' && <Database className="w-8 h-8 text-pink-400" />}
                    <h3 className="text-xl font-bold capitalize">{category.replace('mlops', 'MLOps')}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:border-blue-400 transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-16 sm:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Education
          </h2>
          <div className="grid md:grid-cols-1 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <GlowCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Bachelor of Engineering in Artificial Intelligence and Machine Learning
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-400 mb-2">Jyothy Institute of Technology, Bengaluru</p>
                  <p className="text-gray-400 mb-2">2021 - 2025</p>
                  <p className="text-green-400 font-semibold">CGPA: 7.74/10</p>
                </div>
              </div>
            </GlowCard>
            
            <GlowCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Pre-University Course in Computer Science
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-400 mb-2">Vidyabharathi PU College, Shivamogga</p>
                  <p className="text-gray-400">2019 - 2021</p>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-16 sm:py-20 bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Certifications
          </h2>
          <div className="max-w-6xl mx-auto">
            {/* Detailed Certifications */}
            <div className="space-y-8">
              {/* Deep Learning Specialization */}
              <GlowCard>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">Deep Learning Specialization</h3>
                        <p className="text-gray-300 text-sm sm:text-base">DeepLearning.AI by Andrew Ng</p>
                      </div>
                    </div>
                    <a href="https://coursera.org/verify/specialization/QPXD6BKQXNKP" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg border border-yellow-600/30 hover:bg-yellow-600/30 transition-all duration-300 w-full sm:w-auto">
                      <span className="text-sm font-semibold">Verify Certificate</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      'Neural Networks and Deep Learning',
                      'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization',
                      'Structuring Machine Learning Projects',
                      'Convolutional Neural Networks',
                      'Sequence Models'
                    ].map((course, index) => (
                      <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{course}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>

              {/* Machine Learning Specialization */}
              <GlowCard>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-green-400">Machine Learning Specialization</h3>
                        <p className="text-gray-300 text-sm sm:text-base">Stanford University & DeepLearning.AI</p>
                      </div>
                    </div>
                    <a href="https://coursera.org/verify/specialization/ZQKA433GBLPY" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg border border-green-600/30 hover:bg-green-600/30 transition-all duration-300 w-full sm:w-auto">
                      <span className="text-sm font-semibold">Verify Certificate</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      'Supervised Machine Learning: Regression and Classification',
                      'Advanced Learning Algorithms',
                      'Unsupervised Learning, Recommenders, Reinforcement Learning'
                    ].map((course, index) => (
                      <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{course}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>

              {/* Mathematics for Machine Learning Specialization */}
              <GlowCard>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Award className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-purple-400">Mathematics for Machine Learning & Data Science Specialization</h3>
                        <p className="text-gray-300 text-sm sm:text-base">DeepLearning.AI by Lois Serrano</p>
                      </div>
                    </div>
                    <a href="https://coursera.org/verify/specialization/UOMEK7K6OE2T" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-600/30 hover:bg-purple-600/30 transition-all duration-300 w-full sm:w-auto">
                      <span className="text-sm font-semibold">Verify Certificate</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      'Linear Algebra for Machine Learning and Data Science',
                      'Calculus for Machine Learning and Data Science',
                      'Probability & Statistics for Machine Learning & Data Science'
                    ].map((course, index) => (
                      <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{course}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Build the Future Together
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12">
            Ready to discuss your next AI project or explore collaboration opportunities?
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <GlowCard>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aniruddhahdkedlaya@gmail.com&su=AI/ML Project Discussion" target="_blank" rel="noopener noreferrer" className="block p-6 group">
                <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-sm break-words">aniruddhahdkedlaya@gmail.com</p>
              </a>
            </GlowCard>
            <GlowCard>
              <a href="tel:+919980645715" className="block p-6 group">
                <Phone className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-400 group-hover:text-green-400 transition-colors duration-300">+91 9980645715</p>
              </a>
            </GlowCard>
            <GlowCard>
              <a href="https://linkedin.com/in/Aniruddha-HD" target="_blank" rel="noopener noreferrer" className="block p-6 group">
                <Linkedin className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
                <p className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300">Connect with me</p>
              </a>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            © 2025 Aniruddha HD. Crafted with passion for AI and innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;