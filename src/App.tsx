import './App.css';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/movie';
import KakaoAuth from './pages/login/KakaoAuth';
import KakaoLogin from './pages/login/KakaoLogin';
import Modal from 'react-modal';
import MyReviews from './pages/my/movie/reviews/MyReviews';
import MyLikes from './pages/my/movie/likes/MyLikes';
import MyRatings from './pages/my/movie/ratings/MyRatings';
import { useState } from 'react';
import Layout from './components/Layout';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home Layout={Layout} />}
        />
        <Route path="movie" element={<Movie Layout={Layout} />} />
        <Route path="login" element={<KakaoLogin Layout={Layout} />} />
        <Route path="/kakaoAuth" element={<KakaoAuth Layout={Layout} />} />
        <Route path="my/movie/reviews" element={<MyReviews Layout={Layout} />} />
        <Route path="my/movie/likes" element={<MyLikes Layout={Layout} />} />
        <Route path="my/movie/ratings" element={<MyRatings Layout={Layout} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
