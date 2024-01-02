import { useState, useEffect } from "react";
import CardType from "../type";
import apiHandler from "../services/apiHandler";

const useCards = (selectedExtension: string) => {
    const [cards, setCards] = useState<CardType[]>([]);
    
    useEffect(() => {
        if(selectedExtension) {
            const loadCards = async () => {
                try {
                    const cards = await apiHandler.getExtensionCards(selectedExtension)
                    setCards(cards)
                } catch(error) {
                    console.error("Error loading cards", error)
                }
            };
            loadCards();
        }
    }, [selectedExtension]);

    return { cards, setCards }
};

export default useCards;