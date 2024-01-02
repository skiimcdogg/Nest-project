import { useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";
import CardType from "../type";

const useFavoritesCards = () => {
    const [favoritesCards, setFavoritesCards] = useState<CardType[]>([]);

    useEffect(() => {
        const fetchFavoriteCards = async () => {
            try {
                const response = await apiHandler.getAllFavorites();
                setFavoritesCards(response);
            } catch(err) {
                console.error("Error during the favorites cards fetching", err)
            }
        };
        
        fetchFavoriteCards();
    }, [favoritesCards]);

    return { favoritesCards, setFavoritesCards };
};

export default useFavoritesCards;