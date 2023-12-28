import react from 'react';
import CardType from "../type";
import apiHandler from "../services/apiHandler";

const useToggleFavorite = (cards: CardType[], setCards: React.Dispatch<react.SetStateAction<CardType[]>>) => {
    const toggleFavorite = async (cardId: number) => {
        try {
            await apiHandler.toggleFavorite(cardId);
            const updatedCards = cards.map((card) => {
                if (card.id === cardId) {
                  return {
                    ...card,
                    isFavorite: !card.isFavorite,
                  };
                }
                return card;
              });
              setCards(updatedCards)
        } catch(error) {
            console.error("Error during toggling favorite", error);
        };
    };
    return { toggleFavorite };
};

export default useToggleFavorite;