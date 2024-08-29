import React, { useState } from "react";
import './DispatchForm.css'; // Import the CSS file

const DispatchForm = ({ formState, handleChange, handleSave, handleCancel }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!formState.technician) {
      formErrors.technician = "Please select a technician.";
    }
    if (!formState.dispatchDate) {
      formErrors.dispatchDate = "Please select a date.";
    }
    if (!formState.message) {
      formErrors.message = "Please enter a message.";
    }
    if (!formState.serviceOrderId) {
      formErrors.serviceOrderId = "Please enter a service order ID.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <div className="form-container">
      <h1>Dispatch Form</h1>

      {/* Message d'alerte pour les erreurs */}
      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger" role="alert">
          Please correct the errors below and try again!
        </div>
      )}

      <form>
        <div className="form-group">
          <label htmlFor="technician">Technician<font color="red">*</font></label>
          <select
            id="technician"
            name="technician"
            value={formState.technician}
            onChange={handleChange}
            className={errors.technician ? "error" : ""}
          >
            <option value="">Select</option>
            <option value="technician1">Technician 1</option>
            <option value="technician2">Technician 2</option>
          </select>
          {errors.technician && (
            <span className="error-message">{errors.technician}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dispatchDate">Dispatch Date<font color="red">*</font></label>
          <input
            type="date"
            id="dispatchDate"
            name="dispatchDate"
            value={formState.dispatchDate}
            onChange={handleChange}
            className={errors.dispatchDate ? "error" : ""}
          />
          {errors.dispatchDate && (
            <span className="error-message">{errors.dispatchDate}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message<font color="red">*</font></label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            className={errors.message ? "error" : ""}
          />
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="serviceOrderId">Service Order ID<font color="red">*</font></label>
          <input
            type="text"
            id="serviceOrderId"
            name="serviceOrderId"
            value={formState.serviceOrderId}
            onChange={handleChange}
            className={errors.serviceOrderId ? "error" : ""}
          />
          {errors.serviceOrderId && (
            <span className="error-message">{errors.serviceOrderId}</span>
          )}
        </div>
        <div className="button-container">
          <button className="button button-save" onClick={handleSaveClick}>
            Save
          </button>
          <button className="button button-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <br />
        <font color="red">*: Required field</font>
      </form>
    </div>
  );
};

export default DispatchForm;
