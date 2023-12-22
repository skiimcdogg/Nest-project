import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardType from "../../type";
import dividerImage from "../../assets/images/divider-img.svg";
import "./CardDetails.css";

function CardDetails() {
  let cardId = useParams().id;
  const [card, setCard] = useState<CardType | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cards/${cardId}`)
      .then((response) => {
        setCard(response.data);
      })
      .catch((err) => {
        console.error("Error during the cards fetching", err);
      });
  });

  return (
    <div className="card-details">
      {card ? (
        <div className="card-details__container">
          <div className="card-details__info">
            <h2>{card.name}</h2>
            <p>Type: {card.type}</p>
            <p>Set Name: {card.extensionName}</p>
            <p>Text: {card.text}</p>
            <p>
              Power/Toughness: {card.power}/{card.toughness}
            </p>
            <p>
              Flavor: <i>{card.flavor}</i>
            </p>
          </div>
          <div>
            <img
              src={dividerImage}
              alt="divider"
              className="card-details__divider-image"
            />
          </div>
          <div>
            <img
              className="card-details__card-image"
              src={card.imageUrl}
              alt={card.name}
            />
          </div>
        </div>
      ) : (
        <p>Loading card details ...</p>
      )}
    </div>
  );
}

export default CardDetails;
