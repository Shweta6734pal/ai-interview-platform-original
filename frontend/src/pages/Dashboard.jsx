import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardSummary } from "../services/api";
import Navbar from "../components/Navbar";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #eef6ff 36%, #f7fffc 100%)",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },
  wrap: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "26px 24px 60px",
  },
  hero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "34px",
    padding: "32px",
    background:
      "linear-gradient(135deg, #0f172a 0%, #163257 50%, #0f766e 100%)",
    color: "#ffffff",
    boxShadow: "0 28px 70px rgba(15,23,42,0.18)",
    marginBottom: "26px",
  },
  orbOne: {
    position: "absolute",
    top: "-50px",
    right: "-30px",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "rgba(96,165,250,0.18)",
    filter: "blur(10px)",
  },
  orbTwo: {
    position: "absolute",
    bottom: "-40px",
    left: "-20px",
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    background: "rgba(45,212,191,0.16)",
    filter: "blur(12px)",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.16)",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "14px",
  },
  heroTitle: {
    margin: "0 0 10px",
    fontSize: "42px",
    fontWeight: 800,
    letterSpacing: "-1.3px",
  },
  heroText: {
    margin: 0,
    maxWidth: "760px",
    color: "rgba(255,255,255,0.82)",
    fontSize: "15px",
    lineHeight: 1.8,
  },
  quickActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "22px",
  },
  primaryBtn: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(37,99,235,0.22)",
  },
  secondaryBtn: {
    padding: "14px 20px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.1)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
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
  loading: {
    maxWidth: "860px",
    margin: "80px auto",
    textAlign: "center",
    color: "#475569",
    fontSize: "18px",
    fontWeight: 600,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "rgba(255,255,255,0.84)",
    border: "1px solid rgba(255,255,255,0.92)",
    borderRadius: "26px",
    padding: "22px",
    boxShadow: "0 16px 44px rgba(15,23,42,0.08)",
  },
  statLabel: {
    margin: "0 0 10px",
    fontSize: "13px",
    color: "#64748b",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  statValue: {
    margin: "0 0 6px",
    fontSize: "32px",
    fontWeight: 800,
    color: "#0f172a",
  },
  statHint: {
    margin: 0,
    fontSize: "13px",
    color: "#475569",
    lineHeight: 1.6,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "24px",
    alignItems: "start",
  },
  card: {
    background: "rgba(255,255,255,0.84)",
    border: "1px solid rgba(255,255,255,0.92)",
    borderRadius: "28px",
    padding: "24px",
    boxShadow: "0 16px 44px rgba(15,23,42,0.08)",
    marginBottom: "20px",
  },
  cardTitle: {
    margin: "0 0 10px",
    fontSize: "22px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.6px",
  },
  cardText: {
    margin: "0 0 18px",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.8,
  },
  pillWrap: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  pillBlue: {
    padding: "9px 14px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    color: "#1d4ed8",
    fontWeight: 700,
    fontSize: "13px",
  },
  pillRed: {
    padding: "9px 14px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #fee2e2, #fecaca)",
    color: "#b91c1c",
    fontWeight: 700,
    fontSize: "13px",
  },
  attemptList: {
    display: "grid",
    gap: "14px",
  },
  attemptCard: {
    borderRadius: "22px",
    padding: "18px",
    background: "linear-gradient(180deg, #ffffff, #f8fbff)",
    border: "1px solid #e2e8f0",
  },
  attemptTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  attemptTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: 800,
  },
  attemptMeta: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: 1.7,
  },
  statusPill: {
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 800,
  },
  metricsRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "12px",
  },
  metricPill: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 700,
  },
};

const responsiveCss = `
  @media (max-width: 1100px) {
    .dashboard-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    }
    .dashboard-layout {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 720px) {
    .dashboard-hero-title {
      font-size: 32px !important;
    }
    .dashboard-stats {
      grid-template-columns: 1fr !important;
    }
  }
`;

const getAccuracyTone = (value) => {
  if (value >= 70) {
    return { color: "#166534", bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)" };
  }
  if (value >= 40) {
    return { color: "#a16207", bg: "linear-gradient(135deg, #fef3c7, #fde68a)" };
  }
  return { color: "#b91c1c", bg: "linear-gradient(135deg, #fee2e2, #fecaca)" };
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = responsiveCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getDashboardSummary();
        setStats(res.data);
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.wrap}>
          <div style={styles.loading}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.wrap}>
        <div style={styles.hero}>
          <div style={styles.orbOne} />
          <div style={styles.orbTwo} />

          <div style={styles.heroContent}>
            <span style={styles.badge}>Performance Dashboard</span>
            <h1 className="dashboard-hero-title" style={styles.heroTitle}>
              Track your PrepPilot AI progress
            </h1>
            <p style={styles.heroText}>
              Review your interview history, understand your weak topics, and keep
              improving with every practice round.
            </p>

            <div style={styles.quickActions}>
              <button
                onClick={() => navigate("/interview")}
                style={styles.primaryBtn}
              >
                Start Interview
              </button>
              <button
                onClick={() => navigate("/")}
                style={styles.secondaryBtn}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {stats && (
          <>
            <div className="dashboard-stats" style={styles.statsGrid}>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Interviews</p>
                <p style={{ ...styles.statValue, color: "#1d4ed8" }}>
                  {stats.totalSessions}
                </p>
                <p style={styles.statHint}>All sessions recorded so far.</p>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>Completed</p>
                <p style={{ ...styles.statValue, color: "#15803d" }}>
                  {stats.totalCompleted}
                </p>
                <p style={styles.statHint}>Successfully finished interview rounds.</p>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>Average Score</p>
                <p style={{ ...styles.statValue, color: "#b45309" }}>
                  {stats.averageScore}
                </p>
                <p style={styles.statHint}>Average across completed interviews.</p>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>Average Accuracy</p>
                <p style={{ ...styles.statValue, color: "#0f766e" }}>
                  {stats.averageAccuracy}%
                </p>
                <p style={styles.statHint}>Your current answer quality trend.</p>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>Best Score</p>
                <p style={{ ...styles.statValue, color: "#6d28d9" }}>
                  {stats.bestScore}
                </p>
                <p style={styles.statHint}>Your highest-scoring completed round.</p>
              </div>
            </div>

            <div className="dashboard-layout" style={styles.layout}>
              <div>
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>Topic Breakdown</h2>
                  <p style={styles.cardText}>
                    These are the subjects you have practiced most across completed sessions.
                  </p>

                  {stats.topicBreakdown?.length > 0 ? (
                    <div style={styles.pillWrap}>
                      {stats.topicBreakdown.map(({ topic, count }) => (
                        <span key={topic} style={styles.pillBlue}>
                          {topic}: {count}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.cardText}>No topic data available yet.</p>
                  )}
                </div>

                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>Weak Topics</h2>
                  <p style={styles.cardText}>
                    These subjects currently need the most attention based on your average accuracy.
                  </p>

                  {stats.weakTopics?.length > 0 ? (
                    <div style={styles.pillWrap}>
                      {stats.weakTopics.map((item) => (
                        <span key={item.topic} style={styles.pillRed}>
                          {item.topic}: {item.averageAccuracy}% avg
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.cardText}>No weak topic data available yet.</p>
                  )}
                </div>
              </div>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Recent Attempts</h2>
                <p style={styles.cardText}>
                  Your last interview sessions, including score percentage, status, and topic coverage.
                </p>

                {stats.recentSessions?.length > 0 ? (
                  <div style={styles.attemptList}>
                    {stats.recentSessions.map((session) => {
                      const tone = getAccuracyTone(session.scorePercentage);
                      const isCompleted = session.status === "completed";

                      return (
                        <div key={session.id} style={styles.attemptCard}>
                          <div style={styles.attemptTop}>
                            <div>
                              <h3 style={styles.attemptTitle}>
                                Attempt #{session.attemptNumber}
                              </h3>
                              <p style={styles.attemptMeta}>
                                {session.topics?.join(", ") || "General"}
                                <br />
                                {new Date(session.createdAt).toLocaleString()}
                              </p>
                            </div>

                            <span
                              style={{
                                ...styles.statusPill,
                                background: isCompleted
                                  ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                                  : "linear-gradient(135deg, #fef3c7, #fde68a)",
                                color: isCompleted ? "#166534" : "#854d0e",
                              }}
                            >
                              {session.status}
                            </span>
                          </div>

                          <div style={styles.metricsRow}>
                            <span style={styles.metricPill}>
                              {session.answeredQuestions}/{session.totalQuestions} answered
                            </span>

                            <span
                              style={{
                                ...styles.metricPill,
                                background: tone.bg,
                                color: tone.color,
                                border: "none",
                              }}
                            >
                              {session.scorePercentage}%
                            </span>

                            <span style={styles.metricPill}>
                              Score: {session.score}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p style={styles.cardText}>No recent sessions found yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
