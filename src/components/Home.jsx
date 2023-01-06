import React from 'react'

export default function Home() {
  return (
    <div>
      <main className="flex-1">
            <div className="py-6">
              
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                
                <div className="py-4 grid grid-cols-9 gap-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-6" >
                    Content
                  </div>
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-3" >
                    Image
                  </div>
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 col-span-9" >
                    Information
                  </div>
                  <div className="h-72 rounded-lg border-4 border-dashed border-gray-200 col-span-9" >
                    Call To Action
                  </div>
                </div>
                

                {/* /End replace */}
              </div>
            </div>
          </main>
    </div>
  )
}
