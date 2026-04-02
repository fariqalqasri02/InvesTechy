import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./page/Home";
import Login from './page/Login';
import Register from './page/Register';
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
      </Routes>
    </Router>
  );
}

export default App;