import React from 'react'
import { Carousel } from 'react-carousel-minimal';
import Sidecard, { MobileSidecard } from './sidecard';
import WorkspaceTypes from './workspace_types';
import Amenities from './amenities';
import { isMobile } from 'react-device-detect';

const Content = ({ workspace }) => {
  const carouselImages = workspace.images.map((url) => { return { image: url } })

  return (
    <>
      <div className={`mt-8 flex${isMobile ? '-col' : ''} justify-between`}>
        <div style={{ width: isMobile ? '100%' : '70%' }}>
          <Carousel
            data={carouselImages}
            automatic={false}
            thumbnails={false}
            width="100%"
            height="450px"
            radius="15px"
            slideNumber={true}
            dots={true}
            slideBackgroundColor="white"
            slideImageFit="cover"
          />
        </div>
        {!isMobile && <Sidecard workspace={workspace} />}
      </div>
      {isMobile && <MobileSidecard workspace={workspace} />}
      <WorkspaceTypes />
      <Amenities amenities={workspace.amenities} />
    </>
  )
}

export default Content