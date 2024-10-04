import React, { useEffect, useState } from 'react';
import './UserDashboard.css'; // Import the CSS file for styling

const UserDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [deviceType, setDeviceType] = useState(''); // For Mobile or Laptop question
  const [issueType, setIssueType] = useState('');   // For Hardware or Software question
  const [otherIssue, setOtherIssue] = useState(''); // For "Others" input
  const username = localStorage.getItem('username'); // Retrieve username for user-specific grievances

  useEffect(() => {
    const savedGrievances = JSON.parse(localStorage.getItem('grievances')) || [];
    const userGrievances = savedGrievances.filter(g => g.username === username); // Filter by current user
    setGrievances(userGrievances);
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (deviceType.trim() === '' || issueType.trim() === '') {
      alert('Please fill in all required fields.');
      return;
    }

    const newGrievanceData = {
      id: Date.now(), // Unique ID based on timestamp
      title: `Device: ${deviceType}, Issue: ${issueType}, Others: ${otherIssue}`,
      status: 'Pending', // Default status for a new grievance
      username: username, // Save with current username
    };

    const allGrievances = JSON.parse(localStorage.getItem('grievances')) || [];
    allGrievances.push(newGrievanceData);

    localStorage.setItem('grievances', JSON.stringify(allGrievances)); // Persist to localStorage

    setGrievances([...grievances, newGrievanceData]); // Update grievances list
    setDeviceType(''); // Reset the input fields
    setIssueType('');
    setOtherIssue('');
  };

  return (
    <div className="dashboard-container">
      <div className="grievance-submission">
        <h2>My Grievance Submission</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="deviceType">1. Mobile or Laptop:</label>
            <select
              id="deviceType"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="issueType">2. Hardware or Software:</label>
            <select
              id="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="otherIssue">3. Others (optional):</label>
            <input
              type="text"
              id="otherIssue"
              value={otherIssue}
              onChange={(e) => setOtherIssue(e.target.value)}
              placeholder="Describe any other issues"
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>

      <div className="grievance-list">
        <h2>My Grievances</h2>
        {grievances.length > 0 ? (
          <ul>
            {grievances.map((grievance) => (
              <li key={grievance.id}>
                <strong>{grievance.title}</strong> <span>Status: {grievance.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-grievances">No grievances found. You can submit a new one.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;