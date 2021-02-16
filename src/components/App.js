import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItem from './AddItem';
import Items from './Items';

const endpoint =
  'https://jsonbox.io/box_' + process.env.REACT_APP_JSONBOX_DB_ID;

const App = () => {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const { data, status } = await axios.get(endpoint + '/items');
    if (status === 200) {
      setItems(data);
    }
  };

  const addItem = async (item) => {
    if (item === '') {
      return;
    } else {
      await axios.post(endpoint + '/items', { text: item });
      fetchData();
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(endpoint + `/items/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">To-Do List</h1>
      <AddItem addItem={addItem} />
      <Items items={items} deleteItem={deleteItem} />
    </div>
  );
};

export default App;
