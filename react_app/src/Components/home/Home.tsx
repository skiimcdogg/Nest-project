import { useState } from "react";
import ExtensionsFilter from "../extensions-filter/ExtensionsFilter";
import CardsList from "../cards-list/CardsList";
import FormToggler from "../form-toggler/FormToggler";
import noCards from "../../assets/images/no-cards.png";
import "./Home.css";
import useCards from "../../hooks/useCards";
import useToggleFavorite from "../../hooks/useToggleFavorite";
import useExtensions from "../../hooks/useExtensions";

function Home() {
  const [selectedExtension, setSelectedExtension] = useState<string>("");
  const { extensions } = useExtensions()
  const { cards, setCards } = useCards(selectedExtension)
  const { toggleFavorite } = useToggleFavorite(cards, setCards)

  return (
    <div className="home">
      <ExtensionsFilter
        extensions={extensions}
        selectedExtension={selectedExtension}
        setSelectedExtension={setSelectedExtension}
      />
      <FormToggler />
      {selectedExtension === "" ? (
        <img src={noCards} alt="no cards" />
      ) : (   
          <CardsList
            cards={cards}
            selectedExtension={selectedExtension}
            onToggleFavorite={toggleFavorite}
          />  
      )}
    </div>
  );
}

export default Home;
