import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import StudentNavBar from './StudentNavBar';
import spaceBG from '../../assets/space-background.jpg'
import startButton from '../../assets/gameIcons/startButton.png'
import locked from '../../assets/gameIcons/lockedIcon.png'
import ready from '../../assets/gameIcons/readyIcon.png'
import settings from '../../assets/gameIcons/settings.png'
import dailyStatus from '../../assets/gameIcons/dailyStatusBar.png'
import dailyStatusProgress from '../../assets/gameIcons/dailyProgress.png'
import files from "../../assets/Avatars";

export default function StudentDashboard() {

  // const  profile = useStudents(studentId);
  // const profile = useStudents(user.uid);

  const { studentProfile } = UserAuth();




  return (
    <>
      <div className='bg-black h-screen'>

        <div className='absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover' style={{ backgroundImage: `url(${spaceBG})` }}>
          <button className='absolute top-0 right-10 mt-4  text-sm font-semibold leading-6 text-gray-900 shadow-sm '><img className='h-24' src={settings} alt="" /></button>
          <div className='absolute top-0 left-10'>
            <img className={`mt-4 h-24 text-sm font-semibold leading-6 text-gray-900 shadow-xl border border-2 border-white p-2 rounded-full ${studentProfile?.avatar?.bgColor}`} src={files[studentProfile?.avatar?.imageIndex]} alt="" />
            <p className='text-white font-londrina text-4xl drop-shadow-md bg-blue-500 p-2 mt-2 rounded-lg'>Testing</p>
            <div className='relative'>
  <img src={dailyStatus} className="mt-2" alt=""/>
  <img src={dailyStatusProgress} className="absolute top-0 left-0 z-10 mt-2" alt=""/>
</div>
          </div>
          <div className='bg-black-80 opacity-50'></div>
          <div className='flex justify-center items-center h-full'>
            <div className='grid grid-cols-4 gap-4 mx-auto '>
              <div className='text-white sm:text-7xl text-5xl text-center font-medium col-span-4 font-londrina drop-shadow-lg '>Welcome, {studentProfile?.firstName}</div>
              <div className='col-span-1'><button><img className='sm:h-36 h-24 flex items-center drop-shadow-lg' src={ready} alt="" /></button></div>
              <div className='col-span-1'><button><img className='sm:h-36 h-24 flex items-center drop-shadow-lg' src={locked} alt="" /></button></div>
              <div className='col-span-1'><button><img className='sm:h-36 h-24 flex items-center drop-shadow-lg' src={locked} alt="" /></button></div>
              <div className='col-span-1'><button><img className='sm:h-36 h-24 flex items-center drop-shadow-lg' src={locked} alt="" /></button></div>
              <button className='col-span-4 w-72 mx-auto hover:opacity-75'><img src={startButton} alt="" /></button>
            </div>



          </div>

        </div>
      </div>

    </>
  )
}
