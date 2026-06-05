import React from 'react'
import Overview from '../../components/admindashboard/overview/Overview'
import OverviewChart from '../../components/admindashboard/overview/OverviewChart'

function Overviewpage() {
  return (
    <div className="min-h-screen bg-[#F5F7FB] lg:ml-[20px] pt-[90px] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1400px] mx-auto space-y-8 pb-8">
        <Overview />
        <OverviewChart />
      </div>
    </div>
  )
}

export default Overviewpage
