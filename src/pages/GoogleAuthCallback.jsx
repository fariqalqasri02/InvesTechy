import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  extractAuthSession,
  fetchCurrentUser,
  getStoredUser,
  setSession,
} from "../services/api";
import "../components/auth.css";

const parseUserParam = (rawUser) => {
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export default function GoogleAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  const authPayload = useMemo(() => {
    const rawUser = searchParams.get("user");
    const parsedUser = parseUserParam(rawUser);

    return extractAuthSession({
      token:
        searchParams.get("token") ||
        searchParams.get("accessToken") ||
        null,
      user: parsedUser,
      data: parsedUser
        ? {
            user: parsedUser,
          }
        : null,
    });
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const completeGoogleLogin = async () => {
      try {
        if (authPayload.token) {
          setSession({
            token: authPayload.token,
            user: authPayload.user,
          });
        }

        const currentUser = await fetchCurrentUser().catch(() => authPayload.user || getStoredUser());

        if (!currentUser) {
          throw new Error("Google login belum mengembalikan data user ke aplikasi.");
        }

        setSession({
          token: authPayload.token || undefined,
          user: currentUser,
        });

        if (!isMounted) {
          return;
        }

        const destination =
          currentUser?.role?.toLowerCase?.() === "admin"
            ? "/admin/dashboard"
            : "/dashboard";

        navigate(destination, { replace: true });
      } catch (loginError) {
        if (!isMounted) {
          return;
        }

        setError(
          loginError?.message ||
            "Google login belum berhasil diselesaikan.",
        );
      }
    };

    completeGoogleLogin();

    return () => {
      isMounted = false;
    };
  }, [authPayload, navigate]);

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-form-section" style={{ width: "100%" }}>
          <div className="form-box" style={{ margin: "80px auto" }}>
            <h2>Google Sign-In</h2>
            {error ? (
              <p style={{ color: "#b42318", marginTop: "16px" }}>{error}</p>
            ) : (
              <p style={{ marginTop: "16px", color: "#4A5568" }}>
                Menyelesaikan login Google...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
