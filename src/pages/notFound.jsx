import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>404 - Not Found</h2>
      <p>The requested page does not exist.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default NotFound;
