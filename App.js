import AuthProvider from './src/Context/AuthProvider'; // Asegúrate de que la ruta sea correcta
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './src/Context/AuthProvider';

// Importa tus componentes
import Login from './src/Login/Login';
import Tab from './src/Navigation/TabNavigation/Tab';

export default function App() {
  return (
    <AuthProvider> 
      <NavigationContainer>
        <MyAppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}

function MyAppContent() {
  // Utiliza useAuth aquí
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Tab /> : <Login />;
}