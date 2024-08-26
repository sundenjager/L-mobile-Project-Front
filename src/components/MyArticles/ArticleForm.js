import React, { useState } from "react";

const ArticleForm = ({
  formState,
  handleChange,
  handleSave,
  handleCancel,
  editingArticle,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formState.category) newErrors.category = "Please fill out this field.";

    if (!formState.price || formState.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    // Convert quantity to a number and check for valid non-negative integer
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

        {/* Error Alert */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">
            Please correct the errors below and try again.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category <font color="red">*</font></label>
          <input
            type="text"
            className={`my-input ${errors.category ? "is-invalid" : ""}`}
            id="category"
            name="category"
            value={formState.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
          {errors.category && <div className="error-message">{errors.category}</div>}
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
          <input
            type="text"
            className={`my-input ${errors.createdById ? "is-invalid" : ""}`}
            id="createdBy"
            name="createdById"
            value={formState.createdById}
            onChange={handleChange}
            placeholder="Enter creator's name"
            required
          />
          {errors.createdById && <div className="error-message">{errors.createdById}</div>}
        </div>

        <div className="my-buttons">
          <button type="button" className="my-add-button" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save
          </button>
          <button type="button" className="my-add-button my-cancel-button" onClick={handleCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
          <br/> <br/>
          
        </div>
        <font color="red">*: Champ obligatoire</font>
      </form>
    </div>
  );
};

export default ArticleForm;
