import React, { useEffect, useState } from 'react'
import Nearby from '../../models/nearby'
import pluralize from 'pluralize'

const NeighboorhoodSearch = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNearby = async (coin) => {
      const nearbyLocations = await Nearby.nearbyLocations(coin)
      setLocations(nearbyLocations)
      setLoading(false)
    }
    fetchNearby('MIA')
  }, [])

  if (loading) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 flex relative items-center" style={{ zIndex: 0 }}>
      <div className="container mx-auto px-6 relative pt-8 pb-0">
        <h3 className='flex w-full text-3xl font-bold'>Workspaces nearby</h3>
        <div className='mt-3 grid grid-flow-row md:grid-flow-col gap-4'>
          {locations.map((location) => {
            return (
              <a key={location.name} className='flex space-x-4 cursor-pointer' href={`/spaces/${location.name}`}>
                <img
                  alt={location.name}
                  src={location.thumbnail}
                  className='h-20 w-20 rounded-md'
                />
                <div className='flex-col my-auto'>
                  <p className='font-semibold text-lg'>{location.name}</p>
                  <p className='font-light text-sm text-lg'>{location.workspaces.length} {pluralize('location', location.workspaces.length)}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NeighboorhoodSearch