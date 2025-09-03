function Header({score,bestScore}){
    return(
        <header>
            <h1>Memory Cards</h1>
            <p>Score : {score} | Best Score : {bestScore}</p>
        </header>
    );
}
export default Header;