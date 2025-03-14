"use client"

import React, { useState } from "react";
import TeamList from "./../components/TeamList";
import TeamForm from "./../components/TeamForm";
import "./../styles/page.css";

function App() {
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 
  const [teams, setTeams] = useState([]);  // This state should hold the teams

  // SHOW MESSAGE FOR SUCCES OR ERROR
  const showMessage = (messageText, type) => {
    setMessage(messageText);
    setMessageType(type);

    // THE MESSAGE WILL BE HIDDEN AFTER 8 SECONDS
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 8000);
  };

  // RENDER THE COMPONENTS
  return (
    <div className="App">
      <h1>Teams List</h1>
      <div className="content">
      <TeamForm showMessage={showMessage} message={message} messageType={messageType} setTeams={setTeams} />
      <TeamList teams={teams} setTeams={setTeams} showMessage={showMessage} />
      </div>
    </div>
  );
}

export default App;
