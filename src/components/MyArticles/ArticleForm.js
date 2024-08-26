import React, { useState, useEffect } from "react";
import { getItems } from "../../api/User"; // Assuming you have an API function to get the admin data
import './ArticleForm.css';

const ArticleForm = ({
  formState,
  handleChange,
  handleSave,
  handleCancel,
  editingArticle,
}) => {
  const [errors, setErrors] = useState({});
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsData = await getItems();
        setAdmins(adminsData); // Store the entire array of admins
      } catch (error) {
        console.error("Erreur lors de la récupération des administrateurs :", error);
        alert("Failed to fetch administrators");
      }
    };

    fetchAdmins();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.categorie) newErrors.categorie = "Please fill out this field.";

    if (!formState.price || formState.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    const quantity = parseInt(formState.quantity, 10);
    if (isNaN(quantity) || quantity < 0) {
      newErrors.quantity = "Quantity is required and must be a non-negative integer.";
    }

    if (!formState.createdById) newErrors.createdById = "Please fill out this field.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <div className="form-container">
      <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <h3>{editingArticle ? "Edit Article" : "Add Article"}</h3>

        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">
            Please correct the errors below and try again.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="categorie" className="form-label">Category <font color="red">*</font></label>
          <input
            type="text"
            className={`my-input ${errors.categorie ? "is-invalid" : ""}`}
            id="categorie"
            name="categorie"
            value={formState.categorie}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
          {errors.categorie && <div className="error-message">{errors.categorie}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price <font color="red">*</font></label>
          <input
            type="number"
            className={`my-input ${errors.price ? "is-invalid" : ""}`}
            id="price"
            name="price"
            value={formState.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
          {errors.price && <div className="error-message">{errors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity <font color="red">*</font></label>
          <input
            type="number"
            className={`my-input ${errors.quantity ? "is-invalid" : ""}`}
            id="quantity"
            name="quantity"
            value={formState.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
          />
          {errors.quantity && <div className="error-message">{errors.quantity}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="createdBy" className="form-label">Created By <font color="red">*</font></label>
          <select
            className={`my-input ${errors.createdById ? "is-invalid" : ""} custom-select`}
            id="createdBy"
            name="createdById"
            value={formState.createdById}
            onChange={handleChange}
            required
          >
            <option value="">Select an admin</option>
            {admins.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.userName}
              </option>
            ))}
          </select>

          {errors.createdById && <div className="error-message">{errors.createdById}</div>}
        </div>

        <div className="my-buttons">
          <button type="button" className="my-add-button" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save
          </button>
          <button type="button" className="my-add-button my-cancel-button" onClick={handleCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
          <br /><br />
        </div>
        <font color="red">*: Required field</font>
      </form>
    </div>
  );
};

export default ArticleForm;
