import React from 'react'
import { UserAuth } from '../../context/AuthContext'
import CreateStudent from './CreateStudent'
import CreateStudentModal from './CreateStudentModal'
import StudentSettings from './StudentSettings'

export default function Student() {
  const { profile } = UserAuth()

  console.log(profile.hasStudent)

  if (profile?.hasStudent) {
    return <StudentSettings/>
  } else {
    return (
      <>
    <CreateStudentModal />
    <CreateStudent />
    </>
    )
  }
}
