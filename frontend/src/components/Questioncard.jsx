import { getDifficultyColor, getTopicColor } from "../utils/interviewConfig";

const styles = {
  card: {
    borderRadius: "26px",
    background: "linear-gradient(180deg, #ffffff, #f8fbff)",
    padding: "10px 4px 4px",
  },
  progressTrack: {
    height: "10px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "22px",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2563eb, #14b8a6)",
  },
  badgeRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  badge: {
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.3px",
  },
  questionLabel: {
    margin: "0 0 10px",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.7px",
  },
  title: {
    margin: "0 0 14px",
    color: "#0f172a",
    fontSize: "30px",
    lineHeight: 1.3,
    fontWeight: 800,
    letterSpacing: "-0.8px",
  },
  description: {
    margin: 0,
    color: "#475569",
    fontSize: "15px",
    lineHeight: 1.8,
  },
  section: {
    marginTop: "22px",
    paddingTop: "18px",
    borderTop: "1px solid #e2e8f0",
  },
  sectionTitle: {
    margin: "0 0 12px",
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: 800,
  },
  exampleList: {
    display: "grid",
    gap: "12px",
  },
  exampleCard: {
    padding: "14px",
    borderRadius: "16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  codeLine: {
    margin: "8px 0 0",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "'Fira Code', Consolas, monospace",
    fontSize: "13px",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
  label: {
    margin: "0 0 4px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 800,
  },
  explanation: {
    margin: "10px 0 0",
    color: "#475569",
    fontSize: "14px",
    lineHeight: 1.7,
  },
  constraints: {
    margin: 0,
    paddingLeft: "18px",
    color: "#475569",
    fontSize: "14px",
    lineHeight: 1.8,
  },
  complexity: {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #ecfeff, #dbeafe)",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: 700,
  },
};

const QuestionCard = ({
  questionIndex,
  totalQuestions,
  topic,
  difficulty = "Medium",
  company = "PrepPilot AI",
  questionText,
  description,
  examples = [],
  constraints = [],
  expectedComplexity = "",
}) => {
  const topicColor = getTopicColor(topic);
  const difficultyColor = getDifficultyColor(difficulty);
  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div style={styles.card}>
      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progressPercent}%`,
          }}
        />
      </div>

      <div style={styles.badgeRow}>
        <span
          style={{
            ...styles.badge,
            background: topicColor.bg,
            color: topicColor.text,
          }}
        >
          {topic}
        </span>

        <span
          style={{
            ...styles.badge,
            background: difficultyColor.bg,
            color: difficultyColor.text,
          }}
        >
          {difficulty}
        </span>

        <span
          style={{
            ...styles.badge,
            background: "linear-gradient(135deg, #e0f2fe, #ccfbf1)",
            color: "#0f172a",
          }}
        >
          {company}
        </span>
      </div>

      <p style={styles.questionLabel}>Interview Question</p>
      <h2 style={styles.title}>{questionText}</h2>

      {description && <p style={styles.description}>{description}</p>}

      {examples.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Examples</h3>

          <div style={styles.exampleList}>
            {examples.map((example, index) => (
              <div key={`${example.input}-${index}`} style={styles.exampleCard}>
                {example.input && (
                  <>
                    <p style={styles.label}>Input</p>
                    <pre style={styles.codeLine}>{example.input}</pre>
                  </>
                )}

                {example.output && (
                  <>
                    <p style={{ ...styles.label, marginTop: "12px" }}>Output</p>
                    <pre style={styles.codeLine}>{example.output}</pre>
                  </>
                )}

                {example.explanation && (
                  <p style={styles.explanation}>{example.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {constraints.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Constraints</h3>
          <ul style={styles.constraints}>
            {constraints.map((constraint, index) => (
              <li key={`${constraint}-${index}`}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}

      {expectedComplexity && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Expected Complexity</h3>
          <span style={styles.complexity}>{expectedComplexity}</span>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
