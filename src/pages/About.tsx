import React from "react";
import {  useIsMobile  } from '../hooks/use-is-mobile'

const About: React.FC = () => {
  const isMobile = useIsMobile()
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>À propos</h1>
      <p>📍 Situé dans la Zone de yopougon Millionnaire Cité sopim  le spa dispose d'un espace de 400 m² incluant un sauna, un hammam et un jacuzzi..</p>
      <p>

Le centres offrent une expérience de détente complète incluant : 
Massages & Hydrothérapie : Massages thérapeutiques, jacuzzis personnalisés et bains à remous pour les pieds.
Soins Esthétiques : Soins du visage, épilation, sauna et hammam.

Beauté : Services d'onglerie (manucure, pédicure, nail art) et fish spa. 
Coiffure et Makeup (Mariage)    <a 
      href="https://maps.google.com/?q=Abidjan" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      📍 Voir sur Google Maps
    </a></p>
    </div>
  );
};

export default About;
