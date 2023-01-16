import React, { Profiler, useState } from 'react'
import files from '../../assets/Images'
import { UserAuth } from '../../context/AuthContext'

export default function CreateStudent() {
    const { students, updateStudent } = UserAuth()
    const [name, setName] = useState(students[0].name);
    const [userName, setUserName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [imageIndex, setImageIndex] = useState();

    const id = students[0]._id

    const studentData = {
        name: name || students[0].name,
        userName: userName,
        gradeLevel: gradeLevel,
        imageIndex: imageIndex,
        _id: id,
        pwnumber: imageIndex
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
                            <h1 className='text-2xl text-center font-bold pt-8'>Create your Student's Account</h1>
                            <h3 className='text-center text-lg'>Fill out this information to get your child started and able to login to their account</h3>
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
                                        placeholder="This is the username they will use for login"
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
                                            defaultValue="Current Grade Level"
                                            onChange={(e) => (setGradeLevel(e.target.value))}

                                        >
                                            <option>Pre-School</option>
                                            <option>Kindergarten</option>
                                            <option>1st Grade</option>
                                            <option>2nd Grade</option>
                                            <option>3rd Grade</option>
                                            <option>4th Grade</option>
                                            <option>5th Grade</option>
                                            <option>6th Grade +</option>
                                            
                                            <option disabled>Current Grade Level</option>
                                        </select>

                                    </div>
                                </div>                             


                                <div className='sm:col-span-2'>
                                    <p className='text-lg font-semibold col-span-2 sm:mt-8 text-center sm:text-left'>Select a <span className='text-emerald-500 '>Login Image</span> for your Student</p>
                                    <p className='col-span-2 text-center sm:text-left'>Students do not use passwords, we use images to ensure the privacy and safety of your student</p>

                                    <div>

                                        <ul role="list" className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-8 xl:gap-x-8 mt-4">
                                            {files.map((file, index) => (
                                                <li key={file.source} className="relative">
                                                    <div className="group aspect-w-10 aspect-h-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                                        <img src={file.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                                                        <button type="button" className="absolute inset-0 focus:outline-none" onClick={() => setImageIndex(index)}>
                                                            <span className="sr-only text-center">View details for {file.title}</span>
                                                        </button>
                                                    </div>
                                                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 text-center">{file.title}</p>
                                                </li>
                                            ))}
                                        </ul>

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
