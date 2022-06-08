import './App.css'
import { useEffect, useState } from 'react'
import Card from './components/card.component'

const cardImages = [
  { 'src': '/img/helmet-1.png', matched: false },
  { 'src': '/img/potion-1.png', matched: false },
  { 'src': '/img/ring-1.png', matched: false },
  { 'src': '/img/scroll-1.png', matched: false },
  { 'src': '/img/shield-1.png', matched: false },
  { 'src': '/img/sword-1.png', matched: false }
]

function App () {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  // shuffle cards
  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)

  }

  const handleChoice = (card) => choiceOne ? setChoiceTwo(card) : setChoiceOne(card)



  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true)

      compareCards(choiceOne, choiceTwo)
      setTimeout(() => resetTurns(), 1000)
    }



  }, [choiceOne, choiceTwo])

  console.log(cards)

  const compareCards = (card1, card2) => {
    if (card1.src === card2.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === card1.src) return { ...card, matched: true }
          return card
        })
      })
    }



  }
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card =>
          <Card key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />

        )}
      </div>
      <p>Turns:{turns}</p>
    </div>
  )
}

export default App