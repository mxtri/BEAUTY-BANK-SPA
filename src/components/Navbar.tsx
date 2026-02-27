import React, { useState } from "react"; // Ajout de useState pour le menu mobile
import { Link } from "react-router-dom";
import logoImg from "../assets/logo spa.jpeg";
import "../index.css";
import { useIsMobile } from '../hooks/use-is-mobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [menuOuvert, setMenuOuvert] = useState(false);

  // Fonction pour fermer le menu quand on clique sur un lien
  const fermerMenu = () => setMenuOuvert(false);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo-circle">
          <img src={logoImg} alt="Logo Beauty Bank Spa" />
        </div>
        <span className="brand-name">BEAUTY BANK SPA</span>
      </div>

      {/* --- LOGIQUE MOBILE --- */}
      {isMobile ? (
        <div className="mobile-nav">
          <button 
            className="burger-button" 
            onClick={() => setMenuOuvert(!menuOuvert)}
            style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {menuOuvert ? "✕" : "☰"}
          </button>

          {menuOuvert && (
            <div className="mobile-menu-overlay">
              <Link to="/" onClick={fermerMenu}>Accueil</Link>
              <Link to="/about" onClick={fermerMenu}>À propos</Link>
              <Link to="/rendezvous" onClick={fermerMenu}>Rendez-vous</Link>
              <a href="tel:+2250749448732">📞 Appeler</a>
              <a href="https://wa.me/2250749448732" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
              <div className="socials-mobile">
                <a href="https://www.tiktok.com/@beautybankspa2" target="_blank">TikTok</a>
                <a href="https://www.facebook.com/share/1L19rUQMkt/" target="_blank">Facebook</a>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* --- LOGIQUE ORDINATEUR (Ton code original) --- */
        <div className="links">
          <Link to="/">Accueil</Link>
          <Link to="/about">À propos</Link>
          <Link to="/rendezvous">Rendez-vous</Link>
          <a href="https://www.tiktok.com/@beautybankspa2" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.facebook.com/share/1L19rUQMkt/" target="_blank" rel="noopener noreferrer">Facebook</a>
          
          <div className="contact-dropdown">
            <span>Contact</span>
            <div className="contact-menu">
              <a href="tel:+2250749448732">📞 07 49 44 87 32</a>
              <a href="https://wa.me/2250749448732" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;