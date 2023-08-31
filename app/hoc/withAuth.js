import { useEffect, useState } from 'react';
import LoadingSkeleton from '../LoadingSkeleton';
import { useRouter } from 'next/navigation';

function withAuth(WrappedComponent) {
  function AuthenticatedComponent(props) {
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('tokenQuickCurriculum');
      const expirationTime = localStorage.getItem('expirationTimeQuickCurriculum');

      if (!token || !expirationTime) {
        // Token doesn't exist or is missing expiration time, redirect to login
        router.replace('/login');
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        return;
      }

      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expirationTime)) {
        // Token has expired, clear token and redirect to login
        localStorage.removeItem('tokenQuickCurriculum');
        localStorage.removeItem('expirationTimeQuickCurriculum');
        router.replace('/login');
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {
        // Token is valid, allow access
        setLoading(false);
      }
    }, []);

    if (isLoading) {
      // Render a loading indicator, you can customize this as needed
      return <LoadingSkeleton />;
    }

    return <WrappedComponent {...props} />;
  }

  // Set the displayName for the HOC to avoid the error
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  AuthenticatedComponent.displayName = `withAuth(${displayName})`;

  return AuthenticatedComponent;
}

export default withAuth;
