import { Link } from 'react-router-dom';
import CardType from '../../type';
import addIcon from '../../assets/images/add-logo.svg';
import validateIcon from '../../assets/images/done-logo.svg';
import './CardsList.css';


type CardsListProps = {
    cards: CardType[];
    selectedExtension: string;
    onToggleFavorite: (cardId: number) => void;
}

function CardsList({ cards, selectedExtension, onToggleFavorite }: CardsListProps) {
    
    return (
        <div className="cards-list">
                <h1>{selectedExtension}</h1>
            <div className="cards-list__container">
                {cards.map(card => (
                    card.imageUrl && (<div key={card.id}>
                        <Link to={`/card/${card.id}`}>
                            <img className="cards-list__card-image" src={card.imageUrl} alt={card.name}/>
                        </Link>
                        <img
                        loading="lazy"
                        className="cards-details__icon--toggle-favorite"
                        src={card.isFavorite ? validateIcon : addIcon}
                        alt={card.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        onClick={() => onToggleFavorite(card.id)}
                        />
                    </div>)
                ))}
            </div>
        </div>
    );
}

export default CardsList;