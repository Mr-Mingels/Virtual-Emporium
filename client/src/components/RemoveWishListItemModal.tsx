import React, { useState, FC } from 'react'
import '../styles/RemoveWishListItemModal.css'
import axios from 'axios'

interface RemoveWishListItemModalProps {
    setRemoveModalOpen: Function,
    product: any,
    getUserWishListInfo: Function,
    wishList: any
}

const RemoveWishListItemModal: FC<RemoveWishListItemModalProps> = ({ setRemoveModalOpen, product, getUserWishListInfo, wishList }) => {
    const [loader, setLoader] = useState(false)

    const handleRemoveItemFromWishList = async () => {
        setLoader(true)
        try {
            const wishListIem = wishList.find((productInWishList: any) => productInWishList.id === product.id)
            const productId = product._id ? product._id : wishListIem._id
            const response = await axios.delete('/remove-item-from-wishlist', {
                data: { productId },
                withCredentials: true
            });
            if (response.status === 200) {
                await getUserWishListInfo()
                setRemoveModalOpen(false)
                document.body.style.overflowY = 'auto';
            }
            setLoader(false)
        } catch (err) {
            console.log(err)
            setLoader(false)
        }
    }
    return (
        <div className='wishListItemRemoveModalWrapper' onClick={(e) => e.stopPropagation()}>
            <div className='wishListItemRemoveModalContent'>
                <h5 className='wishListItemRemoveModalHeaderTxt'>Remove Item</h5>
                <p className='wishListItemRemoveModalTxt'>Are you sure you want to remove this item from your wish list?</p>
                <div className='wishListItemRemoveModalBtnsWrapper'>
                    {loader ? (
                        <button className='wishListItemRemoveModalBtn loading'>
                            <span className='btnLoader'></span>
                        </button>
                    ) : (
                        <button className='wishListItemRemoveModalBtn' onClick={() => handleRemoveItemFromWishList()}>REMOVE</button>
                    )}
                    <button className='wishListItemRemoveModalBtn cancel' onClick={() => {
                        setRemoveModalOpen(false);
                        document.body.style.overflowY = 'auto';
                    }}>CANCEL</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveWishListItemModal
