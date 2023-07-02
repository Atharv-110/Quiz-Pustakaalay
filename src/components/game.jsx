import { useState, useEffect } from "react";
import { Toaster , toast } from "react-hot-toast";

// Game Timer Component
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// import Questions/Answer Data
import Questions from "../Data/Questions.json";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [optionBtn, setOptionBtn] = useState(false)
  const [progress, setProgress] = useState(0);
  const [nextBtn, setNextBtn] = useState(true);

  // Fetching data from json file and setting it at every time the game screen loads
  useEffect(() => {
    setQuestions(Questions);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      shuffleOptions();
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentProgress =
        ((currentQuestionIndex + 1) / questions.length) * 100;
      setProgress(currentProgress);
    }
  }, [currentQuestionIndex, questions]);

  const shuffleOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const options = [...currentQuestion.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  };

  const handleOptionClick = (option) => {
    // const optionClicked = document.querySelector(".game-option-btn");
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedOption(option);
    setOptionBtn(true)
    if (option === currentQuestion.correctAnswer) {
      // Correct answer logic
      toast.success('Correct Answer')
      setCorrectOption(option);
    } else {
      // Incorrect answer logic
      setCorrectOption(currentQuestion.correctAnswer);
      toast.error("Incorrect Answer")
    }
    setNextBtn(false);
  };

  const handleNextQuestion = () => {
    setNextBtn(true);
    setOptionBtn(false)
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Game over logic
      alert("Game over!");
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="game">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <div className="game-nav">
        <button className="pause-btn">
          <i className="fa-solid fa-pause"></i>
        </button>
        <h1 className="game-title">Quiz</h1>
        <div className="game-timer">
          <CountdownCircleTimer
            strokeLinecap={"round"}
            size={50}
            strokeWidth={5}
            isPlaying={true}
            duration={15}
            trailColor="#502F1A"
            colors="#E8852A"
            // onComplete={() =>}
          >
            {({ remainingTime }) => (
              <h1 className="game-timer-count">{remainingTime}</h1>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
      <div className="game-progress">
        <div className="progress-bar">
          <div
            className="progress-level"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-count">
          <p>
            <span>{currentQuestionIndex + 1}</span>/{questions.length}
          </p>
        </div>
      </div>
      <div className="game-main">
        <div className="game-question">
          <h3>{currentQuestion.question}</h3>
        </div>
        <div className="game-option">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              disabled={optionBtn}
              onClick={() => handleOptionClick(option)}
              className={
                selectedOption === option
                  ? option === currentQuestion.correctAnswer
                    ? "correct-option-btn"
                    : "wrong-option-btn"
                  : option === correctOption
                  ? "correct-option-btn"
                  : "game-option-btn"
              }
            >
              {option}
            </button>
          ))}
        </div>
        <div className="gradient-btn">
          <button className="new-game-btn">New Game</button>
          <button
            disabled={nextBtn}
            className={nextBtn ? "next-btn-blr" : "next-btn"}
            onClick={() => handleNextQuestion()}
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
