// src/components/MyServiceOrder/MyServiceOrder.js
import React, { useState, useEffect } from "react";
import ServiceOrderTable from "./ServiceOrderTable";
import Header from "../MyHeader/Header";
import ServiceOrderForm from "./ServiceOrderForm";
import DispatcherList from "./DispatcherList";
import useNavigation from "./NavigationService";
import { getServiceOrders, addServiceOrder, updateServiceOrder, deleteServiceOrder } from "../../api/ServiceOrder";

const ServiceOrder = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [formState, setFormState] = useState({
    companyId: "",
    userId: "",
    articlesId: "",
    status: "New",
    progress: "0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

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

    fetchServiceOrders();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteDispatcher = async (id) => {
    try {
      // Assuming you have a way to delete dispatchers through API
      const updatedServiceOrders = serviceOrders.map((order) => {
        return {
          ...order,
          dispatchers: order.dispatchers.filter(
            (dispatcher) => dispatcher.id !== id
          ),
        };
      });
      setServiceOrders(updatedServiceOrders);
      alert("Dispatcher deleted successfully");
    } catch (error) {
      console.error("Error deleting dispatcher:", error);
      alert("Failed to delete dispatcher");
    }
  };

  const handleEditDispatcher = (id) => {
    // Implement logic to edit a dispatcher
    alert(`Edit Dispatcher with ID: ${id}`);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteServiceOrder(id);
      setServiceOrders(serviceOrders.filter(order => order.id !== id));
      alert("Service order deleted successfully");
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
      status: "New",
      progress: "0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    showForm();
  };

  const handleFormSave = async () => {
    try {
      if (formState.id) {
        await updateServiceOrder(formState);
      } else {
        await addServiceOrder(formState);
      }
      showTable();
    } catch (error) {
      console.error("Error saving service order:", error);
      alert("Failed to save service order");
    }
  };

  const handleCancelForm = () => {
    showTable();
  };

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
      {dispatchersList.length > 0 && (
        <DispatcherList
          dispatchers={dispatchersList}
          onBack={backToTable}
          onEdit={handleEditDispatcher}
          onDelete={handleDeleteDispatcher}
        />
      )}
    </div>
  );
};

export default ServiceOrder;
