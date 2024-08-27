// src/components/MyServiceOrder/NavigationService.js
import { useState, useEffect } from "react";

const useNavigation = (serviceOrders) => {
  const [isTableVisible, setTableVisible] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedDispatcher, setSelectedDispatcher] = useState(null);
  const [dispatchersList, setDispatchersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2); // Number of orders per page

  useEffect(() => {
    setCurrentPage(1); // Reset page number when serviceOrders changes
  }, [serviceOrders]);

  const totalPages = Math.ceil(serviceOrders.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = serviceOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleEdit = () => {
    showForm();
  };

  const handleViewDispatcherDetails = (dispatcherId) => {
    const dispatcher = serviceOrders
      .flatMap((order) => order.dispatchers)
      .find((d) => d.id === dispatcherId);
    showDispatcherDetails(dispatcher);
  };

  const handleViewAllDispatchers = (orderId) => {
    const order = serviceOrders.find((o) => o.id === orderId);
    showAllDispatchers(order.dispatchers);
  };

  const showTable = () => {
    setTableVisible(true);
    setFormVisible(false);
    setSelectedDispatcher(null);
    setDispatchersList([]);
  };

  const showForm = () => {
    setTableVisible(false);
    setFormVisible(true);
    setSelectedDispatcher(null);
    setDispatchersList([]);
  };

  const showDispatcherDetails = (dispatcher) => {
    setTableVisible(false);
    setFormVisible(false);
    setSelectedDispatcher(dispatcher);
    setDispatchersList([]);
  };

  const showAllDispatchers = (dispatchers) => {
    setTableVisible(false);
    setFormVisible(false);
    setSelectedDispatcher(null);
    setDispatchersList(dispatchers);
  };

  const backToTable = () => {
    showTable();
  };

  // Determine header title based on current view
  let headerTitle = "Service Orders";
  if (isFormVisible) {
    headerTitle =
      "Service Orders > " +
      (selectedDispatcher ? "Edit Dispatcher" : "Form Service Order");
  } else if (selectedDispatcher) {
    headerTitle = "Service Orders > Dispatcher Details";
  } else if (dispatchersList.length > 0) {
    headerTitle = "Service Orders > Détails Dispatchers";
  }

  return {
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
    showDispatcherDetails,
    showAllDispatchers,
    backToTable,
    headerTitle,
  };
};

export default useNavigation;
