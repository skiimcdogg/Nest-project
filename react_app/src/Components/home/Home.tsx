import { useState } from "react";
import ExtensionsFilter from "../extensions-filter/ExtensionsFilter";
import CardsList from "../cards-list/CardsList";
import CreateExtensionForm from "../create-extension-form/CreateExtensionForm";
import noCards from "../../assets/images/no-cards.png";
import "./Home.css";
import useCards from "../../hooks/useCards";
import useToggleFavorite from "../../hooks/useToggleFavorite";
import useExtensions from "../../hooks/useExtensions";

function Home() {
  const [selectedExtension, setSelectedExtension] = useState<string>("");
  const [showCreateExtensionForm, setShowCreateExtensionForm] = useState<boolean>(false);
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
      <button
        className="home__button--show-form"
        onClick={() => setShowCreateExtensionForm((prev) => !prev)}
      >
        {showCreateExtensionForm ? "Hide Creation Form" : "Show Creation Form"}
      </button>
      <div
        className={`home__creation-form-component ${
          showCreateExtensionForm ? "visible" : ""
        }`}
      >
        <CreateExtensionForm />
      </div>
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
