import '../styles/Footer.css'
import PayPayImg from '../assets/FooterImgs/payPal.png'
import VisaImg from '../assets/FooterImgs/visaImg.png'
import MasterCardImg from '../assets/FooterImgs/masterCard.png'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    const handleShopNavigation = () => {
        navigate('/shop/all-products')
    }

    return (
        <footer className='footerWrapper'>
            <div className='footerContent'>
                <div className='footerMenuWrapper'>
                    <div className='footerTitleTxtWrapper'>
                        <h1 className='footerStoreTitleTxt'>The Virtual Emporium</h1>
                        <p className='footerSmallTxt'>Focused on delivering premium and fashionable items to enhance your clothing collection</p>
                    </div>
                    <div className='footerMenuOptionsWrapper'>
                        <ul className='footerMenuListWrapper'>
                            <li className='footerHeaderTxt'>SHOP</li>
                            <li className='footerSmallTxt list' onClick={() => handleShopNavigation()}>All Collections</li>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>Winter Edition</a>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>Discount</a>
                        </ul>
                        <ul className='footerMenuListWrapper'>
                            <li className='footerHeaderTxt'>COMPANY</li>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>About Us</a>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>Contact</a>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>Affiliates</a>
                        </ul>
                        <ul className='footerMenuListWrapper'>
                            <li className='footerHeaderTxt'>SUPPORT</li>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>FAQs</a>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>Cookie Policy</a>
                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target="_blank" rel="noreferrer"
                            className='footerSmallTxt list' onMouseDown={(e) => e.preventDefault()}>Terms of Use</a>
                        </ul>
                        <div className='paymentMethodsWrapper'>
                            <span className='footerHeaderTxt'>PAYMENT METHODS</span>
                            <div className='paymentMethodsIconWrapper'>
                                <img className='paymentMethodIconImg mastercard' src={MasterCardImg} alt='mastercard vector logo'
                                    onMouseDown={e => e.preventDefault()} />
                                <img className='paymentMethodIconImg visa' src={VisaImg} alt='visa vector logo'
                                    onMouseDown={e => e.preventDefault()} />
                                <img className='paymentMethodIconImg paypal' src={PayPayImg} alt='paypal vector logo'
                                    onMouseDown={e => e.preventDefault()} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footerCopyRightWrapper'>
                    <span className='footerCopyRightTxt'>Copyright &copy;2023 The Virtual Emporium. All rights reserved</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
