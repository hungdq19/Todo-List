import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ lists, deleteItems, editItem }) => {
  return (
    <div className="grocery-list">
      {lists.map((item) => (
        <article className="grocery-item" key={item.id}>
          <p className="title">{item.title}</p>
          <div className="btn-container">
            <button
              type="button"
              className="edit-btn"
              onClick={() => editItem(item.id)}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteItems(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default List;
