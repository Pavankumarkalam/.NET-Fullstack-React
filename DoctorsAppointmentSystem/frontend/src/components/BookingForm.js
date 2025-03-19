import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get doctor ID from URL

  const formik = useFormik({
    initialValues: { patientName: '', email: '', date: '', time: '' },
    validationSchema: Yup.object({
      patientName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      date: Yup.string().required('Required'),
      time: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/appointments/book', {
          ...values,
          doctorId: id,
        });

        // ✅ Navigate to confirmation page with appointment details
        navigate('/confirmation', { state: { appointment: response.data.appointment } });
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    },
  });

  return (
    <div className="container mt-4">
      <h2>Book Appointment</h2>
      <Form onSubmit={formik.handleSubmit} className="p-3">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control {...formik.getFieldProps('patientName')} />
          {formik.touched.patientName && formik.errors.patientName ? (
            <div className="text-danger">{formik.errors.patientName}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" {...formik.getFieldProps('date')} />
          {formik.touched.date && formik.errors.date ? (
            <div className="text-danger">{formik.errors.date}</div>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" {...formik.getFieldProps('time')} />
          {formik.touched.time && formik.errors.time ? (
            <div className="text-danger">{formik.errors.time}</div>
          ) : null}
        </Form.Group>

        <Button type="submit" onClick={() => navigate(`/Confirmation`)}>Book</Button>
      </Form>
    </div>
  );
};

export default BookingForm;
