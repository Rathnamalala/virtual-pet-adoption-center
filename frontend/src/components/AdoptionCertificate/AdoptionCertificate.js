// src/components/AdoptionCertificate/AdoptionCertificate.js
import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { formatDate } from '../../utils/helpers';

const AdoptionCertificate = ({ pet, onClose }) => {
  const generatePDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set background color
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 297, 210, 'F');
      
      // Add decorative border
      doc.setDrawColor(255, 107, 107);
      doc.setLineWidth(2);
      doc.rect(10, 10, 277, 190);
      
      // Add inner border
      doc.setLineWidth(0.5);
      doc.rect(15, 15, 267, 180);
      
      // Add title
      doc.setFontSize(36);
      doc.setTextColor(255, 107, 107);
      doc.setFont('helvetica', 'bold');
      doc.text('Certificate of Adoption', 148.5, 40, { align: 'center' });
      
      // Add subtitle
      doc.setFontSize(20);
      doc.setTextColor(42, 54, 59);
      doc.setFont('helvetica', 'normal');
      doc.text('This certifies that', 148.5, 60, { align: 'center' });
      
      // Add pet name
      doc.setFontSize(32);
      doc.setTextColor(42, 54, 59);
      doc.setFont('helvetica', 'bold');
      doc.text(pet.name || 'Unknown Pet', 148.5, 80, { align: 'center' });
      
      // Add pet details
      doc.setFontSize(18);
      doc.setFont('helvetica', 'normal');
      doc.text(`A ${pet.age || '?'} year old ${pet.species || 'pet'} with a ${pet.personality || 'wonderful'} personality`, 148.5, 95, { align: 'center' });
      
      // Add adoption date
      doc.setFontSize(16);
      doc.text('has been officially adopted on', 148.5, 115, { align: 'center' });
      
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 107, 107);
      doc.text(formatDate(pet.adoption_date || new Date()), 148.5, 130, { align: 'center' });
      
      // Add organization name
      doc.setFontSize(20);
      doc.setTextColor(42, 54, 59);
      doc.setFont('helvetica', 'normal');
      doc.text('Virtual Pet Adoption Center', 148.5, 155, { align: 'center' });
      
      // Add footer
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for giving a loving home to a pet in need!', 148.5, 175, { align: 'center' });
      
      // Save the PDF
      doc.save(`${pet.name || 'pet'}_adoption_certificate.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the certificate. Please try again.');
    }
  };

  if (!pet) {
    return (
      <Alert variant="danger">
        Error: Pet information not available
      </Alert>
    );
  }

  return (
    <div className="certificate-container text-center p-5">
      <h3 className="mb-4">🎉 Congratulations! 🎉</h3>
      <p className="lead mb-4">
        You have successfully adopted <strong>{pet.name}</strong>!
      </p>
      
      <div className="certificate-preview mb-4 p-4 border rounded bg-light">
        <h4 className="text-primary mb-3">Certificate Preview</h4>
        <div className="text-start">
          <p><strong>Pet Name:</strong> {pet.name}</p>
          <p><strong>Species:</strong> {pet.species}</p>
          <p><strong>Age:</strong> {pet.age} years</p>
          <p><strong>Personality:</strong> {pet.personality}</p>
          <p><strong>Adoption Date:</strong> {formatDate(pet.adoption_date || new Date())}</p>
        </div>
      </div>
      
      <div className="d-flex justify-content-center gap-3">
        <Button 
          variant="primary" 
          size="lg"
          onClick={generatePDF}
        >
          <i className="fas fa-download me-2"></i>
          Download Certificate
        </Button>
        <Button 
          variant="secondary" 
          size="lg"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AdoptionCertificate;