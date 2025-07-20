import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  Truck, 
  Wrench, 
  Users, 
  BarChart3, 
  Shield, 
  HardHat, 
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Target,
  Award
} from 'lucide-react';

const WelcomePage: React.FC = () => {
  // Features list for the platform
  const features = [
    {
      icon: FolderOpen,
      title: 'Project Management',
      description: 'Comprehensive timeline views, document management, and status tracking for all your construction projects.'
    },
    {
      icon: Truck,
      title: 'Transport & Logistics',
      description: 'Real-time fleet management, delivery tracking, and scheduling to optimize your material and equipment movement.'
    },
    {
      icon: Wrench,
      title: 'Engineering Module',
      description: 'Upload designs, assign engineers to specific tasks, and track technical issues as they arise and are resolved.'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Secure platform with tailored experiences for managers, engineers, drivers, clients, and administrators.'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Visualize project progress, budget utilization, and resource allocation with comprehensive dashboards.'
    },
    {
      icon: Shield,
      title: 'Secure Communication',
      description: 'Built-in messaging and notification system keeps everyone informed of critical updates and changes.'
    }
  ];

  // User roles that benefit from the platform
  const userRoles = [
    { name: 'Construction Managers', icon: HardHat },
    { name: 'Engineers', icon: Wrench },
    { name: 'Drivers', icon: Truck },
    { name: 'Clients/Investors', icon: Users },
    { name: 'Administrators', icon: Shield }
  ];

  // Add stats for credibility
  const stats = [
    { value: '90%', label: 'Project Completion Rate', icon: Target },
    { value: '35%', label: 'Time Savings', icon: Clock },
    { value: '25%', label: 'Budget Optimization', icon: BarChart3 },
    { value: '100+', label: 'Active Users', icon: Users },
  ];

  // Add testimonials for social proof
  const testimonials = [
    {
      quote: "StratoPath has transformed how we manage our road construction projects. The visibility and control it provides are unmatched.",
      author: "Michael Johnson",
      title: "Project Director, Highway Infrastructure Inc."
    },
    {
      quote: "The platform's real-time updates and collaborative features have reduced our project delays by 40%. It's been a game-changer.",
      author: "Sarah Rodriguez",
      title: "Operations Manager, Urban Development Group"
    },
    {
      quote: "As an investor, I appreciate the transparency and detailed reporting. I can see exactly how projects are progressing at any time.",
      author: "Robert Chen",
      title: "Investment Partner, Infrastructure Capital"
    }
  ];

  // Add debug mode to help visualize section boundaries
  const debugMode = false;

  // Modified scroll animation to ensure content is visible even if animations fail
  useEffect(() => {
    // Make all sections visible immediately in case of animation issues
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('initially-visible');
    });
    
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('fade-in-up');
          element.classList.remove('initially-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger initial check after a small delay to ensure DOM is ready
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-900 to-earth-950 text-white">
      {/* Header/Navigation - Enhanced with better styling */}
      <header className="bg-primary-900/90 shadow-xl backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-16 mr-3">
              <img src='/logo.jpg' alt="StratoPath Constructors Logo" className="h-full rounded-lg shadow-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-primary-300">StratoPath</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="hidden md:block text-sm font-medium text-primary-100 hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="hidden md:block text-sm font-medium text-primary-100 hover:text-white transition-colors">Benefits</a>
            <Link 
              to="/login" 
              className="bg-accent-600 hover:bg-accent-500 px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-accent-600/20 hover:-translate-y-0.5"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced with better visuals and positioning */}
      <section className={`relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-primary-900 to-earth-900 ${debugMode ? 'debug-section' : ''}`}>
        {/* Abstract geometric background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M95,50 L50,5 L5,50 L50,95 L95,50z" stroke="currentColor" strokeWidth="0.5" />
              <path d="M80,50 L50,20 L20,50 L50,80 L80,50z" stroke="currentColor" strokeWidth="0.5" />
              <path d="M65,50 L50,35 L35,50 L50,65 L65,50z" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-primary-800/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 animate-on-scroll">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block">Advanced Solutions for</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-primary-300">
                  Road Construction Management
                </span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Streamline your construction operations with our comprehensive project management platform. Built specifically for the unique challenges of road construction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/login" 
                  className="bg-accent-600 hover:bg-accent-500 px-8 py-4 rounded-lg font-medium transition-all duration-300 text-lg inline-flex items-center shadow-xl hover:shadow-accent-600/30 hover:-translate-y-0.5"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a 
                  href="#features" 
                  className="bg-transparent border-2 border-primary-400/30 hover:border-primary-400/80 px-8 py-3.5 rounded-lg font-medium transition-all duration-300 text-lg inline-flex items-center hover:bg-primary-800/20"
                >
                  Learn More
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2 animate-on-scroll">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-600/20 to-primary-600/20 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative bg-earth-800/90 p-4 rounded-2xl shadow-2xl border border-primary-500/20">
                  <img 
                    src='./logo.jpg' 
                    alt="StratoPath Constructors Logo" 
                    className="w-full h-auto rounded-xl shadow-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Key stats - New section for credibility */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 animate-on-scroll">
            {stats.map((stat, index) => (
              <div key={index} className="bg-earth-800/40 backdrop-blur-sm border border-primary-500/10 p-6 rounded-xl text-center">
                <div className="w-12 h-12 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-primary-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with better styling */}
      <section id="features" className={`py-20 lg:py-32 bg-primary-950 relative ${debugMode ? 'debug-section' : ''}`}>
        {/* Use a solid background color instead of earth-850 which might not be defined */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20 animate-on-scroll">
            <div className="inline-block bg-accent-500/10 px-4 py-2 rounded-full text-accent-400 text-sm font-medium mb-4">
              POWERFUL FEATURES
            </div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
                Everything You Need in One Platform
              </span>
            </h2>
            <p className="text-lg text-primary-100 max-w-3xl mx-auto">
              Our platform offers everything you need to manage complex road construction projects efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-earth-800/90 p-8 rounded-xl shadow-xl border border-primary-500/10 hover:border-primary-500/30 transition-all duration-300 hover:shadow-primary-500/5 hover:-translate-y-1 animate-on-scroll"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-accent-400 flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-primary-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section - New for social proof */}
      <section className={`py-20 lg:py-32 bg-gradient-to-b from-primary-900 to-primary-950 ${debugMode ? 'debug-section' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block bg-accent-500/10 px-4 py-2 rounded-full text-accent-400 text-sm font-medium mb-4">
              TRUSTED BY PROFESSIONALS
            </div>
            <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-lg text-primary-100 max-w-3xl mx-auto">
              Hear from construction professionals who have transformed their operations with StratoPath.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-earth-800/30 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-primary-500/10 relative animate-on-scroll"
              >
                <div className="absolute top-8 left-8 text-accent-400 opacity-20">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11L7 15H10V19H4V15L7 11V7H10V11ZM20 11L17 15H20V19H14V15L17 11V7H20V11Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="relative">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="h-4 w-4 text-accent-400 fill-accent-400" />
                    ))}
                  </div>
                  <p className="text-white mb-6 leading-relaxed relative z-10">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-sm text-primary-300">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section - Enhanced styling */}
      <section className={`py-20 lg:py-32 bg-primary-900 relative overflow-hidden ${debugMode ? 'debug-section' : ''}`}>
        {/* Angled overlay for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block bg-accent-500/10 px-4 py-2 rounded-full text-accent-400 text-sm font-medium mb-4">
              FOR EVERY TEAM MEMBER
            </div>
            <h2 className="text-4xl font-bold mb-6">Built for Every Role</h2>
            <p className="text-lg text-primary-100 max-w-3xl mx-auto">
              Our platform provides tailored experiences for everyone involved in your construction projects.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto animate-on-scroll">
            {userRoles.map((role, index) => (
              <div 
                key={index} 
                className="bg-primary-800/80 backdrop-blur-sm px-6 py-4 rounded-full flex items-center shadow-lg border border-primary-700 hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center mr-4 shadow-inner">
                  <role.icon className="h-6 w-6 text-accent-400" />
                </div>
                <span className="font-medium text-lg">{role.name}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 animate-on-scroll">
            <Link 
              to="/login" 
              className="bg-accent-600 hover:bg-accent-500 px-8 py-4 rounded-lg font-medium transition-all duration-300 text-lg inline-flex items-center shadow-xl hover:shadow-accent-600/30 hover:-translate-y-0.5"
            >
              Log In to Your Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced with better layout */}
      <section id="benefits" className={`py-20 lg:py-32 bg-primary-950 relative ${debugMode ? 'debug-section' : ''}`}>
        {/* Use a solid background color instead of earth-850 */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block bg-accent-500/10 px-4 py-2 rounded-full text-accent-400 text-sm font-medium mb-4">
              MEASURABLE RESULTS
            </div>
            <h2 className="text-4xl font-bold mb-6">Why Choose StratoPath?</h2>
            <p className="text-lg text-primary-100 max-w-3xl mx-auto">
              Our platform delivers real, measurable benefits for your construction operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start p-6 bg-earth-800/50 rounded-xl border border-primary-500/10 animate-on-scroll">
              <div className="mt-1 mr-4 text-accent-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Increased Efficiency</h3>
                <p className="text-primary-200 leading-relaxed">Streamline workflows and reduce administrative overhead with automated processes and intuitive interfaces.</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-earth-800/50 rounded-xl border border-primary-500/10 animate-on-scroll">
              <div className="mt-1 mr-4 text-accent-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Better Communication</h3>
                <p className="text-primary-200 leading-relaxed">Keep all stakeholders informed with real-time updates, notifications, and collaborative tools.</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-earth-800/50 rounded-xl border border-primary-500/10 animate-on-scroll">
              <div className="mt-1 mr-4 text-accent-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Cost Reduction</h3>
                <p className="text-primary-200 leading-relaxed">Optimize resource allocation and prevent budget overruns with advanced forecasting and tracking.</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-earth-800/50 rounded-xl border border-primary-500/10 animate-on-scroll">
              <div className="mt-1 mr-4 text-accent-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Enhanced Visibility</h3>
                <p className="text-primary-200 leading-relaxed">Comprehensive dashboards and reports provide data-driven insights for informed decision making.</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-earth-800/50 rounded-xl border border-primary-500/10 animate-on-scroll">
              <div className="mt-1 mr-4 text-accent-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Improved Compliance</h3>
                <p className="text-primary-200 leading-relaxed">Ensure all projects meet regulatory requirements with built-in compliance tracking and documentation.</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-earth-800/50 rounded-xl border border-primary-500/10 animate-on-scroll">
              <div className="mt-1 mr-4 text-accent-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Risk Mitigation</h3>
                <p className="text-primary-200 leading-relaxed">Identify and address potential issues before they escalate with proactive risk assessment tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced with better styling */}
      <section className={`py-20 lg:py-32 bg-gradient-to-br from-accent-900 to-primary-900 relative overflow-hidden ${debugMode ? 'debug-section' : ''}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M95,50 L50,5 L5,50 L50,95 L95,50z" stroke="currentColor" strokeWidth="0.5" />
              <path d="M80,50 L50,20 L20,50 L50,80 L80,50z" stroke="currentColor" strokeWidth="0.5" />
              <path d="M65,50 L50,35 L35,50 L50,65 L65,50z" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center mb-8 p-2 bg-white/10 backdrop-blur-sm rounded-full animate-on-scroll">
              <Award className="w-6 h-6 text-accent-300 mr-2" />
              <span className="text-accent-200 font-medium">Join industry leaders already using StratoPath</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-on-scroll">
              Ready to Transform Your Construction Management?
            </h2>
            
            <p className="text-xl mb-10 text-primary-100 max-w-3xl mx-auto animate-on-scroll">
              Join construction companies that are already streamlining their operations and increasing profitability with our platform.
            </p>
            
            <div className="animate-on-scroll">
              <Link 
                to="/login" 
                className="bg-white text-accent-700 hover:bg-earth-100 px-10 py-5 rounded-xl font-bold transition-all duration-300 text-lg inline-flex items-center shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <p className="text-accent-200 mt-6 text-sm">No credit card required • Free trial available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced with better styling */}
      <footer className={`bg-earth-950 py-16 border-t border-earth-800/50 ${debugMode ? 'debug-section' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <div className="h-14 mr-4">
                <img src='logo.jpg' alt="StratoPath Constructors Logo" className="h-full rounded-lg shadow-lg" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">StratoPath</span>
                <p className="text-primary-300 text-sm mt-1">Advanced Construction Management</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-6 mb-4">
                <a href="#" className="text-primary-300 hover:text-accent-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-primary-300 hover:text-accent-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-primary-300 hover:text-accent-400 transition-colors">Contact</a>
              </div>
              <div className="text-primary-400 text-sm">
                &copy; {new Date().getFullYear()} StratoPath Construction Management. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Add CSS for animations */}
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .initially-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to));
        }
        
        .debug-section {
          border: 3px dashed rgba(255, 0, 0, 0.3);
          position: relative;
        }
        
        .debug-section::before {
          content: attr(id);
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(255, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          font-size: 12px;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
