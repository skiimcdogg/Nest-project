import DangerIcon from "../../assets/images/danger-logo.svg";

function NoFavoritesItem() {
    
  return (
    <div className="no-favorites-cards-list__container">
      <img src={DangerIcon} alt="no favorites icon" />
      <p>No cards in favorites yet</p>
      <img src={DangerIcon} alt="no favorites icon" />
    </div>
  );
}

export default NoFavoritesItem;
