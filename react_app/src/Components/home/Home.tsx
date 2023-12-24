import { useState, useEffect } from "react";
import ExtensionsFilter from "../extensions-filter/ExtensionsFilter";
import CardsList from "../cards-list/CardsList";
import ExtensionType from "../../type";
import CardType from "../../type";
import CreateExtensionForm from "../create-extension-form/CreateExtensionForm";
import noCards from "../../assets/images/no-cards.png";
import "./Home.css";
import apiHandler from "../../services/apiHandler";

function Home() {
  const [extensions, setExtensions] = useState<ExtensionType[]>([]);
  const [selectedExtension, setSelectedExtension] = useState<string>("");
  const [cards, setCards] = useState<CardType[]>([]);
  const [showCreateExtensionForm, setShowCreateExtensionForm] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    apiHandler
      .getAllExtensions()
      .then((response) => {
        setExtensions(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error during the extensions fetching", err);
        setLoading(false);
      });
  }, []);

  const fetchCards = () => {
    setLoading(true);
    apiHandler
      .getExtensionCards(selectedExtension)
      .then((response) => {
        setCards(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error during the extensions fetching", err);
        setLoading(false);
      });
  };

  const toggleFavorite = (cardId: number) => {
    apiHandler
      .toggleFavorite(cardId)
      .then(() => {
        setCards(
          cards.map((card) => {
            if (card.id === cardId) {
              return {
                ...card,
                isFavorite: !card.isFavorite,
              };
            }
            return card;
          })
        );
      })
      .catch((err) => {
        console.error("Error during toggling favorite", err);
      });
  };

  useEffect(() => {
    if (selectedExtension !== "") {
      fetchCards();
    }
  }, [selectedExtension]);

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
        !loading && (
          <CardsList
            cards={cards}
            selectedExtension={selectedExtension}
            onToggleFavorite={toggleFavorite}
          />
        )
      )}
    </div>
  );
}

export default Home;
