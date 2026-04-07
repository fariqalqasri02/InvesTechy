import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { fetchConsultants } from "../store/consultantThunk";
import "./consult.css";

export default function Consult() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);
  const { items, loading, error } = useSelector((state) => state.consultant);

  useEffect(() => {
    document.body.classList.remove("page-exit");
    setAnimate(true);
    dispatch(fetchConsultants());
  }, [dispatch]);

<<<<<<< HEAD
  const goToDetail = (consultantId) => {
=======
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
>>>>>>> ec4629a4bb2a311dba967fcfef8669e3eab2eae9
    document.body.classList.add("page-exit");
    setTimeout(() => {
      navigate("/consult-detail", { state: { consultantId } });
    }, 300);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activeMenu="Consult" />

      <main className={`main-content ${animate ? "page-enter" : ""}`}>
        <div className="consult-header">
          <h1>Our Consultant</h1>
          <p>Seek expert IT consultation for your investment needs.</p>
        </div>

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

        {loading && <p>Loading consultants...</p>}
        {error && <p style={{ color: "#b42318" }}>{error}</p>}

        {!loading && !error && (
          <div className="consult-grid">
            {items.map((item) => (
              <div className="consult-card" key={item.id}>
                <div className="card-image" />

                <div className="card-content">
                  <div className="card-header">
                    <h3>{item.nama}</h3>
                    <span className="rating">5.0</span>
                  </div>

                  <p className="role">{item.spesialisasi?.join(", ")}</p>
                  <p className="price">{item.email?.replace("mailto:", "")}</p>

                  <button
                    className="btn-consult"
                    onClick={() => goToDetail(item.id)}
                  >
                    Consult Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
