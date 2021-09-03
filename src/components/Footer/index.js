import React from 'react'
import CityCoinSVG from '../../media/citycoin.svg'
import StxLogo from '../../media/stx-circle.svg'

const Footer = () => {
  return (
    <footer style={{ borderTopWidth: 3 }} className="mt-8 bottom-border-gradient px-3 py-8 bg-white dark:bg-gray-800 text-2 text-gray-500 dark:text-gray-200 transition-colors duration-200">
      <div className="flex flex-col">
        <div className="md:hidden mt-7 mx-auto w-11 h-px rounded-full">
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row">
          <nav className="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-gray-100 md:pr-5">
            <a aria-current="page" href="/about" className="hover:text-gray-700 dark:hover:text-white">
              What is this project?
            </a>
            <a aria-current="page" target='_blank' rel="noreferrer" href="https://www.eventbrite.com/e/miamicoin-makers-month-tickets-166707341145" className="hover:text-gray-700 dark:hover:text-white">
              City Coins Hackathon Event
            </a>
          </nav>
          <div className="md:hidden mt-4 mx-auto w-11 h-px rounded-full">
          </div>
          <div className="mt-4 md:mt-0 flex-1 flex items-center space-x-6 justify-center md:border-r border-gray-100">

            <a className="hover:text-primary-gray-20" target='_blank' rel='noreferrer' href="https://www.citycoins.co/miamicoin">
              <span className="sr-only">
                CityCoins
              </span>
              <img className='h-8' src={CityCoinSVG} alt='City Coin Project' />
            </a>

            <a className="hover:text-primary-gray-20" target='_blank' rel='noreferrer' href="https://www.stacks.co/">
              <span className="sr-only">
                Stacks Token
              </span>
              <img className='h-8' src={StxLogo} alt='Stacks Token' />
            </a>

          </div>
          <div className="md:hidden mt-4 mx-auto w-11 h-px rounded-full ">
          </div>
          <div className="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
            <span className="">
              © {(new Date()).getFullYear()}
            </span>
            <span className="mt-7 md:mt-1">
              Created by
              <a className="underline hover:text-primary-gray-20" href="https://twitter.com/tcarambat">
                @tcarambat
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer