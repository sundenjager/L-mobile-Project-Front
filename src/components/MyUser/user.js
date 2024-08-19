import React, { useState, useEffect } from "react";
import {
  getItems,
  UpdateUser,
  deleteUser,
  changeUserRole,
} from "../../api/User";
import "./user.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const User = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [editingItem, setEditingItem] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    userName: "",
    phoneNumber: "",
    email: "",
    Accesslevel: "User",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const users = await getItems();
        setItems(users);
        // Optionally set initial form state if needed
        if (users.length > 0) {
          setFormState({
            ...formState,
            ...users[0], // This example assumes you set formState to the first user for editing
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        alert("Failed to fetch users");
      }
    };

    fetchItems();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        const filteredItems = items.filter((item) => item.id !== id);
        setItems(filteredItems);
        alert("User deleted successfully");
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
        alert("Failed to delete user");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormState(item);
    setFormVisible(true);
  };

  const handleUpdateUser = async (updatedItem) => {
    try {
      const updatedUser = await UpdateUser(updatedItem);
      console.log("Utilisateur mis à jour avec succès :", updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  const handleSave = () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        ...formState,
        Accesslevel: editingItem.Accesslevel, // Keep the original role
      };
      const updatedItems = items.map((item) =>
        item.id === editingItem.id ? updatedItem : item
      );
      setItems(updatedItems);
      handleUpdateUser(updatedItem);
    } else {
      const newItem = {
        ...formState,
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      };
      setItems([...items, newItem]);
    }
    setEditingItem(null);
    setFormVisible(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormVisible(false);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
    setEditingItem(null);
    setFormState({
      id: "",
      userName: "",
      phoneNumber: "",
      email: "",
      Accesslevel: "User",
    });
    setFormVisible(true);
  };

  const handleChangeRole = async (email, newRole) => {
    try {
      await changeUserRole(email, newRole);
      alert("User role changed successfully");
      // Optionally, refetch items or update the state
      const users = await getItems();
      setItems(users);
    } catch (error) {
      console.error(
        "Erreur lors du changement de rôle de l'utilisateur :",
        error
      );
      alert("Failed to change user role");
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Phone Number</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Access Level</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: "center" }}>{item.id}</td>
              <td style={{ textAlign: "center" }}>{item.userName}</td>
              <td style={{ textAlign: "center" }}>{item.phoneNumber}</td>
              <td style={{ textAlign: "center" }}>{item.email}</td>
              <td style={{ textAlign: "center" }}>
                <select
                  className="list"
                  value={item.Accesslevel} // Ensure the select reflects the current role
                  onChange={(e) => handleChangeRole(item.email, e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
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
            <td colSpan="5" className="pagination-footer">
              <div className="pagination-content">
                <button
                  className="pagination-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {isFormVisible && (
        <div className="edit-table">
          <h3>{editingItem ? "Edit Item" : "Add User"}</h3>
          <table className="small-table">
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    name="id"
                    value={formState.id}
                    onChange={handleChange}
                    disabled={editingItem !== null}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="userName"
                    value={formState.userName}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
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
        <button className="button-add" onClick={handleAddUser}>
          <i className="fas fa-plus"></i> Add user
        </button>
      </div>
    </div>
  );
};

export default User;
