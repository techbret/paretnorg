import { PlayCircleIcon, ArrowPathIcon, PauseCircleIcon, ArrowUturnLeftIcon, ArrowLeftCircleIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext'

export default function StudentLesson() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const { currentLesson, startLesson, currentVideo } = UserAuth();
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (currentLesson.lessonNumber == null) {
            startLesson(`${params.doc}/${params.grade}/${params.day}/${params.lesson}`);
        }
        console.log('Student Lesson Ran Again')

    }, [])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = currentVideo;
        }

    }, [currentVideo]);

    const handleQuiz = () => {
        console.log(`${params.doc}/${params.grade}/${params.day}/${params.lesson}`);
        navigate(`/student-quiz/${params.doc}/${params.grade}/${params.day}/${params.lesson}`)

    }

    function updateProgress() {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }

    function handleReset() {
        videoRef.current.currentTime = 0;
    }

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover bg-yellow-50'>
            <div className="relative max-w-5xl mx-auto ">
                <h1 className='text-center m-12 text-7xl font-londrina text-emerald-600 drop-shadow-lg'>{currentLesson?.title}</h1>
                <button
                    className='inline-flex items-center rounded-full text-white'
                    onClick={() => {
                        if (isPlaying) {
                            videoRef.current.pause();
                            setIsPlaying(false);
                        } else {
                            videoRef.current.play();
                            setIsPlaying(true);
                        }
                    }}
                >

                    <video className='mx-auto rounded-lg drop-shadow-2xl md:p-0 p-4'
                        ref={videoRef}
                        onEnded={() => setShowButton(true)}
                        onPlay={() => setShowButton(false)}
                        onPause={() => setShowButton(true)}
                        onTimeUpdate={updateProgress}
                    >
                        <source src={currentVideo} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">

                        {isPlaying ? <p className='text-transparent'>Pause</p> : <PlayCircleIcon className='text-emerald-600 bg-white rounded-full hover:bg-emerald-700 hover:text-white md:h-48 h-12 mt-44 md:mt-12 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-xl' />}

                    </div>
                </button>
            </div>
            {progress > 0 ? (
                <div className='grid grid-cols-12 w-full max-w-sm md:max-w-5xl mx-auto bg-emerald-200 rounded-md drop-shadow-ld border border-1 border-zinc-500'>

                    <div className="col-span-10">
                        <div className='flex justify-start'>
                            <button><ArrowPathRoundedSquareIcon className='h-14 -mr-1 text-emerald-900' onClick={handleReset} /></button>
                            <button
                                onClick={() => {
                                    if (isPlaying) {
                                        videoRef.current.pause();
                                        setIsPlaying(false);
                                    } else {
                                        videoRef.current.play();
                                        setIsPlaying(true);
                                    }
                                }}
                            >
                                {isPlaying ? <PauseCircleIcon className='h-14 text-red-600' /> : <PlayCircleIcon className='h-14 text-emerald-500' />}
                            </button>
                            <div
                                className="bg-emerald-600 h-4 rounded-full flex align-center my-6 mr-6 "
                                style={{ width: `${progress}%` }}
                            >
                            </div>

                        </div>
                    </div>
                    <div className="col-span-2 p-2">
                        <button className='p-2 bg-emerald-500 rounded-lg font-londrina text-xl text-white w-full h-full hover:bg-emerald-600 focus:ring focus:ring-2 focus:ring-emerald-500' onClick={handleQuiz}>Start Quiz</button>
                    </div>
                </div>

            ) : <></>}

        </div>

    );

}
