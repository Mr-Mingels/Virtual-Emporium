import '../styles/Footer.css'
import PayPayImg from '../assets/FooterImgs/payPal.png'
import VisaImg from '../assets/FooterImgs/visaImg.png'
import MasterCardImg from '../assets/FooterImgs/masterCard.png'

const Footer = () => {
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
                            <li className='footerSmallTxt list'>All Collections</li>
                            <li className='footerSmallTxt list'>Winter Edition</li>
                            <li className='footerSmallTxt list'>Discount</li>
                        </ul>
                        <ul className='footerMenuListWrapper'>
                            <li className='footerHeaderTxt'>COMPANY</li>
                            <li className='footerSmallTxt list'>About Us</li>
                            <li className='footerSmallTxt list'>Contact</li>
                            <li className='footerSmallTxt list'>Affiliates</li>
                        </ul>
                        <ul className='footerMenuListWrapper'>
                            <li className='footerHeaderTxt'>SUPPORT</li>
                            <li className='footerSmallTxt list'>FAQs</li>
                            <li className='footerSmallTxt list'>Cookie Policy</li>
                            <li className='footerSmallTxt list'>Terms of Use</li>
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
