import React, { FC, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faMinus, faPlus, faHeart, faCheck } from '@fortawesome/free-solid-svg-icons'
import '../../styles/Product/Product.css'
import ProductCarousel from '../Home/ProductCarousel'
import RemoveWishListItemModal from '../RemoveWishListItemModal'
import axios from 'axios'

interface ProductProps {
  windowWidth: number,
  allProducts: any,
  product: any,
  setShoppingCart: Function,
  shoppingCart: any,
  wishList: any,
  handleAuthenticationOpen: Function,
  isLoggedIn: boolean,
  userInfo: any,
  getUserWishListInfo: Function
}

const Product: FC<ProductProps> = ({ windowWidth, allProducts, product, handleAuthenticationOpen, isLoggedIn, userInfo, wishList,
  getUserWishListInfo }) => {
  const [category, setCategory] = useState('')
  const [relatedProducts, setRelatedProducts] = useState([])
  const roundedNum = Math.round(product.rating.rate)
  const productColorOptions = ["white", "black", "gray", "blue", "yellow", "navy", "red", "purple"]
  const [chosenColor, setChosenColor] = useState('white')
  const [colorHoverIndex, setColorHoverIndex] = useState<number | null>(null)
  const productSizeOptions = ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
  const [chosenSize, setChosenSize] = useState('S')
  const [sizeHoverIndex, setSizeHoverIndex] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [overViewOpen, setOverViewOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [addToCartLoader, setAddToCartLoader] = useState(false)
  const [loader, setLoader] = useState(true)
  const [addToWishListLoader, setAddToWishListLoader] = useState(false)
  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const location = useLocation();
  if (loader) {
    document.body.style.overflowY = 'hidden';
  }

  useEffect(() => {
    if (product.category === "men's clothing") {
      setCategory("Men")
      setRelatedProducts(allProducts.filter((allProduct: any) => allProduct.title !== product.title
        && allProduct.category.toLowerCase().includes("men") && allProduct.category !== "electronics").slice(0, 6))
    } else if (product.category === "women's clothing") {
      setCategory("Women")
      setRelatedProducts(allProducts.filter((allProduct: any) => allProduct.title !== product.title).sort((a: any, b: any) => {
        if (a.category === "women's clothing" && b.category !== "women's clothing") {
          return -1;
        } else if (a.category !== "women's clothing" && b.category === "women's clothing") {
          return 1;
        } else {
          return 0;
        }
      }).slice(0, 6))
    } else if (product.category === "jewelery") {
      setCategory("Jewelery")
      setRelatedProducts(allProducts.filter((allProduct: any) => allProduct.title !== product.title).sort((a: any, b: any) => {
        if (a.category === "jewelery" && b.category !== "jewelery") {
          return -1;
        } else if (a.category !== "jewelery" && b.category === "jewelery") {
          return 1;
        } else {
          return 0;
        }
      }).slice(0, 6))
    }
  }, [allProducts, product])

  useEffect(() => {
    setChosenColor('white')
    setChosenSize('S')
    setQuantity(1)
  }, [location.pathname])

  const addToProductQuantity = () => {
    if (quantity >= 10) return
    setQuantity(quantity + 1)
  }

  const subtractFromProductQuantity = () => {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      handleAuthenticationOpen()
      return
    }
    setAddToCartLoader(true)
    try {
      const newProduct = {
        ...product,
        userID: userInfo._id,
        color: chosenColor,
        size: chosenSize,
        productQuantity: quantity,
      };
      const response = await axios.post('/add-product-to-cart', newProduct, { withCredentials: true })
      if (response.status === 200) {
        setAddedToCart(true);
        setTimeout(() => {
          setAddedToCart(false);
        }, 2000);
      }
      setAddToCartLoader(false)
      setQuantity(1)
    } catch (err) {
      console.log(err)
      setAddToCartLoader(false)
    }
  };

  const handleAddToWishList = async () => {
    if (!isLoggedIn) {
      handleAuthenticationOpen()
      return
    }
    setAddToWishListLoader(true)
    try {
      const newProduct = {
        ...product,
        userID: userInfo._id,
      };
      const response = await axios.post('/add-product-to-wishlist', newProduct, { withCredentials: true })
      if (response.status === 200) {
        await getUserWishListInfo()
      }
      setAddToWishListLoader(false)
    } catch (err) {
      console.log(err)
      setAddToWishListLoader(false)
    }
  }

  useEffect(() => {
    if (!loader) {
      document.body.style.overflowY = 'auto';
    }
  }, [loader])

  return (
    <section className='productWrapper'>
      {loader && (
        <div className='mainLoaderWrapper'>
          <span className="mainLoader"></span>
        </div>
      )}
      <div className='productContent'>
        <ol className='productBreadCrumbsWrapper'>
          <Link to='/' className='productBreadCrumbItem' onMouseDown={(e) => e.preventDefault()}>Home</Link>
          <span className='productBreadCrumbItemSeperator'>/</span>
          <Link to={`/shop/${category.toLowerCase()}`} className='productBreadCrumbItem'
            onMouseDown={(e) => e.preventDefault()}>{category}</Link>
          <span className='productBreadCrumbItemSeperator'>/</span>
          <li className='productBreadCrumbItem title'>{product.title}</li>
        </ol>
        <h2 className='productTitle'>{product.title}</h2>
        <div className='productRatingsWrapper'>
          <FontAwesomeIcon className={`productStarIcon ${roundedNum >= 1 ? 'fullStar' : 'emptyStar'}`}
            icon={faStar} />
          <FontAwesomeIcon className={`productStarIcon ${roundedNum >= 2 ? 'fullStar' : 'emptyStar'}`}
            icon={faStar} />
          <FontAwesomeIcon className={`productStarIcon ${roundedNum >= 3 ? 'fullStar' : 'emptyStar'}`}
            icon={faStar} />
          <FontAwesomeIcon className={`productStarIcon ${roundedNum >= 4 ? 'fullStar' : 'emptyStar'}`}
            icon={faStar} />
          <FontAwesomeIcon className={`productStarIcon ${roundedNum >= 5 ? 'fullStar' : 'emptyStar'}`}
            icon={faStar} />
          <span className='productRatingCount'>({product.rating.count} reviews)</span>
        </div>
        <div className='productMainContentWrapper'>
          <img src={product.image} onLoad={() => setLoader(false)} className='productImg' alt='product'
            onMouseDown={(e) => e.preventDefault()} />
          <div className='productOptionsWrapper'>
            <div className='productColorOptionsWrapper'>
              <label className='productColorTxt'>Color: {chosenColor.toUpperCase()}</label>
              <div className='productColorsWrapper'>
                {productColorOptions.map((color, index) => (
                  <div className={`productColorBoxWrapper ${color === chosenColor ? 'chosen' : ''} 
                  ${colorHoverIndex === index ? 'mouseOver' : ''}`} key={index}>
                    <span className={`productColorBox ${color}`} onClick={() => setChosenColor(color)}
                      onMouseEnter={() => setColorHoverIndex(index)} onMouseLeave={() => setColorHoverIndex(null)}></span>
                  </div>
                ))}
              </div>
            </div>
            <div className='productSizesOptionsWrapper'>
              <label className='productSizeTxt'>Size: {chosenSize !== '' ? category.toUpperCase() : ''} {chosenSize}</label>
              <div className='productSizesWrapper'>
                {productSizeOptions.map((size, index) => (
                  <div className={`productSizeBoxWrapper ${chosenSize === size ? 'chosen' : ''} 
                    ${sizeHoverIndex === index ? 'mouseOver' : ''}`} key={index}>
                    <span className={`productSizeBox ${chosenSize === size ? 'chosen' : ''}`} onClick={() => setChosenSize(size)}
                      onMouseEnter={() => setSizeHoverIndex(index)} onMouseLeave={() => setSizeHoverIndex(null)}>{size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='productControlOptionsWrapper'>
              <span className='productPrice'>${product.price}</span>
              <label className='productQuantityLabel'>Quantity</label>
              <div className='productAddQuantityWrapper'>
                <div className='productMinusIconWrapper' onClick={() => subtractFromProductQuantity()}>
                  <FontAwesomeIcon icon={faMinus} className='productMinusIcon' />
                </div>
                <input className='productQuantityInput' readOnly value={quantity} />
                <div className='productPlusIconWrapper' onClick={() => addToProductQuantity()}>
                  <FontAwesomeIcon icon={faPlus} className='productPlusIcon' />
                </div>
              </div>
              <div className='productAddBtnsWrapper'>
                {addToCartLoader ? (
                  <button type='button' className='productAddCartBtn addCartLoader'><span className='btnLoader'></span></button>
                ) : (
                  <>
                    {addedToCart ? (
                      <button className='productAddCartBtn added'>ADDED <FontAwesomeIcon icon={faCheck} className='productAddCartBtnIcon'
                        type='button' /></button>
                    ) : (
                      <button type='button' className='productAddCartBtn' onClick={() => handleAddToCart()}>ADD TO CART</button>
                    )}
                  </>
                )}
                {addToWishListLoader ? (
                  <button className='productAddToWishListBtn loading'>
                    <span className='btnLoader'></span>
                  </button>
                ) : (
                  wishList.find((productInWishList: any) => productInWishList.id === product.id) ? (
                    <>
                      <button className='productAddToWishListBtn inWishList' onClick={() => {
                        setRemoveModalOpen(true)
                        document.body.style.overflowY = 'hidden';
                      }}>
                        <FontAwesomeIcon icon={faHeart} className='productHeartIcon' />
                      </button>
                      {removeModalOpen && (
                        <RemoveWishListItemModal setRemoveModalOpen={setRemoveModalOpen} product={product}
                          getUserWishListInfo={getUserWishListInfo} wishList={wishList} />
                      )}
                    </>
                  ) : (
                    <button className='productAddToWishListBtn' onClick={() => handleAddToWishList()}>
                      <FontAwesomeIcon icon={faHeart} className='productHeartIcon' />
                    </button>
                  )
                )}

              </div>
            </div>
          </div>
        </div>
        <div className='productDescriptionWrapper'>
          <h2 className='productDescriptionTitle'>Description</h2>
          <div className='productOverViewWrapper'>
            <button className='productOverViewAccordionLabel' onClick={overViewOpen ? () => setOverViewOpen(false) :
              () => setOverViewOpen(true)}>
              <span className='overViewTxt'>Overview</span>
              {overViewOpen ? (
                <FontAwesomeIcon className='productOverViewIcon' icon={faMinus} />
              ) : (
                <FontAwesomeIcon className='productOverViewIcon' icon={faPlus} />
              )}
            </button>
            {overViewOpen && (
              <p className='productDescriptionTxt'>{product.description}</p>
            )}
          </div>
        </div>
        <ProductCarousel allProducts={relatedProducts} windowWidth={windowWidth} typeOfProduct='related' />
      </div>
    </section>
  )
}

export default Product