import './App.css';
import { apolloClient } from './lib/graphql/queries';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { ApolloProvider } from '@apollo/client';
import PostPage from './pages/PostPage';
import { useState } from 'react';
import { getUser } from './lib/auth';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser);

  const handleLogin = (user) => {
    setUser(user);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };
  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <ApolloProvider client={apolloClient}>
      <Routes>
        <Route index path="/"
              element={<HomePage onLogout={handleLogout}/>}/>
       <Route path="/login"
            element={<LoginPage onLogin={handleLogin} />}/>
        <Route path="/post/:postId"
            element={<PostPage  onLogout={handleLogout}/>} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
