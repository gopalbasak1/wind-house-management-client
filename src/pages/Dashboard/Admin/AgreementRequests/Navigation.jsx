import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user?.role === 'admin' && (
          <li><Link to="/agreement-requests">Agreement Requests</Link></li>
        )}
        {/* Add other links as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
