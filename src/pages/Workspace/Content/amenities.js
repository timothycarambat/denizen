import React from 'react'
import { Plus } from 'react-feather'
import { WORKSPACE_AMENITIES } from '../../../utils/workspace'
import { isMobile } from 'react-device-detect';

const Amenities = ({ amenities = [] }) => {
  if (amenities.length === 0) { return null }

  return (
    <div className='mt-8' style={{ width: isMobile ? '100%' : '70%' }}>
      <h3 className='flex w-full text-3xl font-bold mb-4'>Amenities</h3>
      <div className='grid grid-cols-4 gap-4'>
        {amenities.map((item) => <AmenityItem item={item} />)}
      </div>
    </div>
  )
}

const AmenityItem = ({ item }) => {
  const isPlaceholder = item === '--placeholder'
  const details = WORKSPACE_AMENITIES[item]
  const Icon = !details || isPlaceholder ? Plus : details.icon

  return (
    <div className='p-2 h-auto w-auto flex-col justify-center items-center space-y-4 bg-gray-100 rounded-xl overflow-x-scroll'>
      <Icon size={40} style={{ margin: 'auto' }} />
      <p className='text-xs text-gray-500 text-center'>{item}</p>
    </div>
  )
}

export default Amenities;