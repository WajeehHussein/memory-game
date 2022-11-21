import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import {bootstrap,css,js,node,react,sass,vs,vue} from './assets/imgs';

const cardImages = [
  {src: bootstrap,matched: false},
  {"src": css,matched: false},
  {"src": js,matched: false},
  {"src": node,matched: false},
  {"src": react,matched: false},
  {"src": sass,matched: false},
]


function App() {

  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [score, setScore] = useState(0);
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)


  function shuffleCard(){
    const shuffledCards = [...cardImages,...cardImages]
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setScore(0)
  }

  const handleChoice = (card) => {
    choiceOne? setChoiceTwo(card): setChoiceOne(card)
  }

  const resetTurn =() => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev +1)
    setDisabled(false)
  }


  function handleNewGameClick() {
    resetTurn();
    setTurns(0);
    setScore(0);
    shuffleCard();
  }

  // compare 2 select
  useEffect(() => {
    if(score === 6) {
      alert('Congrats! You`ve won!')
      return handleNewGameClick()
    }
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prev => {
          return prev.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        setScore(prev => prev + 1);
        resetTurn();
      }else {
        console.log('nooot match');
        setTimeout(() =>resetTurn(),1000)
      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards);



  // start automatically
  useEffect(() => {
    shuffleCard()
  },[])
  
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className='card-grid'>
        {cards.map( card => (
          <Card  card={card} key={card.id} handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={card.disabled}
          />
        ))}
      </div>
      <p>Moves: {turns} <hr /> Total Score: {score}</p>
      <p></p>
    </div>
  );
}

export default App;
