import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Code, 
  Palette, 
  Calculator, 
  Globe, 
  Music, 
  Dumbbell,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

const TaskSelection = ({ onBack, selectedFeature }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const taskCategories = {
    'Task Harian': [
      {
        id: 'rumah',
        title: 'Pekerjaan Rumah',
        description: 'Tugas-tugas domestik dan perawatan rumah',
        icon: Home,
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
        tasks: ['Bersih-bersih kamar', 'Cuci piring', 'Menyiram tanaman', 'Merapikan lemari', 'Mencuci baju']
      },
      {
        id: 'akademis',
        title: 'Mata Pelajaran',
        description: 'Tugas sekolah dan pembelajaran akademis',
        icon: BookOpen,
        gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        tasks: ['Matematika', 'Bahasa Indonesia', 'IPA', 'IPS', 'Bahasa Inggris', 'Fisika', 'Kimia', 'Biologi']
      },
      {
        id: 'coding',
        title: 'Programming',
        description: 'Belajar bahasa pemrograman dan development',
        icon: Code,
        gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        tasks: ['JavaScript', 'Python', 'React', 'Node.js', 'Database', 'HTML/CSS', 'Git', 'API']
      },
      {
        id: 'design',
        title: 'Desain Digital',
        description: 'UI/UX Design, Graphic Design, dan kreativitas',
        icon: Palette,
        gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
        tasks: ['UI/UX Design', 'Photoshop', 'Illustrator', 'Figma', 'Canva', 'Logo Design', 'Web Design']
      },
      {
        id: 'math',
        title: 'Matematika Lanjutan',
        description: 'Latihan soal dan konsep matematika tingkat lanjut',
        icon: Calculator,
        gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
        tasks: ['Aljabar', 'Geometri', 'Statistika', 'Kalkulus', 'Trigonometri', 'Integral', 'Diferensial']
      },
      {
        id: 'language',
        title: 'Bahasa Asing',
        description: 'Pembelajaran bahasa asing dan komunikasi',
        icon: Globe,
        gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        tasks: ['English', 'Mandarin', 'Japanese', 'Korean', 'Arabic', 'French', 'German']
      },
      {
        id: 'music',
        title: 'Musik',
        description: 'Belajar alat musik dan teori musik',
        icon: Music,
        gradient: 'linear-gradient(135deg, #84cc16, #65a30d)',
        tasks: ['Piano', 'Gitar', 'Vokal', 'Teori Musik', 'Komposisi', 'Drum', 'Bass']
      },
      {
        id: 'fitness',
        title: 'Olahraga & Kesehatan',
        description: 'Aktivitas fisik dan kesehatan',
        icon: Dumbbell,
        gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
        tasks: ['Cardio', 'Strength Training', 'Yoga', 'Running', 'Swimming', 'Stretching', 'Meditation']
      }
    ]
  };

  const categories = taskCategories[selectedFeature] || [];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleTaskSelect = (task) => {
    alert(`Anda memilih: ${task} dari kategori ${selectedCategory.title}`);
    // Di sini nanti bisa navigate ke halaman task yang spesifik
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #cffafe 100%)',
      padding: '2rem 1.5rem'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '3rem' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#374151',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={20} />
          Kembali ke Home
        </button>
        
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#111827',
          marginBottom: '1rem'
        }}>
          {selectedFeature}
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#4b5563',
          maxWidth: '42rem'
        }}>
          Pilih kategori yang ingin Anda kerjakan hari ini
        </p>
      </div>

      {/* Categories Grid */}
      {!selectedCategory ? (
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '2rem'
          }}>
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: category.gradient,
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}>
                  <category.icon size={32} style={{ color: 'white' }} />
                </div>
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  {category.title}
                </h3>
                
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {category.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#06b6d4',
                  fontWeight: '500'
                }}>
                  Pilih kategori ini
                  <ChevronRight size={16} style={{ marginLeft: '0.5rem' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Task Selection */
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: '#374151',
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}
          >
            <ArrowLeft size={20} />
            Kembali ke Kategori
          </button>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: selectedCategory.gradient,
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <selectedCategory.icon size={24} style={{ color: 'white' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>
                  {selectedCategory.title}
                </h2>
                <p style={{ color: '#4b5563' }}>{selectedCategory.description}</p>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(3, 1fr)' : window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
            gap: '1.5rem'
          }}>
            {selectedCategory.tasks.map((task, index) => (
              <div
                key={index}
                onClick={() => handleTaskSelect(task)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  {task}
                </h3>
                <p style={{
                  color: '#06b6d4',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Mulai sekarang →
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSelection;