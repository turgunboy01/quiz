import React, { useRef, useState } from "react";
import "./quiz.css";
import { data } from "../../data/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [answers, setAnswers] = useState([]); // Javoblar tarixini saqlash uchun

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      let isCorrect = false;
      if (question.ans === ans) {
        e.target.classList.add("corrent");
        setScore((prev) => prev + 1);
        isCorrect = true;
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("corrent");
      }
      setLock(true);

      // Javoblarni saqlash
      setAnswers((prev) => [
        ...prev,
        {
          question: question.question,
          selected: ans,
          correct: question.ans,
          isCorrect: isCorrect,
          options: {
            1: question.option1,
            2: question.option2,
            3: question.option3,
            4: question.option4,
          },
        },
      ]);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("corrent");
      });
    }
  };

  const reset = () => {
    setResult(false);
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setAnswers([]);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <div className="result">
          <h2>
            You Scored {score} out of {data.length}
          </h2>

          <div className="result_details">
            <h3>Review:</h3>
            <ul>
              {answers.map((ans, i) => (
                <li key={i} className={ans.isCorrect ? "corrent" : "wrong"}>
                  <strong className="strong_font">
                    Q{i + 1}: {ans.question}
                  </strong>
                  <br />
                  <div className="result_span">
                    <p> Your Answer: </p>
                    {ans.options[ans.selected]}
                  </div>
                  {!ans.isCorrect && (
                    <div className="result_span">
                      <span>Correct Answer: {ans.options[ans.correct]}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={reset}>Restart</button>
        </div>
      ) : (
        <div className="result question">
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul className="question">
            <li onClick={(e) => checkAns(e, 1)} ref={Option1}>
              {question.option1}
            </li>
            <li onClick={(e) => checkAns(e, 2)} ref={Option2}>
              {question.option2}
            </li>
            <li onClick={(e) => checkAns(e, 3)} ref={Option3}>
              {question.option3}
            </li>
            <li onClick={(e) => checkAns(e, 4)} ref={Option4}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
