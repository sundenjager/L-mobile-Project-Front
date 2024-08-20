import React, { useState, useEffect } from "react";
import {
  getPeople,
  updatePeople,
  deletePeople,
  createPeople,
} from "../../api/people";
import "./people.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const People = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [editingItem, setEditingItem] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    companyId: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const people = await getPeople();
        setItems(people);
      } catch (error) {
        console.error("Error fetching people:", error);
        alert("Failed to fetch people");
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
    if (window.confirm("Are you sure you want to delete this person?")) {
      try {
        await deletePeople(id);
        setItems(items.filter((item) => item.id !== id));
        alert("Person deleted successfully");
      } catch (error) {
        console.error("Error deleting person:", error);
        alert("Failed to delete person");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormState({
      id: item.id,
      name: item.name,
      companyId: item.companyId,
    });
    setFormVisible(true);
  };

  const handleSave = async () => {
    if (formState.id) {
      // Update existing person
      try {
        await updatePeople(formState);
        setItems(await getPeople());
        setFormVisible(false);
        setFormState({
          id: "",
          name: "",
          companyId: "",
        });
      } catch (error) {
        console.error("Error updating person:", error);
      }
    } else {
      // Create a new person
      try {
        await createPeople(formState);
        setItems(await getPeople());
        setFormVisible(false);
        setFormState({
          id: "",
          name: "",
          companyId: "",
        });
      } catch (error) {
        console.error("Error creating person:", error);
      }
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setFormState({
      id: "",
      name: "",
      companyId: "",
    });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPerson = () => {
    setEditingItem(null);
    setFormState({
      id: "",
      name: "",
      companyId: "",
    });
    setFormVisible(true);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Company ID</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: "center" }}>{item.id}</td>
              <td style={{ textAlign: "center" }}>{item.name}</td>
              <td style={{ textAlign: "center" }}>{item.companyId}</td>
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
            <td colSpan="4" className="pagination-footer">
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
          <h3>{formState.id ? "Edit Person" : "Add Person"}</h3>
          <table className="small-table">
            <tbody>
              {formState.id && (
                <tr>
                  <td>ID</td>
                  <td>
                    <input
                      type="text"
                      name="id"
                      value={formState.id}
                      readOnly
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Company ID</td>
                <td>
                  <input
                    type="text"
                    name="companyId"
                    value={formState.companyId}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      {!isFormVisible && (
        <div className="add-item-button-container">
          <button
            className="add-item-button"
            onClick={handleAddPerson}
          >
            <i className="fas fa-plus"></i> Add Person
          </button>
        </div>
      )}
    </div>
  );
};

export default People;
