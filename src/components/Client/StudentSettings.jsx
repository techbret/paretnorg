import React, { Profiler, useState } from 'react'
import files from '../../assets/Images'
import { UserAuth } from '../../context/AuthContext'

export default function CreateStudent() {
    const { students, updateStudent } = UserAuth()
    const [name, setName] = useState(students[0].name);
    const [userName, setUserName] = useState(students[0].userName);
    const [gradeLevel, setGradeLevel] = useState('');
    const [imageIndex, setImageIndex] = useState();

    const id = students[0]._id

    const studentData = {
        name: name || students[0].name,
        userName: userName,
        gradeLevel: gradeLevel,
        _id: id
    }



    const handleUpdate = (e) => {
        e.preventDefault();
        updateStudent(studentData)
    }


    return (
        <div>
            <main>
                <div className="mx-auto max-w-full py-6 sm:px-6 lg:px-8 bg-yellow-100">

                    <div className="px-4 py-4 sm:px-0">
                        <div className="rounded-lg shadow-lg bg-white max-w-5xl mx-auto">
                            <h1 className='text-2xl text-center font-bold pt-8'>Edit your Student's Account</h1>
                            <h3 className='text-center text-lg'>Here you can change, update, or delete anything related to your student</h3>
                            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 md:p-16 p-4 m-4 md:m-0">

                                <div className="relative rounded-md border border-gray-300 px-4 py-2 shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 col-span-1 sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-sm font-medium text-gray-900"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-md mt-1"
                                        placeholder={students ? students[0]?.name : 'Enter Student'}
                                        onChange={(e) => (setName(e.target.value))}
                                    />
                                </div>

                                <div className="relative rounded-md border border-gray-300 px-4 py-2 shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="name"
                                        className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-sm font-medium text-gray-900"
                                    >
                                        Parent Username
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-md mt-1"
                                        placeholder={students ? students[0]?.userName : 'Enter Student'}
                                        onChange={(e) => (setUserName(e.target.value))}
                                    />
                                </div>

                                <div className="relative rounded-md border border-gray-300 shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 sm:col-span-1 col-span-2">

                                    <div className="mt-1">
                                        <label
                                            htmlFor="name"
                                            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-sm font-medium text-gray-900"
                                        >
                                            Grade Level
                                        </label>
                                        <select
                                            id="location"
                                            name="location"
                                            className="block w-full border-0 px-4 py-2 text-gray-900 focus:ring-0 sm:text-md rounded-md"
                                            defaultValue={students ? students[0]?.gradeLevel : 'Current Grade Level'}
                                            onChange={(e) => (setGradeLevel(e.target.value))}

                                        >

                                            <option value="k">Kindergarten</option>
                                            <option value="1">1st Grade</option>
                                            <option value="2">2nd Grade</option>
                                            <option value="3">3rd Grade</option>
                                            <option value="4">4th Grade</option>
                                            <option value="5">5th Grade</option>

                                            <option disabled>Current Grade Level</option>
                                        </select>

                                    </div>
                                </div>


                                <div className='sm:col-span-2'>
                                    <p className='text-lg font-semibold col-span-2 sm:mt-8 text-center'>The current <span className='text-emerald-500 '>Login Image</span> for your Student</p>
                                    <p className='col-span-2 text-center'>Students do not use passwords, we use images to ensure the privacy and safety of your student</p>
                                    <p className='col-span-2 text-center text-red-400'>To change your students Login Image you must contact a member of our security team at <span className='font-bold'>security@readingmastery.org</span></p>

                                    <div>
                                        <img src={files[students[0]?.imageIndex].source} alt="" className="h-36 w-36 bg-gray-100 mx-auto mt-5" />

                                    </div>

                                </div>

                                <div className="mt-5 sm:mt-6 col-span-2 mx-auto">
                                    <button
                                        type="button"
                                        className=" rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={handleUpdate}
                                    >
                                        Save Student
                                    </button>
                                </div>



                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}
