import { Navigate } from 'react-router-dom';

function RutaProtegida({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }
  return children;
}
export default RutaProtegida;