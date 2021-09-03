import React from 'react'
import miaSVG from '../../media/mia.svg'
import { ExternalLink } from 'react-feather';
import { isMobile } from 'react-device-detect';

const CTASection = () => {
  return (
    <div className="dark:bg-gray-800 flex relative items-center overflow-hidden" style={{
      zIndex: 0,
      backgroundImage: 'url(https://github.com/blockstack/explorer/blob/main/public/metaverse-bg.png?raw=true)',
      backgroundSize: 'cover',
    }}>
      <div className="container mx-auto px-6 flex relative pt-8 pb-4 md:pb-0">
        <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
          <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
          </span>
          <h1 className="text-5xl md:text-7xl font-black flex flex-col leading-none text-gray-800">
            <a className='text-blue-600 hover:underline cursor-pointer' href='https://www.citycoins.co/' target='_blank' rel="noreferrer">
              CityCoin
              <ExternalLink size={20} style={{
                position: 'absolute',
                top: '9%',
                right: isMobile ? '31%' : '41%'
              }} />
            </a>
            Enabled Workspaces
          </h1>
          <p className="text-lg text-gray-800 dark:text-white py-2">
            We are making smart coworking spaces enabled with
            {' '}<b className='font-normal underline md:no-underline md:font-bold md:text-blue-600'>CityCoin</b>{' '}
            tokens so the community can more easily co-work and organize while supporting their cities and coworking spaces.
          </p>
          <div>
            <p className="text-xs text-gray-800 dark:text-white py-2">Supported CityCoins</p>
            <div className='flex space-x-4'>
              <a
                href='https://www.citycoins.co/miamicoin'
                target='_blank'
                rel='noopener noreferrer'
                className="text-base text-gray-800 cursor-pointer hover:underline">
                $MIA
              </a>
              <p
                title='San Francisco Coin has not been announced yet - subscribe to our updates to get alerts for your city.'
                className="text-base text-gray-800 opacity-50 cursor-pointer cursor-help">
                $SFO
              </p>
            </div>
          </div>
          <div className="flex mt-3">
            <a href="/spaces" className="px-4 font-medium py-2 pr-6 rounded-md border border-gray-800 hover:border-blue-500 text-gray-800 bg-transparent hover:bg-blue-500 hover:text-white dark:text-white text-md">
              Discover local workspaces &rarr;
            </a>
          </div>
        </div>
        <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
          <img
            src={miaSVG}
            style={{
              transform: 'scale(8) translate(-95px, -171px)'
            }}
            alt='animation of Florida coastline focused on Miami'
          />
        </div>
      </div>
    </div>
  )
}

export default CTASection