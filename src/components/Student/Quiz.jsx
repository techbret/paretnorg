import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Teams', href: '#', current: false },
    { name: 'Directory', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Quiz() {
    return (
        <div>
            <main className="flex-1">
                <div className="py-6">

                    <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8">
                        {/* Replace with your content */}

                        <div className="py-4 grid grid-cols-9 gap-4">
                            <div className="h-screen rounded-lg border-4 border-dashed border-gray-200 col-span-3" >
                                Lyrics
                            </div>
                            <div className="h-screen rounded-lg border-4 border-dashed border-gray-200 col-span-6" >
                                Quiz
                            </div>
                        </div>


                        {/* /End replace */}
                    </div>
                </div>
            </main>
        </div>
    )
}
