// src/components/MyServiceOrder/MyServiceOrder.js
import React, { useState, useEffect } from "react";
import ServiceOrderTable from "./ServiceOrderTable";
import Header from "../MyHeader/Header";
import DispatcherDetails from "./DispatcherDetails";
import ServiceOrderForm from "./ServiceOrderForm";
import useNavigation from "./NavigationService";

const ServiceOrder = () => {
  const [serviceOrders, setServiceOrders] = useState([]);

  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const ordersData = [
          {
            id: 1,
            companyId: 1,
            status: "New",
            progress: "In Progress",
            createdAt: "2024-08-22T19:45:35.151",
            dispatchers: [
              {
                id: 3,
                dispatchDate: "2024-08-23T19:45:35.151",
                message: "Dispatcher 2",
              },
            ],
          },
          {
            id: 2,
            companyId: 2,
            status: "New",
            progress: "In Progress",
            createdAt: "2024-08-22T19:45:35.151",
            dispatchers: [
              {
                id: 5,
                dispatchDate: "2024-08-22T19:45:35.151",
                message: "Dispatcher 5",
              },
              {
                id: 3,
                dispatchDate: "2024-08-23T19:45:35.151",
                message: "Dispatcher 3",
              },
            ],
          },
          {
            id: 5,
            companyId: 12,
            status: "New",
            progress: "In Progress",
            createdAt: "2024-08-22T19:45:35.151",
            dispatchers: [
              {
                id: 20,
                dispatchDate: "2024-08-22T19:45:35.151",
                message: "Dispatcher 20",
              },
              {
                id: 54,
                dispatchDate: "2024-08-23T19:45:35.151",
                message: "Dispatcher 44",
              },
            ],
          },
          // Add more orders as needed
        ];
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
    selectedDispatcher,
    dispatchersList,
    currentOrders,
    totalPages,
    currentPage,
    handlePreviousPage,
    handleNextPage,
    handleEdit,
    handleViewDispatcherDetails,
    handleViewAllDispatchers,
    showTable,
    showForm,

    backToTable,
    headerTitle,
  } = useNavigation(serviceOrders);

  const handleDelete = async (id) => {
    alert("Service order deleted successfully");
  };

  const handleAddServiceOrder = () => {
    showForm();
  };

  const handleFormSave = () => {
    showTable();
  };

  const handleCancelForm = () => {
    showTable();
  };

  return (
    <div className="page-content">
      <Header />
      <h1> ali bich ye5dim il service order rodbalik tebadal il navigation </h1>
      <h1>{headerTitle}</h1>
      {isTableVisible &&
        !isFormVisible &&
        !selectedDispatcher &&
        dispatchersList.length === 0 && (
          <ServiceOrderTable
            serviceOrders={serviceOrders}
            currentServiceOrders={currentOrders}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleViewDispatcherDetails={handleViewDispatcherDetails}
            handleViewAllDispatchers={handleViewAllDispatchers}
            handleAddServiceOrder={handleAddServiceOrder}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        )}
      {isFormVisible && (
        <ServiceOrderForm onSave={handleFormSave} onCancel={handleCancelForm} />
      )}
      {selectedDispatcher && (
        <DispatcherDetails
          dispatcher={selectedDispatcher}
          onBack={backToTable}
        />
      )}
      {dispatchersList.length > 0 && (
        <div>
          <ul>
            {dispatchersList.map((dispatcher) => (
              <li key={dispatcher.id}>
                <p>
                  {dispatcher.message} -{" "}
                  {new Date(dispatcher.dispatchDate).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          <button className="button-cancel" onClick={backToTable}>
            Back to Orders
          </button>
        </div>
      )}
      <h1>
        {" "}
        (form + tableau + design + req déja existant fil back) à implémenter{" "}
      </h1>
    </div>
  );
};

export default ServiceOrder;
