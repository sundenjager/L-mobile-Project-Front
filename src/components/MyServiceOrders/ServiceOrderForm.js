import React, { useState, useEffect } from "react";
import { getCompanies } from "../../api/company";
import { getArticles } from "../../api/ArticleService";
import { getItems as getUsers } from "../../api/User";

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await getCompanies();
        setCompanies(companyData);
        const articleData = await getArticles();
        setArticles(articleData);
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!editingOrder) {
      const today = new Date().toISOString().split('T')[0];
      handleChange({ target: { name: 'createdAt', value: today } });
      handleChange({ target: { name: 'updatedAt', value: today } });
    }
  }, [editingOrder, handleChange]);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.companyId) newErrors.companyId = "Please select a company.";
    if (!formState.userId) newErrors.userId = "Please select a user.";
    if (!formState.articlesId || formState.articlesId.length === 0) newErrors.articlesId = "Please provide at least one article ID.";
    if (!formState.status) newErrors.status = "Status is required.";
    if (!formState.progress) newErrors.progress = "Progress is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleArticleChange = (e) => {
    const { value } = e.target;
    const articleIds = value.split(',').map(id => id.trim()).filter(id => id !== "");
    handleChange({ target: { name: 'articlesId', value: articleIds } });
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
          <label htmlFor="companyId" className="form-label">Company</label>
          <select
            className={`my-input ${errors.companyId ? "is-invalid" : ""}`}
            id="companyId"
            name="companyId"
            value={formState.companyId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>{company.name}</option>
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
            value={formState.userId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.userName}</option>
            ))}
          </select>
          {errors.userId && <div className="error-message">{errors.userId}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="articlesId" className="form-label">Article IDs (comma-separated)</label>
          <input
            type="text"
            id="articlesId"
            name="articlesId"
            className={`my-input ${errors.articlesId ? "is-invalid" : ""}`}
            value={formState.articlesId ? formState.articlesId.join(', ') : ''}
            onChange={handleArticleChange}
            placeholder="Enter article IDs, separated by commas"
            required
          />
          {errors.articlesId && <div className="error-message">{errors.articlesId}</div>}
        </div>

        <input
          type="hidden"
          name="status"
          value="New"
        />
       
        <input
          type="hidden"
          name="progress"
          value="0"
        />

        <input
          type="hidden"
          name="createdAt"
          value={formState.createdAt || new Date().toISOString().split('T')[0]}
        />

        <input
          type="hidden"
          name="updatedAt"
          value={formState.updatedAt || new Date().toISOString().split('T')[0]}
        />

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
