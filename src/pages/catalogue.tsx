import React from "react";
import "../index.css";
import { useIsMobile } from "../hooks/use-is-mobile";

const Catalogue: React.FC = () => {
  const isMobile = useIsMobile();

  // On définit les données DIRECTEMENT dans le composant pour éviter l'erreur "not defined"
  const catalogueData = [
    {
      category: "Massages",
      icon: "💆‍♀️",
      items: [
        { name: "Massage relaxant", duration: "30min-1H", price: "10.000-20.000 FCFA" },
        { name: "Massage deep tissu", duration: "30min-1H", price: "15.000-25.000 FCFA" },
        { name: "Massages aux pieds pierre chaude", duration: "30min-1H", price: "15.000-25.000 FCFA" },
        { name: "Massage prénatal", duration: "30min-1H", price: "15.000-30.000 FCFA" },
        { name: "Massage aux pochons", duration: "30min-1H", price: "15.000-30.000 FCFA" },
        { name: "Massage oriental", duration: "30min-1H", price: "15.000-30.000 FCFA" },
        { name: "Massage suédois", duration: "30min-1H", price: "15.000-30.000 FCFA" },
        { name: "Massage californien", duration: "30min-1H", price: "10.000 FCFA" },
        { name: "Massage maderachera", duration: "30min-1H", price: "20.000 FCFA" },
        { name: "Massage réflexologie", duration: "30min", price: "10.000 FCFA" },
        { name: "Massage rhaï", duration: "30min-1H", price: "20.000-40.000 FCFA" },
      ],
    },
    {
      category: "Soins Visage",
      icon: "✨",
      items: [
        { name: "Soin Visage Acné", price: "15.000 FCFA" },
        { name: "Soin Anti Age", price: "20.000 FCFA" },
        { name: "Soin du visage Coup d'éclat", price: "5.000 FCFA" },
        { name: "Soin du visage Classique", price: "10.000 FCFA" },
        { name: "Soins Visage Expert Microneeding", price: "25.000 FCFA" },
        { name: "Soin du visage Rituel Glow Hydrafacial", price: "20.000 FCFA" },
      ],
    },
    {
      category: "Épilations",
      icon: "✨",
      items: [
        { name: "Épilation Maillot", price: "10.000 FCFA" },
        { name: "Épilation Maillot Intégral", price: "15.000 FCFA" },
        { name: "Épilation Aisselles", price: "5.000 FCFA" },
        { name: "Épilation Sourcil", price: "3.000 FCFA" },
        { name: "Épilation Menton", price: "3.000 FCFA" },
        { name: "Épilation Ovale du Menton", price: "5.000 FCFA" },
        { name: "Épilation Visage Intégral", price: "8.000 FCFA" },
        { name: "Épilation Jambes Intégral", price: "15.000 FCFA" },
        { name: "Épilation Demi Jambes", price: "10.000 FCFA" },
        { name: "Épilation Bras Intégral", price: "10.000 FCFA" },
        { name: "Épilation Avant Bras", price: "5.000 FCFA" },
        { name: "Épilation Menton à la pince", price: "3.000 FCFA" },
        { name: "Épilation Ovale menton à la pince", price: "5.000 FCFA" },
        { name: "Épilation Sourcil à la pince", price: "2.000 FCFA" },
      ],
    },
    {
      category: "Gommage & Soins Corps",
      icon: "🛁",
      items: [
        { name: "Douche Marocaine", price: "15.000 FCFA" },
        { name: "Gommage Éclaircissant", price: "20.000 FCFA" },
        { name: "Gommage Coup d'éclat", price: "10.000 FCFA" },
        { name: "Enveloppement + hydratation profonde", price: "15.000 FCFA" },
      ],
    },
    {
      category: "Beauté des Mains & Pieds",
      icon: "💅",
      items: [
        { name: "Manucure Pédicure", price: "5.000 FCFA" },
        { name: "Manucure Pédicure Spa", price: "10.000 FCFA" },
      ],
    },
    {
      category: "Esthétique & Mariage",
      icon: "👰‍♀️",
      items: [
        { name: "Make-up et coiffure Mariage", price: "150.000 FCFA" },
      ],
    },
  ];

  return (
    <div className="catalogue-container" style={{ padding: isMobile ? "15px" : "40px 5%" }}>
      <header className="catalogue-header" style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: isMobile ? "1.8rem" : "2.5rem", color: "#a67c00" }}>Nos Prestations</h1>
        <p>Un moment d'exception pour vous</p>
      </header>

      <div className="catalogue-grid" style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "20px"
      }}>
        {/* L'appel à catalogueData fonctionne forcément ici car il est dans la même fonction */}
        {catalogueData.map((section, index) => (
          <div key={index} className="category-card" style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            border: "1px solid #f0e6d2"
          }}>
            <h2 style={{ fontSize: "1.3rem", color: "#a67c00", borderBottom: "1px solid #d4af37", paddingBottom: "10px" }}>
              {section.icon} {section.category}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f9f9f9" }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ display: "block", fontSize: isMobile ? "0.9rem" : "1rem" }}>{item.name}</span>
                    {item.duration && <small style={{ color: "#999" }}>⏱ {item.duration}</small>}
                  </div>
                  <span style={{ fontWeight: "bold", color: "#d4af37", whiteSpace: "nowrap", marginLeft: "10px" }}>
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;

