import { useParams } from "react-router-dom";
// import dividerImage from "../../assets/images/divider-img.svg";
import "./CardDetails.css";
import useOneCard from "../../hooks/useOneCard";
import CardDetailsItem from "../card-details-item/CardDetailsItem";

function CardDetails() {
  let cardId = Number(useParams().id);
  const { card } = useOneCard(cardId)

  return (
    <div className="card-details">
      {card ? (
        <CardDetailsItem card={card} />
      ) : (
        <p>Loading card details ...</p>
      )}
    </div>
  );
}

export default CardDetails;
