import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const usersLogin = [
    {
      id:1,
      name: 'Alexis',
      username: 'Alexis_100',
      lastName: 'Ultreras Sotelo',
      password: 'Alexis_100',
      email: 'ultrerass01@hotmail.com',
    },
    {
      id:2,
      name: 'Eva',
      username: 'Eva_123',
      lastName: 'González Pérez',
      password: 'Eva_123',
      email: 'eva@gmail.com',
    },
    {
      id:3,
      name: 'Juan',
      username: 'Juanito_456',
      lastName: 'Rodríguez',
      password: 'Juanito_456',
      email: 'juanito@yahoo.com',
    },
    {
      id:4,
      name: 'Maria',
      username: 'Maria_789',
      lastName: 'López',
      password: 'Maria_789',
      email: 'maria@hotmail.com',
    },
  ];

  const login = (email, password) => {
    const user = usersLogin.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user); // Aquí se almacena el objeto de usuario completo
    } else {
      alert('Usuario no existente');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}