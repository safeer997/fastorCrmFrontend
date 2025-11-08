import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard.jsx';
import LeadForm from './components/LeadForm.jsx';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('fastorToken');
  if (!token) {
    return <Navigate to='/auth' />;
  }
  return children;
}

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/submitlead' element={<LeadForm />} />
          <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
