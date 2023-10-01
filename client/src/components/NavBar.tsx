import React, { useState, useEffect, FC } from 'react'
import '../styles/NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartShopping, faStar, faMagnifyingGlass, faUser, faBars, faX, faHouse, faAngleRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faWolfPackBattalion } from '@fortawesome/free-brands-svg-icons'; // Example import from the brands style
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom';
import Authentication from './Authentication';


interface NavBarProps {
  windowWidth: number,
  allProducts: any,
  isLoggedIn: boolean,
  getUserInfo: Function,
  openAuthenticationModal: boolean,
  handleAuthenticationOpen: Function,
  handleAuthenticationClose: Function,
  userInfo: any,
  authNavigationOption: string,
  setAuthNavigationOption: Function,
  shoppingCart: any,
  wishList: any
}

const NavBar: FC<NavBarProps> = ({ windowWidth, allProducts, isLoggedIn, getUserInfo, openAuthenticationModal, handleAuthenticationOpen,
  handleAuthenticationClose, userInfo, authNavigationOption, setAuthNavigationOption, wishList, shoppingCart }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const navigateToHome = () => {
    navigate('/')
  }

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/shop/search?q=${searchQuery}`)
      setDrawerOpen(false)
      setSearchQuery('')
    } else {
      return;
    }
  }

  const handleProductNavigation = (productId: number) => {
    setSearchQuery('')
    navigate(`/product/${productId}`)
  }

  const handleExclusiveRoutesNavigation = (route: string) => {
    if (!isLoggedIn) {
      handleAuthenticationOpen()
      return
    }
    navigate(route)
  }

  useEffect(() => {
    if (!isLoggedIn && (location.pathname === '/cart' || location.pathname === '/wishlist')) {
      navigate('/')
      return
    }
    if (drawerOpen) {
      setDrawerOpen(false)
    }
  }, [location.pathname])

  useEffect(() => {
    if (openAuthenticationModal && drawerOpen) {
      setDrawerOpen(false)
    }
  }, [openAuthenticationModal])

  useEffect(() => {
    if (shoppingCart.length !== 0) {
      const itemQuantitys = shoppingCart.map((product: any) => product.productQuantity);
      setTotalItems(itemQuantitys.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue;
      }, 0))
    }
  }, [shoppingCart])

  return (
    <section className='navBarSection'>
      <div className='navBarHeaderWrapper'>
        <div className='navBarHeaderContent'>
          <ul className='navBarHeaderListWrapper'>
            <Link to='/shop/all-products' className='navBarHeaderItem' onMouseDown={e => e.preventDefault()}>All Products</Link>
            <Link to='/shop/best-sellers' className='navBarHeaderItem' onMouseDown={e => e.preventDefault()}>Best Sellers</Link>
            <Link to='/shop/men' className='navBarHeaderItem' onMouseDown={e => e.preventDefault()}>Men</Link>
            <Link to='/shop/women' className='navBarHeaderItem' onMouseDown={e => e.preventDefault()}>Women</Link>
            <Link to='/shop/jewelery' className='navBarHeaderItem' onMouseDown={e => e.preventDefault()}>Jewelery</Link>
          </ul>
        </div>
      </div>
      <div className='navBarWrapper'>
        <div className='navBarContent'>
          <div className='navBarFirstSectionWrapper'>
            <div className='navBarLogoIconWrapper' onClick={navigateToHome}>
              <FontAwesomeIcon icon={faWolfPackBattalion} className='navBarLogoIcon' />
            </div>
            <h2 className='navBarTitle'>Virtual Emporium</h2>
          </div>
          <div className='navBarSecondSectionWrapper'>
            <form className='navBarSearchInputWrapper' onSubmit={handleSearch}>
              <input className='navBarSearchInput' placeholder='Search product...' value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} type='text' />
              <div className='navBarSearchIconWrapper'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='navBarSearchIcon' />
              </div>
              {(allProducts && searchQuery) && (
                <div className='navBarRenderedProductSearchWrapper'>
                  {allProducts
                    .filter((product: any) =>
                      (product.category !== "electronics" &&
                        product.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      (product.category !== "electronics" &&
                        product.category.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map((product: any, index: number) => {

                      const roundedNum = Math.round(product.rating.rate)

                      return (
                        <div className='navBarProductWrapper' key={index} onClick={() => handleProductNavigation(product.id)}>
                          <img className='navBarProductImg' src={product.image} alt='product' onMouseDown={(e) => e.preventDefault()} />
                          <div className='navBarProductInfoWrapper'>
                            <span className='navBarProductCategoryTxt'>{product.category.toUpperCase()}</span>
                            <h3 className='navBarProductTitle'>{product.title}</h3>
                            <div className='navBarProductPriceAndRatingsWrapper'>
                              <span className='navBarProductPrice'>Price: ${product.price}</span>
                              <div className='navBarProductRatingWrapper'>
                                <FontAwesomeIcon className={`navBarProductIcon ${roundedNum >= 1 ? 'fullStar' : 'emptyStar'}`}
                                  icon={faStar} />
                                <FontAwesomeIcon className={`navBarProductIcon ${roundedNum >= 2 ? 'fullStar' : 'emptyStar'}`}
                                  icon={faStar} />
                                <FontAwesomeIcon className={`navBarProductIcon ${roundedNum >= 3 ? 'fullStar' : 'emptyStar'}`}
                                  icon={faStar} />
                                <FontAwesomeIcon className={`navBarProductIcon ${roundedNum >= 4 ? 'fullStar' : 'emptyStar'}`}
                                  icon={faStar} />
                                <FontAwesomeIcon className={`navBarProductIcon ${roundedNum >= 5 ? 'fullStar' : 'emptyStar'}`}
                                  icon={faStar} />
                                <span className='navBarRatingCount'>({product.rating.count})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </form>
            {windowWidth >= 800 ? (
              <ul className='navBarIconListWrapper'>
                <div className={`navBarIconWrapper ${wishList.length !== 0 ? 'badge' : ''}`} onClick={() => {
                  setAuthNavigationOption('/wishlist')
                  handleExclusiveRoutesNavigation('/wishlist')
                }}>
                  <FontAwesomeIcon icon={faHeart} className='navBarIcon' />
                </div>
                <div className={`navBarIconWrapper ${shoppingCart.length !== 0 ? 'badge' : ''}`} onClick={() => {
                  setAuthNavigationOption('/cart')
                  handleExclusiveRoutesNavigation('/cart')
                }}>
                  <FontAwesomeIcon icon={faShoppingCart} className='navBarIcon' />
                </div>
                <span className='navBarIconSeperator'></span>
                <FontAwesomeIcon icon={faUser} className='navBarIcon' onClick={() => {
                  setAuthNavigationOption('')
                  handleAuthenticationOpen()
                }} />
              </ul>
            ) : (
              <div className='navBarHamburgerMenuWrapper' onClick={() => handleDrawerOpen()}>
                <FontAwesomeIcon icon={faBars} className='navBarHamburgerMenuIcon' />
              </div>
            )}
            {windowWidth <= 800 && (
              <div className={`fullScreenWrapper ${drawerOpen ? 'open' : ''}`}>
                <div className={`navBarDrawerWrapper ${drawerOpen ? 'open' : ''}`}>
                  <div className='navBarDrawerContent'>
                    <div className='navBarDrawerCloseBtnWrapper' onClick={() => handleDrawerClose()}>
                      <FontAwesomeIcon icon={faX} className='navBarDrawerCloseIcon' />
                      <span className='navBarDrawerCloseTxt'>Close</span>
                    </div>
                    <ul className='navBarDrawerGeneralLinksListWrapper'>
                      <div className='navBarDrawerGeneralLinksWrapper' onClick={() => navigateToHome()}>
                        <FontAwesomeIcon icon={faHouse} className='navBarDrawerIcon' />
                        <span className='navBarDrawerGeneralLinkTxt'>Home</span>
                      </div>
                      <div className='navBarDrawerGeneralLinksWrapper' onClick={() => {
                        setAuthNavigationOption('')
                        handleAuthenticationOpen()
                      }}>
                        <FontAwesomeIcon icon={faUser} className='navBarDrawerIcon' />
                        <span className='navBarDrawerGeneralLinkTxt'>Log in or Register</span>
                      </div>
                      <div className='navBarDrawerGeneralLinksWrapper' onClick={() => {
                        setAuthNavigationOption('/wishlist')
                        handleExclusiveRoutesNavigation('/wishlist')
                      }}>
                        <FontAwesomeIcon icon={faHeart} className='navBarDrawerIcon' />
                        <span className='navBarDrawerGeneralLinkTxt'>Wishlist</span>
                        <span className='navBarDrawerBadge'>{wishList.length}</span>
                      </div>
                      <div className='navBarDrawerGeneralLinksWrapper' onClick={() => {
                        setAuthNavigationOption('/cart')
                        handleExclusiveRoutesNavigation('/cart')
                      }}>
                        <FontAwesomeIcon icon={faCartShopping} className='navBarDrawerIcon' />
                        <span className='navBarDrawerGeneralLinkTxt'>Cart</span>
                        <span className='navBarDrawerBadge'>{totalItems}</span>
                      </div>
                    </ul>
                    <ul className='navBarDrawerCategoryListWrapper'>
                      <Link to='/shop/all-products' className='navBarDrawerCategory'>ALL PRODUCTS<FontAwesomeIcon icon={faAngleRight}
                        className='navBarDrawerCategoryIcon' onMouseDown={e => e.preventDefault()} /></Link>
                      <Link to='/shop/best-sellers' className='navBarDrawerCategory'>BEST SELLERS<FontAwesomeIcon icon={faAngleRight}
                        className='navBarDrawerCategoryIcon' onMouseDown={e => e.preventDefault()} /></Link>
                      <Link to='/shop/women' className='navBarDrawerCategory'>WOMEN<FontAwesomeIcon icon={faAngleRight}
                        className='navBarDrawerCategoryIcon' onMouseDown={e => e.preventDefault()} /></Link>
                      <Link to='/shop/men' className='navBarDrawerCategory'>MEN<FontAwesomeIcon icon={faAngleRight}
                        className='navBarDrawerCategoryIcon' onMouseDown={e => e.preventDefault()} /></Link>
                      <Link to='/shop/jewelery' className='navBarDrawerCategory'>JEWELERY<FontAwesomeIcon icon={faAngleRight}
                        className='navBarDrawerCategoryIcon' onMouseDown={e => e.preventDefault()} /></Link>
                    </ul>
                    {windowWidth <= 500 && (
                      <form className='navBarSearchInputWrapper drawer' onSubmit={handleSearch}>
                        <input className='navBarSearchInput drawer' placeholder='Search product...' value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)} />
                        <div className='navBarSearchIconWrapper drawer'>
                          <FontAwesomeIcon icon={faMagnifyingGlass} className='navBarSearchIcon drawer' />
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openAuthenticationModal && (
        <Authentication handleAuthenticationClose={handleAuthenticationClose} isLoggedIn={isLoggedIn} getUserInfo={getUserInfo}
          userInfo={userInfo} authNavigationOption={authNavigationOption} />
      )}
    </section>
  )
}

export default NavBar
