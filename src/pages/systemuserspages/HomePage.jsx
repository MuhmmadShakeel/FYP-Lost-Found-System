import React from 'react'
import HomeHeader from '../../components/userscomponents/homesection/home/HomeHeader'
import SystemInfo from '../../components/userscomponents/homesection/systeminfo/SystemInfo'
import OurProgress from '../../components/userscomponents/homesection/visionmission/OurProgress'
import OurTestimonials from '../../components/userscomponents/homesection/ourtestimnials/Ourtestimonials'
import Systemservices from '../../components/userscomponents/homesection/systemservices/Systemservices'
import MobileApp from '../../components/userscomponents/homesection/mobileapp/MobileApp'
import Reviews from '../../components/userscomponents/homesection/reviews/Reviews'
import Faq from '../../components/userscomponents/homesection/faq/Faq'
function HomePage() {
  return (
    <div className='overflow-hidden'>
      <HomeHeader/>
      <SystemInfo/>
      <OurProgress/>
      <OurTestimonials/>
      <Systemservices/>
      <MobileApp/>
      <Reviews/>
      <Faq/>
    </div>
  )
}
export default HomePage
