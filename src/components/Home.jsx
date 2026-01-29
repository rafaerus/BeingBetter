import React, { useState, useEffect } from 'react';
import { Calendar, Target, TrendingUp, Gift, Menu, X } from 'lucide-react';
import FeatureCard from './FeatureCard';
import TaskSelection from './TaskSelection';
import CustomTask from './CustomTask';
import ProgressTracker from './ProgressTracker';
import TaskReward from './TaskReward';
import '../styles.css';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'taskSelection', 'customTask', 'progressTracker', or 'taskReward'
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['home', 'features', 'about'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleFeatureClick = (featureTitle) => {
    setSelectedFeature(featureTitle);
    if (featureTitle === 'Customize Task') {
      setCurrentView('customTask');
    } else if (featureTitle === 'Lacak Progress') {
      setCurrentView('progressTracker');
    } else if (featureTitle === 'Task Reward') {
      setCurrentView('taskReward');
    } else {
      setCurrentView('taskSelection');
    }
  };

  const handleBackToFeatures = () => {
    setCurrentView('home');
    setSelectedFeature(null);
    // Scroll to features section after a short delay
    setTimeout(() => {
      scrollToSection('features');
    }, 100);
  };

  // If we're in task selection view, render that component
  if (currentView === 'taskSelection') {
    return (
      <TaskSelection 
        onBack={handleBackToFeatures} 
        selectedFeature={selectedFeature}
      />
    );
  }

  // If we're in custom task view, render that component
  if (currentView === 'customTask') {
    return (
      <CustomTask 
        onBack={handleBackToFeatures}
      />
    );
  }

  // If we're in progress tracker view, render that component
  if (currentView === 'progressTracker') {
    return (
      <ProgressTracker 
        onBack={handleBackToFeatures}
      />
    );
  }

  // If we're in task reward view, render that component
  if (currentView === 'taskReward') {
    return (
      <TaskReward 
        onBack={handleBackToFeatures}
      />
    );
  }

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'all 0.3s',
    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #cffafe 100%)'
  };

  return (
    <div style={containerStyle}>
      {/* Header Navigation */}
      <header style={headerStyle}>
        <nav style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => scrollToSection('home')}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#06b6d4' }}>Being</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f97316' }}>Better</span>
            </div>

            {/* Desktop Navigation */}
            <div style={{ display: window.innerWidth >= 768 ? 'flex' : 'none', alignItems: 'center', gap: '2rem' }}>
              <button 
                onClick={() => scrollToSection('home')}
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: activeSection === 'home' ? '#06b6d4' : '#374151', 
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: activeSection === 'features' ? '#06b6d4' : '#374151', 
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: activeSection === 'about' ? '#06b6d4' : '#374151', 
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                About
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              style={{ 
                display: window.innerWidth < 768 ? 'block' : 'none',
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                color: '#374151',
                cursor: 'pointer'
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="animate-fade-in" style={{ marginTop: '1rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => scrollToSection('home')}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  color: '#374151',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  color: '#374151',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  color: '#374151',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                About
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem', padding: '5rem 1.5rem 0', overflow: 'hidden' }}>
        {/* Background Blobs */}
        <div className="blob" style={{
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
          top: '10%',
          left: '5%'
        }}></div>
        <div className="blob" style={{
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #f97316, #fb923c)',
          bottom: '15%',
          right: '10%',
          animationDelay: '5s'
        }}></div>

        <div style={{ maxWidth: '80rem', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1fr' : '1fr', gap: '3rem', alignItems: 'center' }}>
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h1 className="animate-slide-up" style={{ 
                  fontSize: window.innerWidth >= 1024 ? '4.5rem' : window.innerWidth >= 768 ? '3rem' : '2.5rem', 
                  fontWeight: 'bold', 
                  color: '#111827', 
                  lineHeight: '1.1' 
                }}>
                  Tingkatkan Diri Setiap Hari dengan{' '}
                  <span className="gradient-text">BeingBetter</span>
                </h1>
                <p className="animate-slide-up delay-200" style={{ 
                  fontSize: window.innerWidth >= 768 ? '1.25rem' : '1.125rem', 
                  color: '#4b5563', 
                  lineHeight: '1.6' 
                }}>
                  Aplikasi task management yang membantu Anda mencatat dan melacak progress task harian, 
                  dari pekerjaan rumah hingga skill akademis dan teknis. Customize kesulitan dan bidang yang Anda inginkan.
                </p>
              </div>

              <button className="btn-primary animate-slide-up delay-300" style={{
                background: 'linear-gradient(135deg, #06b6d4, #f97316)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s'
              }}>
                Mulai Sekarang
              </button>
            </div>

            {/* Right Image */}
            <div className="animate-float animate-slide-up delay-400" style={{ position: 'relative' }}>
              <div className="hero-image-frame">
                <div className="hero-image-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop" 
                    alt="Task Management Illustration"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Fitur Utama */}
      <section id="features" style={{ padding: '6rem 1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(4px)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: window.innerWidth >= 768 ? '3rem' : '2.5rem', fontWeight: 'bold', color: '#111827' }}>Fitur Utama</h2>
            <p style={{ fontSize: window.innerWidth >= 768 ? '1.25rem' : '1.125rem', color: '#4b5563', maxWidth: '42rem', margin: '0 auto' }}>
              Semua yang Anda butuhkan untuk meningkatkan produktivitas dan mengembangkan skill setiap hari
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(4, 1fr)' : window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr', 
            gap: '1.5rem' 
          }}>
            {/* Feature Card 1 */}
            <FeatureCard
              icon={Calendar}
              title="Task Harian"
              description="Dapatkan task baru setiap hari yang disesuaikan dengan preferensi dan level kesulitan Anda."
              gradient="linear-gradient(135deg, #22d3ee, #0891b2)"
              delay="100"
              onClick={() => handleFeatureClick('Task Harian')}
            />

            {/* Feature Card 2 */}
            <FeatureCard
              icon={Target}
              title="Customize Task"
              description="Pilih bidang yang ingin Anda kerjakan - dari pekerjaan rumah, akademis, hingga skill teknis seperti coding dan desain."
              gradient="linear-gradient(135deg, #fb923c, #ea580c)"
              delay="200"
              onClick={() => handleFeatureClick('Customize Task')}
            />

            {/* Feature Card 3 */}
            <FeatureCard
              icon={TrendingUp}
              title="Lacak Progress"
              description="Catat dan monitor progress Anda dari hari ke hari. Lihat perkembangan kemampuan Anda secara visual."
              gradient="linear-gradient(135deg, #22d3ee, #2563eb)"
              delay="300"
              onClick={() => handleFeatureClick('Lacak Progress')}
            />

            {/* Feature Card 4 */}
            <FeatureCard
              icon={Gift}
              title="Task Reward"
              description="Klaim poin dari tugas yang diselesaikan dan naik level untuk mendapatkan reward menarik."
              gradient="linear-gradient(135deg, #fb923c, #dc2626)"
              delay="400"
              onClick={() => handleFeatureClick('Task Reward')}
            />
          </div>
        </div>
      </section>

      {/* About Section - Mengapa BeingBetter */}
      <section id="about" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: window.innerWidth >= 768 ? '3rem' : '2.5rem', fontWeight: 'bold', color: '#111827' }}>Mengapa BeingBetter?</h2>
            <p style={{ fontSize: window.innerWidth >= 768 ? '1.25rem' : '1.125rem', color: '#4b5563', maxWidth: '42rem', margin: '0 auto' }}>
              Dirancang untuk membantu Anda berkembang secara konsisten dengan pendekatan yang personal dan terukur
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr', 
            gap: '2rem', 
            maxWidth: '80rem', 
            margin: '0 auto' 
          }}>
            {/* Benefit 1 */}
            <div className="card-hover animate-slide-up delay-100" style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>✨</div>
                <div>
                  <h3 style={{ fontSize: window.innerWidth >= 768 ? '1.5rem' : '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>Fleksibel</h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    Customize task sesuai dengan minat dan kemampuan Anda. Bebas memilih bidang yang ingin dikembangkan.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="card-hover animate-slide-up delay-200" style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>📊</div>
                <div>
                  <h3 style={{ fontSize: window.innerWidth >= 768 ? '1.5rem' : '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>Terukur</h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    Lihat progress dan perkembangan skill Anda secara visual dengan grafik dan statistik yang jelas.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="card-hover animate-slide-up delay-300" style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>🎯</div>
                <div>
                  <h3 style={{ fontSize: window.innerWidth >= 768 ? '1.5rem' : '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>Terarah</h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    Task yang disesuaikan dengan level kesulitan yang tepat memastikan pembelajaran yang optimal dan tidak overwhelming.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="card-hover animate-slide-up delay-400" style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #f3f4f6'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>💪</div>
                <div>
                  <h3 style={{ fontSize: window.innerWidth >= 768 ? '1.5rem' : '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>Konsisten</h3>
                  <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    Bangun kebiasaan positif dengan task harian yang teratur. Konsistensi adalah kunci untuk menjadi lebih baik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(3, 1fr)' : '1fr', 
            gap: '3rem', 
            marginBottom: '3rem' 
          }}>
            {/* Brand */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: window.innerWidth >= 768 ? '1.875rem' : '1.5rem', fontWeight: 'bold', color: '#22d3ee' }}>Being</span>
                <span style={{ fontSize: window.innerWidth >= 768 ? '1.875rem' : '1.5rem', fontWeight: 'bold', color: '#fb923c' }}>Better</span>
              </div>
              <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                Aplikasi task management untuk membantu Anda berkembang setiap hari.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => scrollToSection('home')}
                  style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#22d3ee'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#22d3ee'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    fontSize: '1rem'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#22d3ee'}
                  onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                >
                  About
                </button>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Connect With Us</h4>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '1rem' }}>
                Mulai perjalanan Anda untuk menjadi lebih baik hari ini!
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #06b6d4, #f97316)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}>
                Get Started
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ paddingTop: '2rem', borderTop: '1px solid #374151', textAlign: 'center', color: '#9ca3af' }}>
            <p>© 2026 BeingBetter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}