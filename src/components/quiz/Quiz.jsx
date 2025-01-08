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
    <div className="max-w-[600px] w-full m-auto">
      <div className="bg-white  text-[#262626] m-5  py-16 px-10 rounded-[8px] flex flex-col gap-3">
        <h1 className="text-[27px] font-semibold">Quiz App</h1>
        <hr className="h-[2px] border-none bg-[#707070]" />
        {result ? (
          <div className="">
            <h2 className="text-[20px] font-semibold">
              You Scored {score} out of {data.length}
            </h2>

            <div className="result_details">
              <h3 className="text-[16px] py-2 font-semibold">Review:</h3>
              <ul>
                {answers.map((ans, i) => (
                  <li
                    key={i}
                    className={`${ans.isCorrect ? "corrent " : "wrong"
                      } flex flex-col gap-2 py-2  pl-4 border rounded-lg mb-5 cursor-pointer font-semibold border-[#686868] `}
                  >
                    <strong className="">
                      Q{i + 1}: {ans.question}
                    </strong>

                    <div className="flex gap-4">
                      <div className="">
                        <p> Your Answer: </p>
                        <p> {ans.options[ans.selected]}</p>
                      </div>
                      {!ans.isCorrect && (
                        <div className="flex flex-col">
                          <p>Correct Answer:</p>{" "}
                          <p>{ans.options[ans.correct]}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <button
                onClick={reset}
                className="m-auto text-white text-[20px] bg-[#553f9a] rounded-lg px-20 py-3 border-none "
              >
                Restart
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 ">
            <h2 className="text-[20px] font-semibold">
              {index + 1}. {question.question}
            </h2>
            <ul className="question">
              <li
                onClick={(e) => checkAns(e, 1)}
                ref={Option1}
                className="flex items-center h-16 pl-4 border rounded-lg mb-5 cursor-pointer font-semibold border-[#686868]"
              >
                {question.option1}
              </li>
              <li
                onClick={(e) => checkAns(e, 2)}
                ref={Option2}
                className="flex items-center h-16 pl-4 border rounded-lg mb-5 cursor-pointer font-semibold border-[#686868]"
              >
                {question.option2}
              </li>
              <li
                onClick={(e) => checkAns(e, 3)}
                ref={Option3}
                className="flex items-center h-16 pl-4 border rounded-lg mb-5 cursor-pointer font-semibold border-[#686868]"
              >
                {question.option3}
              </li>
              <li
                onClick={(e) => checkAns(e, 4)}
                ref={Option4}
                className="flex items-center h-16 pl-4 border rounded-lg mb-5 cursor-pointer font-semibold border-[#686868]"
              >
                {question.option4}
              </li>
            </ul>
            <button
              onClick={next}
              className="m-auto text-white text-[20px] bg-[#553f9a] rounded-lg px-20 py-3 border-none"
            >
              Next
            </button>
            <div className="m-auto text-[15px] font-semibold">
              {index + 1} of {data.length} questions
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
