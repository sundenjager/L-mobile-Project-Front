// src/components/Article/ArticleTable.js
import React, { useState, useEffect } from "react";
import { getItems } from "../../api/User"; // Assuming you have an API function to get the admin data

const ArticleTable = ({
  articles,
  currentArticles,
  handleDelete,
  handleEdit,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
  handleAddArticle,
   // Recevez les utilisateurs ici
}) => {
  // Créez une map des IDs d'utilisateurs aux noms d'utilisateurs
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
  console.log("test",admins)
  const userMap = new Map(admins.map(user => [user.id, user.userName]));
  console.log(articles)
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Category</th>
            <th style={{ textAlign: "center" }}>Price</th>
            <th style={{ textAlign: "center" }}>Quantity</th>
            <th style={{ textAlign: "center" }}>Created By</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => (
            <tr key={article.id}>
              <td style={{ textAlign: "center" }}>{article.id}</td>
              <td style={{ textAlign: "center" }}>{article.categorie}</td>
              <td style={{ textAlign: "center" }}>{article.price}</td>
              <td style={{ textAlign: "center" }}>{article.quantite}</td>
              <td style={{ textAlign: "center" }}>
                {userMap.get(article.createdById) || 'Unknown'}
              </td>
              <td style={{ textAlign: "center" }}>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(article.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
                <button
                  className="button-edit"
                  onClick={() => handleEdit(article)}
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

      <div className="add-item-form">
        <button className="add-button" onClick={handleAddArticle}>
          +Add
        </button>
      </div>
    </div>
  );
};

export default ArticleTable;
