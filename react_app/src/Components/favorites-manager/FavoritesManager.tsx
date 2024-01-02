import useFavoritesCards from "../../hooks/useFavoritesCards";
import useToggleFavorite from "../../hooks/useToggleFavorite";
import NoFavoritesItem from "../no-favorites-item/NoFavoritesItem";
import FavoritesList from "../favorites-list/FavoritesList";

function FavoritesManager() {
  const { favoritesCards, setFavoritesCards } = useFavoritesCards();
  const { toggleFavorite } = useToggleFavorite(favoritesCards, setFavoritesCards);

  return (
    <div className="favorites-manager">
      <h2>Your Favorites Cards</h2>
      {favoritesCards.length === 0 ? (
        <NoFavoritesItem />
      ) : (
        <FavoritesList
          favoritesCards={favoritesCards}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default FavoritesManager;
