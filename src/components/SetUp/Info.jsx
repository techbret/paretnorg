import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import Progress from '../Progress'

export default function Info() {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [referral, setReferral] = useState('');

    const { profile, updateUser } = UserAuth('');
    const navigate = useNavigate()

    const userData = {
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        referralCode: referral,
        id: profile._id
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({userData});
        navigate('/student-info')        
    }


    return (
        <div className='overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24'>
            <div className='relative mx-auto max-w-lg'>
                <Progress progress={3} className="mb-24" />
                <h1 className='text-center text-3xl font-bold mt-12'>Welcome to Reading Mastery</h1>
                <p className='text-center text-md mb-8 mt-2'>Your child is on the way to becoming a better reader! Before we can get them started we just need to add some information</p>
                <form className='mx-auto max-w-xs grid grid-cols-1 gap-y-3'>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="city"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="City"
                                onChange={(e) => {setCity(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="text"
                                name="State"
                                id="State"
                                autoComplete="state"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="State"
                                onChange={(e) => {setState(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="text"
                                name="zipcode"
                                id="zipcode"
                                autoComplete="zip"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="Zipcode"
                                onChange={(e) => {setZip(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                autoComplete="phone"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="Phone Number"
                                onChange={(e) => {setPhone(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">

                        <div className="mt-1">
                            <input
                                type="text"
                                name="referral"
                                id="referral"
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-md font-bold"
                                placeholder="Referral Code (optional)"
                                onChange={(e) => {setReferral(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="mt-8 items-center text-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                        onClick={handleSubmit}

                    >
                        Next
                    </button>
                </form>



            </div>

        </div>
    )
}
