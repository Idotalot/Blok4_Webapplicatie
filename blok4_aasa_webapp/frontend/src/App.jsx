import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';  // Import your Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define a route for the dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* You can add more routes for other pages here */}
      </Routes>
    </Router>
  );
}

export default App;