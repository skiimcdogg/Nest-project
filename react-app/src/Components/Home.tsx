import React from 'react';
import Header from './Header';
import ExtensionsFilter from './ExtensionsFilter';
import CardsList from './CardsList';

function Home() {
    return (
        <div>
            <Header />
            <ExtensionsFilter />
            <CardsList />
        </div>
    );
}

export default Home;