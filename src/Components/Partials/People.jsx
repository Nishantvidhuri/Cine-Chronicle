import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards';
import Loading from './Loading';

const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "CineChronicle | People";

  const Getperson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshHandler = async () => {
    if (person.length === 0) {
      Getperson();
    } else {
      setpage(1);
      setperson([]);
      Getperson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length ? (
    <div className='w-screen h-screen'>
      <div className='w-full px-[5%] flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-zinc-400'>
          <i onClick={() => navigate("/")} className="hover:text-[#6556CD] ri-arrow-left-line"></i>
          People <small className='ml-2 text-sm text-zinc-600'>{category.toUpperCase()}</small>
        </h1>
      </div>
      <div className='flex items-center w-full px-[5%]'>
        {/* TopNav is hidden on mobile screens */}
        <div className='hidden md:flex w-[80%]'>
          <TopNav />
        </div>
      </div>
      <InfiniteScroll 
        next={Getperson}
        dataLength={person.length}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
