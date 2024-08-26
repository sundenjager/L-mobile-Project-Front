import React, { useState, useEffect } from "react";
import { getItems } from "../../api/User"; // Assuming you have an API function to get the user data

const CompanyTable = ({
  companies,
  currentCompanies,
  handleDelete,
  handleEdit,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
  handleAddCompany,
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getItems();
        setUsers(usersData); // Store the entire array of users
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const userMap = new Map(users.map(user => [user.id, user.userName]));

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Technician</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company) => (
            <tr key={company.id}>
              <td style={{ textAlign: "center" }}>{company.id}</td>
              <td style={{ textAlign: "center" }}>{company.name}</td>
              <td style={{ textAlign: "center" }}>{company.address}</td>
              <td style={{ textAlign: "center" }}>{company.phone}</td>
              <td style={{ textAlign: "center" }}>
                {userMap.get(company.userId) || 'Unknown'}
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(company.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleEdit(company)}
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

      <div className="add-item-button-container">
        <button className="add-button" onClick={handleAddCompany}>
          +Add
        </button>
      </div>
    </div>
  );
};

export default CompanyTable;
