import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import MoviePage from './pages/MoviePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Add more routes here as needed */}
      </Routes>
    </Layout>
  );
}

export default App;