import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FetchProducts from './components/FetchProducts';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';

const NavBar = lazy(() => import('./components/NavBar'))
const Home = lazy(() => import('./components/Home/Home'))
const Shop = lazy(() => import('./components/Shop/Shop'))
const Product = lazy(() => import('./components/Product/Product'))
const ShoppingCart = lazy(() => import('./components/ShoppingCart/ShoppingCart'))
const WishList = lazy(() => import('./components/WishList/WishList'))
const Footer = lazy(() => import('./components/Footer'))
const NotFound = lazy(() => import('./components/NotFound'))

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState()
  // Initialize shoppingCart state with data from localStorage or an empty array
  const [shoppingCart, setShoppingCart] = useState([])
  const [wishList, setWishList] = useState([])
  const { allProducts }: any = FetchProducts()
  const categories = ['women', 'men', 'jewelery', 'best-sellers', 'all-products']
  const [defaultLoader, setDefaultLoader] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [openAuthenticationModal, setOpenAuthenticationModal] = useState(false)
  const [authNavigationOption, setAuthNavigationOption] = useState('')

  const getUserInfo = async () => {
    try {
      const response = await fetch("/user-info", { credentials: "include", });
      // check for user authentication
      if (response.status === 401) {
        setIsLoggedIn(false)
      } else {
        const userData = await response.json();
        setUserInfo(userData);
        setIsLoggedIn(true)
      }
    } catch (error: any) {
      console.log(error.message);
      console.log(error);
    }
  };

  const getUserCartInfo = async () => {
    if (!isLoggedIn) {
      setShoppingCart([])
      return
    }
    try {
      const response = await axios.get('/cart-products', { withCredentials: true, })
      if (response.status === 200) {
        const { cartProducts } = response.data;
        setShoppingCart(cartProducts)
      } else {
        setShoppingCart([])
      } 
    } catch (error: any) {
      console.log(error)
    }
  }

  const getUserWishListInfo = async () => {
    if (!isLoggedIn) {
      setWishList([])
      return
    }
    try {
      const response = await axios.get('/wishlist-items', { withCredentials: true, })
      if (response.status === 200) {
        const { wishListItems } = response.data;
        setWishList(wishListItems)
      } else {
        setWishList([])
      } 
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    getUserCartInfo()
    getUserWishListInfo()
  },[isLoggedIn])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    // Clear the existing timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (allProducts) {
      setDefaultLoader(false)
    } else {
      // Set a new timeout and store its reference
      timeoutRef.current = setTimeout(() => {
        setDefaultLoader(false);
      }, 5000);
    }

    // Cleanup the timeout reference when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [allProducts])

  const handleAuthenticationOpen = () => {
    setOpenAuthenticationModal(true)
    document.body.style.overflowY = 'hidden';
  }

  const handleAuthenticationClose = () => {
    setOpenAuthenticationModal(false)
    document.body.style.overflowY = 'auto';
  }

  if (defaultLoader) {
    return <div className='mainLoaderWrapper'><span className="mainLoader"></span></div>
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div className='mainLoaderWrapper'><span className="mainLoader"></span></div>}>
        <NavBar windowWidth={windowWidth} allProducts={allProducts} isLoggedIn={isLoggedIn} getUserInfo={getUserInfo}
          openAuthenticationModal={openAuthenticationModal} handleAuthenticationOpen={handleAuthenticationOpen}
          handleAuthenticationClose={handleAuthenticationClose} userInfo={userInfo} authNavigationOption={authNavigationOption} 
          setAuthNavigationOption={setAuthNavigationOption} shoppingCart={shoppingCart} wishList={wishList}/>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home windowWidth={windowWidth} allProducts={allProducts} />} />
          {categories.map((category, index) => (
            <Route key={index} path={`/shop/${category}`}
              element={<Shop windowWidth={windowWidth} allProducts={allProducts} />}
            />
          ))}
          {allProducts?.filter((product: any) => product.category !== "electronics").map((product: any, index: number) => (
            <Route key={index} path={`/product/${product.id}`}
              element={<Product windowWidth={windowWidth} allProducts={allProducts} product={product} setShoppingCart={setShoppingCart}
                shoppingCart={shoppingCart} wishList={wishList} handleAuthenticationOpen={handleAuthenticationOpen}
                isLoggedIn={isLoggedIn} userInfo={userInfo} getUserWishListInfo={getUserWishListInfo}/>}
            />
          ))}
          <Route path='/cart' element={<ShoppingCart windowWidth={windowWidth} isLoggedIn={isLoggedIn}
            shoppingCart={shoppingCart} userInfo={userInfo} getUserCartInfo={getUserCartInfo}/>} />
          <Route path='/wishlist' element={<WishList windowWidth={windowWidth} isLoggedIn={isLoggedIn}
            wishList={wishList} userInfo={userInfo} getUserWishListInfo={getUserWishListInfo}/>}/>
          <Route path='/shop/search' element={<Shop windowWidth={windowWidth} allProducts={allProducts} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;