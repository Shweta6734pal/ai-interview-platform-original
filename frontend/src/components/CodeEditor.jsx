import Editor from "@monaco-editor/react";

const editorLanguageMap = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
};

const styles = {
  wrapper: {
    borderRadius: "18px",
    overflow: "hidden",
    marginBottom: "18px",
    border: "1px solid #1e293b",
    boxShadow: "0 14px 34px rgba(15,23,42,0.12)",
  },
};

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <div style={styles.wrapper}>
      <Editor
        height="360px"
        language={editorLanguageMap[language] || "javascript"}
        value={value}
        onChange={(nextValue) => onChange(nextValue || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
