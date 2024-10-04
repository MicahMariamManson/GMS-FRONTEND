import React, { useEffect, useState } from 'react';
import './AssigneeDashboard.css'; // Import CSS for styling

const AssigneeDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [technicians, setTechnicians] = useState(['Tech1', 'Tech2', 'Tech3']); // Example technician names

  useEffect(() => {
    const savedGrievances = JSON.parse(localStorage.getItem('grievances')) || [];
    setGrievances(savedGrievances); // Fetch all grievances
  }, []);

  const handleAssign = (id, technician) => {
    const updatedGrievances = grievances.map((grievance) =>
      grievance.id === id ? { ...grievance, technician } : grievance
    );
    setGrievances(updatedGrievances);
    localStorage.setItem('grievances', JSON.stringify(updatedGrievances)); // Persist the updated data
  };

  return (
    <div className="assignee-container">
      <h1>Assignee Dashboard</h1>
      {grievances.length > 0 ? (
        <ul className="grievance-list">
          {grievances.map((grievance) => (
            <li key={grievance.id}>
              <strong>{grievance.title}</strong>
              <span>Status: {grievance.status}</span>
              <span>Assigned to: {grievance.technician || 'Not assigned'}</span>
              <select
                value={grievance.technician || ''}
                onChange={(e) => handleAssign(grievance.id, e.target.value)}
              >
                <option value="">Select Technician</option>
                {technicians.map((tech) => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      ) : (
        <p>No grievances available for assignment.</p>
      )}
    </div>
  );
};

export default AssigneeDashboard;