import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ParkingDisplay from './components/ParkingDisplay';

function App() {
  return (
    <Router>
      <div>
        <h1>Parking management</h1>
        <Routes>
          <Route path="/" element={<ParkingDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
