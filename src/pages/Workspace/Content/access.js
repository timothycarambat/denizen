import React, { useEffect, useState } from 'react'
import { Lock, Loader, Unlock, AlertCircle } from 'react-feather'
import { authenticate, userStxAddress } from '../../../auth'
import STXLogo from '../../../media/stx-circle.svg'
import Workspace from '../../../models/workspace'

const AccessButton = ({ workspaceId, user, canAccess = false }) => {
  const [unlocking, setUnlocking] = useState(false)
  const [resultStatus, setResultStatus] = useState(null)

  const handleAccess = async () => {
    if (!user) { return false }
    setUnlocking(true)
    const accessResponse = await Workspace.accessWorkspace(workspaceId, userStxAddress(user))

    setResultStatus(!!accessResponse?.accessGranted)
    setUnlocking(false)
  }

  // To return the button to a normal state post-action
  useEffect(() => {
    if (resultStatus !== null) {
      setTimeout(() => setResultStatus(null), 3500)
    }
  }, [resultStatus])

  if (!user) {
    return (
      <div
        onClick={authenticate}
        title='To access spaces on Denizen you must login with a Stacks wallet first.'
        className='p-2 mt-4 w-full flex text-center items-center justify-center border rounded-md border-gray-800 text-gray-800 hover:text-white hover:border-blue-500 hover:bg-blue-500 cursor-pointer'>
        <img alt='Stacks Coin logo' src={STXLogo} className='h-6 mr-2' />
        Connect your Stacks wallet
      </div >
    )
  } else if (user && !canAccess && !unlocking) {
    return (
      <div
        title='Your wallet does not meet the access requirements for this workspace'
        className='space-x-4 p-2 mt-4 w-full flex text-center items-center justify-center border rounded-md border-gray-500 text-gray-500 hover:border-gray-500 cursor-not-allowed'>
        <Lock size={20} />
        <p className=''>
          You cannot access this space
        </p>
      </div>
    )
  }

  if (unlocking) {
    return (
      <div
        className='space-x-4 p-2 mt-4 w-full flex text-center items-center justify-center border border-green-500 bg-green-500 rounded-md text-white animate-pulse'>
        <Loader size={20} className='animate-spin' />
        <p className=''>
          Unlocking this workspace
        </p>
      </div >
    )
  } else if (resultStatus === true) {
    return (
      <div
        className='space-x-4 p-2 mt-4 w-full flex text-center items-center justify-center border border-green-500 rounded-md text-green-500'>
        <Unlock size={20} />
        <p className=''>
          Workspace unlocked!
        </p>
      </div >
    )
  } else if (resultStatus === false) {
    return (
      <div
        className='space-x-4 p-2 mt-4 w-full flex text-center items-center justify-center border border-red-500 rounded-md text-red-500'>
        <AlertCircle size={20} />
        <p className=''>
          Failed to open workspace!
        </p>
      </div >
    )
  }


  return (
    <button
      onClick={handleAccess}
      className='p-2 mt-4 w-full flex text-center items-center justify-center border rounded-md border-gray-800 text-gray-800 hover:text-white hover:border-green-500 hover:bg-green-500'
    >
      <img alt='Stacks Coin logo' src={STXLogo} className='h-6 mr-2' />
      Access this workspace
    </button>
  )
}

export default AccessButton