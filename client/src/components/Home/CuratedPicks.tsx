import bestSellersImg from '../../assets/CuratedPicksImgs/bestSellersImg.jpg'
import mensImg from '../../assets/CuratedPicksImgs/mensImg.jpg'
import womensImg from '../../assets/CuratedPicksImgs/womensImg.jpg'
import jewelryImg from '../../assets/CuratedPicksImgs/jewelryImg.jpg'
import '../../styles/Home/CuratedPicks.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const CuratedPicks = () => {
    const navigate = useNavigate()

    const handleShopNavigation = (category: string) => {
        navigate(`/shop/${category}`)
    }
    return (
        <section className='curatedPicksWrapper'>
            <div className='curatedPicksContent'>
                <h2 className='curatedPicksHeadingTitle'>Curated Picks</h2>
                <div className='curatedPicksSelectionWrapper'>
                    <div className='selectionContainer'>
                        <img className='selectionImg' src={bestSellersImg} onMouseDown={e => e.preventDefault()} alt='shop best sellers pic' />
                        <button className='selectionBtn' onClick={() => handleShopNavigation('best-sellers')}>Best Seller<FontAwesomeIcon className='selectionIcon' icon={faArrowRight} /></button>
                    </div>
                    <div className='selectionContainer'>
                        <img className='selectionImg' src={mensImg} onMouseDown={e => e.preventDefault()} alt='shop mens pic' />
                        <button className='selectionBtn' onClick={() => handleShopNavigation('men')}>Shop Men<FontAwesomeIcon className='selectionIcon' icon={faArrowRight} /></button>
                    </div>
                    <div className='selectionContainer'>
                        <img className='selectionImg' src={womensImg} onMouseDown={e => e.preventDefault()} alt='shop womens pic' />
                        <button className='selectionBtn' onClick={() => handleShopNavigation('women')}>Shop Women<FontAwesomeIcon className='selectionIcon' icon={faArrowRight} /></button>
                    </div>
                    <div className='selectionContainer'>
                        <img className='selectionImg' src={jewelryImg} onMouseDown={e => e.preventDefault()} alt='shop kids pic' />
                        <button className='selectionBtn' onClick={() => handleShopNavigation('jewelery')}>Shop Jewelery<FontAwesomeIcon className='selectionIcon' icon={faArrowRight} /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CuratedPicks
