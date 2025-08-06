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

  return (
    <>
      <Header />
      <Scoreboard currentScore={currentScore} highestScore={highestScore} />
      <div>
        {loading ? (
          <p>Loading Pokémon...</p>
        ) : (
          <div className="card-grid">
            {pokemon.map(p => (
              <div key={p.id} className="card">
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
