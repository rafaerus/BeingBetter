import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Gift, 
  Star, 
  Trophy, 
  Coins, 
  CheckCircle, 
  Plus,
  Crown,
  Award,
  Target,
  Zap,
  Sparkles
} from 'lucide-react';

const TaskReward = ({ onBack }) => {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(3);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Available completed tasks to claim points
  const completedTasks = [
    {
      id: 1,
      title: 'Belajar React Hooks',
      category: 'Programming',
      difficulty: 'medium',
      points: 150,
      timeSpent: 75,
      completed: true,
      claimed: false
    },
    {
      id: 2,
      title: 'Matematika - Latihan Integral',
      category: 'Akademis',
      difficulty: 'hard',
      points: 200,
      timeSpent: 50,
      completed: true,
      claimed: false
    },
    {
      id: 3,
      title: 'Bersih-bersih Kamar',
      category: 'Pekerjaan Rumah',
      difficulty: 'easy',
      points: 50,
      timeSpent: 25,
      completed: true,
      claimed: false
    },
    {
      id: 4,
      title: 'Desain Logo untuk Project',
      category: 'Desain',
      difficulty: 'medium',
      points: 175,
      timeSpent: 120,
      completed: true,
      claimed: false
    },
    {
      id: 5,
      title: 'Latihan Piano - Für Elise',
      category: 'Musik',
      difficulty: 'hard',
      points: 180,
      timeSpent: 65,
      completed: true,
      claimed: false
    }
  ];

  // Level system
  const levels = [
    {
      id: 1,
      name: 'Beginner',
      title: 'Pemula',
      minPoints: 0,
      maxPoints: 499,
      icon: Target,
      color: '#10b981',
      bgColor: '#d1fae5',
      rewards: ['Badge Pemula', 'Avatar Dasar'],
      description: 'Mulai perjalanan belajar Anda'
    },
    {
      id: 2,
      name: 'Novice',
      title: 'Pelajar',
      minPoints: 500,
      maxPoints: 999,
      icon: Star,
      color: '#3b82f6',
      bgColor: '#dbeafe',
      rewards: ['Badge Pelajar', 'Tema Biru', '5 Hint Gratis'],
      description: 'Konsistensi mulai terbangun'
    },
    {
      id: 3,
      name: 'Intermediate',
      title: 'Terampil',
      minPoints: 1000,
      maxPoints: 1999,
      icon: Award,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      rewards: ['Badge Terampil', 'Tema Emas', 'Custom Avatar', '10 Hint Gratis'],
      description: 'Kemampuan semakin terasah'
    },
    {
      id: 4,
      name: 'Advanced',
      title: 'Mahir',
      minPoints: 2000,
      maxPoints: 3499,
      icon: Trophy,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
      rewards: ['Badge Mahir', 'Tema Ungu', 'Priority Support', '20 Hint Gratis'],
      description: 'Tingkat keahlian yang mengesankan'
    },
    {
      id: 5,
      name: 'Expert',
      title: 'Ahli',
      minPoints: 3500,
      maxPoints: 5999,
      icon: Crown,
      color: '#ef4444',
      bgColor: '#fee2e2',
      rewards: ['Badge Ahli', 'Tema Merah', 'Exclusive Features', '50 Hint Gratis'],
      description: 'Keahlian tingkat tinggi'
    },
    {
      id: 6,
      name: 'Master',
      title: 'Master',
      minPoints: 6000,
      maxPoints: 9999,
      icon: Sparkles,
      color: '#ec4899',
      bgColor: '#fce7f3',
      rewards: ['Badge Master', 'All Themes', 'VIP Status', 'Unlimited Hints'],
      description: 'Penguasaan sempurna'
    }
  ];

  const getCurrentLevel = () => {
    return levels.find(level => currentPoints >= level.minPoints && currentPoints <= level.maxPoints) || levels[0];
  };

  const getNextLevel = () => {
    const current = getCurrentLevel();
    return levels.find(level => level.id === current.id + 1);
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleClaimRewards = () => {
    const selectedTasksData = completedTasks.filter(task => selectedTasks.includes(task.id));
    const totalPoints = selectedTasksData.reduce((sum, task) => sum + task.points, 0);
    
    if (totalPoints > 0) {
      setCurrentPoints(prev => prev + totalPoints);
      setSelectedTasks([]);
      
      // Check if level up
      const newLevel = levels.find(level => (currentPoints + totalPoints) >= level.minPoints && (currentPoints + totalPoints) <= level.maxPoints);
      if (newLevel && newLevel.id > getCurrentLevel().id) {
        alert(`🎉 Selamat! Anda naik ke level ${newLevel.title}!\n\nReward yang didapat:\n${newLevel.rewards.join('\n')}`);
      } else {
        alert(`✨ Berhasil mengklaim ${totalPoints} poin!\n\nTotal poin Anda sekarang: ${currentPoints + totalPoints}`);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const currentLevelData = getCurrentLevel();
  const nextLevelData = getNextLevel();
  const progressPercentage = nextLevelData 
    ? ((currentPoints - currentLevelData.minPoints) / (nextLevelData.minPoints - currentLevelData.minPoints)) * 100
    : 100;

  const selectedTasksPoints = completedTasks
    .filter(task => selectedTasks.includes(task.id))
    .reduce((sum, task) => sum + task.points, 0);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #cffafe 100%)',
      padding: '2rem 1.5rem'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
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
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} />
            Kembali ke Home
          </button>
          
          {/* User Level Status - Top Right */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1rem 1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: currentLevelData.bgColor,
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${currentLevelData.color}`
            }}>
              <currentLevelData.icon size={16} style={{ color: currentLevelData.color }} />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                Level {currentLevelData.id} - {currentLevelData.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Coins size={12} style={{ color: '#f59e0b' }} />
                {currentPoints.toLocaleString()} poin
              </div>
            </div>
          </div>
        </div>
        
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
            <Gift size={32} style={{ color: 'white' }} />
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Task Reward
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#4b5563',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Klaim poin dari tugas yang telah diselesaikan dan naik level!
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Current Status */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(3, 1fr)' : '1fr',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* Current Level */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                backgroundColor: currentLevelData.bgColor,
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                border: `2px solid ${currentLevelData.color}`
              }}>
                <currentLevelData.icon size={24} style={{ color: currentLevelData.color }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                Level {currentLevelData.id}
              </h3>
              <p style={{ color: currentLevelData.color, fontWeight: '600' }}>{currentLevelData.title}</p>
            </div>

            {/* Points */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Coins size={32} style={{ color: '#f59e0b' }} />
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{currentPoints.toLocaleString()}</span>
              </div>
              <p style={{ color: '#6b7280' }}>Total Poin</p>
            </div>

            {/* Progress to Next Level */}
            <div>
              {nextLevelData ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Progress ke {nextLevelData.title}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: `${progressPercentage}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${currentLevelData.color}, ${nextLevelData.color})`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {nextLevelData.minPoints - currentPoints} poin lagi untuk naik level
                  </p>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Crown size={32} style={{ color: '#f59e0b', margin: '0 auto 0.5rem' }} />
                  <p style={{ color: '#f59e0b', fontWeight: '600' }}>Level Maksimum!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Claim Rewards Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <CheckCircle size={24} style={{ color: '#10b981' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              Klaim Poin dari Tugas Selesai
            </h2>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            {completedTasks.map(task => (
              <div
                key={task.id}
                onClick={() => handleTaskSelect(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: selectedTasks.includes(task.id) ? '2px solid #06b6d4' : '2px solid #e5e7eb',
                  backgroundColor: selectedTasks.includes(task.id) ? '#f0f9ff' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  if (!selectedTasks.includes(task.id)) {
                    e.target.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTasks.includes(task.id)) {
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  border: selectedTasks.includes(task.id) ? '2px solid #06b6d4' : '2px solid #d1d5db',
                  backgroundColor: selectedTasks.includes(task.id) ? '#06b6d4' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {selectedTasks.includes(task.id) && (
                    <CheckCircle size={12} style={{ color: 'white' }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                    {task.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span>{task.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: getDifficultyColor(task.difficulty)
                      }}></span>
                      <span style={{ textTransform: 'capitalize' }}>{task.difficulty}</span>
                    </div>
                    <span>{task.timeSpent} menit</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Coins size={20} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#f59e0b' }}>
                    +{task.points}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {selectedTasks.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: '#f0f9ff',
              borderRadius: '0.75rem',
              border: '1px solid #06b6d4',
              marginBottom: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                  {selectedTasks.length} tugas dipilih
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <Coins size={16} style={{ color: '#f59e0b' }} />
                  <span style={{ color: '#f59e0b', fontWeight: '600' }}>
                    +{selectedTasksPoints} poin
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleClaimRewards}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #f97316)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Gift size={16} />
                Klaim Poin
              </button>
            </div>
          )}
        </div>

        {/* Level System */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Trophy size={24} style={{ color: '#f59e0b' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
              Sistem Level
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(3, 1fr)' : window.innerWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
            gap: '1.5rem'
          }}>
            {levels.map(level => {
              const isCurrentLevel = currentPoints >= level.minPoints && currentPoints <= level.maxPoints;
              const isUnlocked = currentPoints >= level.minPoints;
              
              return (
                <div
                  key={level.id}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    border: isCurrentLevel ? `2px solid ${level.color}` : '2px solid #e5e7eb',
                    backgroundColor: isCurrentLevel ? level.bgColor : isUnlocked ? '#f9fafb' : '#f3f4f6',
                    opacity: isUnlocked ? 1 : 0.6,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {isCurrentLevel && (
                    <div style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      backgroundColor: level.color,
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      Current
                    </div>
                  )}

                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: isUnlocked ? level.color : '#9ca3af',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <level.icon size={20} style={{ color: 'white' }} />
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: isUnlocked ? '#111827' : '#6b7280',
                    marginBottom: '0.5rem'
                  }}>
                    Level {level.id} - {level.title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    color: isUnlocked ? '#4b5563' : '#9ca3af',
                    marginBottom: '1rem'
                  }}>
                    {level.description}
                  </p>

                  <div style={{
                    fontSize: '0.875rem',
                    color: isUnlocked ? level.color : '#9ca3af',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    {level.minPoints.toLocaleString()} - {level.maxPoints.toLocaleString()} poin
                  </div>

                  <div>
                    <p style={{
                      fontSize: '0.75rem',
                      color: isUnlocked ? '#6b7280' : '#9ca3af',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Rewards:
                    </p>
                    <ul style={{
                      fontSize: '0.75rem',
                      color: isUnlocked ? '#4b5563' : '#9ca3af',
                      paddingLeft: '1rem'
                    }}>
                      {level.rewards.map((reward, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskReward;