// DetailsDialog.js
import React from 'react';
import './DetailsDialog.css';

function DetailsDialog({ open, onClose, item }) {
  return (
    open && (
      <div className="details-dialog">
        <div className="details-content">
          <img src={item.pictureURL} alt="Found Item" />
          <p><strong>Item Description:</strong> {item.itemDescription}</p>
          <p><strong>Location Found:</strong> {item.locationFound}</p>
          <p><strong>Date Found:</strong> {item.dateFound}</p>
          <p><strong>Founder Name:</strong> {item.founderName}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
          <p><strong>Address:</strong> {item.address}</p>
          <p><strong>Category:</strong> {item.category}</p>
          
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    )
  );
}

export default DetailsDialog;
