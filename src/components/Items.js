import React, { useState } from 'react';

const Items = ({ items, deleteItem }) => {
  const [isVisible, setIsVisible] = useState(false);

  const renderedList = items.map((item, index) => {
    return (
      <div
        className={`item-wrapper ${!isVisible ? '' : 'item-wrapper-bigger'}`}
        key="item._id"
      >
        <div className="item-container">
          <div className="list-item-text">{`${index + 1}. ${item.text}`}</div>
          <button
            className="edit-item-btn"
            onClick={() => setIsVisible(!isVisible)}
          >
            {' '}
            {/*onClick={() => deleteItem(item._id)}*/}
            <i className="pencil alternate icon icons"></i>
          </button>
        </div>
        <div
          className={`edit-controls-container ${
            !isVisible ? 'not-visible' : 'visible'
          }`}
        >
          <i className="save outline icon icons"></i>
          <i
            className="trash alternate outline icon icons"
            onClick={() => deleteItem(item._id)}
          ></i>{' '}
          {/* Add confirmation for delete here */}
        </div>
      </div>
    );
  });

  return <div>{renderedList}</div>;
};

export default Items;
