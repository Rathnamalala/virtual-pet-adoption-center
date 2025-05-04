// src/components/AdoptionCertificate/AdoptionCertificate.js
import React from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { formatDate } from '../../utils/helpers';

const AdoptionCertificate = ({ pet, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set background color
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Add decorative border
    doc.setDrawColor(102, 126, 234);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    
    // Add inner border
    doc.setLineWidth(0.5);
    doc.rect(15, 15, 267, 180);
    
    // Add title
    doc.setFontSize(36);
    doc.setTextColor(102, 126, 234);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Adoption', 148.5, 40, { align: 'center' });
    
    // Add subtitle
    doc.setFontSize(20);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text('This certifies that', 148.5, 60, { align: 'center' });
    
    // Add pet name
    doc.setFontSize(32);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(pet.name, 148.5, 80, { align: 'center' });
    
    // Add pet details
    doc.setFontSize(18);
    doc.setFont('helvetica', 'normal');
    doc.text(`A ${pet.age} year old ${pet.species} with a ${pet.personality} personality`, 148.5, 95, { align: 'center' });
    
    // Add adoption date
    doc.setFontSize(16);
    doc.text('has been officially adopted on', 148.5, 115, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(102, 126, 234);
    doc.text(formatDate(pet.adoption_date || new Date()), 148.5, 130, { align: 'center' });
    
    // Add organization name
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text('Virtual Pet Adoption Center', 148.5, 155, { align: 'center' });
    
    // Add footer
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for giving a loving home to a pet in need!', 148.5, 175, { align: 'center' });
    
    // Add signature line
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(80, 185, 140, 185);
    doc.line(157, 185, 217, 185);
    
    doc.setFontSize(12);
    doc.text('Adoption Coordinator', 110, 190, { align: 'center' });
    doc.text('Date', 187, 190, { align: 'center' });
    
    // Save the PDF
    doc.save(`${pet.name}_adoption_certificate.pdf`);
  };

  return (
    <div className="certificate-container text-center">
      <h3 className="mb-4">🎉 Congratulations! 🎉</h3>
      <p className="lead">
        You have successfully adopted <strong>{pet.name}</strong>!
      </p>
      <p className="mb-4">
        Thank you for providing a loving home to your new {pet.species} friend.
      </p>
      
      <div className="certificate-preview mb-4 p-4 border rounded">
        <h4>Certificate Preview</h4>
        <p><strong>Pet Name:</strong> {pet.name}</p>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Age:</strong> {pet.age} years</p>
        <p><strong>Personality:</strong> {pet.personality}</p>
        <p><strong>Adoption Date:</strong> {formatDate(pet.adoption_date || new Date())}</p>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="primary" 
          size="lg"
          onClick={generatePDF}
          className="me-3"
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