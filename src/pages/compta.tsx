import React, { useState, useEffect } from "react";
import "../index.css";
import { useIsMobile } from "../hooks/use-is-mobile";

interface Transaction {
  id: number;
  nom: string;
  prenom: string;
  service: string;
  montant: number;
  date: string;
}

const Compta: React.FC = () => {
  const isMobile = useIsMobile()
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState({ nom: "", prenom: "", service: "", montant: "", date: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("compta_data");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("compta_data", JSON.stringify(transactions));
  }, [transactions]);

  const handleEnregistrer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.montant) return alert("Remplissez au moins le nom et le montant");

    const newTransaction: Transaction = {
      id: Date.now(),
      nom: form.nom,
      prenom: form.prenom,
      service: form.service,
      montant: parseFloat(form.montant),
      date: form.date || new Date().toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);
    setForm({ nom: "", prenom: "", service: "", montant: "", date: "" });
  };

  const supprimerLigne = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const calculerTotal = () => transactions.reduce((acc, curr) => acc + curr.montant, 0);

  return (
    <div className="compta-container">
      <h1 className="no-print">Gestion de Caisse - Beauty Bank spa</h1>

      <form className="compta-form no-print" onSubmit={handleEnregistrer}>
        <div className="form-grid">
          <input type="text" placeholder="Nom" value={form.nom} onChange={(e) => setForm({...form, nom: e.target.value})} />
          <input type="text" placeholder="Prénom" value={form.prenom} onChange={(e) => setForm({...form, prenom: e.target.value})} />
          <input type="text" placeholder="Service" value={form.service} onChange={(e) => setForm({...form, service: e.target.value})} />
          <input type="number" placeholder="Montant (FCFA)" value={form.montant} onChange={(e) => setForm({...form, montant: e.target.value})} />
          <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-save">Enregistrer la vente</button>
          <button type="button" className="btn-cancel" onClick={() => setForm({nom:"", prenom:"", service:"", montant:"", date:""})}>Vider les champs</button>
        </div>
      </form>

      <table className="compta-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Client</th>
            <th>Service</th>
            <th>Montant</th>
            <th className="no-print">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.prenom} {t.nom}</td>
              <td>{t.service}</td>
              <td>{t.montant.toLocaleString()} FCFA</td>
              <td className="no-print">
                <button className="btn-delete-row" onClick={() => supprimerLigne(t.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer-compta no-print">
        {!showTotal && (
          <button className="btn-finish" onClick={() => setShowConfirmModal(true)}>
            Vous avez fini votre journée ?
          </button>
        )}

        {/* Modal de Confirmation Personnalisée */}
        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Fin de journée</h3>
              <p>Voulez-vous clôturer la caisse et afficher le total ?</p>
              <div className="modal-btns">
                <button className="btn-yes" onClick={() => { setShowTotal(true); setShowConfirmModal(false); }}>OUI</button>
                <button className="btn-no" onClick={() => setShowConfirmModal(false)}>NON</button>
              </div>
            </div>
          </div>
        )}

        {showTotal && (
          <div className="total-display">
            <h3>GAIN TOTAL DU JOUR : <span>{calculerTotal().toLocaleString()} FCFA</span></h3>
            <div className="final-actions">
              <button className="btn-print" onClick={() => window.print()}>🖨️ Imprimer / PDF</button>
              <button className="btn-reset" onClick={() => { setTransactions([]); setShowTotal(false); }}>Effacer pour demain</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compta;