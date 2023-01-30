import { CloudArrowUpIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useLessons } from '../../hooks/useLessons';

const grades = ['k', '1', '2', '3', '4', '5'];
const days = ['day1', 'day2', 'day3'];

export default function QuizCreation() {
    const [text, setText] = useState("");
    const [json, setJson] = useState({});
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const { getLessons } = UserAuth()
    

    const [selectedGrade, setSelectedGrade] = useState(grades[0]);
    const [selectedDay, setSelectedDay] = useState(days[0]);
    const [lessons, setLessons] = useState();


    useEffect(() => {
        const unsubscribe = getLessons(selectedGrade, selectedDay, setLessons);
        console.log(lessons)
        return unsubscribe;
      }, [selectedGrade, selectedDay]);
    
    

    const handleGradeChange = (e) => {
        setSelectedGrade(e.target.value);
    };

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const lines = text.split("\n");
        setJson({ lines, title, questions });
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", answers: ["", "", "", ""], correctAnswer: null }]);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...questions].filter((question, i) => i !== index);
        setQuestions(updatedQuestions);
    }

    const handleQuestionChange = (event, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = event.target.value;
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (event, questionIndex, answerIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex] = event.target.value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (event, questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctAnswer = event.target.value;
        setQuestions(updatedQuestions);
    };


    return (
        <>
         {/* <nav className="bg-gray-800 p-3">
                <div className="flex grid grid-cols-10 gap-1">
                    <div className='text-white col-span-1'>Grade Level</div>
                    <div className='text-white col-span-1'>Day</div>
                    <div className='col-span-3'></div>
                    <div className='text-white col-span-5'>Lesson</div>
                    <select
                        className="bg-gray-700 p-2 rounded-lg text-white col-span-1"
                        value={selectedGrade}
                        onChange={handleGradeChange}
                    >
                        {grades.map((grade) => (
                            <option key={grade} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                    
                    <select
                        className="bg-gray-700 p-2 rounded-lg text-white col-span-1"
                        value={selectedDay}
                        onChange={handleDayChange}
                    >
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <button className='bg-white text-gray-500 col-span-2'>Get Lessons</button>
                    <div className='col-span-1'></div>
                    
                    <select
                        className="bg-gray-700 p-2 rounded-lg text-white col-span-5"
                    >
                        {lessons?.map((x) => (
                            <option key={x.id}>
                                {x?.title}
                            </option>
                        ))}
                        
                    </select>
                </div>
            </nav> */}
        <div className='max-w-4xl mx-auto'>
           
            <form >
                <label>
                    Title:
                    <input className='w-full mb-4' type="text" value={title} onChange={handleTitleChange} />
                </label>
                <label className='mt-4'>
                    Lyrics:
                    <textarea className='w-full' onChange={handleChange} value={text} />
                </label>
                {questions.map((question, questionIndex) => (

                    <div className='w-full mt-4' key={questionIndex}>
                        <div className='grid grid-cols-12 gap-1 flex items-end '>

                            <div className='col-span-10'>Question:</div>

                            <button type="button" className='p-2 bg-red-500 hover:bg-red-600 rounded-lg text-xs text-white col-span-2 ' onClick={() => handleRemoveQuestion(questionIndex)}>Remove Question</button>
                            <input
                                type="text"
                                className='col-span-12'
                                value={question.question}
                                onChange={(event) => handleQuestionChange(event, questionIndex)}
                            />
                        </div>

                        <br />
                        <div className='w-full mt-4 '>
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="flex items-center grid grid-cols-12 gap-1">
                                    <label className="ml-3 block text-sm font-medium text-gray-700 col-span-2">
                                        Correct Answer:
                                    </label>
                                    <input
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 col-span-1"
                                        name={`question-${questionIndex}`}
                                        value={answerIndex}
                                        onChange={(event) => handleCorrectAnswerChange(event, questionIndex)}
                                    />
                                    <input
                                        className='w-full mb-6 col-span-9'
                                        type="text"
                                        value={answer}
                                        onChange={(event) => handleAnswerChange(event, questionIndex, answerIndex)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
            </form>
            <div>
                <pre>{JSON.stringify(json, null, 2)}</pre>
            </div>
            <button className='p-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white fixed bottom-0 left-0 m-4' type="button" onClick={handleSubmit}>
               <CloudArrowUpIcon /> Save Quiz
            </button>
            <button className='p-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white fixed bottom-0 right-0 m-4' type="button" onClick={handleAddQuestion}>
               <PlusCircleIcon /> Add Question
            </button>

        </div>
        </>
    );
};
