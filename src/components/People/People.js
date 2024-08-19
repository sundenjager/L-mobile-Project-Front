import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./table.css";
import Header from "../MyHeader/Header"; // Assuming you have a Header component


const People = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 45,
      email: "item1@example.com",
      totalAchat: 100,
    },
    {
      id: 2,
      name: "Item 2",
      price: 25,
      email: "item2@example.com",
      totalAchat: 200,
    },
    {
      id: 3,
      name: "Item 3",
      price: 15,
      email: "item3@example.com",
      totalAchat: 300,
    },
    {
      id: 4,
      name: "Item 4",
      price: 35,
      email: "item4@example.com",
      totalAchat: 400,
    },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTotalAchat, setNewTotalAchat] = useState("");
  const [newId, setNewId] = useState("");

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      price: 0,
      email: `item${items.length + 1}@example.com`,
      totalAchat: 0,
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewId(item.id);
    setNewName(item.name);
    setNewPrice(item.price);
    setNewEmail(item.email);
    setNewTotalAchat(item.totalAchat);
  };

  const handleSave = () => {
    const updatedItems = items.map((item) =>
      item.id === editingItem.id
        ? {
            ...item,
            id: newId,
            name: newName,
            price: newPrice,
            email: newEmail,
            totalAchat: newTotalAchat,
          }
        : item
    );
    setItems(updatedItems);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="page-content">
      <Header />
      <h1>People</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Total Achat</th>
              <th style={{ textAlign: "center" }}>Operate</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>{item.id}</td>
                <td style={{ textAlign: "center" }}>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item.price}</td>
                <td style={{ textAlign: "center" }}>{item.email}</td>
                <td style={{ textAlign: "center" }}>{item.totalAchat}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="button-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <button
                    className="button-edit"
                    onClick={() => handleEdit(item)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className="pagination-footer">
                <div className="pagination-content">
                  <button className="pagination-button">
                    <i className="fas fa-chevron-left"></i> Previous
                  </button>
                  <button className="pagination-button">
                    <i className="fas fa-chevron-right"></i> Next
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        {editingItem && (
          <div className="edit-table">
            <h3>Edit Item</h3>
            <table className="small-table">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>
                    <input
                      type="text"
                      value={newId}
                      onChange={(e) => setNewId(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Total Achat</td>
                  <td>
                    <input
                      type="number"
                      value={newTotalAchat}
                      onChange={(e) => setNewTotalAchat(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="button-save" onClick={handleSave}>
              <i className="fas fa-save"></i> Save
            </button>
            <button className="button-cancel" onClick={handleCancel}>
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        )}

        <div className="add-item-form">
          <button className="button-add" onClick={handleAddItem}>
            <i className="fas fa-plus"></i> Add new client
          </button>
        </div>
      </div>
    </div>
  );
};

export default People;
