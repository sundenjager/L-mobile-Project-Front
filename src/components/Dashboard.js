import React, { useState } from "react";
import Sidebar from "./SideBar/Sidebar";
import MainContainer from "./MainContainer/MainContainer";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("");

  const handleSelect = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="app-container">
      <Sidebar onSelect={handleSelect} />
      <MainContainer content={selectedPage} />
    </div>
  );
};

export default Dashboard;
