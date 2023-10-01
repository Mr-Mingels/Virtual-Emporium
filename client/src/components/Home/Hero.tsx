import React, { useEffect, useState } from 'react'
import '../../styles/Home/Hero.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import heroImg1 from '../../assets/CarouselImgs/heroImg1.jpg'
import heroImg2 from '../../assets/CarouselImgs/heroImg2.jpg'
import heroImg3 from '../../assets/CarouselImgs/heroImg3.jpg'
import heroImg4 from '../../assets/CarouselImgs/heroImg4.jpg'

const Hero = () => {
    const [currIndex, setCurrIndex] = useState(0)
    const autoSlide = true; // Determines whether the auto slide effect for the carousel is active or not
    const autoSlideTimeInterval = 4000; // Determines the time interval for the autoslide effect
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    if (loader) {
        document.body.style.overflowY = 'hidden';
    }

    const slides = [
        heroImg1,
        heroImg2,
        heroImg3,
        heroImg4
    ]

    const handlePrevSlide = () => {
        setCurrIndex((currIndex) => (currIndex === 0 ? slides.length - 1 : currIndex - 1))
    }

    const handleNextSlide = () => {
        setCurrIndex((currIndex) => (currIndex === slides.length - 1 ? 0 : currIndex + 1))
    }

    const navigateToShop = () => {
        navigate('/shop/all-products')
    }

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(handleNextSlide, autoSlideTimeInterval)
        return () => clearInterval(slideInterval)
    }, [])

    useEffect(() => {
        if (!loader) {
            document.body.style.overflowY = 'auto';
        }
    }, [loader])

    return (
        <section className='carouselWrapper'>
            {loader && (
                <div className='mainLoaderWrapper'>
                    <span className="mainLoader"></span>
                </div>
            )}
            <div className='carouselSlides' style={{ transform: `translateX(-${currIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <img onLoad={() => setLoader(false)} className='heroSliderImg' key={index} src={slide} alt='hero slider images' loading="lazy" />
                ))}
            </div>
            <div className='carouselBtnsWrapper'>
                <div className='carouselBtn leftArrow' onClick={handlePrevSlide}>
                    <FontAwesomeIcon className='carouselIcon' icon={faAngleLeft} />
                </div>
                <div className='carouselBtn rightArrow' onClick={handleNextSlide}>
                    <FontAwesomeIcon className='carouselIcon' icon={faAngleRight} />
                </div>
            </div>
            <div className='carouselContentWrapper'>
                <div className='carouselContentTxtWrapper'>
                    <h1>Elevate your look with our best-selling collections</h1>
                </div>
                <button className='carouselContentBtn' onClick={navigateToShop}>Shop now <FontAwesomeIcon icon={faArrowRight} className='carouselContentIcon' /></button>

                <div className='carouselPaginationDotsWrapper'>
                    {slides.map((_: any, i: number) => (
                        <div key={i} className='paginationDot' style={{ backgroundColor: `${currIndex === i ? '#FFD700' : '#dadada'}` }}
                            onClick={() => setCurrIndex(i)} />
                    ))}
                </div>
            </div>
            <div className='carouselBackGroundColor'></div>
        </section>
    )
}

export default Hero
