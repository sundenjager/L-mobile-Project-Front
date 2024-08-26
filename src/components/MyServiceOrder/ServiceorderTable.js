import React from "react";

const ServiceOrderTable = ({
  serviceOrders,
  currentOrders,
  handleDelete,
  handleEdit,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
  handleAddOrder,
}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Company ID</th>
            <th style={{ textAlign: "center" }}>User ID</th>
            <th style={{ textAlign: "center" }}>Articles ID</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Progress</th>
            <th style={{ textAlign: "center" }}>Created At</th>
            <th style={{ textAlign: "center" }}>Updated At</th>
            <th style={{ textAlign: "center" }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td style={{ textAlign: "center" }}>{order.id}</td>
              <td style={{ textAlign: "center" }}>{order.companyId}</td>
              <td style={{ textAlign: "center" }}>{order.userId}</td>
              <td style={{ textAlign: "center" }}>{order.articlesId}</td>
              <td style={{ textAlign: "center" }}>{order.status}</td>
              <td style={{ textAlign: "center" }}>{order.progress}</td>
              <td style={{ textAlign: "center" }}>{order.createdAt}</td>
              <td style={{ textAlign: "center" }}>{order.updatedAt}</td>
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
            <td colSpan="9" className="pagination-footer">
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
        <button className="add-button" onClick={handleAddOrder}>
          +Add
        </button>
      </div>
    </div>
  );
};

export default ServiceOrderTable;
