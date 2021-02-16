import React, { useState } from 'react';

const AddItem = ({ addItem }) => {
  const [value, setValue] = useState('');

  const submitNote = (e) => {
    e.preventDefault();
    addItem(value);
    setValue('');
  };

  return (
    <form onSubmit={submitNote} className="add-item-container">
      <input
        className="input-field"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter task item..."
      />
      <button className="add-item-btn" type="submit">
        add
      </button>
    </form>
  );
};

export default AddItem;
