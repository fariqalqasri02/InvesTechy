import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/InvesTechy.jpg";
import api, { setSession } from "../services/api";
import "../components/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const eyeOpen =
    "https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000";
  const eyeClosed =
    "https://img.icons8.com/?size=100&id=FThUtBIXcPnM&format=png&color=000000";
  const dropdownIcon =
    "https://img.icons8.com/?size=100&id=5jRysPx2JtDa&format=png&color=000000";

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", form);
      setSession({
        token: response.token,
        user: response.user ?? response.data,
      });
      navigate("/project-list");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-banner">
          <div className="banner-content">
            <div className="banner-logo-container">
              <img src={logoImg} alt="InvesTechy Logo" className="banner-logo" />
            </div>
            <h1 className="banner-title">
              Smarter IT Investment <br />
              <span className="highlight">Starts Here</span>
            </h1>
            <p className="banner-subtitle">
              Make smarter digital investment decisions in minutes <br />
              no complexity, just data-driven insights.
            </p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="form-box">
            <h2>Register</h2>
            <p className="form-subtext">
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Input Your Business Name"
                  value={form.businessName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="**********"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  {form.password.length > 0 && (
                    <span
                      className="password-icon"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <img src={showPassword ? eyeOpen : eyeClosed} alt="toggle view" />
                    </span>
                  )}
                </div>
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="**********"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {form.confirmPassword.length > 0 && (
                    <span
                      className="password-icon"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <img
                        src={showConfirmPassword ? eyeOpen : eyeClosed}
                        alt="toggle view"
                      />
                    </span>
                  )}
                </div>
              </div>

              <div className="input-group">
                <label>Role</label>
                <div className="input-wrapper">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <img src={dropdownIcon} alt="dropdown" className="dropdown-icon-img" />
                </div>
              </div>

              {error && (
                <p style={{ color: "#b42318", marginBottom: "20px" }}>{error}</p>
              )}

              <div className="term-condition">
                <input type="checkbox" required />
                <label>
                  I agree to the <strong>Terms of Service</strong> and acknowledge
                  the <strong> Privacy Policy</strong>.
                </label>
              </div>

              <button type="submit" className="btn-auth-primary" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
