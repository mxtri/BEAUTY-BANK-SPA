import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; 
import { useIsMobile } from '../hooks/use-is-mobile'

const Home: React.FC = () => {
  const isMobile = useIsMobile()
  const navigate = useNavigate();

  // Styles dynamiques pour le mobile
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: isMobile ? "20px" : "40px",
    minHeight: "80vh"
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row", // Colonne sur mobile, ligne sur PC
    gap: "15px",
    width: isMobile ? "100%" : "auto",
    marginTop: "20px"
  };

  const buttonWidth: React.CSSProperties = {
    width: isMobile ? "100%" : "auto", // Boutons larges sur mobile pour cliquer facilement
    padding: "15px 25px"
  };

  return (
    <div className="hero" style={containerStyle}>
      {/* Taille de police adaptable */}
      <h1 style={{ fontSize: isMobile ? "2.2rem" : "4rem", marginBottom: "10px" }}>
        BEAUTY BANK SPA
      </h1>
      
      <p style={{ fontSize: isMobile ? "1rem" : "1.5rem", opacity: 0.9 }}>
        Beauté • Élégance • Bien-être
      </p>
      
      <div className="button-group" style={buttonGroupStyle}>
        <button 
          className="btn-primary" 
          onClick={() => navigate("/rendezvous")}
          style={buttonWidth}
        >
          Prendre rendez-vous
        </button>

        <button 
          className="btn-animated" 
          onClick={() => navigate("/catalogue")}
          style={buttonWidth}
        >
          Voir le catalogue des services
        </button>
      </div>
    </div>
  );
};

export default Home;






