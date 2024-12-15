import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/movie';
import KakaoAuth from './pages/login/KakaoAuth';
import KakaoLogin from './pages/login/KakaoLogin';
import Modal from 'react-modal';
import MyReviews from './pages/my/movie/reviews/MyReviews';
import MyLikes from './pages/my/movie/likes/MyLikes';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie" element={<Movie />} />
        <Route path="login" element={<KakaoLogin />} />
        <Route path="/kakaoAuth" Component={KakaoAuth} />
        <Route path='my/movie/reviews' element={<MyReviews />} />
        <Route path='my/movie/likes' element={<MyLikes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
