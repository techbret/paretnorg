import React from 'react'

export default function Main() {
  return (
    <div>
        <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                
                <div className="py-4 grid grid-cols-4 gap-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-3" >
                    Graph 1
                  </div>
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-1" >
                    Graph 2
                  </div>
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-4" >
                    Graph 3
                  </div>
                </div>
                

                {/* /End replace */}
              </div>
            </div>
          </main>
    </div>
  )
}
