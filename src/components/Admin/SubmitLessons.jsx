import React from 'react'
import { UserAuth } from '../../context/AuthContext'
import lessons from './lessonswithtruth.json'

export default function SubmitLessons() {
    const { submitLessons } = UserAuth()

    const newLessons = Object.values(lessons)
    console.log(lessons[0].title)


    const handleAdd = () => {
        submitLessons(lessons)
    }




  return (
    <div><button onClick={handleAdd}>Submit</button></div>
  )
}
