import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/movie';
import KakaoAuth from './pages/login/KakaoAuth';
import KakaoLogin from './pages/login/KakaoLogin';
import MyReviews from './pages/myReviews/MyReviews';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie" element={<Movie />} />
        <Route path="login" element={<KakaoLogin />} />
        <Route path="/kakaoAuth" Component={KakaoAuth} />
        <Route path='myReviews' element={<MyReviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
