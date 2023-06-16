import React from "react";
import girlReading from "../assets/girl_reading.png";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <div>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-12">
            {/* Replace with your content */}

            <div className="py-4 grid grid-cols-9 gap-4">
              <div className="h-96 rounded-lg col-span-6">
                <div className="mx-auto lg:mx-0 lg:flex-auto">
                  <div className="flex">
                    <div className="relative flex items-center gap-x-4 rounded-full py-1 px-4 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      <span className="font-semibold text-emerald-600">
                        We’re hiring
                      </span>
                      <span
                        className="h-4 w-px bg-gray-900/10"
                        aria-hidden="true"
                      />
                      <a href="#" className="flex items-center gap-x-1">
                        <span className="absolute inset-0" aria-hidden="true" />
                        See open positions
                        <ChevronRightIcon
                          className="-mr-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                  <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Science-based reading fluency for K-5
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Reading lessons fusing music with strategies proven to
                    increase fluency, word recognition and comprehension.
                    We combine the Science of Reading with engaging experiences to foster reading enjoyment, achievement and success.
                  </p>
                  <div className="mt-6 flex items-center gap-x-6">
                    <a
                      href="#"
                      className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                      Start Free Trial
                    </a>
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      How it Works <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className=" rounded-lg col-span-3 mt-12">
                <img src={girlReading} alt />
              </div>
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-9">
                Information
              </div>
              <div className="h-72 rounded-lg border-4 border-dashed border-gray-200 col-span-9">
                Call To Action
              </div>
            </div>

            {/* /End replace */}
          </div>
        </div>
      </main>
    </div>
  );
}
