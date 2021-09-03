import React from 'react'
import AccessButton from './access';
import { userSession, getPerson } from '../../../auth';
import { Plus, CheckCircle, XCircle } from 'react-feather'
import { workspaceEntryLongMessage, WORKSPACE_AMENITIES, validateWorkspaceEntry } from '../../../utils/workspace'
import { useUserBalances } from './hooks';

const Sidecard = ({ workspace }) => {
  const { id, name, description, amenities, entry_type, entry_min, coin, payment_coin, rate } = workspace
  const user = userSession.isUserSignedIn() ? getPerson() : null
  const userBalances = useUserBalances(user)
  const canAccess = validateWorkspaceEntry(userBalances, workspace)

  return (
    <div className='relative pl-8 h-full' style={{ width: '30%' }}>
      <div className='w-full bg-gray-50 border border-gray-200 rounded-xl fixed p-6' style={{ width: '21%', minHeight: 450 }}>
        <h3 className='font-semibold text-lg'>
          {name} Workspace Details
        </h3>
        {description && (
          <p className='my-2 text-sm text-gray-800 border-l-4 border-gray-300 pl-3'>
            {description}
          </p>
        )}
        <Amenities items={amenities} />
        <div className='mt-2 flex-col'>
          <h4 className='font-semibold text-lg'>
            To access this workspace...
          </h4>
          <ul>
            <li>
              <div className='flex space-x-4 items-center'>
                {canAccess ?
                  <CheckCircle size={40} style={{ color: '#10B981' }} /> :
                  <XCircle size={40} style={{ color: '#EF4444' }} />
                }
                <p
                  className='my-2 text-sm text-gray-800'
                  dangerouslySetInnerHTML={{
                    __html: workspaceEntryLongMessage(+entry_type, { coin, payment_coin, amt: entry_min, rate: rate })
                  }}
                />
              </div>
            </li>
          </ul>
          <p className='my-1 text-xs text-gray-800'>
            *once you access this space you will be show details to this space such as Wifi information, space rules, and other
            information.
          </p>
          <AccessButton workspaceId={id} user={user} canAccess={canAccess} />
        </div>
      </div>
    </div >
  )
}

export const MobileSidecard = ({ workspace }) => {
  const { id, name, description, amenities, entry_type, entry_min, coin, payment_coin, rate } = workspace
  const user = userSession.isUserSignedIn() ? getPerson() : null
  const userBalances = useUserBalances(user)
  const canAccess = validateWorkspaceEntry(userBalances, workspace)

  return (
    <div className='mt-4 w-full bg-gray-50 border border-gray-200 rounded-xl p-6'>
      <h3 className='font-semibold text-lg'>
        {name} Workspace Details
      </h3>
      {description && (
        <p className='my-2 text-sm text-gray-800 border-l-4 border-gray-300 pl-3'>
          {description}
        </p>
      )}
      <Amenities items={amenities} />
      <div className='mt-2 flex-col'>
        <h4 className='font-semibold text-lg'>
          To access this workspace...
        </h4>
        <ul>
          <li>
            <div className='flex space-x-4 items-center'>
              {canAccess ?
                <CheckCircle size={40} style={{ color: '#10B981' }} /> :
                <XCircle size={40} style={{ color: '#EF4444' }} />
              }
              <p
                className='my-2 text-sm text-gray-800'
                dangerouslySetInnerHTML={{
                  __html: workspaceEntryLongMessage(+entry_type, { coin, payment_coin, amt: entry_min, rate: rate })
                }}
              />
            </div>
          </li>
        </ul>
        <p className='my-1 text-xs text-gray-800'>
          *once you access this space you will be show details to this space such as Wifi information, space rules, and other
          information.
        </p>
        <AccessButton workspaceId={id} user={user} canAccess={canAccess} />
      </div>
    </div>
  )
}

const Amenities = ({ items }) => {
  if (!items || items.length === 0) { return null }
  const itemsToShow = items.length >= 4 ? [...items.slice(0, 3), '--placeholder'] : items

  return (
    <div className='flex w-full justify-between'>
      {itemsToShow.map((item, i) => <AmenityItem key={i} item={item} total={items.length} />)}
    </div >
  )
}

const AmenityItem = ({ item, total }) => {
  const isPlaceholder = item === '--placeholder'
  const details = WORKSPACE_AMENITIES[item]
  const Icon = !details || isPlaceholder ? Plus : details.icon

  return (
    <div className='p-2 h-20 w-auto flex-col justify-center items-center space-y-4 hover:bg-gray-100 rounded-xl'>
      <Icon style={{ margin: 'auto' }} />
      <p className='text-xs text-gray-500'>{isPlaceholder ? `${total - 4} More` : item}</p>
    </div>
  )
}

export default Sidecard;