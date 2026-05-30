import React from 'react'
import AboutHeader from '../../components/userscomponents/aboutsection/aboutheader/AboutHeader.jsx'
import OurMission from '../../components/userscomponents/aboutsection/ourmission/OurMission.jsx'
import HowsystemWork from '../../components/userscomponents/aboutsection/howsystemwork/HowsystemWork.jsx'
import MyTeam from '../../components/userscomponents/aboutsection/myteam/Myteam.jsx'
function AboutPage() {
  return (
    <div className='overflow-hidden'>
      <AboutHeader/>
      <OurMission/>
      <HowsystemWork/>
      <MyTeam/>
    </div>
  )
}

export default AboutPage
