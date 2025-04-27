import { useState, useEffect } from 'react';
import { ChevronRight, Code, Users, BookOpen, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechSkillsLanding() {
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1e40af, #3b82f6)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated background elements - tech themed */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden'
      }}>
        {/* Code blocks and technology shapes */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              width: `${Math.random() * 180 + 40}px`,
              height: `${Math.random() * 80 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 25}deg) scale(${animationProgress / 100})`,
              transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: `${i * 0.05}s`
            }}
          />
        ))}
        
        {/* Circuit-like lines */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`circuit-${i}`}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              height: '2px',
              width: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90}deg) scale(${animationProgress / 100})`,
              transition: 'transform 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: `${i * 0.1 + 0.2}s`
            }}
          />
        ))}

        {/* Digital dots */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: 'white',
              opacity: 0.1,
              width: `${Math.random() * 10 + 3}px`,
              height: `${Math.random() * 10 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${animationProgress / 100})`,
              transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: `${i * 0.07}s`
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1152px',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Logo and name */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem',
          opacity: animationProgress / 100,
          transform: `translateY(${(1 - animationProgress / 100) * 50}px)`,
          transition: 'transform 1s, opacity 1s'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            marginRight: '1rem'
          }}>
            <Code size={40} style={{ color: '#1e40af' }} />
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            letterSpacing: '-0.025em'
          }}>TECHSHARE</h1>
        </div>

        {/* Main headline */}
        <h2 style={{ 
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1.5rem',
          opacity: animationProgress / 100,
          transform: `translateY(${(1 - animationProgress / 100) * 40}px)`,
          transition: 'transform 1s, opacity 1s',
          transitionDelay: '0.2s'
        }}>
          Learn. Code. Innovate.
        </h2>

        {/* Description */}
        <p style={{ 
          fontSize: '1.25rem',
          textAlign: 'center',
          maxWidth: '48rem',
          marginBottom: '3rem',
          color: 'rgba(240, 249, 255, 0.9)',
          opacity: animationProgress / 100,
          transform: `translateY(${(1 - animationProgress / 100) * 30}px)`,
          transition: 'transform 1s, opacity 1s',
          transitionDelay: '0.4s'
        }}>
          TECHSHARE connects developers, engineers, and tech enthusiasts to share knowledge,
          exchange coding expertise, and master new technologies in a collaborative environment.
        </p>

        {/* Feature highlights */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          width: '100%',
          marginBottom: '3rem',
          opacity: animationProgress / 100,
          transform: `translateY(${(1 - animationProgress / 100) * 20}px)`,
          transition: 'transform 1s, opacity 1s',
          transitionDelay: '0.6s',
          '@media (min-width: 768px)': {
            gridTemplateColumns: '1fr 1fr 1fr'
          }
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(4px)',
            borderLeft: '4px solid #60a5fa'
          }}>
            <Users style={{ color: '#93c5fd', marginBottom: '1rem' }} size={32} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Expert Network</h3>
            <p style={{ color: 'rgba(240, 249, 255, 0.9)' }}>Connect with industry professionals and academic experts across all technology domains.</p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(4px)',
            borderLeft: '4px solid #60a5fa'
          }}>
            <BookOpen style={{ color: '#93c5fd', marginBottom: '1rem' }} size={32} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Skill Pathways</h3>
            <p style={{ color: 'rgba(240, 249, 255, 0.9)' }}>Access structured learning paths from beginner concepts to advanced implementations.</p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(4px)',
            borderLeft: '4px solid #60a5fa'
          }}>
            <Monitor style={{ color: '#93c5fd', marginBottom: '1rem' }} size={32} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Live Workshops</h3>
            <p style={{ color: 'rgba(240, 249, 255, 0.9)' }}>Participate in hands-on coding sessions and technical workshops with industry leaders.</p>
          </div>
        </div>

        {/* CTA Button */}
        <button style={{ 
          background: 'white',
          color: '#1e40af',
          fontWeight: 'bold',
          padding: '1rem 2rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.25rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transform: `translateY(${(1 - animationProgress / 100) * 10}px) scale(1)`,
          opacity: animationProgress / 100,
          transition: 'all 0.3s ease',
          transitionDelay: '0.8s',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Link style={{textDecoration:'none', color:'#1e40af'}} to="/s">
            <span>Start Learning</span>
          </Link> 
          <ChevronRight style={{ marginLeft: '0.5rem' }} />
        </button>
      </div>
    </div>
  );
}