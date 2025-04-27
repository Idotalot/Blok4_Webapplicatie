import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';  // Import your Dashboard component
import Metingen from './pages/Metingen.jsx';  // Import your Dashboard component
import Logs from './pages/Logs.jsx';  // Import your Dashboard component


function App() {
  return (
    <Router>
      <Routes>
        {/* Define a route for the dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/metingen" element={<Metingen />} />
        <Route path="/logs" element={<Logs />} />

        {/* You can add more routes for other pages here */}
      </Routes>
    </Router>
  );
}

export default App;