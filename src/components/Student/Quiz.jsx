import { ArrowRightIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";

const Quiz = () => {
    const { currentLesson, studentProfile } = UserAuth();


    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < currentLesson?.quiz.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };


    const handleScore = () => {
        if (studentProfile?.currentLesson !== 4) {
            console.log(studentProfile?.currentLesson)
        } else {
            console.log(studentProfile.books.length)
        }

    }

    return (
        <div className="quiz">
            {showScore ? (
                <>
                    <div className="score-section font-londrina text-7xl text-center">
                        You scored <span className="text-emerald-700">{score}</span> out of <span className="text-emerald-700">{currentLesson?.quiz.length}</span>!
                    </div>
                    <div className="score-section font-londrina text-7xl text-center">
                        {score / currentLesson?.quiz.length * 100}%
                    </div>
                    <button className="p-4 bg-yellow-300 text-7xl font-londrina mx-auto mt-4 rounded-md w-full hover:bg-yellow-500" onClick={handleScore}>Next</button>
                </>
            ) : (
                <>
                    <div className="question-section">
                        <div className="text-2xl font-bold font-londrina">
                            <span >Question {currentQuestion + 1}</span>/{currentLesson?.quiz.length}
                        </div>
                        <div className="text-4xl font-bold">
                            {currentLesson?.quiz[currentQuestion].question}
                        </div>
                    </div>
                    <div className="answer-section mt-4 grid grid-cols-1 gap-4">
                        {currentLesson?.quiz[currentQuestion].answers.map((answerOption, index) => (
                            <button
                                key={index}
                                className="p-4 bg-emerald-500 rounded-full text-white capitalize text-2xl font-bold hover:bg-emerald-700"
                                onClick={() =>
                                    handleAnswerOptionClick(
                                        index === parseInt(currentLesson?.quiz[currentQuestion].correctAnswer)
                                    )
                                }
                            >
                                {answerOption}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Quiz;