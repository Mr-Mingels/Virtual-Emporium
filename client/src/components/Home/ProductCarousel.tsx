import React, { useState, useEffect, FC, useRef } from 'react'
import '../../styles/Home/ProductCarousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faStar, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

interface FeaturedProductsProps {
    allProducts: any,
    windowWidth: number,
    typeOfProduct: string
}

const ProductCarousel: FC<FeaturedProductsProps> = ({ allProducts, windowWidth, typeOfProduct }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [carouselProducts, setCarouselProducts]: any = useState([]);
    const [imgBounds, setImgBounds] = useState<DOMRect | null>(null);
    const [currIndex, setCurrIndex] = useState(0)
    const [carouselProductsSliderLength, setCarouselProductsSliderLength] = useState(2)
    const [paginationBarLength, setPaginationBarLength] = useState([1, 2])
    const [toggleUseEffectHook, setToggleUseEffectHook] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!allProducts) return
        if (typeOfProduct === 'featured') {
            setCarouselProducts(allProducts.filter((product: any) => product.category !== "electronics").sort((a: any, b: any) => b.rating.rate - a.rating.rate).slice(0, 6))
        } else if (typeOfProduct === "related") {
            setCarouselProducts(allProducts)
        }
    }, [allProducts, typeOfProduct])

    useEffect(() => {
        if (imgRef.current) {
            const bounds = imgRef.current.getBoundingClientRect();
            setImgBounds(bounds);
            if (bounds.height !== bounds.width) {
                if (toggleUseEffectHook) {
                    setToggleUseEffectHook(false)
                } else {
                    setToggleUseEffectHook(true)
                }
            }
        }
        if (windowWidth <= 611) {
            setCurrIndex(0)
            setCarouselProductsSliderLength(6)
            setPaginationBarLength([1, 2, 3, 4, 5, 6])
        } else if (windowWidth <= 1032) {
            setCurrIndex(0)
            setCarouselProductsSliderLength(3)
            setPaginationBarLength([1, 2, 3])
        } else {
            setCurrIndex(0)
            setCarouselProductsSliderLength(2)
            setPaginationBarLength([1, 2])
        }
    }, [imgRef, carouselProducts, windowWidth, toggleUseEffectHook]);

    const handlePrevSlide = () => {
        setCurrIndex((currIndex) => (currIndex === 0 ? carouselProductsSliderLength - 1 : currIndex - 1))
    }

    const handleNextSlide = () => {
        setCurrIndex((currIndex) => (currIndex === carouselProductsSliderLength - 1 ? 0 : currIndex + 1))
    }

    const handleProductNavigation = (productId: number) => {
        navigate(`/product/${productId}`)
    }

    return (
        <section className={`carouselProductsWrapper ${typeOfProduct === 'related' ? 'related' : ''}`}>
            <div className='carouselProductsContent'>
                <div className='carouselProductsHeadingWrapper'>
                    <h2 className={`carouselProductsHeadingTitle ${typeOfProduct === 'related' ? 'related' : ''}`}>
                        {typeOfProduct === 'featured' ? 'Featured Products' : ''}
                        {typeOfProduct === 'related' ? 'Related Products' : ''}</h2>
                    {carouselProducts.length !== 0 && (
                        <div className='carouselProductsHeadingBtnsWrapper'>
                            <div className='carouselProductsHeadingBtn leftArrow' onClick={handlePrevSlide}>
                                <FontAwesomeIcon className='carouselProductsHeadingIcon' icon={faAngleLeft} />
                            </div>
                            <div className='carouselProductsHeadingBtn rightArrow' onClick={handleNextSlide}>
                                <FontAwesomeIcon className='carouselProductsHeadingIcon' icon={faAngleRight} />
                            </div>
                        </div>
                    )}
                </div>
                {carouselProducts.length !== 0 ? (
                    <div className='renderedCarouselProductsWrapper'>
                        <div className='renderedCarouselProducts' style={{ transform: `translateX(-${currIndex * 100}%)` }}>
                            {carouselProducts?.map((product: any, index: any) => (
                                <div className='carouselProductContainer' key={index} onClick={() => handleProductNavigation(product.id)}>
                                    <img ref={imgRef} className='carouselProductImg' alt='carousel product' src={product.image}
                                        style={{ height: imgBounds?.width }} onMouseDown={e => e.preventDefault()} />
                                    <span className='carouselProductRating'><FontAwesomeIcon icon={faStar} className='carouselProductRatingIcon' />
                                        {product.rating.rate}</span>
                                    <div className='carouselProductInfoWrapper'>
                                        <div className='carouselProductLabelWrapper'>
                                            <h6 className='carouselProductTitle'>{product.title}</h6>
                                            <span className='carouselProductPrice'>${product.price}</span>
                                        </div>
                                        <div className='carouselProductShoppingCartWrapper'>
                                            <FontAwesomeIcon icon={faCartPlus} className='carouselProductShoppingCart' />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='noProductsErrorWrapper'>
                        <h2 className='noProductsErrorTxt'>FAILED TO FETCH PRODUCTS</h2>
                    </div>
                )}
                {carouselProducts.length !== 0 && (
                    <div className='carouselProductsPaginationBarWrapper'>
                        <div className='carouselProductsPaginationBarContent'>
                            <div className='paginationBarWrapper'>
                                {paginationBarLength.map((_, i) => (
                                    <div key={i} className='paginationBar' style={{
                                        backgroundColor: `${currIndex === i ? '#FFD700' : '#1b1b1b'}`,
                                        borderTopLeftRadius: `${i === 0 ? '5px' : '0px'}`,
                                        borderLeft: `${i === 0 ? 'none' : '1px solid #dadada'}`,
                                        borderBottomLeftRadius: `${i === 0 ? '5px' : '0px'}`,
                                        borderTopRightRadius: `${paginationBarLength.length - 1 === i ? '5px' : '0px'}`,
                                        borderBottomRightRadius: `${paginationBarLength.length - 1 === i ? '5px' : '0px'}`,
                                    }}
                                        onClick={() => setCurrIndex(i)} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductCarousel
