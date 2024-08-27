// src/components/ServiceOrder/ServiceOrderTable.js
import React, { useEffect, useState } from "react";
import { getCompanies } from "../../api/company";
import { getItems } from "../../api/User";

const ServiceOrderTable = ({
  serviceOrders,
  currentServiceOrders,
  handleDelete,
  handleEdit,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
  handleAddServiceOrder,
  handleViewAllDispatchers,
}) => {
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch companies and users when the component mounts
    const fetchCompaniesAndUsers = async () => {
      try {
        const fetchedCompanies = await getCompanies();
        const fetchedUsers = await getItems();
        setCompanies(fetchedCompanies);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching companies or users", error);
      }
    };

    fetchCompaniesAndUsers();
  }, []);

  const getCompanyName = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "Unknown";
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.username : "Unknown";
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Company</th>
            <th style={{ textAlign: "center" }}>Created By</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Progress</th>
            <th style={{ textAlign: "center" }}>Created At</th>
            <th style={{ textAlign: "center" }}>Dispatchers</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentServiceOrders.map((order) => (
            <tr key={order.id}>
              <td style={{ textAlign: "center" }}>{order.id}</td>
              <td style={{ textAlign: "center" }}>
                {getCompanyName(order.companyId)}
              </td>
              <td style={{ textAlign: "center" }}>
                {getUserName(order.username)}
              </td>
              <td style={{ textAlign: "center" }}>{order.status}</td>
              <td style={{ textAlign: "center" }}>{order.progress}</td>
              <td style={{ textAlign: "center" }}>
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td style={{ textAlign: "center" }}>
                {order.dispatchers.length} Dispatchers
                <button
                  className="button-details"
                  onClick={() => handleViewAllDispatchers(order.id)}
                >
                  View All Dispatchers
                </button>
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(order.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleEdit(order)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8" className="pagination-footer">
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

      <div className="add-item-form">
        <button className="add-button" onClick={handleAddServiceOrder}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default ServiceOrderTable;
