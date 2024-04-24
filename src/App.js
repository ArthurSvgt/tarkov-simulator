import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css'; // Importation du fichier CSS
import ScavBoxHeader from './components/ScavBoxHeader';

const GET_ITEMS = gql`
  {
    items {
      name
      basePrice
      iconLink
      wikiLink
      sellFor {
        price
        currency
        priceRUB
        source
      }
      buyFor {
        price
        currency
        priceRUB
        source
      }
      lastLowPrice
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ITEMS);
  const [randomItems, setRandomItems] = useState([]);

  const handleOpenBox = () => {
    if (!loading && !error && data && data.items) {
      const itemsCopy = [...data.items];
      const shuffledItems = itemsCopy.sort(() => Math.random() - 0.5);
      const selectedItems = shuffledItems.slice(0, 3);
      setRandomItems(selectedItems);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <header className="header">
        <ScavBoxHeader handleOpenBox={handleOpenBox}/>
      </header>
      <div className="content">
        <div className="results">
          <h2 className="subtitle">Résultats :</h2>
          <ul className="item-list">
            {randomItems.map(item => (
              <li key={item.name} className="item-card">
                <img src={item.iconLink} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">Base Price: {item.basePrice}</p>
                  <ul className="sell-for">
                    {item.sellFor.map((sell, index) => (
                      <li key={index} className="sell-info">Sell for: {sell.priceRUB} RUB {sell.source === 'fleaMarket' ? 'at' : 'to'} {sell.source}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
