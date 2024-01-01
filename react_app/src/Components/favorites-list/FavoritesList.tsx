import DeleteIcon from "../../assets/images/delete-logo.svg";
import { Link } from "react-router-dom";
import CardType from '../../type';
import './FavoritesList.css'

type FavoritesListProps = {
    favoritesCards: CardType[];
    toggleFavorite: (cardId: number) => void;
}

function FavoritesList({ favoritesCards, toggleFavorite }: FavoritesListProps) {

    return (
        <div className="favorites-list__container">
          {favoritesCards.map((card) => (
              <div key={card.id}>
                <Link to={`/card/${card.id}`}>
                  <img
                    className="favorites-list__card-image"
                    src={card.imageUrl}
                    alt={card.name}
                  />
                </Link>
                <img
                  className="favorites-list__icon--delete-favorite"
                  src={DeleteIcon}
                  alt="Delete logo"
                  onClick={() => toggleFavorite(card.id)}
                />
              </div>
            ))}
        </div>
    )
}

export default FavoritesList;