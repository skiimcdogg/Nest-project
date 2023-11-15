import './App.css';
import React from 'react';
import Header from './Components/Header';
import ExtensionsFilter from './Components/ExtensionsFilter';
import CardsList from './Components/CardsList';

function App() {
  return (
    <div className="App">
      <Header />
      <ExtensionsFilter />
      <CardsList />
    </div>
  );
}

export default App;
