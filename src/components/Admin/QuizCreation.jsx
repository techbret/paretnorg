import { CloudArrowUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useLessons } from "../../hooks/useLessons";
import lessonsJSON from "./lessons.json";
import Modal from "./Modal";

const grades = ["Select a grade", "k", "1", "2", "3", "4", "5"];
const days = ["Select a Day", "day1", "day2", "day3"];

export default function QuizCreation() {
  const [text, setText] = useState("");
  const [json, setJson] = useState({});
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const { submitQuiz, allLessons, updateLessonSubmit } = UserAuth();
  const [openLibrary, setOpenLibrary] = useState(false)

  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedLesson, setSelectedLesson] = useState(days[0]);
  const [lessons, setLessons] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorColor, setErrorColor] = useState("green");

  const getLessons = (grade, day) => {
    if (grade === "k") {
      const lessons = lessonsJSON.filter(
        (lesson) => lesson.readingLevel === "Kindergarten"
      );
      setLessons(lessons);
    } else if (grade === "1") {
      const lessons = lessonsJSON.filter(
        (lesson) => lesson.readingLevel === "First Grade"
      );
      setLessons(lessons);
    } else if (grade === "2") {
      const lessons = lessonsJSON.filter(
        (lesson) => lesson.readingLevel === "Second Grade"
      );
      setLessons(lessons);
    } else if (grade === "3") {
      const lessons = lessonsJSON.filter(
        (lesson) => lesson.readingLevel === "Third Grade"
      );
      setLessons(lessons);
    } else if (grade === "4") {
      const lessons = lessonsJSON.filter(
        (lesson) => lesson.readingLevel === "Fourth Grade"
      );
      setLessons(lessons);
    } else if (grade === "5") {
      const lessons = lessonsJSON.filter(
        (lesson) => lesson.readingLevel === "Fifth Grade"
      );
      setLessons(lessons);
    } else {
      setLessons(lessonsJSON);
    }
  };

  const lessonData = {
    id: selectedLesson,
    day: selectedDay

  }


  const handleUpdateLes = () => {
    updateLessonSubmit(lessonData)
  }

  useEffect(() => {
    const unsubscribe = getLessons(selectedGrade, selectedDay, setLessons);
    return unsubscribe;
  }, [selectedGrade, selectedDay]);

  let quizData = {
    day: selectedDay,
    grade: selectedGrade,
    lessonNumber: selectedLesson,
    title: title,
    lyrics: text,
    questions: questions,
  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleLessonChange = (e) => {
    setSelectedLesson(e.target.value);
    const titleID = parseInt(e.target.value);
    const selectedLesson = lessonsJSON.find((lesson) => lesson.id === titleID);
    setTitle(selectedLesson ? selectedLesson.title : "");
    console.log(e.target.value);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lines = text.split("\n");
    setJson({ lines, title, questions });
    handleUpdateLes();
    submitQuiz(quizData, lines, {})
      .then(() => {
        setSuccessMessage("Quiz submitted successfully!");
        setSubmitted(true);
        setText("");
        setQuestions([]);
        setJson({});
        setTitle("");
        setSelectedDay(days[0]);
        setSelectedGrade(grades[0]);
        setErrorColor("green");
      })
      .catch((error) => {
        setSuccessMessage("Quiz was not submitted successfully");
        setSubmitted(true);
        setErrorColor("red");
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answers: ["", "", "", ""], correctAnswer: null },
    ]);

    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions].filter(
      (question, i) => i !== index
    );
    setQuestions(updatedQuestions);
  };

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
      {submitted ? (
        <div
          className={`rounded-md p-4 max-w-5xl mx-auto mt-10 bg-${errorColor}-50`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className={`h-5 w-5 text-${errorColor}-400`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium text-${errorColor}-800`}>
                {successMessage}
              </h3>
              <div className={`mt-2 text-sm text-${errorColor}-700`}>
                <p>
                  If you need to update this quiz or you think you made a
                  mistake, simply do it again and it will update to the new
                  information
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    className={`ml-3 rounded-md bg-${errorColor}-50 px-2 py-1.5 text-sm font-medium text-${errorColor}-800 hover:bg-${errorColor}-100 focus:outline-none focus:ring-2 focus:ring-${errorColor}-600 focus:ring-offset-2 focus:ring-offset-${errorColor}-50`}
                    onClick={() => setSubmitted(false)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
{openLibrary ? (
    <div className="absolute bg-white">
        <button className="ml-4 p-2 text-xs bg-red-400" onClick={() => setOpenLibrary(false)}>Close</button>
        <div className="grid grid-cols-5 max-w-sm mx-auto text-xs font-bold text-center">
            <div className="col-span-1">Name</div>
            <div className="col-span-1">Grade Level</div>
            <div className="col-span-1">Day 1</div>
            <div className="col-span-1">Day 2</div>
            <div className="col-span-1">Day 3</div>
        </div>
    {allLessons && Object.values(allLessons).map((lesson) => (
      <div
        className="grid grid-cols-5 max-w-sm mx-auto mb-1 text-xs tracking-tight bg-white"
        key={lesson.id}
      >
        <div className="col-span-1 mt-2">{lesson.id}: {lesson.title}</div>
        <div className="col-span-1 mt-2 mr-2">{lesson.readingLevel}</div>
        {lesson.day1 ? <div className="col-span-1 bg-green-50 text-green-700 rounded-full text-center mt-2 mb-1 text-xs">Done</div> : <div className="col-span-1 bg-red-50 text-red-700 rounded-full text-xs text-center mt-2 mb-1">Not Done</div>}
        {lesson.day2 ? <div className="col-span-1 bg-green-50 text-green-700 rounded-full text-center mt-2 mb-1 text-xs">Done</div> : <div className="col-span-1 bg-red-50 text-red-700 rounded-full text-xs text-center mt-2 mb-1">Not Done</div>}
        {lesson.day3 ? <div className="col-span-1 bg-green-50 text-green-700 rounded-full text-center mt-2 mb-1">Done</div> : <div className="col-span-1 bg-red-50 text-red-700 rounded-full text-xs text-center mt-2 mb-1">Not Done</div>}
      </div>
    ))}
    </div>
) : (<><button className="ml-4 absolute p-2 text-xs bg-green-500" onClick={() => setOpenLibrary(true)}>View Completed Lessons</button></>)}
      
<div className="max-w-xl mx-auto 2xl:max-w-5xl">
      <h1 className="text-5xl mt-12 font-bold tracking-tight text-center">
        Quiz Maker
      </h1>
      <h1 className="text-lg mt-4 max-w-4xl mx-auto text-center ">
        To make a quiz simply select a grade level, and the day its associated
        with. Place the title of the LESSON in the title box, the lyrics in the
        lyrics box.{" "}
        <span className="font-bold text-emerald-600">
          The lyrics are seperated by lines, so for each verse add a space, and
          place each line on its own linw
        </span>
      </h1>
      <nav className="bg-gray-800 rounded-md p-3 max-w-4xl mx-auto mt-6">
        <div className="flex grid grid-cols-6 gap-1">
          <div className="text-white col-span-2">Grade Level</div>
          <div className="text-white col-span-2">Day</div>
          <div className="text-white col-span-2">Lesson</div>
          {/* <div className='text-white col-span-5'>Lesson</div> */}
          <select
            className="bg-gray-700 p-2 rounded-md text-white col-span-2"
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
            className="bg-gray-700 p-2 rounded-md text-white col-span-2"
            value={selectedDay}
            onChange={handleDayChange}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            className="bg-gray-700 p-2 rounded-md text-white col-span-2"
            onChange={handleLessonChange}
            value={title}
          >
            {lessons?.map((x) => (
              <option key={x.id} value={x.id}>
                {x?.title}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto mt-6">
        <form>
          <label>
            Title:
            <input
              className="w-full mb-4 block w-full min-w-0 flex-1 rounded-none border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder={title}
            />
          </label>
          <label className="mt-4">
            Lyrics:
            <textarea
              className="block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}
              value={text}
            />
          </label>
          {questions.map((question, questionIndex) => (
            <div className="w-full mt-12" key={questionIndex}>
              <div className="grid grid-cols-12 gap-1 flex items-end">
                <div className="col-span-10">Question:</div>

                <button
                  type="button"
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-xs text-white col-span-2"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                >
                  Remove Question
                </button>
                <input
                  type="text"
                  className="col-span-12 w-full mb-6 col-span-9 min-w-0 flex-1 rounded-none border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={question.question}
                  onChange={(event) =>
                    handleQuestionChange(event, questionIndex)
                  }
                />
              </div>

              <br />
              <div className="w-full mt-4 ">
                {question.answers.map((answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    className="flex items-center grid grid-cols-12 gap-1"
                  >
                    <label className="ml-3 block text-sm font-medium text-emerald-700 col-span-2">
                      Correct Answer:
                    </label>
                    <input
                      type="radio"
                      className="h-4 w-4 border-emerald-300 text-indigo-600 focus:ring-indigo-500 col-span-1"
                      name={`question-${questionIndex}`}
                      value={answerIndex}
                      onChange={(event) =>
                        handleCorrectAnswerChange(event, questionIndex)
                      }
                    />
                    <input
                      className="w-full mb-6 col-span-9 min-w-0 flex-1 rounded-none border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      type="text"
                      value={answer}
                      onChange={(event) =>
                        handleAnswerChange(event, questionIndex, answerIndex)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </form>

        {/* <div>
          <pre>{JSON.stringify(json, null, 2)}</pre>
        </div> */}
        <button
          className="p-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white fixed bottom-0 left-0 m-4"
          type="button"
          onClick={handleSubmit}
        >
          <CloudArrowUpIcon /> Save Quiz
        </button>
        <button
          className="p-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white fixed bottom-0 right-0 m-4"
          type="button"
          onClick={handleAddQuestion}
        >
          <PlusCircleIcon /> Add Question
        </button>
      </div>
      </div>
    </>
  );
}
