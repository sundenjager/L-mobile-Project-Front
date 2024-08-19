import React from "react";
import Header from "../MyHeader/Header";
import Dashboard from "./dashboard";
import ServiceOrder from "./ServiceOrder";
import TopCreators from "./TopCreators";
import "./Appn.css";

function Appn() {
  return (
    <div className="container-fluid">
      <div className="row">
        <main className="col-md-10 main-content">
          <Header />
          <Dashboard />
          <div className="row">
            <div className="col-md-6">
              <ServiceOrder />
            </div>
            <div className="col-md-6">
              <TopCreators />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Appn;
