import React, { useState, useEffect } from "react";
import { getCompanies } from "../../api/company";
import { getArticles } from "../../api/ArticleService";
import { getItems as getUsers } from "../../api/User";
import "./table.css";


const ServiceOrderForm = ({
  formState = {},
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
        alert("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!editingOrder) {
      const today = new Date().toISOString();
      handleChange({ target: { name: "createdAt", value: today } });
      handleChange({ target: { name: "updatedAt", value: today } });
    }
  }, [editingOrder, handleChange]);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.companyId) newErrors.companyId = "Please select a company.";
    if (!formState.userId) newErrors.userId = "Please select a user.";
    if (!Array.isArray(formState.articleIds) || !formState.articleIds.length)
      newErrors.articleIds = "Please select at least one article.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const payload = {
          companyId: formState.companyId,
          userId: formState.userId,
          articleIds: formState.articleIds.map((id) => parseInt(id, 10)), // Ensure IDs are numbers
          status: formState.status || "New",
          progress: formState.progress || "0",
          createdAt: formState.createdAt || new Date().toISOString(),
          updatedAt: formState.updatedAt || new Date().toISOString(),
          dispatchers: formState.dispatchers || [], // Ensure dispatchers are correctly set
        };

        await handleSave(payload);
        alert("Service order saved successfully");
      } catch (error) {
        console.error(
          "Failed to save service order:",
          error.response ? error.response.data : error.message
        );
        alert("Failed to save service order. Please check the console for details.");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <h3>{editingOrder ? "Edit Service Order" : "Add Service Order"}</h3>

        {/* Error Alert */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger" role="alert">
            Please correct the errors below and try again.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="companyId" className="form-label">
            Company <font color="red">*</font>
          </label>
          <select
            className={`my-input ${errors.companyId ? "is-invalid" : ""}`}
            id="companyId"
            name="companyId"
            value={formState.companyId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {errors.companyId && (
            <div className="error-message">{errors.companyId}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            Created by <font color="red">*</font>
          </label>
          <select
            className={`my-input ${errors.userId ? "is-invalid" : ""}`}
            id="userId"
            name="userId"
            value={formState.userId || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.userName}
              </option>
            ))}
          </select>
          {errors.userId && (
            <div className="error-message">{errors.userId}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="articleIds" className="form-label">
            Articles (comma-separated IDs) <font color="red">*</font>
          </label>
          <input
            type="text"
            className={`my-input ${errors.articleIds ? "is-invalid" : ""}`}
            id="articleIds"
            name="articleIds"
            value={(formState.articleIds || []).join(", ")}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "articleIds",
                  value: e.target.value.split(",").map((id) => id.trim()),
                },
              })
            }
            placeholder="Enter article IDs"
            required
          />
          {errors.articleIds && (
            <div className="error-message">{errors.articleIds}</div>
          )}
        </div>

        <input
          type="hidden"
          name="status"
          value={formState.status || "New"}
        />

        <input
          type="hidden"
          name="progress"
          value={formState.progress || "0"}
        />

        <input
          type="hidden"
          name="createdAt"
          value={formState.createdAt || new Date().toISOString()}
        />

        <input
          type="hidden"
          name="updatedAt"
          value={formState.updatedAt || new Date().toISOString()}
        />

        <div className="my-buttons">
          <button type="button" className="my-add-button" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save
          </button>
          <button
            type="button"
            className="my-add-button my-cancel-button"
            onClick={handleCancel}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
        <br /> <br />
        <font color="red">*: Required field</font>
      </form>
    </div>
  );
};

export default ServiceOrderForm;
