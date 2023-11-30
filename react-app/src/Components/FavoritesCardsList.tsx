import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import CardType from '../../type';
import DeleteIcon from '../assets/images/delete-logo.svg';
import DangerIcon from '../assets/images/danger-logo.svg';

function FavoritesCardsList() {
    const [favoritesCards, setFavoritesCards] = useState<CardType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchFavoritesCards = () => {
        axios.get('http://localhost:3000/card-fetcher/favorites')
            .then(response => {
                setFavoritesCards(response.data)
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error during the favorites cards fetching', err)
                setLoading(false)
            })
    }

    const removeFromFavorites = (cardId: number) => {
        axios.patch('http://localhost:3000/card-fetcher/favorite/' + cardId)
        .then(() => {
            fetchFavoritesCards();
        })
        .catch(err => {
            console.error('Error during toggling favorite', err)
        })
    };

    useEffect(() => {
        fetchFavoritesCards()
    }, [])

    return (
        <div>
            <h2>Your Favorites Cards</h2>
            {favoritesCards.length === 0 ? (
                <div className="no-favorites">
                    <img src={DangerIcon} alt="no favorites icon" />
                    <p>No cards in favorites yet</p>
                    <img src={DangerIcon} alt="no favorites icon" />
                </div>
            ) : (
                <div className="cards-list">
                {!loading ? (
                    favoritesCards.map(card => (
                        <div key={card.id}>
                            <Link to={`/card/${card.id}`}>
                                <img className="card-in-list" src={card.imageUrl} alt={card.name}/>
                            </Link>
                            <img
                            className="card-icon"
                            src={DeleteIcon}
                            alt="Delete logo"
                            onClick={() => removeFromFavorites(card.id)}
                             />
                        </div>
                    ))
                ) : (
                    <p>fetching cards ...</p>
                )}
                </div>
            )}
        </div>
    );
}

export default FavoritesCardsList;