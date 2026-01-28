import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.css';

const History = () => {
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiBase = "https://quizgenerater-backend-1.onrender.com";
    fetch(`${apiBase}/quizzes`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(err => console.error("Failed to fetch history:", err));
  }, []);

  const handleViewDetails = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const closeModal = () => {
    setSelectedQuiz(null);
  };

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to delete all history? This cannot be undone.")) {
      try {
        const apiBase = "https://quizgenerater-backend-1.onrender.com";
        await fetch(`${apiBase}/quizzes`, { method: "DELETE" });
        setHistory([]);
      } catch (err) {
        console.error("Failed to clear history:", err);
        alert("Failed to clear history");
      }
    }
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Quiz History</h1>
        <div className="header-actions">
          {history.length > 0 && (
            <button className="buttn clear-btn" onClick={handleClearHistory}>
              Clear History
            </button>
          )}
          <Link to="/">
            <button className="buttn">Back to Home</button>
          </Link>
        </div>
      </div>

      {history.length === 0 ? (
        <p className="no-history">No quizzes generated yet. Go create one!</p>
      ) : (
        <div className="table-container">
          <table className="quiz-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.id || index + 1}</td>
                  <td>{item.title}</td>
                  <td className="url-cell" title={item.url}>{item.url}</td>
                  <td>
                    <button className="details-btn" onClick={() => handleViewDetails(item)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedQuiz && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h2>{selectedQuiz.title}</h2>
            <div className="quiz-preview">
              {selectedQuiz.questions && selectedQuiz.questions.map((item, index) => (
                <div key={index} className="question-preview-card">
                  <p><strong>Q{index + 1}:</strong> {item.q}</p>
                  <ul>
                    {Array.isArray(item.options) && item.options.map((opt, i) => (
                      <li key={i} className={opt === item.answer ? "correct-opt" : ""}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History