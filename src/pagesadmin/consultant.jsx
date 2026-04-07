import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from './admsidebar'; 
import './consultant.css';

const ConsultantPage = () => {
  const navigate = useNavigate();
  
  // Data awal diset menjadi 5 orang sesuai permintaan sebelumnya
  const [consultants, setConsultants] = useState([
    { id: 1, name: "Audelia Nainggolan", role: "UI/UX, Front End Dev, UMKM IT, ERP", price: 150000, rating: 5 },
    { id: 2, name: "Eriza Aminato", role: "Back End, Data Scientist, UMKM IT, ERP", price: 150000, rating: 5 },
    { id: 3, name: "M. Fariq Al Qasri", role: "UI/UX, Front End Dev, UMKM IT, ERP", price: 150000, rating: 5 },
    { id: 4, name: "Irvana Sania Rusadi", role: "AI Engineer, Back End, ERP, UMKM IT", price: 150000, rating: 5 },
    { id: 5, name: "Muhammad Wijaya", role: "Back End, UMKM IT, ERP", price: 150000, rating: 5 },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Hapus data konsultan ini?")) {
      setConsultants(consultants.filter(item => item.id !== id));
    }
  };

  return (
    <div className="admin-page-layout">
      <SidebarAdmin activeMenu="Consultant" />
      <main className="admin-content-area">
        <div className="top-button-container">
          <button className="add-consultant-btn" onClick={() => navigate('/admin/consultant/form')}>
            + Add New IT Consultant
          </button>
        </div>

        <div className="consultant-cards-grid">
          {consultants.map((item) => (
            <div key={item.id} className="consultant-item-card">
              {/* Area foto kotak abu-abu */}
              <div className="item-card-image"></div>
              
              <div className="item-card-details">
                <div className="item-card-header">
                  <h4 className="item-name">{item.name}</h4>
                  <span className="item-rating">⭐ {item.rating}</span>
                </div>
                <p className="item-role">{item.role}</p>
                <p className="item-price">IDR. {item.price.toLocaleString('id-ID')} / Session</p>
                
                <div className="item-card-actions">
                  <button className="btn-icon edit" onClick={() => navigate(`/admin/consultant/form/${item.id}`)}>
                    <img src="https://img.icons8.com/?size=100&id=H5dKJanZkZNk&format=png&color=00381e" alt="edit" />
                  </button>
                  <button className="btn-icon delete" onClick={() => handleDelete(item.id)}>
                    <img src="https://img.icons8.com/?size=100&id=7DbfyX80LGwU&format=png&color=C80000" alt="delete" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ConsultantPage;