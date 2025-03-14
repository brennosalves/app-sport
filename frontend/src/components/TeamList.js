import React, { useEffect, useState } from 'react';

const TeamList = ({ teams, setTeams, showMessage }) => {
  const [loading, setLoading] = useState(true);

  // FETCH TEAMS WHEN THE COMPONENT MOUNTS
  // BACKEND API CALL IS FIXED. BETTER APPROACH WOULD BE ADD THIS TO A SEPARATE ENV FILE OR IN THE SYSTEM ENVIRONMENT VARIABLES
  useEffect(() => {
    fetch("http://localhost:5010/teams")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);  // Update the parent state with the fetched teams
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
        setLoading(false); 
      });
  }, [setTeams]);

  // HANDLE IMAGE ERROR (FALLBACK IMAGE) - IN CASE THE URL ASSIGNED TO A TEAM IS NOT AVAILABLE
  const handleImageError = (e) => {
    e.target.src = '/image-not-available.png';
  };

  // TEAM LIST COMPONENT
  return (
    <div className="team-list">
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        Array.isArray(teams) && teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="team-item">
              <img
                src={team.strBadge}
                alt={`${team.name} Badge`}
                className="team-logo"
                onError={handleImageError}
              />
              <div className="team-details">
                <h3>{team.name}</h3>
                <p>{team.strStadium}</p>
                <button
                  className="delete-button"
                  onClick={() => {
                    fetch(`http://localhost:5010/teams/${team.id}`, {
                      method: "DELETE",
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.message === "Team deleted successfully") {
                          // REMOVE TEAM FROM THE LOCAL STATE
                          setTeams((prevTeams) =>
                            prevTeams.filter((t) => t.id !== team.id)
                          );
                          showMessage("Team deleted successfully!", "success");
                        } else {
                          showMessage("Failed to delete team.", "error");
                        }
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        showMessage("Error deleting team. Please try again.", "error");
                      });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No teams available</p>
        )
      )}
    </div>
  );
};

export default TeamList;
