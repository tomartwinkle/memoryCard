function Card({card,handleClick}){
    return(
        //component for a single card 
        <div onClick={()=>handleClick(card.id)} className="card">
            <img src={card.img} alt={card.name}/>
            <p>{card.name}</p>
        </div>
    );
}
export default Card;

