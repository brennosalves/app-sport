import React, { useState } from 'react';
import Message from './Message';  // Import the Message component

const TeamForm = ({ showMessage, message, messageType, setTeams }) => {
  const [name, setName] = useState("");
  const [strBadge, setStrBadge] = useState("");
  const [strStadium, setStrStadium] = useState("");

  // FUNCTION TO HANDLE FORM SUBMISSION
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTeamData = { name, strBadge, strStadium };

    // BACKEND API CALL IS FIXED. BETTER APPROACH WOULD BE ADD THIS TO A SEPARATE ENV FILE OR IN THE SYSTEM ENVIRONMENT VARIABLES
    fetch('http://localhost:5010/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeamData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Team added successfully') {
          setTeams((prevTeams) => [...prevTeams, data.team]);
          showMessage('Team added successfully!', 'success');
          setName('');
          setStrBadge('');
          setStrStadium('');
        } else {
          showMessage('Failed to add team: ' + data.message, 'error');
        }
      })
      .catch((error) => {
        showMessage('Error adding team. Please try again later.', 'error');
      });
  };

  // RETURNS A SIMPLE FORM TO CREATE A NEW TEAM
  return (
    <div className="team-form">
      <h2>Create a Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input id="teamName" role="teamName" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="teamBadgeUrl">Team Badge URL</label>
          <input id="teamBadgeUrl" type="url" value={strBadge} onChange={(e) => setStrBadge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="stadiumName">Stadium Name</label>
          <input id="stadiumName" type="text" value={strStadium} onChange={(e) => setStrStadium(e.target.value)} required />
        </div>
        <button type="submit">Create Team</button>

        <Message message={message} messageType={messageType} />
      </form>
    </div>
  );
};

export default TeamForm;
