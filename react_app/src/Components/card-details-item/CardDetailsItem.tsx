import CardType from "../../type";
import dividerImage from "../../assets/images/divider-img.svg";
import './CardDetailsItem.css'

type CardDetailsItemProps = {
  card: CardType;
};

function CardDetailsItem({ card }: CardDetailsItemProps) {

  return (
    <div className="card-details-item">
      <div className="card-details-item__container">
        <div className="card-details-item__info">
          <h2>{card.name}</h2>
          <p><b>Type: </b> {card.type}</p>
          <p><b>Set Name:</b> {card.extensionName}</p>
          <p><b>Text:</b> {card.text}</p>
          <p>
          <b>Power/Toughness:</b> {card.power}/{card.toughness}
          </p>
          <p>
          <b>Flavor:</b> <i>{card.flavor}</i>
          </p>
        </div>
        <div>
          <img
            src={dividerImage}
            alt="divider"
            className="card-details-item__divider-image"
          />
        </div>
        <div>
          <img
            className="card-details-item__card-image"
            src={card.imageUrl}
            alt={card.name}
          />
        </div>
      </div>
    </div>
  );
}

export default CardDetailsItem;
