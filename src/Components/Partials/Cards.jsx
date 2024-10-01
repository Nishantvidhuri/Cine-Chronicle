import React from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../../public/Noimage.jpg';

function Cards({ data, title }) {
  console.log(title);
  return (
    <div className='flex flex-wrap justify-center w-full h-full px-[5%] bg-[#1F1E24]'>
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className='relative w-[40vh] mr-[5%] mb-[5%] sm:w-[25vh] sm:mr-[5%] sm:mb-[5%] sm:max-w-[25vh]'
          key={i}
        >
          <img
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-full object-cover'
            src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}` : noImage}
          />
          <h1 className='text-2xl text-zinc-200 font-semibold mt-3'>
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average > 0 && ( // Only show the rating if it's greater than 0
            <div className='absolute right-3 bottom-10 rounded-full text-xl font-semibold bg-yellow-500 text-white w-[8vh] h-[8vh] shadow-lg flex justify-center items-center'>
              {(c.vote_average * 10).toFixed()}
              <sup className="text-sm">%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
