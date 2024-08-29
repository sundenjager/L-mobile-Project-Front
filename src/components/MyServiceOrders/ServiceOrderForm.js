import React, { useState, useEffect, useRef } from "react";
import { getArticles } from '../../api/ArticleService';
import { getCompanies } from '../../api/company';
import { getItems } from '../../api/User';

import './table.css';

const ServiceOrderForm = ({
  formState = {}, // Default to an empty object
  handleChange,
  handleSave,
  handleCancel,
  editingOrder,
  formErrorMessage,
}) => {
  const [errors, setErrors] = useState({});
  const [companies, setCompanies] = useState([]);
  const [articles, setArticles] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const inputRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
        const articlesData = await getArticles();
        setArticles(articlesData);
        const techniciansData = await getItems(); // Assuming getItems fetches technicians
        setTechnicians(techniciansData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.companyId) newErrors.companyId = "Please select a company.";
    if (!formState.userId) newErrors.userId = "Please select a user.";
    if (!formState.articlesId.trim()) newErrors.articlesId = "Please enter article IDs.";
    if (!formState.status) newErrors.status = "Please select a status.";
    if (!formState.createdAt) newErrors.createdAt = "Please select a creation date.";
    if (!formState.updatedAt) newErrors.updatedAt = "Please select an update date.";

    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey && inputRefs.current[firstErrorKey]) {
      inputRefs.current[firstErrorKey].focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Convert comma-separated article IDs to array
      const articleIdsArray = formState.articlesId.split(',').map(id => id.trim()).filter(id => id);
      handleSave({ ...formState, articlesId: articleIdsArray });
    }
  };

  return (
    <div className="form-container">
      <form className="service-order-form" onSubmit={(e) => e.preventDefault()}>
        <h3>{editingOrder ? "Edit Service Order" : "Add Service Order"}</h3>

        {formErrorMessage && (
          <div className="alert alert-danger" role="alert">
            {formErrorMessage}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="companyId">
            Company <span className="text-danger">*</span>
          </label>
          <select
            id="companyId"
            name="companyId"
            className={`my-input ${errors.companyId ? "is-invalid" : ""}`}
            value={formState.companyId || ""}
            onChange={handleChange}
            ref={(el) => inputRefs.current.companyId = el}
            required
          >
            <option value="">Select a company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
          {errors.companyId && <div className="invalid-feedback">{errors.companyId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="userId">
            User <span className="text-danger">*</span>
          </label>
          <select
            id="userId"
            name="userId"
            className={`my-input ${errors.userId ? "is-invalid" : ""}`}
            value={formState.userId || ""}
            onChange={handleChange}
            ref={(el) => inputRefs.current.userId = el}
            required
          >
            <option value="">Select a user</option>
            {technicians.map(tech => (
              <option key={tech.id} value={tech.id}>{tech.userName}</option>
            ))}
          </select>
          {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="articlesId">
            Articles <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="articlesId"
            name="articlesId"
            className={`my-input ${errors.articlesId ? "is-invalid" : ""}`}
            value={formState.articlesId || ""}
            onChange={handleChange}
            ref={(el) => inputRefs.current.articlesId = el}
            placeholder="Enter article IDs separated by commas"
            required
          />
          {errors.articlesId && <div className="invalid-feedback">{errors.articlesId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="status">
            Status <span className="text-danger">*</span>
          </label>
          <select
            id="status"
            name="status"
            className={`my-input ${errors.status ? "is-invalid" : ""}`}
            value={formState.status || ""}
            onChange={handleChange}
            ref={(el) => inputRefs.current.status = el}
            required
          >
            <option value="">Select status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <div className="invalid-feedback">{errors.status}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="createdAt">
            Created At <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            id="createdAt"
            name="createdAt"
            className={`my-input ${errors.createdAt ? "is-invalid" : ""}`}
            value={formState.createdAt || ""}
            onChange={handleChange}
            ref={(el) => inputRefs.current.createdAt = el}
            required
          />
          {errors.createdAt && <div className="invalid-feedback">{errors.createdAt}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="updatedAt">
            Updated At <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            id="updatedAt"
            name="updatedAt"
            className={`my-input ${errors.updatedAt ? "is-invalid" : ""}`}
            value={formState.updatedAt || ""}
            onChange={handleChange}
            ref={(el) => inputRefs.current.updatedAt = el}
            required
          />
          {errors.updatedAt && <div className="invalid-feedback">{errors.updatedAt}</div>}
        </div>

        <div className="my-buttons">
          <button type="button" className="add-button" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" className="add-button cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceOrderForm;
