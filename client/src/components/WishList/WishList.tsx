import React, { FC, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import RemoveWishListItemModal from '../RemoveWishListItemModal'
import '../../styles/WishList/WishList.css'

interface WishListProps {
    windowWidth: number,
    wishList: any,
    userInfo: any,
    getUserWishListInfo: Function,
    isLoggedIn: boolean
}

const WishList: FC<WishListProps> = ({ windowWidth, wishList, userInfo, getUserWishListInfo, isLoggedIn }) => {
    const [removeModalOpen, setRemoveModalOpen] = useState(false)
    const [modalIndex, setModalIndex] = useState<number | null>(null);
    const [loader, setLoader] = useState(false)
    const [imgBounds, setImgBounds] = useState<DOMRect | null>(null);
    const [toggleUseEffectHook, setToggleUseEffectHook] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            getUserWishListInfo()
        }
    }, [])

    useEffect(() => {
        if (!removeModalOpen) {
            setModalIndex(null)
        }
    }, [removeModalOpen])

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
    }, [imgRef, windowWidth, toggleUseEffectHook, wishList]);

    if (!isLoggedIn) {
        return <div className='mainLoaderWrapper'>
            <span className="mainLoader"></span>
        </div>
    }

    return (
        <section className='wishListWrapper'>
            <div className='wishListContent'>
                <span className='wishListAccountInfoTxt'>Logged in as: {userInfo.email}</span>
                <h2 className='wishListTitle'>Wish List</h2>
                <div className='wishListMainContentWrapper'>
                    <div className='wishListProductsWrapper'>
                        {wishList.map((product: any, index: number) => (
                            <div className={`wishListProductWrapper`} key={index}>
                                <div className='wishListProductContent' onClick={() => {
                                    navigate(`/product/${product.id}`)
                                }}>
                                    <img src={product.image} className='wishListProductImg' alt='wish list item'
                                        onMouseDown={(e) => e.preventDefault()} ref={imgRef} style={{ height: imgBounds?.width }} />
                                    <div className='wishListProductInfoWrapper'>
                                        <span className='wishListProductCategory'>{product.category.toUpperCase()}</span>
                                        <h4 className='wishListProductTitle'>{product.title}</h4>
                                        <span className='wishListProductPrice'>${product.price}</span>
                                        <div className='wishListProductRemoveBtnWrapper'>
                                            <button className='wishListProductRemoveBtn' onClick={(e) => {
                                                e.stopPropagation();
                                                setModalIndex(index)
                                                setRemoveModalOpen(true)
                                                document.body.style.overflowY = 'hidden';
                                            }}>Remove</button>
                                        </div>
                                        {(removeModalOpen && modalIndex === index) && (
                                            <RemoveWishListItemModal setRemoveModalOpen={setRemoveModalOpen} product={product}
                                                getUserWishListInfo={getUserWishListInfo} wishList={wishList} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WishList
