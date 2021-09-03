import React from 'react'

const NotFound = () => {
  return (
    <div class="bg-indigo-900 relative overflow-hidden h-screen">
      <img alt='not found astronaut' src="https://www.tailwind-kit.com/images/landscape/8.svg" class="absolute h-full w-full object-cover" />
      <div class="inset-0 bg-black opacity-25 absolute">
      </div>
      <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div class="w-full font-mono flex flex-col items-center relative z-10">
          <h1 class="font-extrabold text-5xl text-center text-white leading-tight mt-4">
            You&#x27;re alone here
          </h1>
          <p class="font-extrabold text-8xl mt-44 text-white">
            404
          </p>

          <a href='/' class="font-regular text-2xl text-white hover:underline">
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default NotFound