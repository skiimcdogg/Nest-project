import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Header from './Header';
import ExtensionsFilter from './ExtensionsFilter';
import CardsList from './CardsList';
import ExtensionType from '../../type';
import CardType from '../../type';
import CreateExtensionForm from './CreateExtensionForm';

function Home() {
    const [extensions, setExtensions] = useState<ExtensionType[]>([]);
    const [selectedExtension, setSelectedExtension] = useState<string>('all');
    const [cards, setCards] = useState<CardType[]>([]);
    const [showCreateExtensionForm, setShowCreateExtensionForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('http://localhost:3000/extensions/all')
            .then(response => {
                setExtensions(response.data) 
            })
            .catch(err => {
                console.error('Error during the extensions fetching', err)
            })
            setLoading(false);
    }, []);

    const fetchCards = () => {
        setLoading(true);
        if(selectedExtension === 'all') {
            axios.get('http://localhost:3000/card-fetcher/cards')
                .then(response => {
                    setCards(response.data) 
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error during the cards fetching', err)
                    setLoading(false);
                })
        } else {
            axios.get('http://localhost:3000/card-fetcher/extension/' + selectedExtension)
                .then(response => {
                    setCards(response.data) 
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error during the extensions fetching', err)
                    setLoading(false);
                })
        }
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
        fetchCards()
    }, [selectedExtension]);

    return (
        <div>
            {/* <Header /> */}
            <ExtensionsFilter 
            extensions={extensions}
            selectedExtension={selectedExtension}
            setSelectedExtension={setSelectedExtension}
            />
            <button onClick={() => setShowCreateExtensionForm(prev => !prev)}>
                Show/Hide Creation Form
            </button>
            {showCreateExtensionForm && <CreateExtensionForm />}
            <CardsList
            cards={cards}
            onToggleFavorite={toggleFavorite} 
            />
        </div>
    );
}

export default Home;