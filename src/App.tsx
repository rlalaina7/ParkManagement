import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParkingDisplay from './components/Parking/ParkingDisplay';
import FloorEdit from './components/Floor/Floor';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ParkingDisplay />} />
          <Route path="/floor/:floorId" element={<FloorEdit />} />
        </Routes>
    </Router>
  );
}

export default App;
