import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import DropDown from './DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards';
import Loading from './Loading';

function TvShows() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "CineChronicle | Tv Shows ";

  const Gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = async () => {
    if (tv.length === 0) {
      Gettv();
    } else {
      setpage(1);
      settv([]);
      Gettv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length ? (
    <div className='w-screen h-screen'>
      <div className='w-full px-[5%] flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-zinc-400'>
          <i onClick={() => navigate("/")} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
          TV <small className='ml-2 text-sm text-zinc-600'>{category.toUpperCase()}</small>
        </h1>
      </div>
      <div className='flex items-center justify-center w-full px-[5%]'>
        {/* TopNav is hidden on mobile screens */}
        <div className='hidden md:flex w-[80%]'>
          <TopNav />
        </div>
        <DropDown 
          title="Category"
          options={["on_the_air", "popular", "top_rated", "airing_today"]}
          func={(e) => { setcategory(e.target.value); }}
        />
        <div className='w-[2%]'></div>
      </div>
      <InfiniteScroll 
        next={Gettv}
        dataLength={tv.length}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows;
