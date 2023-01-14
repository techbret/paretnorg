import React from 'react'
import { UserAuth } from '../../context/AuthContext';
import StudentNavBar from './StudentNavBar';

export default function StudentDashboard() {

  const studentObj = window.localStorage.getItem("student")
  const student = JSON.parse(studentObj)

  const { createStudentLogin } = UserAuth()

  const handleCreate = () => {
    createStudentLogin(student)
  }


  return (
    <>
    <StudentNavBar />
     <div className="grid grid-cols-4 gap-x-4 max-w-4xl mx-auto mt-24">
      <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1' onClick={handleCreate}></button>
      <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1'></button>
      <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1'></button>
      <button className='bg-blue-500 rounded-sm h-24 w-48 col-span-1'></button>
      
    </div>
    </>
  )
}
