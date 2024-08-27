import React, { useState, useEffect, useRef } from "react";
import { getCompanies } from "../../api/company";
import { getArticles } from "../../api/ArticleService";
import { getItems } from "../../api/User";
import './table.css';

const ServiceOrderForm = ({
  formState,
  handleChange,
  handleSave,
  handleCancel,
  editingOrder,
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
        const articlesData = await getArticles();
        const techniciansData = await getItems();

        setCompanies(companiesData);
        setArticles(articlesData);
        setTechnicians(techniciansData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set default values for hidden fields
    if (!editingOrder) {
      handleChange({
        target: { name: 'status', value: 'New' }
      });
      handleChange({
        target: { name: 'progress', value: 0 }
      });
      handleChange({
        target: { name: 'createdAt', value: new Date().toISOString().split('T')[0] }
      });
      handleChange({
        target: { name: 'updatedAt', value: new Date().toISOString().split('T')[0] }
      });
    }
  }, [editingOrder, handleChange]);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.companyId) newErrors.companyId = "Please select a company.";
    if (!formState.userId) newErrors.userId = "Please select a user.";
    if (!formState.articlesId) newErrors.articlesId = "Please select an article.";

    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey && inputRefs.current[firstErrorKey]) {
      inputRefs.current[firstErrorKey].focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const updatedFormState = {
        ...formState,
        status: formState.status || 'New',
        progress: formState.progress || '0',
        createdAt: formState.createdAt || new Date().toISOString().split('T')[0],
        updatedAt: formState.updatedAt || new Date().toISOString().split('T')[0],
      };
      handleSave(updatedFormState);
    }
  };
  

  return (
    <div className="form-container">
      <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <h3>{editingOrder ? "Edit Service Order" : "Add Service Order"}</h3>

        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">
            Please correct the errors below and try again.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="companyId" className="form-label">Company</label>
          <select
            className={`my-input ${errors.companyId ? "is-invalid" : ""}`}
            id="companyId"
            name="companyId"
            value={formState.companyId}
            onChange={handleChange}
            required
            ref={(el) => inputRefs.current.companyId = el}
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {errors.companyId && <div className="error-message">{errors.companyId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="userId" className="form-label">Created by</label>
          <select
            className={`my-input ${errors.userId ? "is-invalid" : ""}`}
            id="userId"
            name="userId"
            value={formState.userId}
            onChange={handleChange}
            required
            ref={(el) => inputRefs.current.userId = el}
          >
            <option value="">Select</option>
            {technicians.map((user) => (
              <option key={user.id} value={user.id}>
                {user.userName}
              </option>
            ))}
          </select>
          {errors.userId && <div className="error-message">{errors.userId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="articlesId" className="form-label">Article</label>
          <select
            className={`my-input ${errors.articlesId ? "is-invalid" : ""}`}
            id="articlesId"
            name="articlesId"
            value={formState.articlesId}
            onChange={handleChange}
            required
            ref={(el) => inputRefs.current.articlesId = el}
          >
            <option value="">Select an article</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>
                {article.categorie}
              </option>
            ))}
          </select>
          {errors.articlesId && <div className="error-message">{errors.articlesId}</div>}
        </div>

        {/* Hidden fields */}
        <input
          type="hidden"
          name="status"
          value={formState.status || 'New'}
          ref={(el) => inputRefs.current.status = el}
        />
        <input
          type="hidden"
          name="progress"
          value={formState.progress || 0}
          ref={(el) => inputRefs.current.progress = el}
        />
        <input
          type="hidden"
          name="createdAt"
          value={formState.createdAt || new Date().toISOString().split('T')[0]}
          ref={(el) => inputRefs.current.createdAt = el}
        />
        <input
          type="hidden"
          name="updatedAt"
          value={formState.updatedAt || new Date().toISOString().split('T')[0]}
          ref={(el) => inputRefs.current.updatedAt = el}
        />

        <div className="my-buttons">
          <button type="button" className="add-button" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save
          </button>
          <button type="button" className="add-button cancel-button" onClick={handleCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceOrderForm;
