import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { UserAuth } from '../../context/AuthContext'
import Progress from '../Progress'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function UserInfo() {
    const { id } = useParams()
    const { createUser } = UserAuth()
    const [enabled, setEnabled] = useState(false)
    const [email, setEmail] = useState(id);
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert('Passwords do not match!')
        } else {
            createUser(email, password, firstName, lastName, enabled);
            navigate('/more-info');

        }
    }


    return (
        <div className='overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24'>
            <div className='relative mx-auto max-w-lg'>
                <Progress progress={2} className="mb-24" />
                <h1 className='text-center text-3xl font-bold mt-12'>Create an Account</h1>
                <p className='text-center text-md mb-8 mt-2'>Welcome to Reading Mastery! A tool every household should be using, no matter the grade level, as it provides children the opportunity to develop in ways NO OTHER PROGRAM offers!</p>
                <form className='mx-auto max-w-xs grid grid-cols-1 gap-y-3'>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="first-name"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="First Name"
                                onChange={(e) => {setFirstName(e.target.value)}}
                            />
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
                                placeholder="Last Name"
                                onChange={(e) => {setLastName(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="password"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="Password"
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="password"
                                name="passwordConfirmation"
                                id="passwordConfirmation"
                                autoComplete="passwordConfirmation"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="Repeat Password"
                                onChange={(e) => {setPasswordConfirmation(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="relative flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="comments"
                                aria-describedby="comments-description"
                                name="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-300"
                                onChange={(e) => {setEnabled(true)}}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <span id="comments-description" className="text-gray-500">
                                I agree to recieve email/text communication from Reading Mastery about news and promotions
                            </span>
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
