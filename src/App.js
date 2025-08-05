import React, { useState } from "react";
import "./App.css";

// Simulated backend response
const simulatedAPIResponse = {
  answer:
    "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
  citations: [
    {
      text:
        "as the age of the deceased at the time of accident was held to be about 54–55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects. (Para 7 of the document)",
      source: "Dan i_Devi_v_Pritam_Singh.pdf",
      link:
        "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
    },
  ],
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);

  const handleSubmit = () => {
    if (!query.trim()) return;

    setSubmittedQuery(query);
    setQuery("");
    setLoading(true);
    setAnswerData(null);

    setTimeout(() => {
      setAnswerData(simulatedAPIResponse);
      setLoading(false);
    }, 1500);
  };

  const handleCitationClick = (citation) => {
    setPdfLink(citation.link);
    setShowPdf(true);
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark" : ""}`}>
      <div className="chat-box">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            marginBottom: "10px",
            alignSelf: "flex-end",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
          title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        <h1 className="heading">Lexi Legal Assistant</h1>

        <div className="messages">
          {submittedQuery && (
            <div className="message user-message">
              <span className="label">User:</span> {submittedQuery}
            </div>
          )}

          {loading && (
            <div className="message loading-message">
              <span className="label">Lexi:</span> Generating answer...
            </div>
          )}

          {answerData && !loading && (
            <div className="message ai-message">
              <span className="label">Lexi:</span> {answerData.answer}

              <div className="citation-section">
                <p className="citation-label">Citation:</p>
                {answerData.citations.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCitationClick(c)}
                    className="citation-link"
                  >
                    {c.text}
                    <span className="citation-source">
                      Source: {c.source}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="input-panel">
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a legal question..."
          />
          <button onClick={handleSubmit} disabled={loading || !query.trim()}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>

      {showPdf && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Judgment PDF Viewer</h2>
              <button
                className="modal-close"
                onClick={() => setShowPdf(false)}
              >
                &times;
              </button>
            </div>
            <p className="scroll-message">
              Jumping to Para 7 (simulated)...
            </p>
            <iframe
              src={pdfLink}
              title="Judgment PDF"
              className="modal-iframe"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
