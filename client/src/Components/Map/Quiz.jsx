import React, { useState, useEffect } from "react";
import { quizQuestions } from "./questions"; // Assuming your questions are in questions.js
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [answerFact, setAnswerFact] = useState(""); // State to store the fact for the selected answer
  const [quizEnded, setQuizEnded] = useState(false); // State to track if quiz is ended

  const loadQuiz = () => {
    const shuffledQuestions = [...quizQuestions].sort(
      () => 0.5 - Math.random()).slice(0, 10);

    // Shuffle the options for each question
    const questionsWithShuffledOptions = shuffledQuestions.map((question) => {
      return {
        ...question,
        options: [...question.options].sort(() => 0.5 - Math.random())
      };
    });

    setQuestions(questionsWithShuffledOptions);
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(null);
    setShowNextButton(false);
    setAnswerFact(""); // Clear the fact when loading the quiz
    setQuizEnded(false); // Reset quiz ended state
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const handleAnswerClick = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
      setAnswerFact(questions[currentQuestion].correctFact); // Set the correct fact
    } else {
      setAnswerFact(questions[currentQuestion].incorrectFact); // Set the incorrect fact
    }
    setShowAnswer(isCorrect ? "quiz-correct" : "quiz-incorrect");
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    setShowAnswer(null);
    setShowNextButton(false);
    setAnswerFact(""); // Clear the fact when moving to the next question
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleQuit = () => {
    setQuizEnded(true); // End the quiz and show results
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {quizEnded ? (
          <div className="quiz-results">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} out of 10</p>
            <button className="quiz-restart-button" onClick={loadQuiz}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            {currentQuestion < questions.length ? (
              <>
                <h2 className="quiz-question-counter">
                  Question {currentQuestion + 1} of 10
                </h2>
                <p className="quiz-question-text">
                  {questions[currentQuestion].question}
                </p>
                <div className="quiz-options-container">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`quiz-option-button ${
                        showAnswer &&
                        (option === questions[currentQuestion].answer
                          ? "quiz-correct"
                          : "quiz-incorrect")
                      }`}
                      onClick={() => handleAnswerClick(option)}
                      disabled={showAnswer !== null}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showAnswer && (
                  <p className={`quiz-answer-feedback ${showAnswer}`}>
                    {showAnswer === "quiz-correct"
                      ? `${questions[currentQuestion].facts.correct}`
                      : `${questions[currentQuestion].facts.wrong}`}
                  </p>
                )}
                {answerFact && (
                  <p className="quiz-fact-feedback">{answerFact}</p> // Display the fact
                )}
                {showNextButton && (
                  <button
                    className="quiz-restart-button"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                )}
              </>
            ) : (
              <div className="quiz-results">
                <h2>Quiz Completed!</h2>
                <p>Your Score: {score} out of 10</p>
                <button className="quiz-restart-button" onClick={loadQuiz}>
                  Restart Quiz
                </button>
              </div>
            )}
           
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
