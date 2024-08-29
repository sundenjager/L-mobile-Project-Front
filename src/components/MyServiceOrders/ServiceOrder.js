import React, { useState, useEffect } from "react";
import ServiceOrderTable from "./ServiceOrderTable";
import Header from "../MyHeader/Header";
import ServiceOrderForm from "./ServiceOrderForm";
import DispatcherList from "./DispatcherList";
import DispatchForm from "./DispatchForm"; // Import DispatchForm
import useNavigation from "./NavigationService";
import { getServiceOrders, deleteServiceOrder } from "../../api/ServiceOrder";
import { getCompanies } from "../../api/company";

const ServiceOrder = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formState, setFormState] = useState({
    companyId: "",
    userId: "",
    articlesId: "",
    status: "",
    progress: "0",
    createdAt: "",
    updatedAt: "",
    serviceOrderId: "", // Add serviceOrderId to formState
  });

  const [isDispatchFormVisible, setDispatchFormVisible] = useState(false); // Track dispatch form visibility

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const ordersData = await getServiceOrders();
        setServiceOrders(ordersData);
      } catch (error) {
        console.error("Error fetching service orders:", error);
        alert("Failed to fetch service orders");
      }
    };

    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
        alert("Failed to fetch companies");
      }
    };

    fetchServiceOrders();
    fetchCompanies();
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      await deleteServiceOrder(id);
      setServiceOrders(serviceOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting service order:", error);
      alert("Failed to delete service order");
    }
  };

  const handleAddServiceOrder = () => {
    setFormState({
      companyId: "",
      userId: "",
      articlesId: "",
      status: "",
      progress: "0",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      serviceOrderId: "", // Reset the form state for a new order
    });
    showForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSave = () => {
    // Implement save logic for service order form
    backToTable(); // Navigate back to the table after saving
  };

  const handleCancelForm = () => {
    backToTable(); // Cancel the form and go back to the table
  };

  const handleEditDispatcher = (dispatcherId) => {
    // Implement logic to edit a dispatcher
  };

  const handleDeleteDispatcher = (dispatcherId) => {
    // Implement logic to delete a dispatcher
  };

  const handleAddDispatcher = (serviceOrderId) => {
    setFormState((prevState) => ({
      ...prevState,
      serviceOrderId, // Set the service order ID in the form state
    }));
    setDispatchFormVisible(true); // Show the dispatch form
  };

  const handleSaveDispatchForm = () => {
    // Handle save logic for dispatch form
    setDispatchFormVisible(false); // Hide the dispatch form after saving
  };

  const handleCancelDispatchForm = () => {
    setDispatchFormVisible(false); // Hide the dispatch form
  };

  const {
    isTableVisible,
    isFormVisible,
    dispatchersList,
    currentOrders,
    totalPages,
    currentPage,
    handlePreviousPage,
    handleNextPage,
    handleEdit,
    handleViewAllDispatchers,
    showTable,
    showForm,
    backToTable,
    headerTitle,
  } = useNavigation(serviceOrders);

  return (
    <div className="page-content">
      <Header />
      <h1>{headerTitle}</h1>
      {isTableVisible && !isFormVisible && dispatchersList.length === 0 && (
        <ServiceOrderTable
          serviceOrders={serviceOrders}
          currentServiceOrders={currentOrders}
          handleDelete={handleDeleteOrder}
          handleEdit={handleEdit}
          handleViewAllDispatchers={handleViewAllDispatchers}
          handleAddServiceOrder={handleAddServiceOrder}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          companies={companies}
        />
      )}
      {isFormVisible && (
        <ServiceOrderForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleFormSave}
          handleCancel={handleCancelForm}
          editingOrder={formState.id !== undefined}
        />
      )}
      {dispatchersList.length > 0 && !isDispatchFormVisible && (
        <DispatcherList
          dispatchers={dispatchersList}
          onBack={backToTable}
          onEdit={handleEditDispatcher}
          onDelete={handleDeleteDispatcher}
          onAdd={handleAddDispatcher} // Pass handleAddDispatcher to DispatcherList
        />
      )}
      {isDispatchFormVisible && (
        <DispatchForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleSaveDispatchForm}
          handleCancel={handleCancelDispatchForm}
        />
      )}
    </div>
  );
};

export default ServiceOrder;
