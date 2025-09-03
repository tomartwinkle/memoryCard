import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Card from './components/card'
import CardsGrid from './components/cardsGrid'

function App() {
  const [cards,setCards]=useState([]);
  const [score,setScore]=useState(0);
  const [bestScore,setBestScore]=useState(0);
  const [clicked,setClicked]=useState([]);

 const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchCards() {
    try {
      let fetchedCards = [];
      let usedIds = new Set();

      while (fetchedCards.length < 12) {
        let randomId = Math.floor(Math.random() * 898) + 1;
        if (usedIds.has(randomId)) continue;
        usedIds.add(randomId);

        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        let data = await res.json();

        fetchedCards.push({
          id: data.id,
          name: data.name,
          img: data.sprites.front_default,
        });
      }

      setCards(fetchedCards);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch Pokémon:", err);
    }
  }

  fetchCards();
}, []);


  function shuffleArray(array){
    return [...array].sort(()=>Math.random()-0.5);
  }

  function handleClick(id){
    if(clicked.includes(id)){
      setBestScore(Math.max(score,bestScore));
      setClicked([]);
      setScore(0);
    }
    else{
      setScore(score+1);
      setClicked([...clicked,id]);
      setCards(shuffleArray(cards));
    }
  }
  return (
    <>
      <Header score={score} bestScore={bestScore}/>
      <cardsGrid cards={cards} handleClick={handleClick}/>
    </>
  )
}

export default App
