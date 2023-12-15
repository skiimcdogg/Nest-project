import React from 'react';
import { Link } from 'react-router-dom';
import CardType from '../../type';
import addIcon from '../assets/images/add-logo.svg';
import validateIcon from '../assets/images/done-logo.svg';


type CardsListProps = {
    cards: CardType[];
    selectedExtension: string;
    onToggleFavorite: (cardId: number) => void;
}

function CardsList({ cards, selectedExtension, onToggleFavorite }: CardsListProps) {
    
    return (
        <div className="cards-list-component">
                <h1>{selectedExtension}</h1>
            <div className="cards-list">
                {cards.map(card => (
                    card.imageUrl && (<div key={card.id}>
                        <Link to={`/card/${card.id}`}>
                            <img className="card-in-list" src={card.imageUrl} alt={card.name}/>
                        </Link>
                        <img
                        loading="lazy"
                        className="card-icon"
                        src={card.favorite ? validateIcon : addIcon}
                        alt={card.favorite ? 'Remove from favorites' : 'Add to favorites'}
                        onClick={() => onToggleFavorite(card.id)}
                        />
                    </div>)
                ))}
            </div>
        </div>
    );
}

export default CardsList;