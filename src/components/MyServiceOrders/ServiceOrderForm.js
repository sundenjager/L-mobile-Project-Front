import React, { useState } from "react";

const ServiceOrderForm = ({
  formState,
  handleChange,
  handleSave,
  handleCancel,
  editingOrder,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formState.companyId) newErrors.companyId = "Please fill out this field.";
    if (!formState.userId) newErrors.userId = "Please fill out this field.";
    if (!formState.articlesId) newErrors.articlesId = "Please fill out this field.";
    if (!formState.status) newErrors.status = "Please select a status.";
    if (!formState.progress) newErrors.progress = "Please select a progress.";
    if (!formState.createdAt) newErrors.createdAt = "Please select a creation date.";
    if (!formState.updatedAt) newErrors.updatedAt = "Please select an update date.";

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
        <h3>{editingOrder ? "Edit Service Order" : "Add Service Order"}</h3>

        <div className="mb-3">
          <label htmlFor="companyId" className="form-label">Company ID</label>
          <input
            type="text"
            className={`my-input ${errors.companyId ? "is-invalid" : ""}`}
            id="companyId"
            name="companyId"
            value={formState.companyId}
            onChange={handleChange}
            placeholder="Enter company ID"
            required
          />
          {errors.companyId && <div className="error-message">{errors.companyId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="userId" className="form-label">User ID</label>
          <input
            type="text"
            className={`my-input ${errors.userId ? "is-invalid" : ""}`}
            id="userId"
            name="userId"
            value={formState.userId}
            onChange={handleChange}
            placeholder="Enter user ID"
            required
          />
          {errors.userId && <div className="error-message">{errors.userId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="articlesId" className="form-label">Articles ID</label>
          <input
            type="text"
            className={`my-input ${errors.articlesId ? "is-invalid" : ""}`}
            id="articlesId"
            name="articlesId"
            value={formState.articlesId}
            onChange={handleChange}
            placeholder="Enter articles ID"
            required
          />
          {errors.articlesId && <div className="error-message">{errors.articlesId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className={`my-input ${errors.status ? "is-invalid" : ""}`}
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
            required
          >
            <option value="">Select status</option>
            <option value="New">New</option>
            <option value="ReadyForScheduling">Ready For Scheduling</option>
            <option value="Scheduled">Scheduled</option>
            <option value="InProgress">In Progress</option>
            <option value="TechnicallyCompleted">Technically Completed</option>
            <option value="ReadyForInvoice">Ready For Invoice</option>
            <option value="Invoiced">Invoiced</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <div className="error-message">{errors.status}</div>}
        </div>

        <div className="mb-3">
          <input
            type="hidden"
            className={`my-input ${errors.progress ? "is-invalid" : ""}`}
            id="progress"
            name="progress"
            value="0"
            onChange={handleChange}
            placeholder="Enter progress percentage"
            required
          />
          {errors.progress && <div className="error-message">{errors.progress}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="createdAt" className="form-label">Created At</label>
          <input
            type="date"
            className={`my-input ${errors.createdAt ? "is-invalid" : ""}`}
            id="createdAt"
            name="createdAt"
            value={formState.createdAt}
            onChange={handleChange}
            required
          />
          {errors.createdAt && <div className="error-message">{errors.createdAt}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="updatedAt" className="form-label">Updated At</label>
          <input
            type="date"
            className={`my-input ${errors.updatedAt ? "is-invalid" : ""}`}
            id="updatedAt"
            name="updatedAt"
            value={formState.updatedAt}
            onChange={handleChange}
            required
          />
          {errors.updatedAt && <div className="error-message">{errors.updatedAt}</div>}
        </div>

        <div className="my-buttons">
          <button type="button" className="my-add-button" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save
          </button>
          <button type="button" className="my-add-button my-cancel-button" onClick={handleCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceOrderForm;
