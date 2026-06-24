import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #eef6ff 36%, #f7fffc 100%)",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
  },
  shell: {
    width: "100%",
    maxWidth: "1180px",
    minHeight: "720px",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    borderRadius: "32px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.72)",
    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.14)",
    border: "1px solid rgba(255,255,255,0.85)",
    backdropFilter: "blur(18px)",
  },
  left: {
    position: "relative",
    padding: "56px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(16,185,129,0.18), transparent 28%), linear-gradient(160deg, #0f172a 0%, #10213e 48%, #123054 100%)",
    color: "#ffffff",
    overflow: "hidden",
  },
  orbOne: {
    position: "absolute",
    top: "-70px",
    right: "-50px",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.22)",
    filter: "blur(12px)",
    animation: "floatY 6s ease-in-out infinite",
  },
  orbTwo: {
    position: "absolute",
    bottom: "80px",
    left: "-50px",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(16,185,129,0.2)",
    filter: "blur(18px)",
    animation: "floatY 7.5s ease-in-out infinite",
  },
  logo: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    width: "fit-content",
    padding: "10px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    fontWeight: 700,
    fontSize: "15px",
    letterSpacing: "0.3px",
  },
  logoDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #60a5fa, #34d399)",
    boxShadow: "0 0 22px rgba(96,165,250,0.6)",
  },
  hero: {
    position: "relative",
    zIndex: 1,
    maxWidth: "520px",
    animation: "fadeUp 0.8s ease",
  },
  heading: {
    margin: "0 0 18px",
    fontSize: "54px",
    lineHeight: 1.02,
    fontWeight: 800,
    letterSpacing: "-1.8px",
  },
  accent: {
    color: "#7dd3fc",
  },
  subheading: {
    margin: "0 0 28px",
    color: "rgba(255,255,255,0.82)",
    fontSize: "17px",
    lineHeight: 1.75,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
  },
  statCard: {
    padding: "18px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    animation: "fadeUp 0.95s ease",
  },
  statTitle: {
    margin: "0 0 6px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#ffffff",
  },
  statText: {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.76)",
  },
  quote: {
    position: "relative",
    zIndex: 1,
    maxWidth: "460px",
    padding: "20px 22px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.85)",
    fontSize: "14px",
    lineHeight: 1.75,
    animation: "fadeUp 1.1s ease",
  },
  right: {
    padding: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.94))",
  },
  formCard: {
    width: "100%",
    maxWidth: "430px",
    animation: "fadeUp 0.8s ease",
  },
  badge: {
    display: "inline-block",
    padding: "7px 12px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "14px",
  },
  title: {
    margin: "0 0 8px",
    color: "#0f172a",
    fontSize: "36px",
    fontWeight: 800,
    letterSpacing: "-1px",
  },
  desc: {
    margin: "0 0 28px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.7,
  },
  fieldWrap: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#334155",
    fontSize: "14px",
    fontWeight: 700,
  },
  input: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "16px",
    border: "1px solid #d9e4f2",
    background: "#ffffff",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
    boxShadow: "0 8px 22px rgba(148,163,184,0.08)",
  },
  error: {
    marginBottom: "16px",
    padding: "12px 14px",
    borderRadius: "14px",
    background: "#fff1f2",
    color: "#be123c",
    border: "1px solid #fecdd3",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "15px 18px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(37,99,235,0.25)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
  },
  footerLink: {
    color: "#2563eb",
    fontWeight: 700,
    textDecoration: "none",
  },
};

const responsiveCss = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(18px); }
  }

  @media (max-width: 980px) {
    .auth-shell {
      grid-template-columns: 1fr !important;
      min-height: auto !important;
    }
    .auth-left {
      padding: 34px 24px !important;
    }
    .auth-right {
      padding: 30px 22px !important;
    }
  }

  @media (max-width: 680px) {
    .auth-page {
      padding: 12px !important;
    }
    .auth-left {
      padding: 26px 18px !important;
    }
    .auth-right {
      padding: 22px 16px !important;
    }
    .auth-heading {
      font-size: 38px !important;
    }
    .auth-title {
      font-size: 28px !important;
    }
    .auth-stat-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = responsiveCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#60a5fa";
    e.target.style.boxShadow = "0 0 0 4px rgba(96,165,250,0.12)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#d9e4f2";
    e.target.style.boxShadow = "0 8px 22px rgba(148,163,184,0.08)";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      const res = await loginUser(formData);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={styles.page}>
      <div className="auth-shell" style={styles.shell}>
        <div className="auth-left" style={styles.left}>
          <div style={styles.orbOne} />
          <div style={styles.orbTwo} />

          <div style={styles.logo}>
            <span style={styles.logoDot} />
            PrepPilot AI
          </div>

          <div style={styles.hero}>
            <h1 className="auth-heading" style={styles.heading}>
              Practice sharper.
              <br />
              Interview with <span style={styles.accent}>confidence.</span>
            </h1>

            <p style={styles.subheading}>
              Your AI-powered interview prep workspace for mock interviews,
              instant evaluation, and measurable improvement across core subjects.
            </p>

            <div className="auth-stat-grid" style={styles.statGrid}>
              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>AI Feedback Engine</h3>
                <p style={styles.statText}>
                  Get answer scoring, strengths, and precise improvement guidance.
                </p>
              </div>

              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>Topic-Based Sessions</h3>
                <p style={styles.statText}>
                  Practice DSA, OOPS, DBMS, OS, CN, and more in focused rounds.
                </p>
              </div>

              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>Progress Tracking</h3>
                <p style={styles.statText}>
                  Review past sessions, weak topics, and your performance trend.
                </p>
              </div>

              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>Placement Ready Flow</h3>
                <p style={styles.statText}>
                  Simulate a cleaner and more serious interview experience.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.quote}>
            "Great preparation is not about memorizing answers. It is about learning
            how to think clearly under pressure."
          </div>
        </div>

        <div className="auth-right" style={styles.right}>
          <div style={styles.formCard}>
            <span style={styles.badge}>Welcome Back</span>
            <h2 className="auth-title" style={styles.title}>
              Sign in to PrepPilot AI
            </h2>
            <p style={styles.desc}>
              Continue practicing, review your interview history, and improve the
              topics that need more attention.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldWrap}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  required
                  style={styles.input}
                />
              </div>

              {error && <div style={styles.error}>{error}</div>}

              <button
                type="submit"
                disabled={loading}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 34px rgba(37,99,235,0.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 30px rgba(37,99,235,0.25)";
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p style={styles.footer}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.footerLink}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
