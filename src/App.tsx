import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParkingDisplay from './components/Parking/ParkingDisplay';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ParkingDisplay />} />
        </Routes>
    </Router>
  );
}

export default App;
