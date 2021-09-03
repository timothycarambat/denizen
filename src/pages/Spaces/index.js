import React, { memo, useEffect, useState } from 'react'
import MainLayout from '../../Layouts/Main'
import LoadingIndicator from '../../components/LoadingIndicator'
import Workspace from '../../models/workspace'
import { Carousel } from 'react-carousel-minimal';
import { WORKSPACE_ENTRY_TYPES, workspaceEntryMessage } from '../../utils/workspace'
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router';

const Spaces = () => {
  const { nearby } = useParams()
  const [availableLocations, setAvailableLocations] = useState([])
  const [availableNearby, setAvailableNearby] = useState([])
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredLocations, setFilteredLocations] = useState([])
  const [filterSettings, setFilterSettings] = useState({
    entry_type: 'na',
    coin: 'na'
  })
  const handleFilterChange = (type, value) => {
    let newFilteredLocations = availableLocations
    const filters = filterSettings
    filters[type] = value
    setFilterSettings({ ...filters })

    if (filterSettings.entry_type !== 'na') {
      newFilteredLocations = newFilteredLocations.filter((location) => +location.entry_type === +filterSettings.entry_type)
    }

    if (filterSettings.coin !== 'na') {
      newFilteredLocations = newFilteredLocations.filter((location) => {
        return location.coin.toUpperCase() === filterSettings.coin ||
          location.payment_coin?.toUpperCase() === filterSettings.coin
      })
    }

    setFilteredLocations(newFilteredLocations)
  }
  const resetFilters = () => {
    setFilterSettings({
      entry_type: 'na',
      coin: 'na'
    })
    setFilteredLocations(availableLocations)
  }

  useEffect(() => {
    const fetchLocations = async (nearby) => {
      const locations = nearby ? await Workspace.locationsForNearby(nearby) : await Workspace.getAll()

      setCoins([
        ...new Set([
          ...locations.map(({ coin }) => coin.toUpperCase()),
          ...locations.map(({ payment_coin }) => payment_coin?.toUpperCase())
        ].filter((a) => a))
      ])
      setAvailableNearby(locations.map(({ nearby }) => nearby))
      setAvailableLocations(locations)
      setFilteredLocations(locations)
      setLoading(false)
    }
    fetchLocations(nearby)
  }, [nearby])


  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 relative pt-8 pb-8">
        <Filters
          nearbys={availableNearby}
          coins={coins}
          onChange={handleFilterChange}
          filters={filterSettings}
        />
        {
          filteredLocations.length > 0 ?
            <div className={`flex${isMobile ? '-col' : ''} flex-wrap mt-3 justify-between`}>
              {filteredLocations.map((workspace) => <WorkspaceItem workspace={workspace} key={workspace.id} />)}
            </div> :
            <div className='flex-col w-full mt-3 justify-center'>
              <p className='text-gray-900 font-semibold text-lg text-center'>😅 No locations found with those filters.</p>
              <p
                className='text-blue-500 text-sm text-center cursor-pointer hover:underline underline md:no-underline'
                onClick={resetFilters}>
                clear your filters?
              </p>
            </div>

        }

      </div>
    </MainLayout>
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
            {workspaceEntryMessage(workspace.entry_type, { coin: workspace.coin, amt: workspace.entry_min, payment_coin: workspace.payment_coin, rate: workspace.rate })}
          </p>
        </div>
      </div>
    </div>
  )
}

const Filters = ({ nearbys = [], coins = [], onChange, filters }) => {
  const { nearby } = useParams()

  if (nearby) {
    return (
      <div className={`flex${isMobile ? '-col' : ''} w-full justify-end md:justify-between items-center`}>
        <div className='flex-col space-y-1'>
          <h1 className='font-semibold text-lg text-gray-800'>Workspaces in {nearby}</h1>
          <a href='/spaces' className='text-gray-500 text-sm'>
            &larr; back to all workspaces
          </a>
        </div>

        <div className='flex space-x-6 items-center'>
          <EntryFilter onChange={onChange} active={filters.entry_type} />
          <CoinFilter coins={coins} onChange={onChange} active={filters.coin} />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex${isMobile ? '-col' : ''} w-full justify-end md:justify-between items-center`}>
      <div className='flex flex-wrap space-x-2 md:space-x-6 items-center'>
        <p className='py-4 text-gray-800 text-base'>Nearby Areas:</p>
        {nearbys.map((location, i) => {
          return (
            <a key={i}
              href={`/spaces/${location}`}
              className={`py-2 hover:text-gray-800 text-gray-500 text-base border-b-2 border-transparent hover:border-gray-800`}>
              {location}
            </a>
          )
        })}
      </div>

      <div className='flex space-x-6 items-center'>
        <EntryFilter onChange={onChange} active={filters.entry_type} />
        <CoinFilter coins={coins} onChange={onChange} active={filters.coin} />
      </div>
    </div>
  )
}

const EntryFilter = memo(({ onChange, active }) => {
  return (
    <select
      onChange={(e) => onChange('entry_type', e.target.value)}
      className="block w-auto text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      name="entry_type"
      value={active}
    >
      <option value="na">
        Any Entry Type
      </option>
      {
        WORKSPACE_ENTRY_TYPES.map(({ title }, i) => {
          return (
            <option key={i} value={i}>
              {title}
            </option>
          )
        })
      }
    </select >
  )
})

const CoinFilter = memo(({ coins, onChange, active }) => {
  if (!coins || coins.length === 0) { return null }

  return (
    <select
      onChange={(e) => onChange('coin', e.target.value)}
      className="block w-auto text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      name="coin"
      value={active}
    >
      <option value="na">
        Any Coin
      </option>
      {coins.map((coin, i) => {
        return (
          <option key={i} value={coin}>
            {coin}
          </option>
        )
      })}
    </select>
  )
})

export default Spaces;