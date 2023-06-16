import React from "react";
import { useNavigate } from "react-router-dom";
import book1 from '../../assets/books/book1.png'

const EarnedABook = () => {

  const navigate = useNavigate();

  const handleAccept = () => {
    navigate('/student-dashboard')
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-4 font-londrina ">Congrats! You earned a book!</h1>
      <div className="relative mt-8">
        <img
          className="w-36 animate-bounce"
          src={book1}
          alt="Award"
        />
       
      </div>
      <button className="text-4xl p-8 rounded-full bg-emerald-500 font-londrina hover:bg-emerald-600 text-white" onClick={handleAccept}>Accept Reward</button>
    </div>
  );
};

export default EarnedABook;