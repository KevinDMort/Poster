import './App.css';
import { apolloClient } from './lib/graphql/queries';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getUser } from './lib/auth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import { ApolloProvider } from '@apollo/client';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser);

  const handleLogin = (user) => {
    setUser(user);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <ApolloProvider client={apolloClient}>
      <Routes>
        <Route index path="/"
              element={<HomePage />}
        />
       <Route path="/login"
            element={<LoginPage onLogin={handleLogin} />}
        />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
