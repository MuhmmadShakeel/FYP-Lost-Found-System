import React from 'react'
import ServicesHeader from '../../components/userscomponents/servicessection/servicesheader/ServicesHeader'
import OurServices from '../../components/userscomponents/servicessection/OurServices/OurServices'
import FastServices from '../../components/userscomponents/servicessection/fastservices/FastServices'

function ServicesPage() {
  return (
    <div className='overflow-hidden'>
      <ServicesHeader/>
      <OurServices/>
            <FastServices/>

    </div>
  )
}

export default ServicesPage
