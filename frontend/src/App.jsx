import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import InterviewPage from "./pages/InterviewPage";
import ResultPage from "./pages/ResultPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

const styles = {
  home: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #eef6ff 36%, #f7fffc 100%)",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },
  heroWrap: {
    position: "relative",
    overflow: "hidden",
    padding: "40px 24px 70px",
  },
  orbOne: {
    position: "absolute",
    top: "-80px",
    left: "-60px",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(37,99,235,0.12)",
    filter: "blur(10px)",
    animation: "floatY 7s ease-in-out infinite",
  },
  orbTwo: {
    position: "absolute",
    right: "-40px",
    top: "120px",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background: "rgba(20,184,166,0.12)",
    filter: "blur(16px)",
    animation: "floatY 8s ease-in-out infinite",
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1180px",
    margin: "0 auto",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: "28px",
    alignItems: "center",
    marginTop: "24px",
  },
  left: {
    animation: "fadeUp 0.8s ease",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "18px",
  },
  heading: {
    margin: "0 0 16px",
    fontSize: "64px",
    lineHeight: 1,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-2.2px",
  },
  accent: {
    color: "#0f766e",
  },
  subheading: {
    margin: "0 0 28px",
    maxWidth: "620px",
    fontSize: "18px",
    lineHeight: 1.8,
    color: "#475569",
  },
  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "26px",
  },
  primaryBtn: {
    padding: "15px 22px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(37,99,235,0.24)",
    transition: "all 0.2s ease",
  },
  secondaryBtn: {
    padding: "15px 22px",
    borderRadius: "18px",
    border: "1px solid #cbd5e1",
    background: "rgba(255,255,255,0.8)",
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  userText: {
    margin: 0,
    fontSize: "15px",
    color: "#334155",
    fontWeight: 600,
  },
  right: {
    animation: "fadeUp 1s ease",
  },
  showcase: {
    position: "relative",
    padding: "24px",
    borderRadius: "30px",
    background:
      "linear-gradient(160deg, #0f172a 0%, #10213e 48%, #123054 100%)",
    color: "#ffffff",
    boxShadow: "0 26px 70px rgba(15,23,42,0.2)",
    overflow: "hidden",
    minHeight: "520px",
  },
  showcaseGlow: {
    position: "absolute",
    top: "-60px",
    right: "-20px",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "rgba(96,165,250,0.18)",
    filter: "blur(10px)",
  },
  showcaseGlowTwo: {
    position: "absolute",
    bottom: "-40px",
    left: "-20px",
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    background: "rgba(45,212,191,0.16)",
    filter: "blur(12px)",
  },
  panel: {
    position: "relative",
    zIndex: 1,
    borderRadius: "24px",
    padding: "20px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    marginBottom: "16px",
  },
  panelTitle: {
    margin: "0 0 8px",
    fontSize: "16px",
    fontWeight: 700,
  },
  panelText: {
    margin: 0,
    color: "rgba(255,255,255,0.76)",
    fontSize: "14px",
    lineHeight: 1.7,
  },
  statRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "18px",
  },
  statCard: {
    borderRadius: "20px",
    padding: "18px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    textAlign: "center",
  },
  statNumber: {
    margin: "0 0 6px",
    fontSize: "28px",
    fontWeight: 800,
  },
  statLabel: {
    margin: 0,
    fontSize: "13px",
    color: "rgba(255,255,255,0.72)",
  },
  section: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 24px 70px",
  },
  sectionHeader: {
    marginBottom: "22px",
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: "34px",
    color: "#0f172a",
    fontWeight: 800,
    letterSpacing: "-1px",
  },
  sectionText: {
    margin: 0,
    fontSize: "16px",
    color: "#64748b",
    lineHeight: 1.7,
    maxWidth: "680px",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },
  featureCard: {
    background: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(255,255,255,0.9)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 14px 36px rgba(15,23,42,0.08)",
    animation: "fadeUp 0.9s ease",
  },
  featureIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    marginBottom: "16px",
    background: "linear-gradient(135deg, #dbeafe, #ccfbf1)",
  },
  featureTitle: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: 700,
    color: "#0f172a",
  },
  featureText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.75,
    color: "#475569",
  },
  cta: {
    maxWidth: "1180px",
    margin: "0 auto 70px",
    padding: "0 24px",
  },
  ctaBox: {
    borderRadius: "32px",
    padding: "34px",
    background:
      "linear-gradient(135deg, #0f172a 0%, #163257 55%, #0f766e 100%)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
  },
  ctaTitle: {
    margin: "0 0 8px",
    fontSize: "32px",
    fontWeight: 800,
    letterSpacing: "-1px",
  },
  ctaText: {
    margin: 0,
    fontSize: "15px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.75,
    maxWidth: "700px",
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
    .home-hero {
      grid-template-columns: 1fr !important;
    }
    .feature-grid {
      grid-template-columns: 1fr 1fr !important;
    }
    .showcase-stats {
      grid-template-columns: 1fr 1fr 1fr !important;
    }
  }

  @media (max-width: 720px) {
    .home-heading {
      font-size: 42px !important;
    }
    .feature-grid {
      grid-template-columns: 1fr !important;
    }
    .showcase-stats {
      grid-template-columns: 1fr !important;
    }
    .cta-box {
      padding: 26px !important;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = responsiveCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.home}>
      <Navbar />

      <section style={styles.heroWrap}>
        <div style={styles.orbOne} />
        <div style={styles.orbTwo} />

        <div style={styles.container}>
          <div className="home-hero" style={styles.hero}>
            <div style={styles.left}>
              <span style={styles.badge}>AI-Powered Interview Practice</span>

              <h1 className="home-heading" style={styles.heading}>
                Prep smarter.
                <br />
                Perform with <span style={styles.accent}>clarity.</span>
              </h1>

              <p style={styles.subheading}>
                PrepPilot AI helps you practice technical interviews with topic-based
                sessions, instant evaluation, and a dashboard that shows exactly where
                you need to improve.
              </p>

              <div style={styles.actions}>
                {token ? (
                  <>
                    <button
                      style={styles.primaryBtn}
                      onClick={() => navigate("/interview")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Start Interview
                    </button>

                    <button
                      style={styles.secondaryBtn}
                      onClick={() => navigate("/dashboard")}
                    >
                      Open Dashboard
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={styles.primaryBtn}
                      onClick={() => navigate("/register")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Create Account
                    </button>

                    <button
                      style={styles.secondaryBtn}
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>

              {user && (
                <p style={styles.userText}>
                  Logged in as <strong>{user.name}</strong>
                </p>
              )}
            </div>

            <div style={styles.right}>
              <div style={styles.showcase}>
                <div style={styles.showcaseGlow} />
                <div style={styles.showcaseGlowTwo} />

                <div style={styles.panel}>
                  <h3 style={styles.panelTitle}>Mock Interview Session</h3>
                  <p style={styles.panelText}>
                    Practice across DSA, OS, DBMS, CN, OOPS, and more with a cleaner,
                    timed, interview-style flow.
                  </p>
                </div>

                <div style={styles.panel}>
                  <h3 style={styles.panelTitle}>AI Evaluation</h3>
                  <p style={styles.panelText}>
                    Score answers, review feedback, and identify how to make your
                    explanations more structured and complete.
                  </p>
                </div>

                <div style={styles.panel}>
                  <h3 style={styles.panelTitle}>Performance Dashboard</h3>
                  <p style={styles.panelText}>
                    Track completed sessions, weak topics, average accuracy, and recent
                    attempts from one place.
                  </p>
                </div>

                <div className="showcase-stats" style={styles.statRow}>
                  <div style={styles.statCard}>
                    <p style={styles.statNumber}>3-5</p>
                    <p style={styles.statLabel}>Questions per round</p>
                  </div>
                  <div style={styles.statCard}>
                    <p style={styles.statNumber}>AI</p>
                    <p style={styles.statLabel}>Feedback driven</p>
                  </div>
                  <div style={styles.statCard}>
                    <p style={styles.statNumber}>1</p>
                    <p style={styles.statLabel}>Focused dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Why PrepPilot AI feels stronger</h2>
          <p style={styles.sectionText}>
            This is not just a form-based interview app. The goal is to make practice
            feel serious, measurable, and actually useful for placement preparation.
          </p>
        </div>

        <div className="feature-grid" style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>DSA</div>
            <h3 style={styles.featureTitle}>Topic-Focused Practice</h3>
            <p style={styles.featureText}>
              Choose a subject and enter a focused round instead of jumping through a random generic quiz.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>AI</div>
            <h3 style={styles.featureTitle}>Immediate Feedback Loop</h3>
            <p style={styles.featureText}>
              Submit answers and quickly understand what was strong, what was missing, and how to improve.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>%</div>
            <h3 style={styles.featureTitle}>Track Real Progress</h3>
            <p style={styles.featureText}>
              Use your dashboard to see repeated weaknesses, recent attempt quality, and progress over time.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>Q</div>
            <h3 style={styles.featureTitle}>Interview-Style Thinking</h3>
            <p style={styles.featureText}>
              Practice explaining concepts clearly, not just selecting answers like in a multiple-choice test.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>T</div>
            <h3 style={styles.featureTitle}>Pressure Simulation</h3>
            <p style={styles.featureText}>
              Timed interview rounds help build the habit of answering clearly under pressure.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>GO</div>
            <h3 style={styles.featureTitle}>Placement-Oriented Design</h3>
            <p style={styles.featureText}>
              Every part of the product is aimed at helping students become more interview-ready, not just entertained.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.cta}>
        <div className="cta-box" style={styles.ctaBox}>
          <div>
            <h2 style={styles.ctaTitle}>Start building better interview answers</h2>
            <p style={styles.ctaText}>
              Practice now, review what needs work, and turn every session into visible progress.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {token ? (
              <>
                <button
                  style={styles.primaryBtn}
                  onClick={() => navigate("/interview")}
                >
                  Begin Interview
                </button>
                <button
                  style={{ ...styles.secondaryBtn, background: "rgba(255,255,255,0.92)" }}
                  onClick={() => navigate("/dashboard")}
                >
                  View Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  style={styles.primaryBtn}
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </button>
                <button
                  style={{ ...styles.secondaryBtn, background: "rgba(255,255,255,0.92)" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
