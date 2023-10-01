import React, { FC } from 'react'
import '../../styles/Shop/DropDownMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons'

interface DropDownMenuProps {
    typeOfFilter: string
    handleSortByFilter: Function,
    sortByFilterOption: string,
    categoryFilterOption: string,
    products: any,
    setCategoryFilterOpen: any,
    setPriceFilterOpen: any,
    minPrice: number,
    maxPrice: number,
    setReviewCountFilterOpen: any,
    minRevCount: number,
    maxRevCount: number,
    Filter: Function,
}

const DropDownMenu: FC<DropDownMenuProps> = ({ typeOfFilter, handleSortByFilter, sortByFilterOption, categoryFilterOption,
    products, setCategoryFilterOpen, Filter, setPriceFilterOpen, minPrice, maxPrice, setReviewCountFilterOpen, minRevCount, maxRevCount }) => {

    return (
        <div className={`dropDownMenuWrapper ${typeOfFilter === 'Sort By' ? 'sort-by' : ''}`}>
            <div className={`dropDownMenuContent ${typeOfFilter === 'Sort By' ? 'sort-by' : ''}`}>
                {typeOfFilter !== 'Sort By' && (
                    <div className='dropDownMenuHeaderWrapper'>
                        <span className='dropDownMenuResultsTxt'>Results: {products.length} items</span>
                        <div className='dropDownMenuCloseWrapper' onClick={() => {
                            setCategoryFilterOpen(false); setPriceFilterOpen(false);
                            setReviewCountFilterOpen(false)
                        }}>
                            <FontAwesomeIcon icon={faClose} className='dropDownMenuCloseIcon' />
                            <span className='dropDownMenuCloseTxt'>Close</span>
                        </div>
                    </div>
                )}
                {typeOfFilter === 'Sort By' && (
                    <ul className='sortByOptionsWrapper'>
                        <li className={`sortByOption topRated ${sortByFilterOption === 'Top Rated' ? 'filterOn' : ''}`}
                            onClick={() => handleSortByFilter('Top Rated', products)}>Top Rated
                            {sortByFilterOption === 'Top Rated' ? <FontAwesomeIcon icon={faCheck} /> : null}</li>
                        <li className={`sortByOption ${sortByFilterOption === 'Low to high' ? 'filterOn' : ''}`}
                            onClick={() => handleSortByFilter('Low to high', products)}>Price: Low to high
                            {sortByFilterOption === 'Low to high' ? <FontAwesomeIcon icon={faCheck} /> : null}</li>
                        <li className={`sortByOption ${sortByFilterOption === 'High to low' ? 'filterOn' : ''}`}
                            onClick={() => handleSortByFilter('High to low', products)}>Price: High to low
                            {sortByFilterOption === 'High to low' ? <FontAwesomeIcon icon={faCheck} /> : null}</li>
                    </ul>
                )}
                {typeOfFilter === 'Category' && (
                    <div className='categoryWrapper'>
                        <h4 className='categoryTitle'>Categories</h4>
                        <ul className='categoryOptionsWrapper'>
                            <li className='categoryOption'>
                                <label className='categoryLabel' onClick={() => Filter('All', minPrice, maxPrice, minRevCount, maxRevCount)}>
                                    <input className='categoryRadioInput' type="radio" name="category" value="All"
                                        checked={categoryFilterOption === 'All' ? true : false} readOnly />
                                    All
                                </label>
                            </li>
                            <li className='categoryOption'>
                                <label className='categoryLabel' onClick={() => Filter("men's clothing", minPrice, maxPrice, minRevCount, maxRevCount)}>
                                    <input className='categoryRadioInput' type="radio" name="category" value="Men"
                                        checked={categoryFilterOption === "men's clothing" ? true : false} readOnly />
                                    Men
                                </label></li>
                            <li className='categoryOption'>
                                <label className='categoryLabel' onClick={() => Filter("women's clothing", minPrice, maxPrice, minRevCount, maxRevCount)}>
                                    <input className='categoryRadioInput' type="radio" name="category" value="Women"
                                        checked={categoryFilterOption === "women's clothing" ? true : false} readOnly />
                                    Women
                                </label>
                            </li>
                            <li className='categoryOption'>
                                <label className='categoryLabel' onClick={() => Filter("jewelery", minPrice, maxPrice, minRevCount, maxRevCount)}>
                                    <input className='categoryRadioInput' type="radio" name="category" value="Jewelery"
                                        checked={categoryFilterOption === 'jewelery' ? true : false} readOnly />
                                    Jewelery
                                </label></li>
                        </ul>
                    </div>
                )}
                {typeOfFilter === 'Price' && (
                    <div className='priceWrapper'>
                        <h4 className='priceTitle'>Price</h4>
                        <ul className='priceOptionsWrapper'>
                            <li className='priceOption'>
                                <label className='priceLabel' onClick={() => Filter(categoryFilterOption, 0, 1000, minRevCount, maxRevCount)}>
                                    <input className='priceRadioInput' type="radio" name="price" value="All"
                                        checked={minPrice === 0 && maxPrice === 1000 ? true : false} readOnly />
                                    All
                                </label>
                            </li>
                            <li className='priceOption'>
                                <label className='priceLabel' onClick={() => Filter(categoryFilterOption, 0, 50, minRevCount, maxRevCount)}>
                                    <input className='priceRadioInput' type="radio" name="price" value="Men"
                                        checked={minPrice === 0 && maxPrice === 50 ? true : false} readOnly />
                                    $0-$50
                                </label></li>
                            <li className='priceOption'>
                                <label className='priceLabel' onClick={() => Filter(categoryFilterOption, 50, 100, minRevCount, maxRevCount)}>
                                    <input className='priceRadioInput' type="radio" name="price" value="Women"
                                        checked={minPrice === 50 && maxPrice === 100 ? true : false} readOnly />
                                    $50-$100
                                </label>
                            </li>
                            <li className='priceOption'>
                                <label className='priceLabel' onClick={() => Filter(categoryFilterOption, 100, 1000, minRevCount, maxRevCount)}>
                                    <input className='priceRadioInput' type="radio" name="price" value="Jewelery"
                                        checked={minPrice === 100 && maxPrice === 1000 ? true : false} readOnly />
                                    $100+
                                </label></li>
                        </ul>
                    </div>
                )}
                {typeOfFilter === 'Review Count' && (
                    <div className='revCountWrapper'>
                        <h4 className='revCountTitle'>Review Count</h4>
                        <ul className='revCountOptionsWrapper'>
                            <li className='revCountOption'>
                                <label className='revCountLabel' onClick={() => Filter(categoryFilterOption, minPrice, maxPrice, 0, 1000)}>
                                    <input className='revCountRadioInput' type="radio" name="revCount" value="All"
                                        checked={minRevCount === 0 && maxRevCount === 1000 ? true : false} readOnly />
                                    All
                                </label>
                            </li>
                            <li className='revCountOption'>
                                <label className='revCountLabel' onClick={() => Filter(categoryFilterOption, minPrice, maxPrice, 0, 200)}>
                                    <input className='revCountRadioInput' type="radio" name="revCount" value="Men"
                                        checked={minRevCount === 0 && maxRevCount === 200 ? true : false} readOnly />
                                    0-200
                                </label></li>
                            <li className='revCountOption'>
                                <label className='revCountLabel' onClick={() => Filter(categoryFilterOption, minPrice, maxPrice, 200, 400)}>
                                    <input className='revCountRadioInput' type="radio" name="revCount" value="Women"
                                        checked={minRevCount === 200 && maxRevCount === 400 ? true : false} readOnly />
                                    200-400
                                </label>
                            </li>
                            <li className='revCountOption'>
                                <label className='revCountLabel' onClick={() => Filter(categoryFilterOption, minPrice, maxPrice, 400, 1000)}>
                                    <input className='revCountRadioInput' type="radio" name="revCount" value="Jewelery"
                                        checked={minRevCount === 400 && maxRevCount === 1000 ? true : false} readOnly />
                                    400+
                                </label></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropDownMenu
