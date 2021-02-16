import React, { useState, useEffect, useRef } from 'react';

const TodoItem = ({ item, index, deleteItem }) => {
  const [open, setOpen] = useState(false);
  const [promptForDelete, setPromptForDelete] = useState(false);
  const [promptForEdit, setPromptForEdit] = useState(false);
  const [itemIsBeingDeleted, setItemIsBeingDeleted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      setOpen(false);
      setPromptForDelete(false);
      setPromptForEdit(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const confirmDelete = () => {
    deleteItem(item._id);
    setPromptForDelete(false);
    setOpen(false);
    setItemIsBeingDeleted(true);
  };

  const editTodo = (x) => {
    console.log(x);
  };

  return (
    <div
      ref={ref}
      key={item._id}
      className={`item ${
        !open && !promptForDelete && !promptForEdit ? '' : 'item-wrapper-bigger'
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
          !promptForDelete
            ? 'prompt-delete-not-visible'
            : 'prompt-delete-visible'
        }`}
      >
        <i
          className="ban icon icons ban-icon-delete"
          onClick={() => setPromptForDelete(false)}
        ></i>
        Delete To-do?
        <i className="check icon icons" onClick={confirmDelete}></i>
      </div>

      <div
        className={`prompt-edit ${
          !promptForEdit ? 'prompt-edit-not-visible' : 'prompt-edit-visible'
        }`}
      >
        <i
          className="ban icon icons ban-icon-edit"
          onClick={() => setPromptForEdit(false)}
        ></i>
        Edit, then click save
        <i
          className="save outline icon icons save-edit"
          onClick={() => editTodo('make me work')}
        ></i>
      </div>

      <div
        className={`edit-controls-container ${
          !open || promptForDelete || promptForEdit ? 'not-visible' : 'visible'
        }`}
      >
        <i
          className="save outline icon icons save-main-icon"
          onClick={() => setPromptForEdit(true)}
        ></i>
        <i
          className="trash alternate outline icon icons"
          onClick={() => setPromptForDelete(true)}
        ></i>
      </div>
    </div>
  );
};

export default TodoItem;
