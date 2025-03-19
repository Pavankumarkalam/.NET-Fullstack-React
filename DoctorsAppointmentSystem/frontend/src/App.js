import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
