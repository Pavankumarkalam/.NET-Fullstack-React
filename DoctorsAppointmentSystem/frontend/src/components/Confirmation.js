import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;

  // If appointment data is missing, show error message
  if (!appointment) {
    return (
      <Container className="mt-5">
        <Card className="p-4 text-center">
          <h3>No appointment found.</h3>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 text-center shadow-lg">
        <h3 className="text-success">Appointment Confirmed 🎉</h3>
        <p><strong>Patient Name:</strong> {appointment.patientName}</p>
        <p><strong>Email:</strong> {appointment.email}</p>
        <p><strong>Doctor ID:</strong> {appointment.doctorId}</p>
        <p><strong>Date:</strong> {appointment.date}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <Button onClick={() => navigate('/')} className="mt-3">Go to Home</Button>
      </Card>
    </Container>
  );
};

export default Confirmation;
