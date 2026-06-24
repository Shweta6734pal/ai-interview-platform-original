import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  emptyState: {
    maxWidth: "760px",
    margin: "50px auto",
    background: "rgba(255,255,255,0.84)",
    border: "1px solid rgba(255,255,255,0.92)",
    borderRadius: "30px",
    padding: "36px",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(15,23,42,0.1)",
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
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  statCard: {
    position: "relative",
    zIndex: 1,
    borderRadius: "24px",
    padding: "20px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
  },
  statLabel: {
    margin: "0 0 8px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.72)",
    fontWeight: 600,
  },
  statValue: {
    margin: 0,
    fontSize: "30px",
    fontWeight: 800,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "0.92fr 1.08fr",
    gap: "24px",
    alignItems: "start",
  },
  sideCard: {
    background: "rgba(255,255,255,0.84)",
    border: "1px solid rgba(255,255,255,0.92)",
    borderRadius: "28px",
    padding: "24px",
    boxShadow: "0 16px 44px rgba(15,23,42,0.08)",
    marginBottom: "20px",
  },
  sideTitle: {
    margin: "0 0 10px",
    fontSize: "22px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.6px",
  },
  sideText: {
    margin: 0,
    color: "#475569",
    fontSize: "14px",
    lineHeight: 1.8,
  },
  scoreBarTrack: {
    width: "100%",
    height: "12px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "16px",
  },
  scoreBarFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2563eb, #14b8a6)",
  },
  infoList: {
    display: "grid",
    gap: "12px",
    marginTop: "18px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    padding: "12px 14px",
    borderRadius: "16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
  },
  infoLabel: {
    color: "#64748b",
    fontWeight: 600,
  },
  infoValue: {
    color: "#0f172a",
    fontWeight: 700,
    textAlign: "right",
  },
  answerCard: {
    background: "rgba(255,255,255,0.84)",
    border: "1px solid rgba(255,255,255,0.92)",
    borderRadius: "28px",
    padding: "22px",
    boxShadow: "0 16px 44px rgba(15,23,42,0.08)",
    marginBottom: "18px",
  },
  answerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },
  answerQuestion: {
    margin: 0,
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: 800,
    lineHeight: 1.5,
  },
  answerScore: {
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 800,
  },
  sectionLabel: {
    margin: "14px 0 8px",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  answerText: {
    margin: 0,
    color: "#334155",
    fontSize: "14px",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
  },
  feedbackBox: {
    marginTop: "6px",
    padding: "14px 16px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #eff6ff, #ecfeff)",
    border: "1px solid #dbeafe",
  },
  rubricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
    marginTop: "8px",
  },
  rubricItem: {
    padding: "12px",
    borderRadius: "16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  rubricLabel: {
    margin: "0 0 6px",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  rubricScore: {
    margin: 0,
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: 800,
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "18px",
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
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

const responsiveCss = `
  @media (max-width: 980px) {
    .result-layout {
      grid-template-columns: 1fr !important;
    }
    .result-stats {
      grid-template-columns: 1fr 1fr !important;
    }
  }

  @media (max-width: 640px) {
    .result-hero-title {
      font-size: 32px !important;
    }
    .result-stats {
      grid-template-columns: 1fr !important;
    }
  }
`;

const getScoreStyle = (score) => {
  if (score >= 8) {
    return {
      background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
      color: "#166534",
    };
  }

  if (score >= 5) {
    return {
      background: "linear-gradient(135deg, #fef3c7, #fde68a)",
      color: "#a16207",
    };
  }

  return {
    background: "linear-gradient(135deg, #fee2e2, #fecaca)",
    color: "#b91c1c",
  };
};

const rubricLabels = {
  theory: [
    ["correctness", "Correctness", 4],
    ["depth", "Depth", 2],
    ["clarity", "Clarity", 2],
    ["examples", "Examples", 1],
    ["completeness", "Completeness", 1],
  ],
  coding: [
    ["correctness", "Correctness", 4],
    ["algorithm", "Algorithm", 2],
    ["complexity", "Complexity", 2],
    ["codeQuality", "Code Quality", 1],
    ["explanation", "Explanation", 1],
  ],
};

const getRubricItems = (answer) => {
  if (!answer?.rubric) {
    return [];
  }

  const rubricType = answer.rubricType === "coding" ? "coding" : "theory";

  return rubricLabels[rubricType]
    .filter(([key]) => answer.rubric[key] !== undefined && answer.rubric[key] !== null)
    .map(([key, label, max]) => ({
      key,
      label,
      max,
      value: answer.rubric[key],
    }));
};

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = responsiveCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!state) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.wrap}>
          <div style={styles.emptyState}>
            <h2 style={{ marginTop: 0, fontSize: "30px", color: "#0f172a" }}>
              No result data
            </h2>
            <p style={{ color: "#64748b", lineHeight: 1.8 }}>
              This page needs interview result data. Go back to your dashboard and start a fresh session.
            </p>
            <div style={styles.actions}>
              <button
                onClick={() => navigate("/dashboard")}
                style={styles.primaryBtn}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    totalScore = 0,
    totalQuestions = 0,
    answeredQuestions = 0,
    accuracy = 0,
    overallFeedback = "No feedback available",
    answers = [],
    completedAt,
  } = state;

  const maxScore = answeredQuestions * 10;
  const scorePercent = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.wrap}>
        <div style={styles.hero}>
          <div style={styles.orbOne} />
          <div style={styles.orbTwo} />

          <div style={styles.heroContent}>
            <span style={styles.badge}>Interview Summary</span>
            <h1 className="result-hero-title" style={styles.heroTitle}>
              Your PrepPilot AI result is ready
            </h1>
            <p style={styles.heroText}>
              Review your interview performance, check your answer-by-answer breakdown,
              and identify where your explanations can become clearer and stronger.
            </p>

            <div className="result-stats" style={styles.statGrid}>
              <div style={styles.statCard}>
                <p style={styles.statLabel}>Total Score</p>
                <p style={styles.statValue}>
                  {totalScore}/{maxScore}
                </p>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>Accuracy</p>
                <p style={styles.statValue}>{accuracy}%</p>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>Answered</p>
                <p style={styles.statValue}>
                  {answeredQuestions}/{totalQuestions}
                </p>
              </div>

              <div style={styles.statCard}>
                <p style={styles.statLabel}>Completed</p>
                <p style={{ ...styles.statValue, fontSize: "16px", lineHeight: 1.5 }}>
                  {completedAt ? new Date(completedAt).toLocaleString() : "Just now"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="result-layout" style={styles.layout}>
          <div>
            <div style={styles.sideCard}>
              <h2 style={styles.sideTitle}>Overall Feedback</h2>
              <p style={styles.sideText}>{overallFeedback}</p>

              <div style={styles.scoreBarTrack}>
                <div
                  style={{
                    ...styles.scoreBarFill,
                    width: `${scorePercent}%`,
                  }}
                />
              </div>
            </div>

            <div style={styles.sideCard}>
              <h2 style={styles.sideTitle}>Performance Snapshot</h2>

              <div style={styles.infoList}>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Interview Type</span>
                  <span style={styles.infoValue}>Topic-based mock interview</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Questions Attempted</span>
                  <span style={styles.infoValue}>{answeredQuestions}</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Questions Planned</span>
                  <span style={styles.infoValue}>{totalQuestions}</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Score Percentage</span>
                  <span style={styles.infoValue}>{scorePercent.toFixed(1)}%</span>
                </div>
              </div>

              <div style={styles.actions}>
                <button
                  onClick={() => navigate("/interview")}
                  style={styles.primaryBtn}
                >
                  Take Another Interview
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  style={styles.secondaryBtn}
                >
                  View Dashboard
                </button>
              </div>
            </div>
          </div>

          <div>
            {answers.length === 0 ? (
              <div style={styles.sideCard}>
                <h2 style={styles.sideTitle}>Answer Breakdown</h2>
                <p style={styles.sideText}>No answers found for this session.</p>
              </div>
            ) : (
              answers.map((ans, idx) => {
                const scoreStyle = getScoreStyle(ans.score ?? 0);
                const rubricItems = getRubricItems(ans);

                return (
                  <div key={idx} style={styles.answerCard}>
                    <div style={styles.answerTop}>
                      <h3 style={styles.answerQuestion}>
                        Q{idx + 1}. {ans.questionText}
                      </h3>

                      <span
                        style={{
                          ...styles.answerScore,
                          ...scoreStyle,
                        }}
                      >
                        Score: {ans.score}/10
                      </span>
                    </div>

                    <p style={styles.sectionLabel}>Your Answer</p>
                    <p style={styles.answerText}>
                      {ans.userAnswer || "No answer submitted."}
                    </p>

                    {rubricItems.length > 0 && (
                      <>
                        <p style={styles.sectionLabel}>Rubric Breakdown</p>
                        <div style={styles.rubricGrid}>
                          {rubricItems.map((item) => (
                            <div key={item.key} style={styles.rubricItem}>
                              <p style={styles.rubricLabel}>{item.label}</p>
                              <p style={styles.rubricScore}>
                                {item.value}/{item.max}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <p style={styles.sectionLabel}>AI Feedback</p>
                    <div style={styles.feedbackBox}>
                      <p style={styles.answerText}>{ans.feedback || "No feedback available."}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
