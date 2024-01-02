import { useState, useEffect } from "react";
import CardType from "../type";
import apiHandler from '../services/apiHandler';

const useOneCard = (cardId: number) => {
    const [card, setCard] = useState<CardType | null>(null);

    useEffect(() => {
        const fetchOneCard = async () => {
            try {
                const response = await apiHandler.getOneCard(cardId);
                setCard(response);
            } catch(err) {
                console.error("Error during the card fetching", err);
            }
        };
        fetchOneCard();
    }, []);
    
    return { card };
};

export default useOneCard;