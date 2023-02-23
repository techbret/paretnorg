import { UserAuth } from '../../context/AuthContext';
import React, { useState } from 'react';
import video from '../../assets/day1_Letter P_original.mp4'
import Quiz from './Quiz';

export default function StudentQuizGrader() {
    const { currentLesson } = UserAuth();


    return (
        <div className='max-w-7xl mx-auto'>

            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                        <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 font-londrina">{currentLesson?.title}</h1>
                    </div>
                </header>
                <main>
                    <div className="grid grid-cols-12 sm:px-6 lg:px-8 gap-4">
                        {/* Replace with your content */}
                        <div className="px-4 py-8 sm:px-0 col-span-5">
                            <div className="h-auto p-2 ">
                                {currentLesson?.lyricLines?.map((lyric, index) => (
                                    <div key={index}>
                                        {lyric}
                                        <br></br>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-4 py-8 sm:px-0 col-span-7">
                            <div>
                                <Quiz />
                            </div>
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>

        </div>
    );
}


