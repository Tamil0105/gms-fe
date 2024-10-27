import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <nav>
          <h2>Authenticated Header</h2>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Footer Content</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
