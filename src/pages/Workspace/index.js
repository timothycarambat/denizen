import React, { useEffect, useState } from 'react'
import MainLayout from '../../Layouts/Main';
import Workspace from '../../models/workspace';
import Content from './Content'
import DropDownMenu from '../../components/DropDown';
import { useParams } from 'react-router';
import { MousePointer, Share, Twitter, Copy, Map } from 'react-feather';
import { isMobile } from 'react-device-detect';

const WorkspacePage = () => {
  const { workspaceId } = useParams()
  const [workspace, setWorkspace] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkspace = async (docId) => {
      const workspace = await Workspace.getById(docId)
      setWorkspace(workspace)
      setLoading(false)
    }

    fetchWorkspace(workspaceId)
  }, [workspaceId])

  if (loading) { return null }
  if (!workspace) { window.location.href = '/' }

  return (
    <MainLayout>
      <div className="container mx-auto px-6 relative pt-8 pb-0" style={{ height: '200vh' }}>
        <TopBar workspace={workspace} />
        <Content workspace={workspace} />
      </div>
    </MainLayout>
  )
}

const TopBar = ({ workspace }) => {
  return (
    <>
      <div className='flex w-full justify-end md:justify-between items-center'>
        {!isMobile && <a href='/spaces' className='text-gray-800 text-md hover:underline'>
          &larr; Explore more workspaces
        </a>}
        <ActionItems workspace={workspace} />
      </div>

      <div className='flex w-full justify-between items-start mt-4'>
        <div className='flex-col items-between'>
          <h1 className='text-gray-800 text-4xl md:text-6xl font-semibold pb-2 break-word'>
            {workspace.name}
          </h1>
          <a
            href={`/spaces/${workspace.nearby}`}
            className='text-gray-500 text-md hover:underline'>
            workspaces in <u className='underline md:no-underline'>{workspace.nearby}</u>
          </a>
        </div>

        <p className='text-xl w-48 text-gray-600 text-right'>
          {workspace.address}
        </p>
      </div>
    </>
  )
}

const ActionItems = ({ workspace }) => {
  return (
    <div className='flex space-x-3'>
      {workspace.website && (
        <a href={workspace.website} target='_blank' rel='noopener noreferrer' className='text-sm md:text-base flex space-x-2 items-center hover:underline'>
          <MousePointer size={20} color='#4b5563' />
          <p className='text-gray-600 hover:text-gray-800 text-sm md:text-base'>Website</p>
        </a>)}

      <DropDownMenu
        props={{
          label: 'Share',
          icon: <Share size={20} />,
          withBackground: false,
          items: [
            {
              label: 'Twitter',
              icon: <Twitter size={20} />,
              onClick: () => {
                window.open(`https://twitter.com/intent/tweet?text=Check out this CityCoin enabled Workspace on ${process.env.REACT_APP_APP_NAME}. ${window.location.href}`, '_blank')
              },
            },
            {
              label: 'Copy Link',
              icon: <Copy size={20} />,
              onClick: () => {
                navigator.clipboard.writeText(window.location.href)
              }
            }
          ]
        }}
      />

      <a
        href={`https://www.google.com/maps?q=${workspace.address}`}
        target='_blank'
        rel='noopener noreferrer'
        className='text-sm md:text-base flex space-x-2 items-center hover:underline'>
        <Map size={20} color='#4b5563' />
        <p className='text-gray-600 hover:text-gray-800 text-md'>Open in maps</p>
      </a>
    </div>
  )
}

export default WorkspacePage