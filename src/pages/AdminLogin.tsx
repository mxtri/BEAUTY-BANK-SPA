import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useIsMobile  } from '../hooks/use-is-mobile'

const AdminLogin: React.FC = () => {
  const isMobile = useIsMobile()
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "beauty123") {
      navigate("/admin");
    } else {
      alert("Mot de passe incorrect !");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Connexion Administrateur</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


