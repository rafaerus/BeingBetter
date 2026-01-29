import React, { useState } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Star, 
  Filter,
  BarChart3,
  Trophy,
  Target,
  BookOpen,
  Code,
  Home,
  Palette,
  Music
} from 'lucide-react';

const ProgressTracker = ({ onBack }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Dummy task history data
  const taskHistory = [
    {
      id: 1,
      title: 'Belajar React Hooks',
      category: 'Programming',
      type: 'custom',
      difficulty: 'medium',
      estimatedTime: 60,
      actualTime: 75,
      completedAt: '2024-01-15T14:30:00Z',
      rating: 4,
      notes: 'Berhasil memahami useState dan useEffect dengan baik',
      icon: Code,
      color: '#8b5cf6'
    },
    {
      id: 2,
      title: 'Matematika - Latihan Integral',
      category: 'Akademis',
      type: 'daily',
      difficulty: 'hard',
      estimatedTime: 45,
      actualTime: 50,
      completedAt: '2024-01-15T10:15:00Z',
      rating: 5,
      notes: 'Soal integral substitusi sudah lebih lancar',
      icon: BookOpen,
      color: '#3b82f6'
    },
    {
      id: 3,
      title: 'Bersih-bersih Kamar',
      category: 'Pekerjaan Rumah',
      type: 'daily',
      difficulty: 'easy',
      estimatedTime: 30,
      actualTime: 25,
      completedAt: '2024-01-14T16:45:00Z',
      rating: 4,
      notes: 'Kamar sudah rapi dan bersih',
      icon: Home,
      color: '#10b981'
    },
    {
      id: 4,
      title: 'Desain Logo untuk Project',
      category: 'Desain',
      type: 'custom',
      difficulty: 'medium',
      estimatedTime: 90,
      actualTime: 120,
      completedAt: '2024-01-14T11:20:00Z',
      rating: 5,
      notes: 'Logo selesai dengan hasil yang memuaskan',
      icon: Palette,
      color: '#ec4899'
    },
    {
      id: 5,
      title: 'Latihan Piano - Für Elise',
      category: 'Musik',
      type: 'daily',
      difficulty: 'hard',
      estimatedTime: 60,
      actualTime: 65,
      completedAt: '2024-01-13T19:30:00Z',
      rating: 3,
      notes: 'Masih perlu latihan di bagian coda',
      icon: Music,
      color: '#84cc16'
    },
    {
      id: 6,
      title: 'Bahasa Inggris - Reading Comprehension',
      category: 'Akademis',
      type: 'daily',
      difficulty: 'medium',
      estimatedTime: 40,
      actualTime: 35,
      completedAt: '2024-01-13T15:10:00Z',
      rating: 4,
      notes: 'Vocabulary baru: 15 kata',
      icon: BookOpen,
      color: '#3b82f6'
    },
    {
      id: 7,
      title: 'Setup Database MongoDB',
      category: 'Programming',
      type: 'custom',
      difficulty: 'medium',
      estimatedTime: 45,
      actualTime: 60,
      completedAt: '2024-01-12T13:45:00Z',
      rating: 4,
      notes: 'Database berhasil disetup dengan collection users',
      icon: Code,
      color: '#8b5cf6'
    },
    {
      id: 8,
      title: 'Cuci Piring dan Bersih Dapur',
      category: 'Pekerjaan Rumah',
      type: 'daily',
      difficulty: 'easy',
      estimatedTime: 20,
      actualTime: 18,
      completedAt: '2024-01-12T20:15:00Z',
      rating: 5,
      notes: 'Dapur bersih dan rapi',
      icon: Home,
      color: '#10b981'
    }
  ];

  const categories = ['all', 'Programming', 'Akademis', 'Pekerjaan Rumah', 'Desain', 'Musik'];
  const periods = [
    { value: 'all', label: 'Semua Waktu' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: 'Minggu Ini' },
    { value: 'month', label: 'Bulan Ini' }
  ];

  const filteredTasks = taskHistory.filter(task => {
    if (filterCategory !== 'all' && task.category !== filterCategory) return false;
    
    if (filterPeriod !== 'all') {
      const taskDate = new Date(task.completedAt);
      const now = new Date();
      
      switch (filterPeriod) {
        case 'today':
          return taskDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return taskDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return taskDate >= monthAgo;
        default:
          return true;
      }
    }
    
    return true;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        style={{
          color: i < rating ? '#fbbf24' : '#d1d5db',
          fill: i < rating ? '#fbbf24' : 'none'
        }}
      />
    ));
  };

  // Statistics
  const totalTasks = filteredTasks.length;
  const totalTime = filteredTasks.reduce((sum, task) => sum + task.actualTime, 0);
  const avgRating = totalTasks > 0 ? (filteredTasks.reduce((sum, task) => sum + task.rating, 0) / totalTasks).toFixed(1) : 0;
  const completionRate = totalTasks > 0 ? ((filteredTasks.filter(task => task.actualTime <= task.estimatedTime * 1.2).length / totalTasks) * 100).toFixed(0) : 0;

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
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #22d3ee, #2563eb)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <TrendingUp size={32} style={{ color: 'white' }} />
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Lacak Progress
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#4b5563',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Lihat riwayat dan statistik pencapaian tugas Anda
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(4, 1fr)' : window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Trophy size={20} style={{ color: '#f59e0b' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Total Tugas</span>
            </div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{totalTasks}</span>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Clock size={20} style={{ color: '#06b6d4' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Total Waktu</span>
            </div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{Math.floor(totalTime / 60)}j {totalTime % 60}m</span>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Star size={20} style={{ color: '#fbbf24' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Rata-rata Rating</span>
            </div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{avgRating}/5</span>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Target size={20} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Tingkat Ketepatan</span>
            </div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{completionRate}%</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Filter size={20} style={{ color: '#6b7280' }} />
            <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Filter</span>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr',
            gap: '1rem'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Kategori
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Semua Kategori' : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Periode
              </label>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Task History */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} style={{ color: '#6b7280' }} />
              <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                Riwayat Tugas ({filteredTasks.length})
              </span>
            </div>
          </div>

          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredTasks.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Tidak ada tugas yang ditemukan dengan filter yang dipilih</p>
              </div>
            ) : (
              filteredTasks.map((task, index) => {
                const IconComponent = task.icon;
                return (
                  <div
                    key={task.id}
                    style={{
                      padding: '1.5rem',
                      borderBottom: index < filteredTasks.length - 1 ? '1px solid #f3f4f6' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        background: task.color,
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={20} style={{ color: 'white' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                              {task.title}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                              <span>{task.category}</span>
                              <span style={{
                                backgroundColor: task.type === 'daily' ? '#dbeafe' : '#fef3c7',
                                color: task.type === 'daily' ? '#1e40af' : '#92400e',
                                padding: '0.125rem 0.5rem',
                                borderRadius: '0.375rem',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}>
                                {task.type === 'daily' ? 'Harian' : 'Kustom'}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#6b7280' }}>
                            {formatDate(task.completedAt)}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ color: '#6b7280' }}>Kesulitan:</span>
                            <span style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: getDifficultyColor(task.difficulty)
                            }}></span>
                            <span style={{ color: '#374151', textTransform: 'capitalize' }}>{task.difficulty}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
                            <Clock size={14} />
                            <span>{task.actualTime}m</span>
                            <span style={{ color: task.actualTime <= task.estimatedTime ? '#10b981' : '#ef4444' }}>
                              ({task.actualTime <= task.estimatedTime ? '-' : '+'}{Math.abs(task.actualTime - task.estimatedTime)}m)
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            {renderStars(task.rating)}
                          </div>
                        </div>

                        {task.notes && (
                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            color: '#374151',
                            fontStyle: 'italic'
                          }}>
                            "{task.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;