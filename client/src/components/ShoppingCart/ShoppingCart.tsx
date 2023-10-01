import React, { FC, useState, useEffect } from 'react'
import '../../styles/ShoppingCart/ShoppingCart.css'
import axios from 'axios'

interface ShoppingCartProps {
    windowWidth: number,
    shoppingCart: any,
    userInfo: any,
    getUserCartInfo: Function,
    isLoggedIn: boolean,
}

const ShoppingCart: FC<ShoppingCartProps> = ({ windowWidth, shoppingCart, userInfo, getUserCartInfo, isLoggedIn }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalIndex, setModalIndex] = useState<number | null>(null);
    const [totalItems, setTotalItems] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [loader, setLoader] = useState(false)
    const [checkOutLoader, setCheckOutLoader] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            getUserCartInfo()
        }
    }, [])

    const handleRemoveModalOpen = (indexId: number) => {
        setModalIndex(indexId)
        setModalOpen(true)
        document.body.style.overflowY = 'hidden';
    }

    const handleRemoveModalClose = () => {
        if (loader) return
        setModalIndex(null)
        setModalOpen(false)
        document.body.style.overflowY = 'auto';
    }

    useEffect(() => {
        const itemQuantitys = shoppingCart.map((product: any) => product.productQuantity);
        setTotalItems(itemQuantitys.reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue;
        }, 0))
        const subTotals = shoppingCart.map((product: any) => product.productQuantity * product.price);
        setTotalCost(subTotals.reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue;
        }, 0))
    }, [shoppingCart])

    const removeItemFromCart = async (productId: any) => {
        setLoader(true)
        try {
            const response = await axios.delete('http://localhost:5000/remove-product', {
                data: { productId },
                withCredentials: true
            });
            if (response.status === 200) {
                await getUserCartInfo()
                handleRemoveModalClose()
            }
            setLoader(false)
        } catch (err) {
            console.log(err)
            setLoader(false)
        }
    }

    const handleCheckOut = async () => {
        setCheckOutLoader(true)
        try {
            const response = await axios.post('http://localhost:5000/create-checkout-session', shoppingCart, { withCredentials: true })
            if (response.status === 200) {
                const { url } = response.data;
                window.location.href = url;
            }
            setCheckOutLoader(false)
        } catch (err) {
            console.log(err)
            setCheckOutLoader(false)
        }
    }

    if (!isLoggedIn) {
        return <div className='mainLoaderWrapper'>
            <span className="mainLoader"></span>
        </div>
    }

    return (
        <section className='shoppingCartWrapper'>
            <div className='shoppingCartContent'>
                <span className='shoppingCartAccountInfoTxt'>Logged in as: {userInfo.email}</span>
                <h2 className='shoppingCartTitle'>Shopping Cart</h2>
                <div className='shoppingCartMainContentWrapper'>
                    <div className='shoppingCartProductsWrapper'>
                        {shoppingCart.map((product: any, index: number) => (
                            <div className={`shoppingCartProductWrapper ${index === 0 ? 'firstProduct' : ''}`} key={index}>
                                <div className='shoppingCartProductContent'>
                                    <img src={product.image} className='shoppingCartProductImg' alt='shopping cart product'
                                        onMouseDown={(e) => e.preventDefault()} />
                                    <div className='shoppingCartProductInfoWrapper'>
                                        <h4 className='shoppingCartProductTitle'>{product.title}</h4>
                                        <span className='shoppingCartProductColorTxt'>Color: {product.color.toUpperCase()}</span>
                                        <span className='shoppingCartProductSizeTxt'>Size: {product.size}</span>
                                        <span className='shoppingCartProductQuantityTxt'>Quantity: {product.productQuantity}</span>
                                        <div className='shoppingCartProductPricesWrapper'>
                                            <span className='shoppingCartProductPrice'>${product.price}</span>
                                            <span className='shoppingCartProductSubTotal'>SubTotal:
                                                ${product.price * product.productQuantity}</span>
                                        </div>
                                        <div className='shoppingCartProductRemoveBtnWrapper'>
                                            <button className='shoppingCartProductRemoveBtn' 
                                            onClick={() => checkOutLoader ? null : handleRemoveModalOpen(index)}>Remove</button>
                                        </div>
                                        {(modalOpen && modalIndex === index) && (
                                            <div className='shoppingCartRemoveModalWrapper'>
                                                <div className='shoppingCartRemoveModalContent'>
                                                    <h5 className='shoppingCartRemoveModalHeaderTxt'>Remove Item</h5>
                                                    <p className='shoppingCartRemoveModalTxt'>Are you sure you want to remove this item from your cart?</p>
                                                    <div className='shoppingCartRemoveModalBtnsWrapper'>
                                                        {loader ? (
                                                            <button className='shoppingCartRemoveModalBtn loading'>
                                                                <span className='btnLoader'></span>
                                                            </button>
                                                        ) : (
                                                            <button className='shoppingCartRemoveModalBtn'
                                                                onClick={() => removeItemFromCart(product._id.toString())}>REMOVE</button>
                                                        )}
                                                        <button className='shoppingCartRemoveModalBtn cancel'
                                                            onClick={() => handleRemoveModalClose()}>CANCEL</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='shoppingCartCheckOutWrapper'>
                        <div className='shoppingCartOverViewWrapper'>
                            <div className='shoppingCartOverViewHeader'>
                                <h3 className='overViewHeaderTitle'>Order Summary</h3>
                                <span className='overViewHeaderItemCount'>{totalItems ? totalItems : 0} Item(s)</span>
                            </div>
                            <div className='shoppingCartOverViewBody'>
                                <div className='shoppingCartOverViewBodyItemWrapper top'>
                                    <span className='shoppingCartOverViewBodyItem'>Item(s) Subtotal</span>
                                    <span className='shoppingCartOverViewBodyItem'>${totalCost ? totalCost : 0}</span></div>
                                <div className='shoppingCartOverViewBodyItemWrapper'>
                                    <span className='shoppingCartOverViewBodyItem'>Shipping</span>
                                    <span className='shoppingCartOverViewBodyItem'>TBD</span></div>
                                <div className='shoppingCartOverViewBodyItemWrapper'>
                                    <span className='shoppingCartOverViewBodyItem'>Subtotal</span>
                                    <span className='shoppingCartOverViewBodyItem'>${totalCost ? totalCost : 0}</span></div>
                                <div className='shoppingCartOverViewBodyItemWrapper bottom'>
                                    <span className='shoppingCartOverViewBodyItem'>Estimated Tax</span>
                                    <span className='shoppingCartOverViewBodyItem'>TBD</span></div>
                            </div>
                            <div className='shoppingCartOverViewFooter'>
                                <h3 className='overViewFooterTitle'>Order Total</h3>
                                <span className='overViewFooterItemCount'>${totalCost ? totalCost : 0}</span>
                            </div>
                        </div>
                        {checkOutLoader ? (
                            <button className='shoppingCartCheckOutBtn loading'>
                                <span className='btnLoader'></span>
                            </button>
                        ) : (
                            <div className='shoppingCartCheckOutBtnWrapper' onClick={() => handleCheckOut()}>
                                <button className='shoppingCartCheckOutBtn'>CHECKOUT</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShoppingCart
