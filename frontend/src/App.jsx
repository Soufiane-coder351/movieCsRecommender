import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import MoviePage from './pages/MoviePage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Layout>
  );
}

export default App;