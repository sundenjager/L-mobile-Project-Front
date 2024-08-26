import React, { useState, useEffect } from "react";
import ServiceOrderTable from "./ServiceorderTable";
import ServiceOrderForm from "./ServiceOrderForm";
import {
  getServiceOrders,
  addServiceOrder,
  updateServiceOrder,
  deleteServiceOrder,
} from "../../api/ServiceOrder";
import "./serviceorder.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../MyHeader/Header";

const ServiceOrder = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTableVisible, setTableVisible] = useState(true);
  const ordersPerPage = 2;
  const totalPages = Math.ceil(serviceOrders.length / ordersPerPage);

  const [editingOrder, setEditingOrder] = useState(null);
  const [formState, setFormState] = useState({
    companyId: "",
    userId: "",
    articlesId: "",
    status: "",
    progress: "",
    createdAt: "",
    updatedAt: "",
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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = serviceOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service order?")) {
      try {
        await deleteServiceOrder(id);
        const ordersData = await getServiceOrders();
        setServiceOrders(ordersData);
        alert("Service order deleted successfully");
      } catch (error) {
        console.error("Error deleting service order:", error);
        alert("Failed to delete service order");
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormState(order);
    setTableVisible(false);
  };

  const handleUpdateOrder = async (updatedOrder) => {
    try {
      const updatedData = await updateServiceOrder(updatedOrder);
      const updatedOrders = serviceOrders.map((order) =>
        order.id === updatedOrder.id ? updatedData : order
      );
      setServiceOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating service order:", error);
    }
  };

  const handleSave = async () => {
    if (editingOrder) {
      const updatedOrder = {
        ...editingOrder,
        ...formState,
      };
      try {
        await handleUpdateOrder(updatedOrder);
        const ordersData = await getServiceOrders();
        setServiceOrders(ordersData);
      } catch (error) {
        console.error("Error updating service order:", error);
        alert("Failed to update service order");
      }
    } else {
      const newOrder = {
        ...formState,
      };
      try {
        await addServiceOrder(newOrder);
        const ordersData = await getServiceOrders();
        setServiceOrders(ordersData);
      } catch (error) {
        console.error("Error adding service order:", error);
        alert("Failed to add service order");
      }
    }
    setEditingOrder(null);
    setTableVisible(true);
  };

  const handleCancel = () => {
    setEditingOrder(null);
    setTableVisible(true);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setFormState({
      companyId: "",
      userId: "",
      articlesId: "",
      status: "",
      progress: "",
      createdAt: "",
      updatedAt: "",
    });
    setTableVisible(false);
  };

  return (
    <div className="page-content">
      <Header />
      <h1>Service Orders</h1>
      {isTableVisible ? (
        <ServiceOrderTable
          serviceOrders={serviceOrders}
          currentOrders={currentOrders}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          handleAddOrder={handleAddOrder}
        />
      ) : (
        <ServiceOrderForm
          formState={formState}
          handleChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          editingOrder={editingOrder}
        />
      )}
    </div>
  );
};

export default ServiceOrder;
