import React, { FC } from 'react'
import Hero from './Hero'
import Info from './Info'
import CuratedPicks from './CuratedPicks'
import ProductCarousel from './ProductCarousel'
import '../../styles/Home/Home.css'

interface HomeProps {
  windowWidth: number,
  allProducts: any,
}

const Home: FC<HomeProps> = ({ windowWidth, allProducts }) => {
  return (
    <div className='homeWrapper'>
      <div className='homeContent'>
        <Hero />
        <CuratedPicks />
        <Info />
        <ProductCarousel allProducts={allProducts} windowWidth={windowWidth} typeOfProduct='featured' />
      </div>
    </div>
  )
}

export default Home
