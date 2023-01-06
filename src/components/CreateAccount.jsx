import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/create-account/' + email);
    }

    return (
        <div className="bg-white">
            
            <div className="mx-auto max-w-7xl py-4 grid grid-cols-9 gap-4">
                  <div className="h-48 rounded-lg border-4 border-dashed border-gray-200 col-span-9" >
                    Information or Image
                  </div>

                  <div className="col-span-9 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="inline text-3xl font-bold tracking-tight text-gray-900 sm:block sm:text-4xl">
                    Want better reading results for your child?
                </h2>
                <p className="text-lg font-semiboldbold tracking-tight text-emerald-600 sm:block sm:text-xl">
                    Your child’s first lesson is completely free; no obligations or credit card required. All we need is a little bit of info to get you started.
                </p>
                <form className="mt-8 sm:flex col-span-9">
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full rounded-md border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 sm:max-w-xs"
                        placeholder="Enter your email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-5 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            onClick={handleSubmit}
                        >
                            Get Started
                        </button>
                    </div>
                </form>
            </div>
                  
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-9" >
                    Information
                  </div>
                  <div className="h-72 rounded-lg border-4 border-dashed border-gray-200 col-span-9" >
                    Call To Action
                  </div>
                </div>
        </div>
    )
}
