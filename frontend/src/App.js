import React, { useState } from 'react';
import axios from 'axios';
import useAsyncEffect from 'use-async-effect';

import sandwichPic from './images/sandwichPic.svg';
import OrderList from './OrderList';

import OatSandwich from './images/Oat Sandwich.svg';
import RyeSandwich from './images/Rye Sandwich.svg';
import WheatSandwich from './images/Wheat Sandwich.svg';

import './common.css';

const SANDWICH_PNG = new Map([
  ['Oat Sandwich', OatSandwich],
  ['Rye Sandwich', RyeSandwich],
  ['Wheat Sandwich', WheatSandwich],
]);

function App() {
  const [sandwichData, setSandwichData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [selectedSandwichId, setSelectedSandwichId] = useState();

  useAsyncEffect(async () => {
    const { data } = await axios.get(`http://localhost:8081/v1/sandwich`);
    setSandwichData(data);
  }, [])

  const fetchOrders = async () => {
    const { data } = await axios.get(`http://localhost:8081/v1/order`);
    setOrderData(data.sort((a, b) => a.id - b.id));
  };
  useAsyncEffect(fetchOrders, []);

  const newOrder = async () => {
    const { data } = await axios.post(`http://localhost:8081/v1/order`, { sandwichId: selectedSandwichId });
    setOrderData([...orderData, data]);
  };

  return (
    <div className="App">
      <div className="header">
        <h1> Welcome to Sandwich app!</h1>
        <p className="appInfo">Order your favourite sandwiches online! We deliver them for you!</p>
      </div>
      <img className="sandwichPic" src={sandwichPic} alt="A person delivering sandwich on a moped" />
      <div className="menu">
        {sandwichData.map((sandwich, index) => (
          <label key={index} className="menuItem">
            <h3>{sandwich.name}</h3>
            <img className="sandwichTypePic" src={SANDWICH_PNG.get(sandwich.name)} alt={sandwich.name} />
            <input type="radio" checked={selectedSandwichId === sandwich.id} onChange={() => setSelectedSandwichId(sandwich.id)} />
          </label>
        ))}
      </div>
      <button className="button orderButton" onClick={newOrder}>Order sandwich</button>
      <OrderList orders={orderData} sandwiches={sandwichData} />
      <button className="button refreshButton" onClick={fetchOrders}>Refresh orders</button>
    </div>
  );
}

export default App;
