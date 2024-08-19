import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./table.css";
import Header from "../MyHeader/Header"; // Assuming you have a Header component

const Articles = () => {
  const [items, setItems] = useState([
    { id: 3, name: "Item 3", price: 45, stock: "available" },
    { id: 4, name: "Item 4", price: 25, stock: "available" },
    { id: 5, name: "Item 5", price: 15, stock: "out of stock" },
    { id: 6, name: "Item 6", price: 35, stock: "available" },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newId, setNewId] = useState("");

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: "New Item",
      price: 0,
      stock: "available",
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewName(item.name);
    setNewPrice(item.price);
    setNewId(item.id);
  };

  const handleSave = () => {
    const updatedItems = items.map((item) =>
      item.id === editingItem.id
        ? { ...item, id: newId, name: newName, price: newPrice }
        : item
    );
    setItems(updatedItems);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const toggleStock = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            stock: item.stock === "available" ? "out of stock" : "available",
          }
        : item
    );
    setItems(updatedItems);
  };

  return (
    <div className="page-content">
      <Header />
      <h1>Articles</h1>
      <p>Here is a list of items in our inventory:</p>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ID</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Operate</th>
              <th style={{ textAlign: "center" }}>State</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>{item.id}</td>
                <td style={{ textAlign: "center" }}>
                  {editingItem && editingItem.id === item.id ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {editingItem && editingItem.id === item.id ? (
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {editingItem && editingItem.id === item.id ? (
                    <>
                      <button className="button-save" onClick={handleSave}>
                        <i className="fas fa-save"></i>
                      </button>
                      <button className="button-cancel" onClick={handleCancel}>
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className={
                      item.stock === "available"
                        ? "button-stock-available"
                        : "button-stock-out"
                    }
                    onClick={() => toggleStock(item.id)}
                  >
                    {item.stock}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td id="cols" colSpan="6" className="pagination-footer">
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

        <div className="add-item-form">
          <button className="button-add" onClick={handleAddItem}>
            <i className="fas fa-plus"></i> Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articles;
