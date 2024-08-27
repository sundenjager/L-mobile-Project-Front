import React, { useState, useEffect } from "react";
import ServiceOrderTable from "./ServiceOrderTable";
import Header from "../MyHeader/Header";
import ServiceOrderForm from "./ServiceOrderForm";
import DispatcherList from "./DispatcherList";
import useNavigation from "./NavigationService";
import {
  getServiceOrders,
  addServiceOrder,
  updateServiceOrder,
  deleteServiceOrder,
} from "../../api/ServiceOrder";

const ServiceOrder = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [formState, setFormState] = useState({
    companyId: "",
    userId: "",
    articleIds: [],
    status: "New",
    progress: "0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dispatchers: [],
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
    const updatedServiceOrders = serviceOrders.map((order) => ({
      ...order,
      dispatchers: order.dispatchers.filter(
        (dispatcher) => dispatcher.id !== id
      ),
    }));
    setServiceOrders(updatedServiceOrders);
    alert("Dispatcher deleted successfully");
  };

  const handleEditDispatcher = (id) => {
    alert(`Edit Dispatcher with ID: ${id}`);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteServiceOrder(id);
      const updatedOrders = serviceOrders.filter((order) => order.id !== id);
      setServiceOrders(updatedOrders);
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
      articleIds: [],
      status: "New",
      progress: "0",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dispatchers: [],
    });
    showForm();
  };

  const handleFormSave = async () => {
    try {
      if (formState.id) {
        await updateServiceOrder(formState);
        setServiceOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === formState.id ? formState : order
          )
        );
        alert("Service order updated successfully");
      } else {
        const newOrder = await addServiceOrder(formState);
        setServiceOrders((prevOrders) => [...prevOrders, newOrder]);
        alert("Service order added successfully");
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
          editingOrder={!!formState.id}
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
