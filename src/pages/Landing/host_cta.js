import React from 'react'
import HostImageBG from '../../media/host.png'
import { isMobile } from 'react-device-detect';

const Desktop = () => {
  return (
    <div className="container mx-auto px-6 flex relative pt-8 pb-4 md:pb-0">
      <div
        className='w-full rounded-xl'
        style={{
          height: 460,
          backgroundImage: `url(${HostImageBG})`
        }}
      />
      <div className='flex absolute h-full w-full items-center'>
        <div className='ml-0 md:ml-4 flex-col space-y-8'>
          <div className='flex-col space-y-4 h-auto'>
            <h4 className='text-white text-4xl font-semibold'>
              Crypto + Coworking
            </h4>
            <p className='text-base text-white' style={{
              width: '50%'
            }}>
              Take an amazing co-working space you own or love to use to the next level with Crypto-token enabled access.
            </p>
          </div>

          <div className='pt-4'>
            <a href='https://3xx6x7jhjbl.typeform.com/to/eY64PRmg' rel='noreferrer' target='_blank' className='p-3 rounded-xl bg-white text-gray-800 hover:text-white hover:bg-blue-500'>
              Submit space
              &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Mobile = () => {
  return (
    <div className="container mx-auto px-6 flex relative pt-8 pb-4 md:pb-0">
      <div className='w-full flex-col'>
        <div className='bg-gray-600 flex-col justify-center items-center rounded-tl-xl rounded-tr-xl'>
          <div className='flex-col space-y-2 p-2 h-auto'>
            <h4 className='text-white text-2xl font-semibold text-center'>
              Crypto + Coworking
            </h4>
            <p className='text-sm text-white text-center'>
              Take an amazing co-working space you own or love to use to the next level with Crypto-token enabled access.
            </p>
          </div>
          <div className='h-20 flex justify-center items-center'>
            <button data-tf-popup="eY64PRmg" className='p-3 rounded-xl bg-white text-gray-800 hover:text-white hover:bg-blue-500'>
              Submit space
              &rarr;
            </button>
          </div>
        </div>
        <div
          className='w-full rounded-bl-xl rounded-br-xl'
          style={{
            height: 200,
            backgroundImage: `url(${HostImageBG})`,
            backgroundPositionX: '78%',
            backgroundPositionY: '26%',
            backgroundSize: '300%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    </div >
  )
}

const HostCta = () => {
  return isMobile ? <Mobile /> : <Desktop />
}

export default HostCta