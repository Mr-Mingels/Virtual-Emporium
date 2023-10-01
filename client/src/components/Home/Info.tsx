import React from 'react'
import '../../styles/Home/Info.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast, faDolly, faFaceSmileBeam, faDollarSign } from '@fortawesome/free-solid-svg-icons'

const Info = () => {
    return (
        <section className='infoWrapper'>
            <div className='infoContent'>
                <div className='infoSectionHeadingWrapper'>
                    <h2 className='infoSectionHeadingPrimaryTxt'>We provide the best customer experience</h2>
                    <span className='infoSectionHeadingSecondaryTxt'>We ensure our customers have the best shopping experience</span>
                </div>
                <div className='infoBenefitsWrapper'>
                    <div className='benefitsContainer'>
                        <div className='benefitIconWrapper'>
                            <FontAwesomeIcon icon={faDollarSign} className='benefitIcon' />
                        </div>
                        <h4 className='benefitTitle'>Original Products</h4>
                        <p className='benefitDescription'>Enjoy genuine products or your money back</p>
                    </div>
                    <div className='benefitsContainer'>
                        <div className='benefitIconWrapper'>
                            <FontAwesomeIcon icon={faFaceSmileBeam} className='benefitIcon' />
                        </div>
                        <h4 className='benefitTitle'>Satisfaction Guarentee</h4>
                        <p className='benefitDescription'>Exchange or return the product you've purchased if it doesn't fit you</p>
                    </div>
                    <div className='benefitsContainer'>
                        <div className='benefitIconWrapper'>
                            <FontAwesomeIcon icon={faDolly} className='benefitIcon' />
                        </div>
                        <h4 className='benefitTitle'>New Arrivals Everyday</h4>
                        <p className='benefitDescription'>We update our collections almost everyday</p>
                    </div>
                    <div className='benefitsContainer'>
                        <div className='benefitIconWrapper'>
                            <FontAwesomeIcon icon={faTruckFast} className='benefitIcon' />
                        </div>
                        <h4 className='benefitTitle'>Fast & Free Shipping</h4>
                        <p className='benefitDescription'>We offer fast and free shipping for all of our customers</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Info
