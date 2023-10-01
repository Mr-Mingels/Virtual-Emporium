import React, { FC, useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faStar } from '@fortawesome/free-solid-svg-icons'
import DropDownMenu from './DropDownMenu';
import '../../styles/Shop/Shop.css'

interface ShopProps {
    windowWidth: number,
    allProducts: any,
}

const Shop: FC<ShopProps> = ({ windowWidth, allProducts }) => {
    const [isItASearchQuery, setIsItASearchQuery] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchedProducts, setSearchedProducts] = useState([])
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState([]);
    const [imgBounds, setImgBounds] = useState<DOMRect | null>(null);
    const [toggleUseEffectHook, setToggleUseEffectHook] = useState(false)
    const [sortByFilterOpen, setSortByFilterOpen] = useState(false)
    const [sortByFilterOption, setSortByFilterOption] = useState('')
    const [categoryFilterOpen, setCategoryFilterOpen] = useState(false)
    const [categoryFilterOption, setCategoryFilterOption] = useState('All')
    const [priceFilterOpen, setPriceFilterOpen] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [reviewCountFilterOpen, setReviewCountFilterOpen] = useState(false)
    const [minRevCount, setMinRevCount] = useState(0)
    const [maxRevCount, setMaxRevCount] = useState(1000)
    const [productLoader, setProductLoader] = useState(false)
    const [loader, setLoader] = useState(true)
    if (loader) {
        document.body.style.overflowY = 'hidden';
    }
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    const imgRef = useRef<HTMLImageElement>(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (!allProducts || allProducts.length === 0) {
            setLoader(false)
            return
        }
        setProductLoader(true)
        setIsItASearchQuery(false)
        setSearchQuery('')
        setSortByFilterOption('')
        setSortByFilterOpen(false)
        setCategoryFilterOpen(false)
        setPriceFilterOpen(false)
        setReviewCountFilterOpen(false)
        setCategoryFilterOption('All')
        setMinPrice(0)
        setMaxPrice(1000)
        setMinRevCount(0)
        setMaxRevCount(1000)
        if (location.pathname === '/shop/all-products') {
            setCategory('All Products')
            setProducts(allProducts.filter((product: any) => product.category !== "electronics"))
        } else if (location.pathname === '/shop/best-sellers') {
            setCategory('Best Sellers')
            handleSortByFilter('Top Rated', allProducts.filter((product: any) => product.category !== "electronics"))
        } else if (location.pathname === '/shop/men') {
            setCategory('Men')
            setProducts(allProducts.filter((product: any) => product.category === "men's clothing"))
            setCategoryFilterOption("men's clothing")
        } else if (location.pathname === '/shop/women') {
            setCategory('Women')
            setProducts(allProducts.filter((product: any) => product.category === "women's clothing"))
            setCategoryFilterOption("women's clothing")
        } else if (location.pathname === '/shop/jewelery') {
            setCategory('Jewelery')
            setProducts(allProducts.filter((product: any) => product.category === "jewelery"))
            setCategoryFilterOption("jewelery")
        } else if (location.pathname === '/shop/search') {
            setIsItASearchQuery(true)
            if (q) {
                setSearchQuery(q)
                setSearchedProducts(
                    allProducts.filter((product: any) => {
                        return (
                            ((product.category !== "electronics" && product.title.toLowerCase().includes(q.toLowerCase())) ||
                                (product.category !== "electronics" && product.category.toLowerCase().includes(q.toLowerCase())))
                        );
                    })
                )
                setProducts(
                    allProducts.filter((product: any) => {
                        return (
                            ((product.category !== "electronics" && product.title.toLowerCase().includes(q.toLowerCase())) ||
                                (product.category !== "electronics" && product.category.toLowerCase().includes(q.toLowerCase())))
                        );
                    })
                )
            }
        }
        setProductLoader(false)
    }, [location.pathname, q, allProducts])

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
    }, [imgRef, windowWidth, toggleUseEffectHook, products]);

    const handleSortByFilter = (filterOption: string, products: any) => {
        setSortByFilterOpen(false)
        if (filterOption === 'Top Rated') {
            setProducts(products.sort((a: any, b: any) => b.rating.rate - a.rating.rate))
            setSortByFilterOption('Top Rated')
        } else if (filterOption === 'Low to high') {
            setProducts(products.sort((a: any, b: any) => a.price - b.price))
            setSortByFilterOption('Low to high')
        } else if (filterOption === 'High to low') {
            setProducts(products.sort((a: any, b: any) => b.price - a.price))
            setSortByFilterOption('High to low')
        }
    }

    const Filter = (category: string, minPrice: number, maxPrice: number, minRevCount: number, maxRevCount: number) => {
        setProductLoader(true)
        setCategoryFilterOpen(false);
        setPriceFilterOpen(false)
        setReviewCountFilterOpen(false)
        setCategoryFilterOption(category)
        setMinPrice(minPrice)
        setMaxPrice(maxPrice)
        setMinRevCount(minRevCount)
        setMaxRevCount(maxRevCount)

        let filteredProducts: any = []

        if (!isItASearchQuery) {
            filteredProducts = allProducts.filter((product: any) => (category === 'All' ? product.category !== 'electronics' :
                product.category === category) && (minPrice === 0 && maxPrice === 1000 ? product.price > 0 :
                    product.price >= minPrice && product.price <= maxPrice) && (minRevCount === 0 && maxRevCount === 1000 ? product.rating.count > 0 :
                        product.rating.count >= minRevCount && product.rating.count <= maxRevCount))
        } else {
            filteredProducts = searchedProducts.filter((product: any) => (category === 'All' ? product.category !== 'electronics' :
                product.category === category) && (minPrice === 0 && maxPrice === 1000 ? product.price > 0 :
                    product.price >= minPrice && product.price <= maxPrice) && (minRevCount === 0 && maxRevCount === 1000 ? product.rating.count > 0 :
                        product.rating.count >= minRevCount && product.rating.count <= maxRevCount))
        }

        if (sortByFilterOption) {
            handleSortByFilter(sortByFilterOption, filteredProducts);
        } else {
            setProducts(filteredProducts)
        }
        setProductLoader(false)
    }

    const handleProductNavigation = (productId: number) => {
        navigate(`/product/${productId}`)
    }

    useEffect(() => {
        if (!loader) {
            document.body.style.overflowY = 'auto';
        }
    }, [loader])

    return (
        <section className='shopWrapper'>
            {loader && (
                <div className='mainLoaderWrapper'>
                    <span className="mainLoader"></span>
                </div>
            )}
            <div className='shopContent'>
                <ol className='shopBreadCrumbsWrapper'>
                    <Link to='/' className='shopBreadCrumbItem'>Home</Link>
                    <span className='shopBreadCrumbItemSeperator'>/</span>
                    {isItASearchQuery ? (
                        <li className='shopBreadCrumbItem searchResults'>Search results for {searchQuery}</li>
                    ) : (
                        <li className='shopBreadCrumbItem'>{category}</li>
                    )}
                </ol>
                {isItASearchQuery ? (
                    <h2 className='shopCategoryTxt'>Search</h2>
                ) : (
                    <h2 className='shopCategoryTxt'>{category}</h2>
                )}
                <div className='resultsHeaderWrapper'>
                    <span className='resultsTxt'>Results: {products.length} items</span>
                    <div className='filterBtnWrapper sort-by'>
                        <button className='filterBtn sort-by'
                            onClick={sortByFilterOpen ? () => setSortByFilterOpen(false) : () => {
                                setSortByFilterOpen(true);
                                setCategoryFilterOpen(false); setPriceFilterOpen(false); setReviewCountFilterOpen(false)
                            }}>
                            Sort by
                            {sortByFilterOpen ? (
                                <FontAwesomeIcon icon={faAngleUp} className='filterIcon' />
                            ) : (
                                <FontAwesomeIcon icon={faAngleDown} className='filterIcon' />
                            )}</button>
                        {sortByFilterOpen && (
                            <DropDownMenu typeOfFilter='Sort By' handleSortByFilter={handleSortByFilter}
                                categoryFilterOption={categoryFilterOption} products={products} sortByFilterOption={sortByFilterOption}
                                setCategoryFilterOpen={setCategoryFilterOpen} setPriceFilterOpen={setPriceFilterOpen}
                                Filter={Filter} minPrice={minPrice} maxPrice={maxPrice} minRevCount={minRevCount} maxRevCount={maxRevCount}
                                setReviewCountFilterOpen={setReviewCountFilterOpen} />
                        )}
                    </div>
                </div>
                <div className='filterOptionsWrapper'>
                    <span className='filterTxt'>Filter:</span>
                    {(category === 'All Products' || category === 'Best Sellers' || isItASearchQuery) && (
                        <button className='filterBtn'
                            onClick={categoryFilterOpen ? () => setCategoryFilterOpen(false) : () => {
                                setCategoryFilterOpen(true);
                                setSortByFilterOpen(false); setPriceFilterOpen(false); setReviewCountFilterOpen(false)
                            }}>Category
                            {categoryFilterOpen ? (
                                <FontAwesomeIcon icon={faAngleUp} className='filterIcon' />
                            ) : (
                                <FontAwesomeIcon icon={faAngleDown} className='filterIcon' />
                            )}
                        </button>
                    )}
                    {categoryFilterOpen && (
                        <DropDownMenu typeOfFilter='Category' handleSortByFilter={handleSortByFilter}
                            sortByFilterOption={sortByFilterOption} categoryFilterOption={categoryFilterOption} products={products}
                            setCategoryFilterOpen={setCategoryFilterOpen} setPriceFilterOpen={setPriceFilterOpen}
                            Filter={Filter} minPrice={minPrice} maxPrice={maxPrice} minRevCount={minRevCount} maxRevCount={maxRevCount}
                            setReviewCountFilterOpen={setReviewCountFilterOpen} />
                    )}
                    <button className='filterBtn'
                        onClick={priceFilterOpen ? () => setPriceFilterOpen(false) : () => {
                            setPriceFilterOpen(true);
                            setSortByFilterOpen(false); setCategoryFilterOpen(false); setReviewCountFilterOpen(false)
                        }}>Price
                        {priceFilterOpen ? (
                            <FontAwesomeIcon icon={faAngleUp} className='filterIcon' />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} className='filterIcon' />
                        )}</button>
                    {priceFilterOpen && (
                        <DropDownMenu typeOfFilter='Price' handleSortByFilter={handleSortByFilter}
                            sortByFilterOption={sortByFilterOption} categoryFilterOption={categoryFilterOption} products={products}
                            setCategoryFilterOpen={setCategoryFilterOpen} setPriceFilterOpen={setPriceFilterOpen}
                            Filter={Filter} minPrice={minPrice} maxPrice={maxPrice} minRevCount={minRevCount} maxRevCount={maxRevCount}
                            setReviewCountFilterOpen={setReviewCountFilterOpen} />
                    )}
                    <button className='filterBtn' onClick={reviewCountFilterOpen ? () => setReviewCountFilterOpen(false) :
                        () => {
                            setReviewCountFilterOpen(true); setSortByFilterOpen(false); setCategoryFilterOpen(false);
                            setPriceFilterOpen(false)
                        }}>Review Count
                        {reviewCountFilterOpen ? (
                            <FontAwesomeIcon icon={faAngleUp} className='filterIcon' />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} className='filterIcon' />
                        )}</button>
                    {reviewCountFilterOpen && (
                        <DropDownMenu typeOfFilter='Review Count' handleSortByFilter={handleSortByFilter}
                            sortByFilterOption={sortByFilterOption} categoryFilterOption={categoryFilterOption} products={products}
                            setCategoryFilterOpen={setCategoryFilterOpen} setPriceFilterOpen={setPriceFilterOpen}
                            Filter={Filter} minPrice={minPrice} maxPrice={maxPrice} minRevCount={minRevCount} maxRevCount={maxRevCount}
                            setReviewCountFilterOpen={setReviewCountFilterOpen} />
                    )}
                </div>
                <div className='shopRenderedProductsWrapper'>
                    {products.length === 0 || productLoader ? (
                        <>
                            {productLoader ? (
                                <div className='shopProductLoaderWrapper'>
                                    <span className="loader"></span>
                                </div>
                            ) : (
                                <>
                                    {allProducts?.length !== 0 && allProducts !== null ? (
                                        <div className='shopNoResultsWrapper'>
                                            <h2 className='shopNoResultsTxt h2'>Sorry, we couldn't find any matches.</h2>
                                            <h3 className='shopNoResultsTxt h3'>Try a different search input or filter and try again!</h3>
                                        </div>
                                    ) : (
                                        <div className='noProductsErrorWrapper shop'>
                                            <h2 className='noProductsErrorTxt'>FAILED TO FETCH PRODUCTS</h2>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {products.map((product: any, index: number) => {

                                const roundedNum = Math.round(product.rating.rate)

                                return (
                                    <div className='shopProductWrapper' key={index}>
                                        <div className='shopProductContent' onClick={() => handleProductNavigation(product.id)}>
                                            <img ref={imgRef} src={product.image} style={{ height: imgBounds?.width }} alt='product'
                                                className='shopProductImg' onMouseDown={(e) => e.preventDefault()} onLoad={() => setLoader(false)} />
                                            <span className='shopProductCategoryTxt'>{product.category.toUpperCase()}</span>
                                            <h4 className='shopProductTitle'>{product.title}</h4>
                                            <span className='shopProductPrice'>${product.price}</span>
                                            <div className='shopRatingsWrapper'>
                                                <FontAwesomeIcon className={`shopProductIcon ${roundedNum >= 1 ? 'fullStar' : 'emptyStar'}`}
                                                    icon={faStar} />
                                                <FontAwesomeIcon className={`shopProductIcon ${roundedNum >= 2 ? 'fullStar' : 'emptyStar'}`}
                                                    icon={faStar} />
                                                <FontAwesomeIcon className={`shopProductIcon ${roundedNum >= 3 ? 'fullStar' : 'emptyStar'}`}
                                                    icon={faStar} />
                                                <FontAwesomeIcon className={`shopProductIcon ${roundedNum >= 4 ? 'fullStar' : 'emptyStar'}`}
                                                    icon={faStar} />
                                                <FontAwesomeIcon className={`shopProductIcon ${roundedNum >= 5 ? 'fullStar' : 'emptyStar'}`}
                                                    icon={faStar} />
                                                <span className='shopRatingCount'>({product.rating.count})</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>

                    )}
                </div>
            </div>
        </section>
    )
}

export default Shop