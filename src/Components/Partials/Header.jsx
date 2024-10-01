import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
    return (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'
        >
            <h1 className='w-[70%] text-5xl font-black text-white'>
                {data.name || data.title || data.original_name || data.original_title}
            </h1>
            {/* Summary text only for larger screens */}
            <p className='hidden md:block w-[70%] mt-3 text-white'>
                {data.overview.length > 200 ? `${data.overview.slice(0, 200)}...` : data.overview}
                <Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-200'>more</Link>
            </p>
            <p className='text-white flex'>
                <i className="text-yellow-500 ri-projector-2-fill"></i>
                <span className="ml-2">{data.release_date || "No Information"}</span>
                <i className="ml-5 text-yellow-500 ri-album-fill"></i>
                <span className="ml-2">{data.media_type.toUpperCase()}</span>
            </p>
            {/* Round Watch Trailer Button */}
            <Link
                to={`/${data.media_type}/details/${data.id}/trailer`}
                className='flex items-center justify-center w-12 h-12 rounded-full bg-[#6556CD] text-white font-semibold mt-5'
            >
                <i className="text-white ri-play-fill text-2xl"></i>
            </Link>
        </div>
    );
};

export default Header;
