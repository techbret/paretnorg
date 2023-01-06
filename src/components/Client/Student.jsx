import React from 'react'
import { UserAuth } from '../../context/AuthContext'
import CreateStudent from './CreateStudent'
import CreateStudentModal from './CreateStudentModal'

export default function Student() {
  const { profile } = UserAuth()

  console.log(profile.hasStudent)

  if (profile.hasStudent) {
    return <h1>Student</h1>
  } else {
    return (
      <>
    <CreateStudentModal />
    <CreateStudent />
    </>
    )
  }
}
