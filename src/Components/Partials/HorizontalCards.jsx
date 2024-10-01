import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../../public/Noimage.jpg';

const HorizontalCards = ({ data }) => {
  return (
    <div className='w-full flex flex-wrap md:flex-nowrap overflow-y-hidden mb-5'>
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className='w-full md:min-w-[15%] h-[50vh] mb-5 md:mr-5 p-5 bg-zinc-900'
          >
            <img
              className='w-full h-[55%] object-cover'
              src={d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}` : noImage}
              alt={d.title || d.name}
            />
            <div className='text-white p-3 overflow-y-auto h-[45%]'>
              <h1 className='text-xl font-semibold'>
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className='overflow-y-auto'>
                {d.overview.slice(0, 50)}...
                <span className='text-zinc-500'>more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className='text-3xl text-white font-black text-center mt-5'>Nothing to show</h1>
      )}
    </div>
  );
};

export default HorizontalCards;
