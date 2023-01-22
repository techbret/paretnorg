
import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext';
import files from "../../assets/Avatars";
import rightArrow from '../../assets/rightArrow.png'
import leftArrow from '../../assets/leftArrow.png';
import blueButton from '../../assets/blueButton.png'
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

export default function CreateStudentAccount() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [backgroundColor, setBackGroundColor] = useState('bg-blue-500')
    const images = []

    const navigate = useNavigate();

    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0 ? files.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === files.length - 1 ? 0 : currentIndex + 1);
    };


    const studentObj = window.localStorage.getItem("student")
    const student = JSON.parse(studentObj)

    const { createStudentLogin, studentLogout } = UserAuth()

    const settings = {
        imageColor: backgroundColor,
        imageIndex: currentIndex

    }

    const handleCreate = () => {
        createStudentLogin(student, settings);
        studentLogout();
        navigate('/student-dashboard/' + student._id)

    };

    const handleSelect = (index) => {
        // createStudentLogin(student, index)
    }



    return (
        <>
        <button className='absolute top-0 right-10 mt-4 rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900 hover:ring-gray-900/20' onClick={studentLogout}>Logout</button>
        <div className='max-w-4xl mx-auto'>
            <h1 className='text-center font-londrina text-7xl mt-20 text-blue-500'>Hello, {student?.name}</h1>
            <h1 className='text-center font-londrina text-4xl text-zinc-700'>Make YOUR character</h1>
            <div className="relative flex items-center justify-center mt-24">

                <button className={`mx-auto rounded-full top-0 ${backgroundColor}`}>
                    <img className="w-64 h-64 p-8 mx-auto" src={files[currentIndex]} alt="" />
                </button>
                <button className="absolute top-0 left-0 p-4" onClick={handlePrevClick}>
                    <img src={leftArrow} className="h-24 opacity-100 hover:opacity-75 " alt="" />
                </button>
                <button className="absolute top-0 right-0 p-4 focus:opacity-100 focus:ring-offset-2" onClick={handleNextClick}>
                    <img src={rightArrow} className="h-24 opacity-100 hover:opacity-75 " alt="" />
                </button>
            </div>
            <div className='grid grid-cols-10 gap-4 mt-12'>
                <button className='cols-span-1 rounded-full bg-pink-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-pink-500') }}></button>
                <button className='cols-span-1 rounded-full bg-red-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-red-500') }}></button>
                <button className='cols-span-1 rounded-full bg-orange-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-orange-500') }}></button>
                <button className='cols-span-1 rounded-full bg-yellow-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-yellow-500') }}></button>
                <button className='cols-span-1 rounded-full bg-lime-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-lime-500') }}></button>
                <button className='cols-span-1 rounded-full bg-green-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-green-500') }}></button>
                <button className='cols-span-1 rounded-full bg-blue-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-blue-500') }}></button>
                <button className='cols-span-1 rounded-full bg-indigo-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-indigo-500') }}></button>
                <button className='cols-span-1 rounded-full bg-purple-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-purple-500') }}></button>
                <button className='cols-span-1 rounded-full bg-zinc-500 h-20 w-20 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2' onClick={() => { setBackGroundColor('bg-zinc-500') }}></button>
            </div>
            <h1 className='text-center font-londrina text-6xl mt-6 text-blue-500 rounded-2xl'>Pick a Color</h1>
            <div className="relative mt-12 left-1">
                <div className="text-center">
                    <button className="mx-auto hover:opacity-75 relative w-80" onClick={handleCreate}>
                        <img src={blueButton} alt="" />

                        <span className="absolute top-4 left-16 right-0 text-center font-londrina text-7xl text-zinc-700 flex items-center">Next <ArrowRightCircleIcon className='ml-2 text-center text-zinc-700 h-20' /></span>

                        
                    </button>
                </div>
            </div>

            {/* <div className="grid grid-cols-4 gap-x-4 max-w-4xl mx-auto mt-24">
                <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1' onClick={handleCreate}>Option 1</button>
                <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1'></button>
                <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1'></button>
                <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1' onClick={studentLogout}>Logout</button>

            </div> */}
        </div>
        </>
    )
}