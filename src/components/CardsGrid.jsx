import Card from "./card";
function cardsGrid({cards,handleClick}){
    return(
        <div className="grid">
            {cards.map(card=>(
                <Card key={card.id} card={card} handleClick={handleClick}/>
            ))}
        </div>
    );
}
export default cardsGrid;