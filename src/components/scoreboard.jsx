// Scoreboard.jsx
export default function Scoreboard({ currentScore, highestScore }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Score: {currentScore}</h2>
      <h3>Highest Score: {highestScore}</h3>
    </div>
  );
}
