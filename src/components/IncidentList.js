import React from "react";

const IncidentList = ({ incidents }) => {
  return (
    <div>
      <h2>Incident Reports</h2>
      {incidents.length === 0 ? (
        <p>No incident reports available.</p>
      ) : (
        <ul>
          {incidents.map((incident, index) => (
            <li key={index} className="incident-item">
              <h3>{incident.title}</h3>
              <p>Type: {incident.type}</p>
              <p>Description: {incident.description}</p>
              <div className="incident-photos">
                {incident.photos.map((photo, photoIndex) => (
                  <img
                    key={photoIndex}
                    src={URL.createObjectURL(photo)}
                    alt={`Incident ${index + 1} - Photo ${photoIndex + 1}`}
                    className="incident-photo"
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;
