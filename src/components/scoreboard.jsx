
function Scoreboard({currentScore,highestScore}){
    return(
        <div className="scoreboard">
            <p>Current Score : {currentScore}</p>
            <p>Highest Score : {highestScore}</p>
        </div>
    );
};
export default Scoreboard;