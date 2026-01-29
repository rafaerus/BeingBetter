import React, { useState } from 'react';
import { ArrowLeft, Plus, Target, Clock, Star, Send } from 'lucide-react';

const CustomTask = ({ onBack }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('30');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskDescription.trim()) {
      alert('Mohon masukkan deskripsi tugas!');
      return;
    }
    
    const customTask = {
      description: taskDescription,
      difficulty,
      category,
      estimatedTime: parseInt(estimatedTime),
      priority,
      createdAt: new Date().toISOString()
    };
    
    alert(`Tugas berhasil dibuat!\n\nDeskripsi: ${customTask.description}\nKategori: ${customTask.category || 'Umum'}\nTingkat Kesulitan: ${customTask.difficulty}\nEstimasi Waktu: ${customTask.estimatedTime} menit\nPrioritas: ${customTask.priority}`);
    
    // Reset form
    setTaskDescription('');
    setCategory('');
    setDifficulty('medium');
    setEstimatedTime('30');
    setPriority('medium');
  };

  const difficultyOptions = [
    { value: 'easy', label: 'Mudah', color: '#10b981' },
    { value: 'medium', label: 'Sedang', color: '#f59e0b' },
    { value: 'hard', label: 'Sulit', color: '#ef4444' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Rendah', color: '#6b7280' },
    { value: 'medium', label: 'Sedang', color: '#f59e0b' },
    { value: 'high', label: 'Tinggi', color: '#ef4444' }
  ];

  const categoryOptions = [
    'Pekerjaan Rumah',
    'Akademis',
    'Programming',
    'Desain',
    'Olahraga',
    'Musik',
    'Bahasa',
    'Hobi',
    'Kesehatan',
    'Lainnya'
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #cffafe 100%)',
      padding: '2rem 1.5rem'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '48rem', margin: '0 auto', marginBottom: '3rem' }}>
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
          Kembali ke Features
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #fb923c, #ea580c)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <Target size={32} style={{ color: 'white' }} />
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Customize Task
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#4b5563',
            maxWidth: '32rem',
            margin: '0 auto'
          }}>
            Buat tugas kustom sesuai kebutuhan dan preferensi Anda
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6'
        }}>
          {/* Task Description */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              Deskripsi Tugas *
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Contoh: Belajar React hooks selama 1 jam, membuat wireframe untuk aplikasi mobile, latihan piano lagu baru..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.3s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              Kategori (Opsional)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="">Pilih kategori...</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Settings Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(3, 1fr)' : '1fr',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Difficulty */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Tingkat Kesulitan
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {difficultyOptions.map((option) => (
                  <label key={option.value} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: difficulty === option.value ? '#f0f9ff' : 'transparent',
                    border: difficulty === option.value ? '2px solid #06b6d4' : '2px solid transparent'
                  }}>
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.value}
                      checked={difficulty === option.value}
                      onChange={(e) => setDifficulty(e.target.value)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      backgroundColor: option.color 
                    }}></span>
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Estimated Time */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Estimasi Waktu
              </label>
              <select
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="15">15 menit</option>
                <option value="30">30 menit</option>
                <option value="45">45 menit</option>
                <option value="60">1 jam</option>
                <option value="90">1.5 jam</option>
                <option value="120">2 jam</option>
                <option value="180">3 jam</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                <Star size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Prioritas
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {priorityOptions.map((option) => (
                  <label key={option.value} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: priority === option.value ? '#f0f9ff' : 'transparent',
                    border: priority === option.value ? '2px solid #06b6d4' : '2px solid transparent'
                  }}>
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={priority === option.value}
                      onChange={(e) => setPriority(e.target.value)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      backgroundColor: option.color 
                    }}></span>
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #06b6d4, #f97316)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <Send size={20} />
            Buat Tugas Kustom
          </button>
        </form>

        {/* Tips */}
        <div style={{
          marginTop: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Plus size={20} />
            Tips Membuat Tugas yang Efektif
          </h3>
          <ul style={{
            color: '#4b5563',
            lineHeight: '1.6',
            paddingLeft: '1.5rem'
          }}>
            <li style={{ marginBottom: '0.5rem' }}>Buat deskripsi yang spesifik dan dapat diukur</li>
            <li style={{ marginBottom: '0.5rem' }}>Pilih estimasi waktu yang realistis</li>
            <li style={{ marginBottom: '0.5rem' }}>Sesuaikan tingkat kesulitan dengan kemampuan Anda saat ini</li>
            <li style={{ marginBottom: '0.5rem' }}>Prioritaskan tugas berdasarkan deadline dan kepentingan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomTask;