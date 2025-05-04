// src/components/AdoptionCertificate/AdoptionCertificate.js
import React from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { formatDate } from '../../utils/helpers';

const AdoptionCertificate = ({ pet, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Certificate border
    doc.setDrawColor(0, 123, 255);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(0, 123, 255);
    doc.text('Certificate of Adoption', 105, 30, { align: 'center' });
    
    // Content
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('This certifies that', 105, 60, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(pet.name, 105, 80, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.text(`A ${pet.age} year old ${pet.species}`, 105, 95, { align: 'center' });
    doc.text(`with a ${pet.personality} personality`, 105, 105, { align: 'center' });
    
    doc.text('has been officially adopted on', 105, 125, { align: 'center' });
    
    doc.setFont(undefined, 'bold');
    doc.text(formatDate(new Date()), 105, 140, { align: 'center' });
    
    doc.setFont(undefined, 'normal');
    doc.text('Virtual Pet Adoption Center', 105, 180, { align: 'center' });
    
    // Footer
    doc.setFontSize(10);
    doc.text('Thank you for giving a loving home to a pet in need!', 105, 250, { align: 'center' });
    
    // Save the PDF
    doc.save(`${pet.name}_adoption_certificate.pdf`);
  };

  return (
    <div className="certificate-container text-center">
      <h3 className="mb-4">Congratulations!</h3>
      <p className="lead">
        You have successfully adopted <strong>{pet.name}</strong>!
      </p>
      <p>
        Thank you for providing a loving home to your new {pet.species} friend.
      </p>
      <div className="mt-4">
        <Button 
          variant="primary" 
          onClick={generatePDF}
          className="me-2"
        >
          <i className="fas fa-download me-2"></i>
          Download Certificate
        </Button>
        <Button 
          variant="secondary" 
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AdoptionCertificate;