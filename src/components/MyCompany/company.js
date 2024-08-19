import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';
import Header from '../MyHeader/Header';

const Company = () => {
  const itemsPerPage = 6;
  const [companies, setCompanies] = useState([
    { Id: 1, Name: 'Company 1', UserId: 'user1', Address: '123 Main St', Phone: '123-456-7890', User: 'User A', People: [], ServiceOrders: [] },
    { Id: 2, Name: 'Company 2', UserId: 'user2', Address: '456 Elm St', Phone: '098-765-4321', User: 'User B', People: [], ServiceOrders: [] },
    // Add other initial data as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [editingCompany, setEditingCompany] = useState(null);
  const [newName, setNewName] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newId, setNewId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCompany = () => {
    setShowAddForm(true);
  };

  const handleSaveNewCompany = () => {
    const newCompany = {
      Id: newId,
      Name: newName,
      UserId: newUserId,
      Address: newAddress,
      Phone: newPhone,
      People: [],
      ServiceOrders: [],
    };
    setCompanies([...companies, newCompany]);
    setShowAddForm(false);
    // Clear form fields after saving
    setNewId('');
    setNewName('');
    setNewUserId('');
    setNewAddress('');
    setNewPhone('');
  };

  const handleCancelNewCompany = () => {
    setShowAddForm(false);
    // Clear form fields on cancel
    setNewId('');
    setNewName('');
    setNewUserId('');
    setNewAddress('');
    setNewPhone('');
  };

  const handleDelete = (id) => {
    const filteredCompanies = companies.filter(company => company.Id !== id);
    setCompanies(filteredCompanies);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setNewName(company.Name);
    setNewUserId(company.UserId);
    setNewAddress(company.Address);
    setNewPhone(company.Phone);
    setNewId(company.Id);
  };

  const handleSave = () => {
    const updatedCompanies = companies.map(company =>
      company.Id === editingCompany.Id
        ? { ...company, Id: newId, Name: newName, UserId: newUserId, Address: newAddress, Phone: newPhone }
        : company
    );
    setCompanies(updatedCompanies);
    setEditingCompany(null);
  };

  const handleCancel = () => {
    setEditingCompany(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredCompanies = companies.filter(company =>
    company.Name.toLowerCase().includes(searchQuery) ||
    company.UserId.toLowerCase().includes(searchQuery) ||
    company.Address.toLowerCase().includes(searchQuery) ||
    company.Phone.toLowerCase().includes(searchQuery)
  );

  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="page-content">
        <Header/>
      <h1>Companies</h1>
      <p>
        Manage your companies' information including their user IDs, addresses, and phone numbers.
      </p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <table className="tableC">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>ID</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>User ID</th>
            <th style={{ textAlign: 'center' }}>Address</th>
            <th style={{ textAlign: 'center' }}>Phone</th>
            <th style={{ textAlign: 'center' }}>Operate</th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map(company => (
            <tr key={company.Id}>
              <td style={{ textAlign: 'center' }}>{company.Id}</td>
              <td style={{ textAlign: 'center' }}>
                {editingCompany && editingCompany.Id === company.Id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  company.Name
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {editingCompany && editingCompany.Id === company.Id ? (
                  <input
                    type="text"
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                  />
                ) : (
                  company.UserId
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {editingCompany && editingCompany.Id === company.Id ? (
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                ) : (
                  company.Address
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {editingCompany && editingCompany.Id === company.Id ? (
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                ) : (
                  company.Phone
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {editingCompany && editingCompany.Id === company.Id ? (
                  <>
                    <button className='button-save' onClick={handleSave}>
                      <i className="fas fa-save"></i>
                    </button>
                    <button className='button-cancel' onClick={handleCancel}>
                      <i className="fas fa-times"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button className='button-delete' onClick={() => handleDelete(company.Id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className='button-edit' onClick={() => handleEdit(company)}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="pagination-footer">
              <div className="pagination-content">
                <button
                  className="pagination-button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="add-company-form">
        <button className='button-add' onClick={handleAddCompany}>
          <i className="fas fa-plus"></i> Add Company
        </button>
      </div>

      {showAddForm && (
        <div className="add-company-modal">
          <h2>Add New Company</h2>
          <div className="form-group">
            <label>ID:</label>
            <input
              type="text"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <button className='button-save' onClick={handleSaveNewCompany}>
              <i className="fas fa-save"></i> Save
            </button>
            <button className='button-cancel' onClick={handleCancelNewCompany}>
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Company;
