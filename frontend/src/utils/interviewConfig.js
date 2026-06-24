export const TOPIC_OPTIONS = [
  {
    value: "DSA",
    title: "DSA",
    subtitle: "Problem solving, patterns, complexity, and coding logic.",
    questionsLabel: "3 questions",
    timeLabel: "1 hour",
    color: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    accent: "#1d4ed8",
  },
  {
    value: "OOPS",
    title: "OOPS",
    subtitle: "Core object-oriented design, principles, and examples.",
    questionsLabel: "5 questions",
    timeLabel: "30 minutes",
    color: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    accent: "#15803d",
  },
  {
    value: "DBMS",
    title: "DBMS",
    subtitle: "Normalization, SQL concepts, transactions, and indexing.",
    questionsLabel: "5 questions",
    timeLabel: "30 minutes",
    color: "linear-gradient(135deg, #fef3c7, #fde68a)",
    accent: "#b45309",
  },
  {
    value: "OS",
    title: "Operating Systems",
    subtitle: "Processes, memory, scheduling, concurrency, and deadlocks.",
    questionsLabel: "5 questions",
    timeLabel: "30 minutes",
    color: "linear-gradient(135deg, #fee2e2, #fecaca)",
    accent: "#b91c1c",
  },
  {
    value: "CN",
    title: "Computer Networks",
    subtitle: "Protocols, layers, routing, TCP/IP, and communication basics.",
    questionsLabel: "5 questions",
    timeLabel: "30 minutes",
    color: "linear-gradient(135deg, #cffafe, #a5f3fc)",
    accent: "#0f766e",
  },
];

export const getRoundSettings = (topic) => {
  if (topic === "DSA") {
    return {
      totalQuestions: 3,
      duration: 60 * 60,
      questionsLabel: "3 questions",
      timeLabel: "1 hour",
    };
  }

  if (!topic) {
    return {
      totalQuestions: 0,
      duration: 0,
      questionsLabel: "Select topic",
      timeLabel: "Topic-based time",
    };
  }

  return {
    totalQuestions: 5,
    duration: 30 * 60,
    questionsLabel: "5 questions",
    timeLabel: "30 minutes",
  };
};

export const getTopicColor = (topic) => {
  const topicOption = TOPIC_OPTIONS.find(
    (option) => option.value.toLowerCase() === topic?.toLowerCase()
  );

  if (topicOption) {
    return {
      bg: topicOption.color,
      text: topicOption.accent,
    };
  }

  if (topic?.toLowerCase() === "system design") {
    return {
      bg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
      text: "#6d28d9",
    };
  }

  return {
    bg: "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
    text: "#475569",
  };
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return {
        bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
        text: "#15803d",
      };
    case "medium":
      return {
        bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
        text: "#b45309",
      };
    case "hard":
      return {
        bg: "linear-gradient(135deg, #fee2e2, #fecaca)",
        text: "#b91c1c",
      };
    default:
      return {
        bg: "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
        text: "#475569",
      };
  }
};
