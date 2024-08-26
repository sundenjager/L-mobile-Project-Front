// src/components/Article/ArticleTable.js
import React from "react";

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
}) => {
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
              <td style={{ textAlign: "center" }}>{article.createdById}</td>
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
