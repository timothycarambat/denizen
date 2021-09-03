import React, { useEffect, useState } from 'react'
import Workspace from '../../models/workspace'
import { Carousel } from 'react-carousel-minimal';
import { workspaceEntryMessage } from '../../utils/workspace';
import { isMobile } from 'react-device-detect';

const FEATURED_WORKSPACES = [
  'nCuSWPt3mcpFNMf37WEz',
  'r8zjSs0wWxsCTzxNkq83',
  'JP5AJkYMbEfQohBr3YPP',
  'flwQEumBouCgfz8bu1zM'
]

const FeaturedWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const workspaces = await Promise.all(FEATURED_WORKSPACES.map(async (workspaceId) => {
        return await Workspace.getById(workspaceId)
      }))

      setWorkspaces(workspaces)
      setLoading(false)
    }
    fetchWorkspaces()
  }, [])

  if (loading) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 flex relative items-center overflow-hidden mt-6" style={{ zIndex: 0 }}>
      <div className="container mx-auto px-6 relative pt-8 pb-0">
        <h3 className='flex w-full text-3xl font-bold'>Featured workspaces</h3>
        <div className={`flex${isMobile ? '-col' : ''} mt-3 justify-between`}>
          {workspaces.map((workspace) => <WorkspaceItem workspace={workspace} key={workspace.id} />)}
        </div>
      </div>
    </div>
  )
}

const WorkspaceItem = ({ workspace }) => {
  const images = workspace.images.map((url) => { return { image: url } })
  const handleClick = () => {
    window.location.href = `/space/${workspace.id}`
  }

  return (
    <div className='flex-col md:space-y-2 py-4 md:py-0 my-4 my-0'>
      <Carousel
        data={images}
        automatic={false}
        thumbnails={false}
        width="350px"
        height="350px"
        radius="15px"
        slideNumber={true}
        captionPosition="bottom"
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="white"
        slideImageFit="cover"
        onSlideClick={handleClick}
        style={{
          cursor: 'pointer',
        }}
      />
      <div className='flex-col w-full space-y-1 cursor-pointer' onClick={handleClick}>
        <div className='flex w-full justify-between items-center pt-2 md:pt-0'>
          <p className='text-md text-gray-800 font-semibold'>{workspace.name}</p>
          <p className='text-gray-800'>{workspace.hours}</p>
        </div>
        <div className='flex w-full justify-between items-center'>
          <p className='text-md text-gray-500 cursor-pointer'>
            {workspaceEntryMessage(workspace.entry_type, { coin: workspace.coin, amt: workspace.entry_min })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeaturedWorkspaces