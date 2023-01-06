import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import Progress from '../Progress'

export default function StudentInfo() {
    const [childsName, setChildsName] = useState(null);
    const [birthYear, setBirthYear] = useState(null);
    const [pronouns, setPronouns] = useState('');
    const [agreeCoppa, setAgreeCoppa] = useState(false)

    const { profile, createStudent } = UserAuth();
    const navigate = useNavigate()

    const studentData = {
        name: childsName,
        birthYear: birthYear,
        pronouns: pronouns,
        agreeCoppa: agreeCoppa,
        parentID: profile._id,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (childsName && birthYear && agreeCoppa) {
            createStudent(studentData);
            navigate('/finish-up');
        } else {
            alert('There is an error')
        }
    }


    return (
        <div className='overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24'>
            <div className='relative mx-auto max-w-lg'>
                <Progress progress={4} className="mb-24" />
                <h1 className='text-center text-3xl font-bold mt-12'>Student Info</h1>
                <p className='text-center text-md mb-8 mt-2'>This helps us customize your childs first lesson and experience</p>
                <form className='mx-auto max-w-xs grid grid-cols-1 gap-y-3'>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="text"
                                name="childs-name"
                                id="childs-name"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="Child's Name"
                                onChange={(e) => { setChildsName(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300  shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <select
                                id="location"
                                name="location"
                                className="block w-full border-0 px-3 py-2 text-gray-900 focus:ring-0 sm:text-md font-bold"
                                defaultValue="Child's Birth Year"
                                onChange={(e) => { setBirthYear(e.target.value) }}
                                
                            >
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                                <option>2009</option>
                                <option>2008</option>
                                <option>2007</option>
                                <option>2006</option>
                                <option>2005</option>
                                <option>2004</option>
                                <option disabled>Child's Birth Year</option>
                            </select>

                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="Pronouns your child uses? (optional)"
                                onChange={(e) => { setPronouns(e.target.value) }}
                            />
                        </div>
                    </div>
                    <a href="/" className='text-center mt-8 font-bold text-yellow-400'>View COPPA Consent Notice</a>
                    <div className="relative flex">
                        <div className="flex h-5">
                            <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-300"
                                onChange={() => {setAgreeCoppa(!agreeCoppa)}}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <p className="text-gray-500">I {profile?.firstName}, as the Parent or Guardian of {childsName}, grant my COPPA consent</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className=" items-center text-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Button text
                    </button>
                </form>



            </div>

        </div>
    )
}
