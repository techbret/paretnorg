import { UserAuth } from '../../context/AuthContext';
import React, { useState } from 'react';
import video from '../../assets/day1_Letter P_original.mp4'

export default function StudentQuizGrader() {
    const { currentLesson, currentVideo } = UserAuth();
    const words = currentLesson.lyrics.split(" ");
    const [clickedWords, setClickedWords] = useState([]);

    function handleClick(index) {
        const newClickedWords = [...clickedWords];
        const wordIndex = clickedWords.findIndex(word => word.index === index);
        if (wordIndex !== -1) {
            newClickedWords[wordIndex].clicks += 1;
        } else {
            newClickedWords.push({ index, clicks: 1 });
        }
        setClickedWords(newClickedWords);
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <video className='mx-auto w-full mt-12 mb-12' controls
            >
                <source src={video} type="video/mp4" />
            </video>
            {words.map((word, index) => {
                const wordIndex = clickedWords.findIndex(w => w.index === index);
                const wordClicks = wordIndex === -1 ? 0 : clickedWords[wordIndex].clicks;
                return (
                    <button
                        key={index}
                        className={`bg-${getBackgroundColor(wordClicks)}-500 ml-1 text-lg`}
                        onClick={() => handleClick(index)}
                    >
                        {word}
                    </button>
                );
            })}
        </div>
    );
}

function getBackgroundColor(clicks) {
    switch (clicks % 4) {
        case 0:
            return 'white';
        case 1:
            return 'blue';
        case 2:
            return 'yellow';
        case 3:
            return 'red';
        default:
            return 'white';
    }
}
