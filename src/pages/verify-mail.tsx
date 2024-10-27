import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const VerificationPage = () => {
    const {verifiedEmail} = useAuth()
  const location = useLocation();
  const [loading, _] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromParams = queryParams.get('token'); // Get token from query parameters
    console.log(tokenFromParams);
    if (tokenFromParams) {
      setToken(tokenFromParams);
    }
  }, [location.search]);

  const verifyEmail = async () => {
    if (!token) return;

    await verifiedEmail.mutateAsync({token})   
  };

  return (
    <div>
      <button 
        onClick={verifyEmail} 
        disabled={loading} 
        className={`mt-4 p-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'} rounded`}
      >
        {verifiedEmail.isPending ? 'Verifying...' : 'Verify Email'}
      </button>
    </div>
  );
};

export default VerificationPage;
