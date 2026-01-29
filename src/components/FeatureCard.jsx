import React from 'react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay, 
  onClick,
  isClickable = true 
}) => {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '1.5rem',
    padding: '2rem',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px',
    border: '1px solid rgb(243, 244, 246)',
    cursor: isClickable ? 'pointer' : 'default',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
  };

  const iconContainerStyle = {
    width: '4rem',
    height: '4rem',
    background: gradient,
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px'
  };

  const titleStyle = {
    fontSize: window.innerWidth >= 768 ? '1.5rem' : '1.25rem',
    fontWeight: 'bold',
    color: 'rgb(17, 24, 39)',
    marginBottom: '1rem'
  };

  const descriptionStyle = {
    color: 'rgb(75, 85, 99)',
    lineHeight: '1.6'
  };

  const handleMouseEnter = (e) => {
    if (isClickable) {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    }
  };

  const handleMouseLeave = (e) => {
    if (isClickable) {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px';
    }
  };

  return (
    <div 
      className={`feature-card card-hover animate-slide-up delay-${delay}`}
      style={cardStyle}
      onClick={isClickable ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={iconContainerStyle}>
        <Icon size={32} style={{ color: 'white' }} />
      </div>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
      {isClickable && (
        <div style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#06b6d4',
          fontWeight: '500'
        }}>
          Klik untuk mulai →
        </div>
      )}
    </div>
  );
};

export default FeatureCard;