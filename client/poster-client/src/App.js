import './App.css';
import { apolloClient } from './lib/graphql/queries';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { ApolloProvider } from '@apollo/client';
import PostPage from './pages/PostPage';
import { useState, useEffect } from 'react';
import SignUpPage from './pages/SignUpPage';
import UserProfile from './pages/UserProfile';
import { getUser } from './lib/auth';
import ExplorePage from './pages/ExplorePage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
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
    const publicPaths = ['/login', '/signup'];
    if (!user && !publicPaths.includes(location.pathname)) {
      navigate('/login');
    }
  }, [user, navigate, location]);

  return (
    <ApolloProvider client={apolloClient}>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/" element={user ? <HomePage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/post/:postId" element={user ? <PostPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/user/:id" element={user ? <UserProfile onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/explore" element={user ? <ExplorePage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
