import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {  useIsMobile  } from '../hooks/use-is-mobile'

interface Rendezvous {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  service: string;
  price: string;
  date: string;
}

const Admin: React.FC = () => {
  const isMobile = useIsMobile()
  const [data, setData] = useState<Rendezvous[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const loadData = async () => {
    let query = supabase.from("rendezvous").select("*");

    if (filterDate) {
      query = query.eq("date", filterDate);
    }

    const { data, error } = await query.order("date", { ascending: true });

    if (!error) setData(data || []);
  };

  useEffect(() => {
    loadData();
  }, [filterDate]);

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    const { error } = await supabase
      .from("rendezvous")
      .delete()
      .eq("id", selectedId);

    if (!error) {
      setShowModal(false);
      setSelectedId(null);
      setSuccessMessage(true);
      loadData();

      setTimeout(() => setSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Gestion des Rendez-vous</h1>

      {successMessage && (
        <div className="success-delete">
          ✅ Rendez-vous supprimé avec succès
        </div>
      )}

      <div className="filter-box">
        <label>Filtrer par date :</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Numéro</th>
            <th>Email</th>
            <th>Service</th>
            <th>Prix</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r) => (
            <tr key={r.id}>
              <td>{r.nom}</td>
              <td>{r.prenom}</td>
              <td>{r.telephone}</td>
              <td>{r.email}</td>
              <td>{r.service}</td>
              <td>{r.price?.toLocaleString()} FCFA</td>
              <td>{r.date}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => openDeleteModal(r.id)}
                >
                  🗑 Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirmer la suppression</h3>
            <p>Voulez-vous vraiment supprimer ce rendez-vous ?</p>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>

              <button
                className="confirm-delete-btn"
                onClick={confirmDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;



