// Add custom colors to the Tailwind theme
import './index.css';

const style = document.createElement('style');
style.innerHTML = `
  :root {
    --color-cream-50: #FFFDF5;
    --color-cream-100: #FFF8E1;
    --color-cream-200: #FFF1C3;
    --color-cream-300: #FFEAA5;
    --color-cream-400: #FFE287;
    --color-cream-500: #FFDB69;
    
    --color-gold-400: #FFD700;
    --color-gold-500: #DAA520;
    --color-gold-600: #B8860B;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #FFF8E1;
  }

  ::-webkit-scrollbar-thumb {
    background: #DAA520;
    border-radius: 6px;
    border: 3px solid #FFF8E1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #B8860B;
  }

  /* Smooth Scroll */
  html {
    scroll-behavior: smooth;
  }

  /* Enhanced Button Styles */
  .btn-hover-effect {
    position: relative;
    overflow: hidden;
  }

  .btn-hover-effect:after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  .btn-hover-effect:hover:after {
    left: 100%;
  }
`;

document.head.appendChild(style);