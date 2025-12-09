import { AuthProvider } from './context/authContext';
import { UserProvider } from './context/userContext';
import AppRoutes from './routes/index';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
