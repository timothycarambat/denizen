import React from 'react'
import MainLayout from '../../Layouts/Main';
import CTASection from './cta';
import NeighboorhoodSearch from './neighboorhoodSearch';
import ActiveWorkspaces from './featured_workspaces';
import HostCta from './host_cta';
import { withRouter } from "react-router";

const LandingPage = () => {
  return (
    <MainLayout>
      <div className='mb-10'>
        <CTASection />
        <NeighboorhoodSearch />
        <ActiveWorkspaces />
        <HostCta />
      </div>
    </MainLayout>
  )
}

export default withRouter(LandingPage)