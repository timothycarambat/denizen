import React from 'react'
import { isMobile } from 'react-device-detect';

const workspaceTypes = [
  {
    name: 'Private Office',
    description: 'Lockable office space for teams of all sizes',
    thumbnail: 'https://www.wework.com/vanilla-assets/images/icons/private_office.c081ea11bf22adabe474d33646c49cd9.png',
  },
  {
    name: 'Dedicated Desks',
    description: 'Desk space in a shared lockable office',
    thumbnail: 'https://www.wework.com/vanilla-assets/images/icons/dedicated_desk.aa0dea080a8b225b53c51f626d4070a9.png',
  },
  {
    name: 'Open Workspace - Common Area',
    description: 'An open space with no reservations to work from among other members',
    thumbnail: 'https://www.wework.com/vanilla-assets/images/icons/hot_desk.ea26946b787ba417655ee6917528e8c2.png',
  },
  {
    name: 'Conference Room',
    description: 'Conference space for meeting clients and co-workers to brainstorm',
    thumbnail: 'https://www.wework.com/vanilla-assets/images/icons/conference.c36ac4729785c8031ef582cb917fbc5c.png',
  }
]

const WorkspaceTypes = () => {
  return (
    <div className='mt-8' style={{ width: isMobile ? '100%' : '70%' }}>
      <h3 className='flex w-full text-3xl font-bold mb-4'>Workspace Options</h3>
      <div className='flex-col space-y-6'>
        {workspaceTypes.map((type, i) => {
          return (
            <div key={i} className='flex space-x-4 border border-gray-300 p-3 rounded-lg items-center hover:shadow-md cursor-pointer hover:border-blue-200'>
              <img
                className='h-28'
                alt={type.name}
                src={type.thumbnail}
              />
              <div className='flex-col space-y-1'>
                <p className='text-gray-800 font-regular text-lg'>{type.name}</p>
                <p className='text-gray-500'>{type.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default WorkspaceTypes;