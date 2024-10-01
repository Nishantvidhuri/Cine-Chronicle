import React from 'react';
import { Route, BrowserRouter, Router, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Trending from './Components/Partials/Trending';
import Popular from './Components/Partials/Popular';
import Movie from './Components/Partials/Movie';
import TvShows from './Components/Partials/TvShows';
import People from './Components/Partials/People';
import About from './Components/Partials/About';
import ContactUs from './Components/Partials/ContactUs';
import Moviedetails from './Components/Partials/Moviedetails';
import PeopleDetails from './Components/Partials/PeopleDetails';
import TvDetails from './Components/Partials/TvDetails';
import Trailer from './Components/Partials/Trailer';
import NotFound from './Components/Partials/NotFound';

function App() {
  return (
    <div className='h-screen w-screen bg-[#1F1E24] flex'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/trending' element={<Trending/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/movie/details/:id' element={<Moviedetails/>}>
          <Route path='/movie/details/:id/trailer' element={<Trailer/>}/>
        </Route>
        <Route path='/movies' element={<Movie/>}/>
        <Route path='/tv/details/:id' element={<TvDetails/>}>
          <Route path='/tv/details/:id/trailer' element={<Trailer/>}/>
        </Route>
        <Route path='/tv_shows' element={<TvShows/>} />
        <Route path='/people' element={<People/>}/>
        <Route path='/person/details/:id' element={<PeopleDetails/>}/>

        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
