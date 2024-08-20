import React, { useState, useEffect } from "react";
import {
  getCompanies,
  updateCompany,
  deleteCompany,
  createCompany,
} from "../../api/company";
import "./company.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Company = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [editingItem, setEditingItem] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    userId: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const companies = await getCompanies();
        setItems(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        alert("Failed to fetch companies");
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
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await deleteCompany(id);
        setItems(items.filter((item) => item.id !== id));
        alert("Company deleted successfully");
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("Failed to delete company");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormState({
      id: item.id,
      name: item.name,
      address: item.address,
      phone: item.phone,
      userId: item.userId,
    });
    setFormVisible(true);
  };

  const handleSave = async () => {
    if (formState.id) {
      // Update existing company
      try {
        await updateCompany(formState);
        setItems(await getCompanies());
        setFormVisible(false);
        setFormState({
          id: "",
          name: "",
          address: "",
          phone: "",
          userId: "",
        });
      } catch (error) {
        console.error("Error updating company:", error);
      }
    } else {
      // Create a new company
      try {
        await createCompany(formState);
        setItems(await getCompanies());
        setFormVisible(false);
        setFormState({
          id: "",
          name: "",
          address: "",
          phone: "",
          userId: "",
        });
      } catch (error) {
        console.error("Error creating company:", error);
      }
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setFormState({
      id: "",
      name: "",
      address: "",
      phone: "",
      userId: "",
    });
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCompany = () => {
    setEditingItem(null);
    setFormState({
      id: "",
      name: "",
      address: "",
      phone: "",
      userId: "",
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
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>User ID</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: "center" }}>{item.id}</td>
              <td style={{ textAlign: "center" }}>{item.name}</td>
              <td style={{ textAlign: "center" }}>{item.address}</td>
              <td style={{ textAlign: "center" }}>{item.phone}</td>
              <td style={{ textAlign: "center" }}>{item.userId}</td>
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
          <h3>{formState.id ? "Edit Company" : "Add Company"}</h3>
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
                <td>Address</td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={formState.address}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>User ID</td>
                <td>
                  <input
                    type="text"
                    name="userId"
                    value={formState.userId}
                    onChange={handleChange}
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
            onClick={handleAddCompany}
          >
            <i className="fas fa-plus"></i> Add Company
          </button>
        </div>
      )}
    </div>
  );
};

export default Company;
