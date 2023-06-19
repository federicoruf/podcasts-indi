import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Podcast } from './pages/Podcast';
import { Episode } from './pages/Episode';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/podcast/:podcastId' exact element={<Podcast />} />
        <Route
          path='/podcast/:podcastId/episode/:episodeId'
          exact
          element={<Episode />}
        />
      </Routes>
    </Router>
  );
}

export default App;
