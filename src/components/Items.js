import React, { useState } from 'react';
import TodoItem from './TodoItem';

const Items = ({ items, deleteItem }) => {
  const renderedList = items.map((item, index) => {
    return <TodoItem item={item} index={index} deleteItem={deleteItem} />;
  });

  return <div className="items-container">{renderedList}</div>;
};

export default Items;
