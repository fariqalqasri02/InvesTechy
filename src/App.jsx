import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Ini Dashboard User
import AdminDashboard from './pagesadmin/AdminDashboard'; // Import Dashboard Admin Baru
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NewProject from './pages/NewProject';
import Survey from './pages/Survey';
import Profile from './pages/profile'; 
import ProjectList from "./pages/ProjectList";
import Consult from "./pages/Consult";
import Settings from "./pages/Settings";
// 1. Import halaman Report
import Report from './pages/report'; 

import './App.css';

function App() {
  // Simulasi Role (Nanti ini diambil dari Global State/Redux/LocalStorage)
  // Contoh: const userRole = useSelector((state) => state.auth.role);
  const userRole = "admin"; 

  return (
    <Router>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* --- DASHBOARD USER --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report-list" element={<Report />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/new-project/survey" element={<Survey />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/settings" element={<Settings />} />

        {/* --- DASHBOARD ADMIN --- */}
        {/* Menggunakan prefix /admin agar terpisah dengan jelas */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/consultant" element={<div>Halaman Consultant Admin</div>} />
        <Route path="/admin/settings" element={<div>Halaman Settings Admin</div>} />

        {/* Proteksi Sederhana: Jika user akses root dashboard, arahkan sesuai role */}
        <Route 
          path="/main" 
          element={userRole === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/dashboard" />} 
        />
        
      </Routes>
    </Router>
  );
}

export default App;