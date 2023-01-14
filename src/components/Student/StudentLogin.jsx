import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import icon from '../../assets/icongreen.svg';
import files from "../../assets/Images";

function StudentLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { studentSignIn } = UserAuth();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await studentSignIn(userName, password);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-3xl space-y-8 shadow-2xl p-10 mt-5 rounded-md">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={icon}
              alt="Your Company"
            />
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome
            </h2>
            <p className="font-medium text-emerald-600 hover:text-emerald-500 text-center">
              Are you ready to start the music?
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Parent Username
                </label>
                <input
                  id="username"
                  name="usernam"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-sm border border-gray-300 px-6 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 text-2xl"
                  placeholder="Parent Username"
                  onChange={(e) => { setUserName(e.target.value) }}
                />
              </div>
              <div>

                <ul className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-8 xl:gap-x-8 mt-4">
                  {files.map((file, index) => (
                    <li key={index} className="relative">
                      <div className="group aspect-w-10 aspect-h-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src={file.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                        <button type="button" className="absolute inset-0 focus:outline-none" onClick={() => { setPassword(index) }}>
                        </button>
                      </div>
                      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 text-center">{file.title}</p>
                    </li>
                  ))}
                </ul>

              </div>
            </div>




            <div className="text-lg text-center">
              <button  className="font-medium text-emerald-600 hover:text-emerald-500">
                Forgot your Image?
              </button>
            </div>


            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default StudentLogin;
