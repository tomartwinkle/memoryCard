import { useEffect, useState } from 'react';
import './App.css';
import CardContainer from './components/cardContainer';
import Header from './components/header';
import Scoreboard from './components/scoreboard';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedCards,setClickedCards]=useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const promises = [];
        const usedIds = new Set();
        while (usedIds.size < 9) {
          const rand = Math.floor(Math.random() * 898) + 1;
          usedIds.add(rand);
        }
        for (let id of usedIds) {
          promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
          );
        }
        const data = await Promise.all(promises);
        const pokemonData = data.map(p => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default,
        }));
        setPokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch Pokémon:", error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  function handleCardClick(id){
    if(clickedCards.includes(id)){
      setCurrentScore(0);
      setClickedCards([]);
    }
    else{
      const newScore=currentScore+1;
      setCurrentScore(newScore);
      if(newScore>highestScore){
        setHighestScore(newScore);
      }
      setClickedCards(prev=>[...prev,id]);
    }
    setPokemon(prev=>shuffleArray([...prev]));
  }

  function shuffleArray(array){
    for(let i=array.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
  }
  return (
    <>
      <Header />
      <Scoreboard currentScore={currentScore} highestScore={highestScore} />
      <div>
        {loading ? (
          <p>Loading Pokémon...</p>
        ) : (
          <div className="card-grid">
            console.log("Cards to render:", cards);
            {pokemon.map(p => (
              <div key={p.id} className="card" onClick={() => handleCardClick(p.id)}>
                <img src={p.image} alt={p.name} />
                <p>{p.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
