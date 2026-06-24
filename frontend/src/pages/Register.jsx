import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

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
      "radial-gradient(circle at top left, rgba(13,148,136,0.22), transparent 30%), radial-gradient(circle at bottom right, rgba(59,130,246,0.16), transparent 28%), linear-gradient(160deg, #0f172a 0%, #0f2e36 48%, #144b56 100%)",
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
    background: "rgba(20,184,166,0.2)",
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
    background: "rgba(96,165,250,0.18)",
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
    background: "linear-gradient(135deg, #2dd4bf, #60a5fa)",
    boxShadow: "0 0 22px rgba(45,212,191,0.55)",
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
    color: "#5eead4",
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
    background: "#ccfbf1",
    color: "#0f766e",
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
  success: {
    marginBottom: "16px",
    padding: "12px 14px",
    borderRadius: "14px",
    background: "#ecfdf5",
    color: "#047857",
    border: "1px solid #a7f3d0",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "15px 18px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(20,184,166,0.24)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
  },
  footerLink: {
    color: "#0f766e",
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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    e.target.style.borderColor = "#2dd4bf";
    e.target.style.boxShadow = "0 0 0 4px rgba(45,212,191,0.12)";
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
      setSuccess("");

      const res = await registerUser(formData);
      setSuccess(res.data.message || "Registration successful");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
              Build stronger answers.
              <br />
              Get <span style={styles.accent}>interview ready.</span>
            </h1>

            <p style={styles.subheading}>
              Join an AI-powered interview prep platform built to help you practice
              better, identify weak areas, and improve with every session.
            </p>

            <div className="auth-stat-grid" style={styles.statGrid}>
              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>Structured AI Evaluation</h3>
                <p style={styles.statText}>
                  Learn exactly where your answer is strong and where it needs work.
                </p>
              </div>

              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>Focused Practice</h3>
                <p style={styles.statText}>
                  Train by topic so your preparation feels targeted and efficient.
                </p>
              </div>

              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>Performance Insights</h3>
                <p style={styles.statText}>
                  Track progress through scores, accuracy, and topic-wise trends.
                </p>
              </div>

              <div style={styles.statCard}>
                <h3 style={styles.statTitle}>Better Interview Readiness</h3>
                <p style={styles.statText}>
                  Turn repeated practice into calmer and clearer real interview answers.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.quote}>
            "The goal is not just to answer more questions. The goal is to explain
            better, think faster, and improve every round."
          </div>
        </div>

        <div className="auth-right" style={styles.right}>
          <div style={styles.formCard}>
            <span style={styles.badge}>Get Started</span>
            <h2 className="auth-title" style={styles.title}>
              Create your PrepPilot AI account
            </h2>
            <p style={styles.desc}>
              Start your interview practice journey and build real confidence through
              structured feedback and repeated mock sessions.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={styles.fieldWrap}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  required
                  style={styles.input}
                />
              </div>

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
                  placeholder="Create a strong password"
                  required
                  style={styles.input}
                />
              </div>

              {error && <div style={styles.error}>{error}</div>}
              {success && <div style={styles.success}>{success}</div>}

              <button
                type="submit"
                disabled={loading}
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 34px rgba(20,184,166,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 30px rgba(20,184,166,0.24)";
                }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p style={styles.footer}>
              Already have an account?{" "}
              <Link to="/login" style={styles.footerLink}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
