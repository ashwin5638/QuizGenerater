import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';


const Home = () => {
  const [url, setUrl] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({}); // { [questionIndex]: { selected: "Option", correct: true/false } }
  const location = useLocation();

  useEffect(() => {
    if (location.state?.quiz) {
      setQuiz(location.state.quiz);
      setScore(0);
      setAnswered({});
      // Ensure specific fields map correctly if backend model differs slightly (often backend uses snake_case, frontend expects structure)
      // Our backend returns {questions: ...} so it should match.
    }
  }, [location.state]);


  const Generate = async () => {
    if (!url) return;

    setLoading(true);
    setQuiz(null);
    setScore(0);
    setAnswered({});

    try {
      // Use relative path for Vercel deployment (handled by rewrites)
      // Or fallback to localhost for local dev if not proxied (requires CORS or proxy)
      const apiBase = "https://quizgenerater-backend-1.onrender.com";
      const res = await fetch(`${apiBase}/generate-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!data || !Array.isArray(data.questions)) {
        console.error("Invalid quiz payload:", data);
        alert("Failed to generate quiz. Try a different article.");
        return;
      }

      setQuiz(data);
    } catch (err) {
      console.error(err);
      alert("Server error. Is backend running?");
    } finally {
      setLoading(false);
    }
  }


  const onChangeHandler = (e) => {
    setUrl(e.target.value)
  }

  const handleOptionClick = (qIndex, option, correctAnswer) => {
    if (answered[qIndex]) return; // Prevent answering again

    const isCorrect = option === correctAnswer;
    setAnswered(prev => ({
      ...prev,
      [qIndex]: { selected: option, isCorrect }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };


  return (
    <div className="home-container">
      <h1 className='head'>Wikipedia Quiz Generator</h1>

      <div>
        <button className='buttn'>quiz</button>
        <Link to="/history">
          <button className='buttn'>history</button>
        </Link>
      </div>

      <div className='input-cont'>
        <h2>Wikipedia Article url</h2>
        <div>
          <input
            className='input-box'
            onChange={onChangeHandler}
            value={url}
            type="text"
            placeholder='Enter Wikipedia article url here' />
          <button
            className="buttn-submit"
            onClick={Generate}
            disabled={loading || !url}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
      <div className="quiz-cont">
        {quiz && Array.isArray(quiz.questions) ? (
          <>
            <div className="score-board">
              <h2>Score: {score} / {quiz.questions.length}</h2>
            </div>
            <h1>{quiz.title}</h1>

            {quiz.questions.map((item, index) => {
              const answerState = answered[index];
              return (
                <div key={index} className="question-card">
                  <p>{index + 1}. {item.q}</p>

                  <div className="options-grid">
                    {Array.isArray(item.options) &&
                      item.options.map((opt, i) => {
                        let btnClass = "option-btn";
                        if (answerState) {
                          if (opt === item.answer) btnClass += " correct";
                          else if (answerState.selected === opt) btnClass += " incorrect";
                          else btnClass += " disabled";
                        }

                        return (
                          <button
                            key={i}
                            className={btnClass}
                            onClick={() => handleOptionClick(index, opt, item.answer)}
                            disabled={!!answerState}
                          >
                            {opt}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )
            })}
          </>
        ) : quiz ? (
          <p>Quiz could not be generated. Try another Wikipedia article.</p>
        ) : null}
      </div>

    </div>
  )
}


export default Home