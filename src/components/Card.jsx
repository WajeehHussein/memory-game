import './Card.css'
import {cover} from '../assets/imgs'
const Card = ({card,handleChoice,flipped,disabled}) => {

    const handleClick = () => {
        if(!disabled) {
            handleChoice(card)
        }
    }
  return (
    <div  key={card.id} className={`card ${card.matched?'matched':''}`} disbled={card.disabled}>
        <div className={flipped ? 'flipped' : ''}>
            <img src={card.src}  className='front' />
            <img src={cover} onClick={handleClick} className='back' />
            </div>
        </div>
    
  )
}

export default Card