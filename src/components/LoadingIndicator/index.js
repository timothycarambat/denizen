import React from 'react'
import { Loader } from 'react-feather'
import MainLayout from '../../Layouts/Main'

const LoadingIndicator = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-6 relative pt-8 pb-0" style={{ height: '200vh' }}>
        <div className='w-full h-auto flex justify-center items-center'>
          <Loader className='animate-spin h-20 w-10' color='#aeaeae' />
        </div>
      </div>
    </MainLayout>
  )
}

export default LoadingIndicator