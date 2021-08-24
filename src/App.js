import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(null)

  // Handle xu lieu thong bao khi nguoi dung thao tac thi se hien thi thong bao
  const handleAlert = (show, msg, type) => {
    setAlert({ show, msg, type });
  };

  //Ham xu li khi nguoi dung mu9on submit du lieu len form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = [...list];
    if (!name)
      return handleAlert(true, "Not name input, please enter input....", "danger");

    if(name && isEdit){
      const newList = list.map(x => {
        if(x.id === editId){
          return {...x, title: name}
        }
        return x;
      })
      setList(newList)
      setName('')
      handleAlert(true, "Update sucessfully", "success")
      setIsEdit(false)
      setEditId(null)
      return
    }
    const newItem = {
      id: Math.random().toString(36).substr(1, 5),
      title: name,
    };
    setList([...newList, newItem]);
    handleAlert(true, "Add new todo success", "success");
    setName("");
  };

  // handle  reset list ve 1 mang rong
  const handleDeleteList = () => {
    handleAlert(true, "List emty....", "danger");
    setList([]);
  };
  // handle Remove 1 item ra khoi list
  const handleDeleteItem = (id) => {
    const newListClone = [...list];
    const newList = newListClone.filter((x) => x.id !== id);
    console.log(newList);
    setList(newList);
    handleAlert(true, "Delete Item successfully", "success")
  };
  // handle edit item
  const handleEditItem = (id) => {
    const findItem = list.find((x) => x.id === id);
    console.log(findItem);
    if (findItem) {
      setName(findItem.title);
      setIsEdit(true)
      setEditId(id)
    }
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={handleAlert} list={list} />
        )}

        <h3>Todo-List</h3>

        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Add Todo..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
             {isEdit ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>

      {/* List todo */}

      {list.length > 0 && (
        <div className="grocery-container">
          <List
            lists={list}
            deleteItems={handleDeleteItem}
            editItem={handleEditItem}
          />
          <button className="clear-btn" onClick={handleDeleteList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
