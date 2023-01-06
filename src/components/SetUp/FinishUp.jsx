import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import Progress from '../Progress'

export default function Finish() {

    const { profile } = UserAuth('');
    


    return (
        <div className='overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24'>
            <div className='relative mx-auto max-w-lg'>
                <Progress progress={5} className="mb-24" />
                <h1 className='text-center text-3xl font-bold mt-12'>Welcome to Reading Mastery</h1>
                <h1 className='text-center text-3xl font-bold text-yellow-400'>{profile?.firstName} {profile?.lastName}</h1>
                <p className='text-center text-md mb-8 mt-2'>Your child is on the way to becoming a better reader! They will have be guided through multiple reading lessons, fusing music with strategies proven to increase fluency, word recognition and comprehension.</p>
                   <div className='mx-auto max-w-xs grid grid-cols-1 gap-y-3'>
                    <a
                        href="/dashboard"
                        className="mx-auto mt-8 text-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"

                    >
                        Take me to My Dashboard
                    </a>
                    </div>
             



            </div>

        </div>
    )
}
