import React from "react";
import Dashboard from "../dashboard/dashboard";
import Articles from "../MyArticles/MyDashBoard";
import Appn from "../dashboard/Appn";
import People from "../People/People";
import User from "../MyUser/user";
import Company from "../MyCompany/company";

const MainContainer = ({ content }) => {
  const renderContent = () => {
    switch (content) {
      case "Dashboard":
        return <Appn />;
      case "Articles":
        return <Articles />;
      case "People":
        return <People />;
      case "Companies":
        return <Company/>;
      case "Users":
        return <User/>
      case "contact":
        return <h1>Contact Us</h1>;
      default:
        return <h1>Select a page from the sidebar</h1>;
    }
  };

  return <div className="main-container">{renderContent()}</div>;
};

export default MainContainer;
