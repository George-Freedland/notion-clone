import { ReactElement } from 'react';
import { 
  Routes, 
  Route, 
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Protected route for /home */}
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      {/* Redirect all unknown routes to / */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  if (!userId || !username) {
    // Redirect to login if user data is missing
    return <Navigate to="/" />;
  }

  // Render Header and protected content
  return (
    <>
      <Header />
      {element}
    </>
  );
};

export default App;

