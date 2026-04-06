import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
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
  return (
    <Router>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* 2. Tambahkan Route untuk Report List */}
        <Route path="/report-list" element={<Report />} />

        {/* Alur Proyek Baru (Step 1 & Step 2) */}
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/new-project/survey" element={<Survey />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;