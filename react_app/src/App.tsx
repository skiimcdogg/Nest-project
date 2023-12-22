import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Components/home/Home';
import Header from './Components/header/Header';
import CardDetails from './Components/card-details/CardDetails';
import FavoritesCardsList from './Components/favorites-cards-list/FavoritesCardsList';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<FavoritesCardsList />}/>
          <Route path="/card/:id" element={<CardDetails />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
