import React from 'react';
import { Link } from 'react-router-dom';
import CardType from '../../type';
import addIcon from '../assets/images/add-logo.svg';
import validateIcon from '../assets/images/done-logo.svg';

type CardsListProps = {
    cards: CardType[];
    onToggleFavorite: (cardId: number) => void;
}

function CardsList({ cards, onToggleFavorite }: CardsListProps) {
    return (
        <div>
            <h2>All the cards, wouaah</h2>
            {cards.map(card => (
                <div key={card.id}>
                    <Link to={`/card/${card.id}`}>
                        <img src={card.imageUrl} alt={card.name}/>
                    </Link>
                    <img
                     src={card.favorite ? validateIcon : addIcon}
                     alt={card.favorite ? 'Remove from favorites' : 'Add to favorites'}
                     onClick={() => onToggleFavorite(card.id)}
                    />
                </div>
            ))}
        </div>
    );
}

export default CardsList;