import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import Navbar from "../components/Navbar";
import QuestionCard from "../components/Questioncard";
import { TOPIC_OPTIONS, getRoundSettings } from "../utils/interviewConfig";
import {
  startInterview,
  getCurrentQuestion,
  submitAnswer,
  endInterview,
} from "../services/api";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f8fbff 0%, #eef6ff 36%, #f7fffc 100%)",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },
  startWrap: {
    padding: "26px 24px 60px",
    position: "relative",
    overflow: "hidden",
  },
  orbOne: {
    position: "absolute",
    top: "-80px",
    left: "-60px",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background: "rgba(37,99,235,0.12)",
    filter: "blur(10px)",
    animation: "floatY 7s ease-in-out infinite",
  },
  orbTwo: {
    position: "absolute",
    right: "-40px",
    bottom: "40px",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "rgba(20,184,166,0.12)",
    filter: "blur(14px)",
    animation: "floatY 8s ease-in-out infinite",
  },
  shell: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1180px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: "28px",
    alignItems: "stretch",
  },
  leftPanel: {
    padding: "40px 10px 20px 4px",
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
    fontSize: "58px",
    lineHeight: 1.02,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-2px",
  },
  accent: {
    color: "#0f766e",
  },
  subheading: {
    margin: "0 0 26px",
    maxWidth: "620px",
    fontSize: "17px",
    lineHeight: 1.85,
    color: "#475569",
  },
  pointGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "20px",
  },
  pointCard: {
    padding: "18px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.76)",
    border: "1px solid rgba(255,255,255,0.92)",
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
  },
  pointTitle: {
    margin: "0 0 6px",
    fontSize: "15px",
    fontWeight: 700,
    color: "#0f172a",
  },
  pointText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#475569",
  },
  rightPanel: {
    borderRadius: "32px",
    padding: "26px",
    background: "rgba(255,255,255,0.74)",
    border: "1px solid rgba(255,255,255,0.9)",
    boxShadow: "0 24px 70px rgba(15,23,42,0.12)",
    backdropFilter: "blur(18px)",
    animation: "fadeUp 0.95s ease",
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: "34px",
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-1px",
  },
  cardDesc: {
    margin: "0 0 24px",
    fontSize: "15px",
    lineHeight: 1.75,
    color: "#64748b",
  },
  topicGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "22px",
  },
  topicCard: {
    padding: "18px",
    borderRadius: "22px",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minHeight: "126px",
    boxSizing: "border-box",
  },
  topicTitle: {
    margin: "0 0 8px",
    fontSize: "16px",
    fontWeight: 700,
  },
  topicText: {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.65,
    color: "#334155",
  },
  topicMeta: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "12px",
  },
  topicMetaPill: {
    padding: "6px 9px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.72)",
    color: "#0f172a",
    fontSize: "11px",
    fontWeight: 800,
  },
  helperRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  helperPill: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 600,
  },
  select: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "16px",
    border: "1px solid #d9e4f2",
    background: "#ffffff",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "16px",
  },
  error: {
    marginBottom: "14px",
    padding: "12px 14px",
    borderRadius: "14px",
    background: "#fff1f2",
    color: "#be123c",
    border: "1px solid #fecdd3",
    fontSize: "14px",
  },
  startButton: {
    width: "100%",
    padding: "16px 18px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(37,99,235,0.24)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  interviewWrap: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "24px 24px 56px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  topTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
    color: "#0f172a",
  },
  timer: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 700,
  },
  progressTrack: {
    width: "100%",
    height: "10px",
    borderRadius: "999px",
    background: "#dbe4f0",
    overflow: "hidden",
    marginBottom: "22px",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2563eb, #14b8a6)",
  },
  questionBox: {
    background: "rgba(255,255,255,0.82)",
    padding: "24px",
    borderRadius: "28px",
    boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
    border: "1px solid rgba(255,255,255,0.92)",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    minHeight: "180px",
    padding: "18px",
    borderRadius: "22px",
    border: "1px solid #d9e4f2",
    background: "#ffffff",
    fontSize: "15px",
    lineHeight: 1.7,
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    boxShadow: "0 10px 26px rgba(148,163,184,0.08)",
    marginBottom: "18px",
  },
  nextButton: {
    width: "100%",
    padding: "16px 18px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 16px 30px rgba(20,184,166,0.22)",
  },
  centerState: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "80px 24px",
    textAlign: "center",
    color: "#334155",
    fontSize: "18px",
    fontWeight: 600,
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
    .interview-shell {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 720px) {
    .interview-heading {
      font-size: 40px !important;
    }
    .topic-grid {
      grid-template-columns: 1fr !important;
    }
    .point-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

export default function InterviewPage() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEndingDueToTime, setIsEndingDueToTime] = useState(false);
  const [error, setError] = useState("");

  const selectedRoundSettings = getRoundSettings(topic);
  const isCodingQuestion = currentQuestion?.type === "coding";

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = responsiveCss;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const finishInterview = useCallback(
    async (id) => {
      const finalRes = await endInterview(id);
      navigate("/result", { state: finalRes.data });
    },
    [navigate]
  );

  const fetchQuestion = useCallback(
    async (id) => {
      const res = await getCurrentQuestion(id);

      if (res.data.message === "Interview completed") {
        await finishInterview(id);
        return;
      }

      setCurrentQuestion(res.data.question);

      if (res.data.totalQuestions) {
        setTotalQuestions(res.data.totalQuestions);
      }
    },
    [finishInterview]
  );

  const initInterview = async () => {
    if (!topic) {
      setError("Please select a topic to begin.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await startInterview(topic);
      const id = res.data.sessionId;
      const roundSettings = getRoundSettings(topic);

      setSessionId(id);
      setQuestionIndex(0);
      setTimeLeft(roundSettings.duration);
      setTotalQuestions(res.data.totalQuestions || roundSettings.totalQuestions);
      setCurrentAnswer("");
      setCode("");
      setCurrentQuestion(null);
      setIsEndingDueToTime(false);

      try {
        await fetchQuestion(id);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Interview started, but failed to load the first question."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (timeLeft <= 0) {
      setError("Time is up. Ending interview...");
      return;
    }

    if (isCodingQuestion && !code.trim()) {
      setError("Please write your code before continuing.");
      return;
    }

    if (!isCodingQuestion && !currentAnswer.trim()) {
      setError("Please enter your answer before continuing.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const finalAnswer = isCodingQuestion
        ? `
Language: ${language}

Code:
${code}

Approach and Complexity:
${currentAnswer || "Not provided"}
`
        : currentAnswer;

      const res = await submitAnswer(sessionId, finalAnswer);
      setCurrentAnswer("");
      setCode("");

      if (res.data.nextQuestionIndex >= totalQuestions) {
        await finishInterview(sessionId);
        return;
      }

      setQuestionIndex((prev) => prev + 1);
      await fetchQuestion(sessionId);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to submit answer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!sessionId || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId, timeLeft]);

  useEffect(() => {
    if (!sessionId || !currentQuestion || timeLeft > 0 || isEndingDueToTime) {
      return;
    }

    const endExpiredInterview = async () => {
      try {
        setIsEndingDueToTime(true);
        setError("Time is up. Ending interview...");
        await finishInterview(sessionId);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Time is up, but failed to end interview."
        );
        setIsEndingDueToTime(false);
      }
    };

    endExpiredInterview();
  }, [currentQuestion, finishInterview, isEndingDueToTime, sessionId, timeLeft]);

  if (!sessionId) {
    return (
      <div style={styles.page}>
        <Navbar />

        <div style={styles.startWrap}>
          <div style={styles.orbOne} />
          <div style={styles.orbTwo} />

          <div className="interview-shell" style={styles.shell}>
            <div style={styles.leftPanel}>
              <span style={styles.badge}>Interview Setup</span>

              <h1 className="interview-heading" style={styles.heading}>
                Choose your topic.
                <br />
                Start with <span style={styles.accent}>focus.</span>
              </h1>

              <p style={styles.subheading}>
                Select the subject you want to practice, begin a timed mock round,
                and get ready for a more serious interview-style experience.
              </p>

              <div className="point-grid" style={styles.pointGrid}>
                <div style={styles.pointCard}>
                  <h3 style={styles.pointTitle}>
                    {topic
                      ? `${selectedRoundSettings.questionsLabel} interview flow`
                      : "Topic-based interview flow"}
                  </h3>
                  <p style={styles.pointText}>
                    Each round gives you a focused set of questions to simulate a real practice session.
                  </p>
                </div>

                <div style={styles.pointCard}>
                  <h3 style={styles.pointTitle}>Timed environment</h3>
                  <p style={styles.pointText}>
                    Practice under light pressure so your explanations become sharper and more confident.
                  </p>
                </div>

                <div style={styles.pointCard}>
                  <h3 style={styles.pointTitle}>Topic-wise preparation</h3>
                  <p style={styles.pointText}>
                    Train exactly where you need work instead of spreading attention too thin.
                  </p>
                </div>

                <div style={styles.pointCard}>
                  <h3 style={styles.pointTitle}>Built for placements</h3>
                  <p style={styles.pointText}>
                    The goal is not random quiz practice, but better interview answers and better clarity.
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.rightPanel}>
              <h2 style={styles.cardTitle}>Start Interview</h2>
              <p style={styles.cardDesc}>
                Pick one topic below and begin your mock interview round.
              </p>

              <div style={styles.helperRow}>
                <span style={styles.helperPill}>
                  {selectedRoundSettings.timeLabel}
                </span>
                <span style={styles.helperPill}>
                  {selectedRoundSettings.questionsLabel}
                </span>
                <span style={styles.helperPill}>AI feedback ready</span>
              </div>

              <div className="topic-grid" style={styles.topicGrid}>
                {TOPIC_OPTIONS.map((item) => {
                  const isActive = topic === item.value;

                  return (
                    <div
                      key={item.value}
                      onClick={() => {
                        setTopic(item.value);
                        setError("");
                      }}
                      style={{
                        ...styles.topicCard,
                        background: item.color,
                        borderColor: isActive ? item.accent : "transparent",
                        boxShadow: isActive
                          ? `0 16px 34px ${item.accent}22`
                          : "0 10px 24px rgba(15,23,42,0.06)",
                        transform: isActive ? "translateY(-2px)" : "translateY(0)",
                      }}
                    >
                      <h3 style={{ ...styles.topicTitle, color: item.accent }}>
                        {item.title}
                      </h3>
                      <p style={styles.topicText}>{item.subtitle}</p>

                      <div style={styles.topicMeta}>
                        <span style={styles.topicMetaPill}>
                          {item.questionsLabel}
                        </span>
                        <span style={styles.topicMetaPill}>{item.timeLabel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <select
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setError("");
                }}
                style={styles.select}
              >
                <option value="">Select Topic</option>
                {TOPIC_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </select>

              {error && <div style={styles.error}>{error}</div>}

              <button
                onClick={initInterview}
                style={styles.startButton}
                disabled={loading}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 34px rgba(37,99,235,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 30px rgba(37,99,235,0.24)";
                }}
              >
                {loading ? "Starting Interview..." : "Start Interview"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.centerState}>Loading question...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.interviewWrap}>
        <div style={styles.topBar}>
          <h2 style={styles.topTitle}>
            Question {questionIndex + 1} / {totalQuestions}
          </h2>

          <div style={styles.timer}>Time Left: {formatTime(timeLeft)}</div>
        </div>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>

        <div style={styles.questionBox}>
          <QuestionCard
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            topic={currentQuestion.topic}
            difficulty={currentQuestion.difficulty}
            company="PrepPilot AI"
            questionText={currentQuestion.title}
            description={currentQuestion.description}
            examples={currentQuestion.examples}
            constraints={currentQuestion.constraints}
            expectedComplexity={currentQuestion.expectedComplexity}
          />
        </div>

        {isCodingQuestion ? (
          <>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.select}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>

            <CodeEditor language={language} value={code} onChange={setCode} />

            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Explain your approach, time complexity, and space complexity..."
              style={styles.textarea}
              onFocus={(e) => {
                e.target.style.borderColor = "#60a5fa";
                e.target.style.boxShadow = "0 0 0 4px rgba(96,165,250,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d9e4f2";
                e.target.style.boxShadow = "0 10px 26px rgba(148,163,184,0.08)";
              }}
            />
          </>
        ) : (
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Write your answer here..."
            style={styles.textarea}
            onFocus={(e) => {
              e.target.style.borderColor = "#60a5fa";
              e.target.style.boxShadow = "0 0 0 4px rgba(96,165,250,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d9e4f2";
              e.target.style.boxShadow = "0 10px 26px rgba(148,163,184,0.08)";
            }}
          />
        )}

        {error && <div style={styles.error}>{error}</div>}

        <button
          onClick={handleNext}
          disabled={isSubmitting || isEndingDueToTime || timeLeft <= 0}
          style={styles.nextButton}
        >
          {isSubmitting || isEndingDueToTime ? "Submitting..." : "Next Question"}
        </button>
      </div>
    </div>
  );
}
