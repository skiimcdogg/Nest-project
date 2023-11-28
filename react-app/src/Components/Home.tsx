import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExtensionsFilter from './ExtensionsFilter';
import CardsList from './CardsList';
import ExtensionType from '../../type';
import CardType from '../../type';
import CreateExtensionForm from './CreateExtensionForm';

function Home() {
    const [extensions, setExtensions] = useState<ExtensionType[]>([]);
    const [selectedExtension, setSelectedExtension] = useState<string>('');
    const [cards, setCards] = useState<CardType[]>([]);
    const [showCreateExtensionForm, setShowCreateExtensionForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:3000/extensions/all')
            .then(response => {
                setExtensions(response.data) 
                setLoading(false);
            })
            .catch(err => {
                console.error('Error during the extensions fetching', err)
                setLoading(false);
            })
    }, []);

    const fetchCards = () => {
        setLoading(true);
        axios.get('http://localhost:3000/card-fetcher/extension/' + selectedExtension)
            .then(response => {
                setCards(response.data) 
                setLoading(false);
            })
            .catch(err => {
                console.error('Error during the extensions fetching', err)
                setLoading(false);
            })
    };

    const toggleFavorite = (cardId: number) => {
        axios.patch('http://localhost:3000/card-fetcher/favorite/' + cardId)
        .then(() => {
            fetchCards();
        })
        .catch(err => {
            console.error('Error during toggling favorite', err)
        })
    };

    useEffect(() => {
        if(selectedExtension !== '') {
            fetchCards()
        }
        
    }, [selectedExtension]);

    return (
        <div>
            <ExtensionsFilter 
            extensions={extensions}
            selectedExtension={selectedExtension}
            setSelectedExtension={setSelectedExtension}
            />
            <button className="button-creation-form" onClick={() => setShowCreateExtensionForm(prev => !prev)}>
                {showCreateExtensionForm ? "Hide Creation Form" : "Show Creation Form"}
            </button>
            {/* {showCreateExtensionForm && <CreateExtensionForm />} */}
            <div className={`creation-form-component ${showCreateExtensionForm ? 'visible' : ''}`}>
                <CreateExtensionForm />
            </div>
            {selectedExtension === "" ? 
            <p>Please select an extension</p>
            : !loading && <CardsList
                cards={cards}
                onToggleFavorite={toggleFavorite} 
                />
            }
            
        </div>
    );
}

export default Home;