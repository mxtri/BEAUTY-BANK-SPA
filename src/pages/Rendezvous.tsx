import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useIsMobile } from '../hooks/use-is-mobile'

const services = [
  { name: "Massage", price: "10.000 - 40.000" },
  { name: "Gommage & Soins Corps", price: "15.000 - 20.000" },
  { name: "Soins du visage", price: "5.000 - 20.000" },
  { name: "Epilation", price: "2.000 - 15.000" },
  { name: "Beauté des mains et pieds", price: "5.000 - 15.000" },
  { name: "Esthétique & Mariage", price: "150.000" },
];

const Rendezvous: React.FC = () => {
  const isMobile = useIsMobile()
  const [selectedService, setSelectedService] = useState("");
  const [price, setPrice] = useState<string | number>(0);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    date: "",
  });

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = services.find((s) => s.name === e.target.value);
    setSelectedService(e.target.value);
    setPrice(service ? service.price : 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      alert("Veuillez choisir un service.");
      return;
    }

    const { error } = await supabase.from("rendezvous").insert([
      {
        ...form,
        service: selectedService,
        price: price,
      },
    ]);

    if (!error) {
      setSuccess(true);
      setForm({ nom: "", prenom: "", telephone: "", email: "", date: "" });
      setSelectedService("");
      setPrice(0);
      setTimeout(() => setSuccess(false), 4000);
    } else {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="rdv-container" style={{ padding: isMobile ? "10px" : "40px" }}>
      <div className="rdv-card" style={{ 
          width: isMobile ? "100%" : "500px", 
          margin: "0 auto",
          padding: isMobile ? "15px" : "30px",
          boxSizing: "border-box"
        }}>

        {success && (
          <div className="success-message">
            🎉 Rendez-vous confirmé avec succès !
          </div>
        )}

        <h2 style={{ fontSize: isMobile ? "1.5rem" : "2rem", textAlign: "center" }}>
            Réserver un rendez-vous
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Les inputs héritent du style CSS, mais on s'assure qu'ils font 100% de large */}
          <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required />
          <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required />
          
          {/* Sur mobile, le type 'tel' ouvre le pavé numérique direct */}
          <input 
            type="tel" 
            name="telephone" 
            placeholder="Téléphone (ex: 0749448732)" 
            value={form.telephone} 
            onChange={handleChange} 
            required 
          />

          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />

          <select value={selectedService} onChange={handleServiceChange} required style={{ padding: "10px" }}>
            <option value="">Choisir un service</option>
            {services.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {price !== 0 && (
            <div className="price-display" style={{ 
                fontSize: isMobile ? "0.9rem" : "1rem", 
                backgroundColor: "#ff6600", 
                padding: "10px", 
                borderRadius: "5px",
                borderLeft: "4px solid #d4af37" 
            }}>
              Tarif : <strong>{price} FCFA</strong>
            </div>
          )}

          <div className="date-input-box">
  <label>Date du rendez-vous</label>
  <input
    type="date"
    name="date"
    value={form.date}
    onChange={handleChange}
    required
  />
</div>

          <button 
            type="submit" 
            className="btn-submit"
            style={{ 
                padding: "15px", 
                fontSize: isMobile ? "1rem" : "1.1rem",
                cursor: "pointer"
            }}
          >
            Confirmer le rendez-vous
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rendezvous;

