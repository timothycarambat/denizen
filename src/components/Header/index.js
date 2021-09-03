import React from 'react'
import DropDown from '../DropDown'
import STXLogo from '../../media/stx-circle.svg'
import { User } from 'react-feather'
import { useLocation } from 'react-router'
import { authenticate, userSession, getPerson, stxAddress } from '../../auth';
import { isMobile } from 'react-device-detect';

const routes = [
  {
    label: 'Find a space',
    path: '/spaces',
    active: (currentRoute) => {
      return currentRoute === '/spaces' || currentRoute.includes('/space/')
    }
  },
  {
    label: 'List a space',
    path: 'https://3xx6x7jhjbl.typeform.com/to/eY64PRmg',
    dataProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
    active: (currentRoute) => {
      return currentRoute === '/spaces/new'
    }
  },
]

const Header = () => {
  const user = userSession.isUserSignedIn() ? getPerson() : null
  const { pathname } = useLocation()

  return (
    <div style={{ borderBottomWidth: 3 }} className='bottom-border-gradient'>
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div style={{ width: isMobile ? 'auto' : '97rem' }} className="mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a className="uppercase flex-shrink-0 font-black text-xl" href="/">
                {process.env.REACT_APP_APP_NAME}
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {routes.map((route, i) => (
                    <a
                      key={i}
                      {...route.dataProps}
                      className={`text-gray-${route.active(pathname) ? '800' : '500'} hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium`}
                      href={route.path}
                    >
                      {route.label}
                    </a>
                  ))}
                  <a
                    href='/about'
                    className={`hover:text-pink-800 text-white dark:hover:text-white px-3 py-2 rounded-md text-md font-medium bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}>
                    Hackathon Introduction
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="relative inline-block text-left">
                    {user && <DropDown
                      props={{
                        label: `Hello, ${stxAddress()}`,
                        icon: <User />,
                        withBackground: false,
                        items: [
                          {
                            label: 'Signout',
                            onClick: () => {
                              userSession.signUserOut()
                              window.location.replace('/')
                            }
                          },
                        ]
                      }}
                    />}
                    {!user &&
                      <button
                        onClick={authenticate}
                        className="text-gray-800 dark:text-white hover:bg-gray-100 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                        Connect wallet <img alt='Stacks Coin logo' src={STXLogo} className='h-6 ml-2' />
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {user && <DropDown
                props={{
                  label: `Hello, ${stxAddress()}`,
                  icon: <User />,
                  withBackground: false,
                  items: [
                    {
                      label: 'Signout',
                      onClick: () => {
                        userSession.signUserOut()
                        window.location.replace('/')
                      }
                    },
                  ]
                }}
              />}
              {!user &&
                <button
                  onClick={authenticate}
                  className="text-gray-800 dark:text-white hover:bg-gray-100 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                  Connect wallet <img alt='Stacks Coin logo' src={STXLogo} className='h-6 ml-2' />
                </button>
              }
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {routes.map((route, i) => (
              <a
                key={i}
                {...route.dataProps}
                className={`text-gray-${route.active(pathname) ? '800' : '500'} hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium`}
                href={route.path}
              >
                {route.label}
              </a>
            ))}
            <a
              href='/about'
              className='text-indigo-800 underline hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium'>
              HACKATHON
            </a>
          </div>
        </div>
      </nav>
    </div >
  )
}

export default Header;