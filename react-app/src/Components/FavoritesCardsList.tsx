import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import CardType from '../../type';
import DeleteIcon from '../assets/images/delete-logo.svg';

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
            <h2>All the favorites cards, wouaah</h2>
            {favoritesCards.length === 0 ? (
                <p>No cards in favorites yet</p>
            ) : (
                <div>
                {!loading ? (
                    favoritesCards.map(card => (
                        <div key={card.id}>
                            <Link to={`/card/${card.id}`}>
                                <img src={card.imageUrl} alt={card.name}/>
                            </Link>
                            <img
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