import React, { useEffect, useState } from 'react';
import './AdminPanel.css'; // Import the CSS for Admin Panel

const AdminPanel = () => {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    // Fetch grievances data from localStorage
    const fetchGrievances = async () => {
      const grievancesData = JSON.parse(localStorage.getItem('grievances')) || [];
      setGrievances(grievancesData);
    };
    fetchGrievances();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    // Update status and persist changes
    const updatedGrievances = grievances.map((grievance) =>
      grievance.id === id ? { ...grievance, status: newStatus } : grievance
    );
    setGrievances(updatedGrievances); // Update state
    localStorage.setItem('grievances', JSON.stringify(updatedGrievances)); // Save to localStorage
  };

  return (
    <div className="admin-panel-container">
      <h1>Admin Panel</h1>
      <h2>Manage Grievances</h2>
      {grievances.length > 0 ? (
        <ul className="grievance-list">
          {grievances.map((grievance) => (
            <li key={grievance.id}>
              <strong>{grievance.title}</strong>
              <select
                value={grievance.status}
                onChange={(e) => handleStatusChange(grievance.id, e.target.value)}
                style={{ marginLeft: '10px' }}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </li>
          ))}
        </ul>
      ) : (
        <p>No grievances to manage.</p>
      )}
    </div>
  );
};

export default AdminPanel;