import React, { useState, useEffect } from 'react';
import { Calendar, Target, TrendingUp, CheckSquare, Sparkles, Menu, X } from 'lucide-react';

export default function BeingBetterLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Outfit', sans-serif;
          overflow-x: hidden;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #06b6d4 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .feature-card {
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .feature-card:hover::before {
          left: 100%;
        }
        
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: blobMove 20s ease-in-out infinite;
        }
        
        @keyframes blobMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .hero-image-frame {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(135deg, #06b6d4, #f97316);
          padding: 4px;
        }
        
        .hero-image-inner {
          border-radius: 20px;
          overflow: hidden;
          background: white;
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #06b6d4, #f97316);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* Header Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className="text-2xl font-bold text-cyan-500">Being</span>
              <span className="text-2xl font-bold text-orange-500">Better</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`nav-link text-gray-700 hover:text-cyan-500 font-medium ${activeSection === 'home' ? 'active text-cyan-500' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`nav-link text-gray-700 hover:text-cyan-500 font-medium ${activeSection === 'features' ? 'active text-cyan-500' : ''}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`nav-link text-gray-700 hover:text-cyan-500 font-medium ${activeSection === 'about' ? 'active text-cyan-500' : ''}`}
              >
                About
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-cyan-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-500 rounded-lg font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-500 rounded-lg font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-cyan-50 hover:text-cyan-500 rounded-lg font-medium"
              >
                About
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
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

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
                  Tingkatkan Diri Setiap Hari dengan{' '}
                  <span className="gradient-text">BeingBetter</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed animate-slide-up delay-200">
                  Aplikasi task management yang membantu Anda mencatat dan melacak progress task harian, 
                  dari pekerjaan rumah hingga skill akademis dan teknis. Customize kesulitan dan bidang yang Anda inginkan.
                </p>
              </div>

              <button className="btn-primary bg-gradient-to-r from-cyan-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up delay-300">
                Mulai Sekarang
              </button>
            </div>

            {/* Right Image */}
            <div className="relative animate-float animate-slide-up delay-400">
              <div className="hero-image-frame">
                <div className="hero-image-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop" 
                    alt="Task Management Illustration"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Fitur Utama */}
      <section id="features" className="py-24 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">Fitur Utama</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk meningkatkan produktivitas dan mengembangkan skill setiap hari
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card 1 */}
            <div className="feature-card card-hover bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-slide-up delay-100">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Task Harian</h3>
              <p className="text-gray-600 leading-relaxed">
                Dapatkan task baru setiap hari yang disesuaikan dengan preferensi dan level kesulitan Anda.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card card-hover bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-slide-up delay-200">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customize Task</h3>
              <p className="text-gray-600 leading-relaxed">
                Pilih bidang yang ingin Anda kerjakan - dari pekerjaan rumah, akademis, hingga skill teknis seperti coding dan desain.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card card-hover bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-slide-up delay-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lacak Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                Catat dan monitor progress Anda dari hari ke hari. Lihat perkembangan kemampuan Anda secara visual.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="feature-card card-hover bg-white rounded-3xl p-8 shadow-lg border border-gray-100 animate-slide-up delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <CheckSquare className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Level Kesulitan</h3>
              <p className="text-gray-600 leading-relaxed">
                Atur tingkat kesulitan task sesuai kemampuan Anda - dari pemula hingga expert, berkembang sesuai pace Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Mengapa BeingBetter */}
      <section id="about" className="py-24 px-6 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">Mengapa BeingBetter?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dirancang untuk membantu Anda berkembang secara konsisten dengan pendekatan yang personal dan terukur
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 card-hover animate-slide-up delay-100">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">✨</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Fleksibel</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Customize task sesuai dengan minat dan kemampuan Anda. Bebas memilih bidang yang ingin dikembangkan.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 card-hover animate-slide-up delay-200">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">📊</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Terukur</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Lihat progress dan perkembangan skill Anda secara visual dengan grafik dan statistik yang jelas.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 card-hover animate-slide-up delay-300">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Terarah</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Task yang disesuaikan dengan level kesulitan yang tepat memastikan pembelajaran yang optimal dan tidak overwhelming.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 card-hover animate-slide-up delay-400">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">💪</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Konsisten</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Bangun kebiasaan positif dengan task harian yang teratur. Konsistensi adalah kunci untuk menjadi lebih baik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-cyan-400">Being</span>
                <span className="text-3xl font-bold text-orange-400">Better</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Aplikasi task management untuk membantu Anda berkembang setiap hari.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  About
                </button>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
              <p className="text-gray-400 leading-relaxed mb-4">
                Mulai perjalanan Anda untuk menjadi lebih baik hari ini!
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2026 BeingBetter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

