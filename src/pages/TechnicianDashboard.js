import React, { useEffect, useState } from 'react';
import './TechnicianDashboard.css'; // Import CSS for styling

const TechnicianDashboard = () => {
  const [assignedGrievances, setAssignedGrievances] = useState([]);
  const technicianName = localStorage.getItem('username'); // Technician's name from login

  useEffect(() => {
    const allGrievances = JSON.parse(localStorage.getItem('grievances')) || [];
    const grievancesForTechnician = allGrievances.filter(
      (grievance) => grievance.technician === technicianName
    );
    setAssignedGrievances(grievancesForTechnician);
  }, [technicianName]);

  return (
    <div className="technician-container">
      <h1>Technician Dashboard</h1>
      {assignedGrievances.length > 0 ? (
        <ul className="grievance-list">
          {assignedGrievances.map((grievance) => (
            <li key={grievance.id}>
              <strong>{grievance.title}</strong>
              <span>Status: {grievance.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No grievances assigned to you.</p>
      )}
    </div>
  );
};

export default TechnicianDashboard;