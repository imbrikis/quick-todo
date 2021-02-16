import React, { useState, useEffect, useRef } from 'react';

const TodoItem = ({ item, index, deleteItem }) => {
  const [open, setOpen] = useState(false);
  const [promptForDelete, setPromptForDelete] = useState(false);
  const [itemIsBeingDeleted, setItemIsBeingDeleted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      setOpen(false);
      setPromptForDelete(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const promptDelete = () => {
    setPromptForDelete(true);
  };

  const confirmDelete = () => {
    deleteItem(item._id);
    setPromptForDelete(false);
    setOpen(false);
    setItemIsBeingDeleted(true);
  };

  return (
    <div
      ref={ref}
      key={item._id}
      className={`item ${
        !open && !promptForDelete ? '' : 'item-wrapper-bigger'
      }`}
    >
      <div
        className={`list-item-contents ${
          itemIsBeingDeleted ? 'list-item-contents-deleted' : ''
        }`}
      >
        <div className="list-item-text">{`${index + 1}. ${item.text}`}</div>
        <button className="edit-item-btn" onClick={() => setOpen(!open)}>
          <i className="pencil alternate icon icons"></i>
        </button>
      </div>
      <div
        className={`prompt-delete ${
          !promptForDelete ? 'prompt-not-visible' : 'prompt-visible'
        }`}
      >
        <i class="ban icon icons" onClick={() => setPromptForDelete(false)}></i>
        Delete To-do?
        <i class="check icon icons" onClick={confirmDelete}></i>
      </div>
      <div
        className={`edit-controls-container ${
          !open || promptForDelete ? 'not-visible' : 'visible'
        }`}
      >
        <i className="save outline icon icons"></i>
        <i
          className="trash alternate outline icon icons"
          onClick={promptDelete}
        ></i>
      </div>
    </div>
  );
};

export default TodoItem;
