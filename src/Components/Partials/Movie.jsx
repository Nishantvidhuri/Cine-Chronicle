import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import DropDown from './DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards';
import Loading from './Loading';

function Movie() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "CineChronicle | Movies ";

  const Getmovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = async () => {
    if (movie.length === 0) {
      Getmovie();
    } else {
      setpage(1);
      setmovie([]);
      Getmovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length ? (
    <div className='w-screen h-screen'>
      <div className='w-full px-[5%] flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-zinc-400'>
          <i onClick={() => navigate("/")} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
          Movie <small className='ml-2 text-sm text-zinc-600'>{category.toUpperCase()}</small>
        </h1>
      </div>
      <div className='flex items-center w-full justify-center px-[5%]'>
        {/* TopNav is hidden on mobile screens */}
        <div className='hidden md:flex w-[80%]'>
          <TopNav />
        </div>
        <DropDown 
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => { setcategory(e.target.value); }}
        />
        <div className='w-[2%]'></div>
      </div>
      <InfiniteScroll 
        next={Getmovie}
        dataLength={movie.length}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie;
