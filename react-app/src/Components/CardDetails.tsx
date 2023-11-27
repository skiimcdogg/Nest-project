import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardType from '../../type';

function CardDetails() {
    let { cardId } = useParams()
    const [card, setCard] = useState<CardType | null>(null)

    useEffect(() => {
        axios.get(`http://localhost:3000/card-fetcher/${cardId}`)
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
                <div>
                <h2>{card.name}</h2>
                <img src={card.imageUrl} alt={card.name}/>
                </div>
            ) : (
                <p>Loading card details ...</p>
            )}

        </div>
    );
}

export default CardDetails;