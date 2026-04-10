import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../components/auth.css";

const getErrorMessage = (searchParams) => {
  const rawMessage =
    searchParams.get("message") ||
    searchParams.get("error") ||
    "Google sign-in failed. Please try again.";

  try {
    return decodeURIComponent(rawMessage);
  } catch {
    return rawMessage;
  }
};

export default function GoogleAuthFailure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorMessage = useMemo(() => getErrorMessage(searchParams), [searchParams]);

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-form-section" style={{ width: "100%" }}>
          <div className="form-box" style={{ margin: "80px auto" }}>
            <h2>Google Sign-In Failed</h2>
            <p style={{ color: "#b42318", marginTop: "16px", lineHeight: "1.6" }}>
              {errorMessage}
            </p>
            <button
              type="button"
              className="btn-auth-primary"
              style={{ marginTop: "24px" }}
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
