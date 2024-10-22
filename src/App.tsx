import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/movie';
import KakaoAuth from './pages/login/KakaoAuth';
import KakaoLogin from './pages/login/KakaoLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie" element={<Movie />} />
        <Route path="login" element={<KakaoLogin />} />
        <Route path="/kakaoAuth" Component={KakaoAuth} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
