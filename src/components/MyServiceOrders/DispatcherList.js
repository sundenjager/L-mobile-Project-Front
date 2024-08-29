import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DispatcherList = ({ dispatchers, onBack, onEdit, onDelete, onAdd }) => {
  return (
    <div className="column">
      <div className="d-flex justify-content-between my-4">
        <button className="btn btn-secondary" onClick={onBack}>
          Back to Orders
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onAdd(dispatchers[0]?.serviceOrderId)} // Pass serviceOrderId to the onAdd function
        >
          Add Dispatcher
        </button>
      </div>

      <div className="row">
        {dispatchers.map((dispatcher) => (
          <div key={dispatcher.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{dispatcher.technicianName}</h5>
                <p className="card-text">
                  <strong>Date:</strong> {dispatcher.dispatchDate}
                  <br />
                  <strong>Message:</strong> {dispatcher.message}
                </p>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => onEdit(dispatcher.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(dispatcher.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DispatcherList;
