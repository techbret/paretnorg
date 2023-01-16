import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, PlusIcon } from '@heroicons/react/20/solid'
import logo from '../assets/logo.svg'
import { UserAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import StudentNavBar from './Student/StudentNavBar'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Parents', href: '/Parents', current: false },
  { name: 'Research', href: '/research', current: false },
  { name: 'Our Method', href: '/our-method', current: false },
  { name: 'Resources', href: '/resources', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const { logout, isLoggedIn } = UserAuth();

  if (isLoggedIn || window.localStorage.getItem("auth") === "true") {
    return <></>

  } else {
    return (
      <Disclosure as="nav" className="bg-emerald-600">
        {({ open }) => (
          <div>

            <div className="mx-auto max-w-7xl spx-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                    <Link to="/">
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src={logo}
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-yellow-400 hover:text-zinc-900',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  
                  </div>

                </div>
                <div className="hidden lg:flex lg:items-center">
                      <div className="flex-shrink-0 ">
                        <Link
                          to="/login"
                          className="relative inline-flex items-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 mr-2"
                          onClick={logout}
                        >
                          <ArrowLeftOnRectangleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                          <span>Parent Login</span>
                        </Link>
                        <Link
                          to="/student-login"
                          className="relative inline-flex items-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 mr-2"
                          onClick={logout}
                        >
                          <ArrowLeftOnRectangleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                          <span>Student Login</span>
                        </Link>
                        <Link
                          to="/create-account"
                          className="relative inline-flex items-center rounded-md border border-transparent bg-yellow-300 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"

                        >
                          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                          <span>Free Trial</span>
                        </Link>
                      </div>

                    </div>
              </div>
            </div>
            

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    as="Link"
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    )
  }
}

