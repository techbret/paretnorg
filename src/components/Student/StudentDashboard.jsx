import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import spaceBG from '../../assets/space-background.jpg'
import startButton from '../../assets/gameIcons/startButton.png'
import locked from '../../assets/gameIcons/lockedIcon.png'
import ready from '../../assets/gameIcons/readyIcon.png'
import threeStars from '../../assets/gameIcons/finishedThreeStars.png'
import oneStar from '../../assets/gameIcons/finishedOneStar.png'
import twoStars from '../../assets/gameIcons/finishedTwoStars.png'
import settings from '../../assets/gameIcons/settings.png'
import dailyStatus from '../../assets/gameIcons/dailyStatusBar.png'
import dailyStatusProgress from '../../assets/gameIcons/dailyProgress.png'
import gradeStatus from '../../assets/gameIcons/gradeStatusBar.png'
import gradeStatusProgress from '../../assets/gameIcons/gradeProgress.png'
import livesStatus from '../../assets/gameIcons/livesStatusBar.png'
import liveStatusProgress from '../../assets/gameIcons/livesProgress.png'
import files from "../../assets/Avatars";
import books from "../../assets/books"
import playButton from '../../assets/playButton.png'
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {

  // const  profile = useStudents(studentId);
  // const profile = useStudents(user.uid);

  const { studentProfile, logout, startLesson } = UserAuth();
  const navigate = useNavigate();

  const lesScores = [locked, ready, oneStar, twoStars, threeStars]

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  }

  const handleStart = () => {
    const lessonRef = studentProfile?.currentLesson
    startLesson(studentProfile.lessonsAssigned[lessonRef].path)
  }





  return (
    <>
      <div className='bg-black h-screen'>
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover' style={{ backgroundImage: `url(${spaceBG})` }}>
          <div className='absolute top-0 left-10 lg:block hidden'>
            <img className={`mt-4 h-24 text-sm font-semibold leading-6 text-gray-900 shadow-xl rounded-full p-2 border border-4 border-white ${studentProfile?.avatar?.bgColor}`} src={files[studentProfile?.avatar?.imageIndex]} alt="" />
            <p className='text-white font-londrina xl:text-3xl text-lg drop-shadow-md p-2 mt-2 rounded-lg xl:ml-20 ml-24'>Daily Progress</p>
            <div className='relative -mt-6 '>
              <img src={dailyStatus} className="xl:ml-1.5 lg:ml-5 xl:w-80 lg:w-60 " alt="" />
              <img src={dailyStatusProgress} className={`absolute xl:top-3 xl:left-16 lg:left-16 lg:top-2 z-10 mt-2 rounded-md xl:w-64 lg:w-48`} alt="" />
            </div>
            <p className='text-white font-londrina xl:text-3xl text-lg drop-shadow-md p-2 mt-2 rounded-lg xl:ml-20 ml-24'>Scores</p>
            <div className='relative -mt-6'>
              <img src={gradeStatus} className="xl:ml-1.5 lg:ml-5 xl:w-80 lg:w-60 " alt="" />
              <img src={gradeStatusProgress} className={`absolute xl:top-3 xl:left-16 lg:left-16 lg:top-2 z-10 mt-2 rounded-md xl:w-64 lg:w-48`} alt="" />
            </div>
            <p className='text-white font-londrina xl:text-3xl text-lg drop-shadow-md p-2 mt-2 rounded-lg xl:ml-20 ml-24'>Challenges</p>
            <div className='relative -mt-6'>
              <img src={livesStatus} className="xl:ml-1.5 lg:ml-5 xl:w-80 lg:w-60 " alt="" />
              <img src={liveStatusProgress} className={`absolute xl:top-3 xl:left-16 lg:left-16 lg:top-2 z-10 mt-2 rounded-md xl:w-64 lg:w-48`} alt="" />
            </div>
            <div className='p-6 bg-blue-300 bg-opacity-50 rounded-md shadow-xl mt-12'>
              <p className='text-white font-londrina xl:text-3xl text-lg drop-shadow-md p-2  rounded-lg text-center bg-blue-700'>Awards</p>
              <div className='grid grid-cols-4 gap-4 mt-4'>
                {studentProfile?.awards?.hasAwards ? (
                  <>
                    {studentProfile?.awards?.books.map((book, index) => (
                      <div key={index}>
                        <img src={books[index].source} className="h-24 opacity-100" alt="" />
                      </div>
                    ))}
                    {studentProfile?.awards?.booksToEarn.map((book, index) => (
                      <div key={index}>
                        <img src={books[book].source} className="h-24 opacity-25" alt="" />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <img src={books[0].source} className="h-24 opacity-25" alt="" />
                    <img src={books[1].source} className="h-24 opacity-25" alt="" />
                    <img src={books[2].source} className="h-24 opacity-25" alt="" />
                    <img src={books[3].source} className="h-24 opacity-25" alt="" />
                    <img src={books[4].source} className="h-24 opacity-25" alt="" />
                    <img src={books[5].source} className="h-24 opacity-25" alt="" />
                    <img src={books[6].source} className="h-24 opacity-25" alt="" />
                    <img src={books[7].source} className="h-24 opacity-25" alt="" />
                  </>
                )}

              </div>
            </div>
          </div>
          <div className='bg-black-80 opacity-50'></div>
          <div className='flex justify-center items-center h-full'>
            <div className='grid grid-cols-4 gap-4 mx-auto '>
              <div className='col-span-1'><button><img className='xl:h-36 h-24 flex items-center drop-shadow-lg' src={lesScores[studentProfile?.lessonScores?.score1]} alt="" /></button></div>
              <div className='col-span-1'><button><img className='xl:h-36 h-24 flex items-center drop-shadow-lg' src={lesScores[studentProfile?.lessonScores?.score2]} alt="" /></button></div>
              <div className='col-span-1'><button><img className='xl:h-36 h-24 flex items-center drop-shadow-lg' src={lesScores[studentProfile?.lessonScores?.score3]} alt="" /></button></div>
              <div className='col-span-1'><button><img className='xl:h-36 h-24 flex items-center drop-shadow-lg' src={lesScores[studentProfile?.lessonScores?.score4]} alt="" /></button></div>
              <button className='col-span-4 w-72 mx-auto hover:opacity-75' onClick={handleStart}><img src={startButton} alt="" /></button>
            </div>



          </div>

        </div>

        <div >
          <div className='absolute top-0 right-10 lg:block hidden'>
            <button
              type="button"
              className="mt-8 -mb-12 ml-60 inline-flex font-londrina items-center px-6 py-3 border border-transparent text-3xl font-medium rounded-full shadow-sm text-gray-600 bg-yellow-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button className='text-sm font-semibold leading-6 shadow-sm absolute right-0 top-4'><img className='h-24' src={settings} alt="" /></button>

            <div className='mt-24'>
              <p className='text-white font-londrina xl:text-3xl text-lg drop-shadow-md p-2 rounded-lg text-center bg-blue-500'>My recordings</p>
              <div className='grid grid-cols-4 gap-2 mt-4 bg-lime-200 p-2 rounded-lg'>
                <button><img src={playButton} className="h-12 col-span-1" alt="" /></button>
                <p className="col-span-3 text-4xl text-zinc-500 font-londrina drop-shadow-xl mr-4 flex items-center">CHALLENGE! ABE LINCOLN</p>

              </div>
            </div>


            <div className='mt-12'>
              <p className='text-white font-londrina xl:text-3xl text-lg drop-shadow-md p-2 rounded-lg text-center bg-pink-500'>Completed Lessons</p>
              <div className='grid grid-cols-4 gap-2 mt-4 bg-lime-200 p-2 rounded-lg'>
                <button><img src={threeStars} className="h-24 col-span-1" alt="" /></button>
                <p className="col-span-3 text-4xl text-zinc-500 font-londrina drop-shadow-xl mr-4 flex items-center">CHALLENGE! ABE LINCOLN</p>

              </div>
            </div>
          </div>


        </div>

      </div>

    </>
  )
}
