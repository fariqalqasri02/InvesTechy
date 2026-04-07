import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import "./consult.css";
import { useNavigate } from "react-router-dom";

export default function Consult() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 🔥 FIX WAJIB: hapus animasi keluar dari page sebelumnya
    document.body.classList.remove("page-exit");

    // trigger animasi masuk
    setAnimate(true);
  }, []);

  const consultants = [
    {
      name: "Audelia Nainggolan",
      role: "UI/UX, Front End Dev, UMKM IT, ERP",
      price: "IDR. 150.000 / Session",
      rating: 5,
    },
    {
      name: "Eriza Aminato",
      role: "Back End, Data Scientist, UMKM IT, ERP",
      price: "IDR. 150.000 / Session",
      rating: 5,
    },
    {
      name: "M. Fariq Al Qasri",
      role: "UI/UX, Front End Dev, UMKM IT, ERP",
      price: "IDR. 150.000 / Session",
      rating: 5,
    },
    {
      name: "Irvana Sania Rusadi",
      role: "AI Engineer, Back End, ERP, UMKM IT",
      price: "IDR. 150.000 / Session",
      rating: 5,
    },
    {
      name: "Muhammad Wijaya",
      role: "Back End, UMKM IT, ERP",
      price: "IDR. 150.000 / Session",
      rating: 5,
    },
  ];

  // 🔥 OPTIONAL: contoh kalau mau ke detail page
  const goToDetail = (name) => {
    document.body.classList.add("page-exit");
    setTimeout(() => {
      navigate("/consult-detail", { state: { name } });
    }, 300);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="Consult" />

      <main className={`main-content ${animate ? "page-enter" : ""}`}>
        
        {/* HEADER */}
        <div className="consult-header">
          <h1>Our Consultant</h1>
          <p>Seek expert IT consultation for your investment needs.</p>
        </div>

        {/* FILTER */}
        <div className="filter-bar">
          <select>
            <option>Position</option>
          </select>
          <select>
            <option>Price</option>
          </select>
          <select>
            <option>Rating</option>
          </select>
        </div>

        {/* GRID */}
        <div className="consult-grid">
          {consultants.map((item, index) => (
            <div className="consult-card" key={index}>
              
              <div className="card-image" />

              <div className="card-content">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <span className="rating">⭐ {item.rating}</span>
                </div>

                <p className="role">{item.role}</p>
                <p className="price">{item.price}</p>

                {/* 🔥 tombol dengan navigasi */}
                <button 
                  className="btn-consult"
                  onClick={() => goToDetail(item.name)}
                >
                  💬 Consult Now
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  );
}