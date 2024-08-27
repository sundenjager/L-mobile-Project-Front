// src/components/MyServiceOrder/DispatcherList.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DispatcherList = ({ dispatchers, onBack, onEdit, onDelete, onAdd }) => {
  return (
    <div className="column">
      <div className="d-flex justify-content-between my-4">
        <button className="btn btn-secondary" onClick={onBack}>
          Back to Orders
        </button>
        <button className="btn btn-primary" onClick={onAdd}>
          Add Dispatcher
        </button>
      </div>

      <div className="row">
        {dispatchers.map((dispatcher) => (
          <div key={dispatcher.id} className="col-md-4 mb-4">
            <div className="card text-center">
              <div className="card-header">Dispatcher ID: {dispatcher.id}</div>
              <div className="card-body">
                <h5 className="card-title">Message: {dispatcher.message}</h5>
                <p className="card-text">
                  Dispatch Date:{" "}
                  {new Date(dispatcher.dispatchDate).toLocaleString()}
                </p>

                <h6>Technicians:</h6>
                <ul className="list-group list-group-flush">
                  {dispatcher.techniciansIds.map((techId, index) => (
                    <li key={index} className="list-group-item">
                      {techId}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => onEdit(dispatcher.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => onDelete(dispatcher.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted">
                {new Date(dispatcher.dispatchDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DispatcherList;
