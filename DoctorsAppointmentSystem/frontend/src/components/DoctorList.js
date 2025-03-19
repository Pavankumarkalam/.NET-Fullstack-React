import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Available Doctors</h2>
      {doctors.map(doctor => (
        <Card key={doctor.id}>
          <Card.Body>
            <Card.Title>{doctor.name}</Card.Title>
            <Card.Text>{doctor.specialty}</Card.Text>
            <Button onClick={() => navigate(`/booking/${doctor.id}`)}>Book Appointment</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default DoctorList;
