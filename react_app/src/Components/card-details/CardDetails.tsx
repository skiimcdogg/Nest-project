import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardType from '../../type';
import dividerImage from '../../assets/images/divider-img.svg'

function CardDetails() {
    let cardId = useParams().id
    const [card, setCard] = useState<CardType | null>(null)

    console.log(cardId);
    

    useEffect(() => {
        axios.get(`http://localhost:3000/cards/${cardId}`)
            .then(response => {
                setCard(response.data) 
            })
            .catch(err => {
                console.error('Error during the cards fetching', err)
            })
    })
    
    return (
        <div>
            {card ? (
                <div className="card-details-component">
                    <div className="card-details">
                        <h2>{card.name}</h2>
                        <p>Type: {card.type}</p>
                        <p>Set Name: {card.extensionName}</p>
                        <p>Text: {card.text}</p>
                        <p>Power/Toughness: {card.power}/{card.toughness}</p>
                        <p>Flavor: <i>{card.flavor}</i></p>
                    </div>
                    <div>
                        <img
                        src={dividerImage}
                        alt="divider"
                        className="divider-image"
                        />
                    </div>
                    <div>
                        <img className="card-detail-image" src={card.imageUrl} alt={card.name}/>
                    </div>
                </div>
            ) : (
                <p>Loading card details ...</p>
            )}

        </div>
    );
}

export default CardDetails;