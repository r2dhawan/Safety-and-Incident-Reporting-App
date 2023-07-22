import React, { useState } from "react";

const IncidentForm = ({ onAddIncident }) => {
  const [incident, setIncident] = useState({
    title: "",
    type: "",
    description: "",
    date: "",
    time: "",
    location: "",
    photos: [],
  });
  const [isIncidentReported, setIsIncidentReported] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIncident((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    // Resize the uploaded images before adding them to the incident state
    Promise.all(files.map(resizeImage)).then((resizedImages) => {
      setIncident((prevState) => ({
        ...prevState,
        photos: [...prevState.photos, ...resizedImages],
      }));
    });
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const maxWidth = 800; // Maximum width for resized image
          const maxHeight = 600; // Maximum height for resized image
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas to a Blob and resolve the Promise
          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.9
          );
        };
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the incident data to the parent component (App) for handling
    onAddIncident(incident);
    // Reset the form after submission
    setIncident({
      title: "",
      type: "",
      description: "",
      date: "",
      time: "",
      location: "",
      photos: [],
    });
    setIsIncidentReported(true);
    // Reset the incident reported message after 3 seconds
    setTimeout(() => {
      setIsIncidentReported(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="incident-form">
      {isIncidentReported && (
        <p className="confirmation-message">Incident has been reported!</p>
      )}
      <h2>Report an Incident</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={incident.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Incident Type:
        <select name="type" value={incident.type} onChange={handleInputChange}>
          <option value="">Select Type</option>
          <option value="Accident">Accident</option>
          <option value="Near Miss">Near Miss</option>
        </select>
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={incident.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={incident.date}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          name="time"
          value={incident.time}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={incident.location}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Photos:
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
        />
      </label>
      <div>
        {/* Preview uploaded photos */}
        {incident.photos.map((photo, index) => (
          <img
            key={index}
            src={URL.createObjectURL(photo)}
            alt={`Incident Photo ${index + 1}`}
            className="incident-photo-preview"
          />
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IncidentForm;
