import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NewProject from './pages/NewProject';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<Home />} />
        
        {/* Halaman Login: akses via localhost:5173/login */}
        <Route path="/login" element={<Login />} />
        
        {/* Halaman Register: akses via localhost:5173/register */}
        <Route path="/register" element={<Register />} />

        {/* Halaman Forgot Password: akses via localhost:5173/forgot-password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Halaman Reset Password: akses via localhost:5173/reset-password */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Halaman New Project: akses via localhost:5173/new-project */}
        <Route path="/new-project" element={<NewProject />} />

      </Routes>
    </Router>
  );
}

export default App;