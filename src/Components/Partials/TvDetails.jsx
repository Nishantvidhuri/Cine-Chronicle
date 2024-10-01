import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadtv } from '../../Store/actions/TvActions';
import { Link, useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from "./HorizontalCards";
import noImage from '../../../public/Noimage.jpg'

const TvDetails = () => {
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncloadtv(id));
  }, [id]);

  return info ? (
    <div className='overflow-x-hidden'>
      <div className='bg-zinc-800'>
        <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
          backgroundPosition: 'center',  
          backgroundSize: 'cover',    
          backgroundRepeat: 'none',   
        }}
        className='w-screen relative px-5  sm:px-[5%] md:px-[10%] py-5'
      >
        <nav className='w-full text-zinc-100 flex gap-5 sm:gap-10 text-sm sm:text-xl h-[10vh] items-center'>
          <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></Link>
          <a target="_blank" href={info.details.homepage}><i className="ri-external-link-fill"></i></a>
          <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-global-line"></i></a>
          <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>imdb</a>
        </nav>
  
        <div className='w-full flex flex-col md:flex-row gap-5 mt-5'>
          <img
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-full md:w-[40vh] object-cover'
            src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path}`}
          />
            <Link className='p-3 w-[80px] h-[80px] absolute top-[490px] right-11 flex items-center justify-center sm:p-5 bg-[#6556CD] rounded-full text-sm sm:text-xl' to={`${pathname}/trailer`}>
              <i className=" text-xl  ri-play-fill"></i>
            </Link>
          <div className='content ml-0 md:ml-[5%] text-white'>
            <h1 className='text-2xl sm:text-5xl'>
              {info.details.name || info.details.title || info.details.original_name || info.details.original_title}
              <small className='text-lg sm:text-2xl font-bold text-zinc-300'>({info.details.first_air_date.split("-")[0]})</small>
            </h1>
  
            <div className='mt-3 mb-5 flex flex-wrap gap-3 items-center'>
              <span className='rounded-full text-sm sm:text-xl font-semibold bg-yellow-500 text-white w-[5vh] sm:w-[6vh] h-[5vh] sm:h-[6vh] shadow-lg flex justify-center items-center'>
                {(info.details.vote_average * 10).toFixed()}
                <sup className="text-xs sm:text-sm">%</sup>
              </span>
              <h1 className='w-auto sm:w-[60px] font-semibold text-sm sm:text-2xl'>User Score</h1>
              <h1 className='text-sm sm:text-base'>{info.details.first_air_date}</h1>
              <h1 className='text-sm sm:text-base'>{info.details.genres.map((g) => g.name).join(", ")}</h1>
              <h1 className='text-sm sm:text-base'>{info.details.runtime} min</h1>
            </div>
  
            <h1 className='text-lg sm:text-xl font-semibold italic text-zinc-200'>{info.details.tagline}</h1>
  
            <h1 className='text-lg sm:text-2xl mb-3 mt-5'>Overview</h1>
            <p className='text-sm sm:text-base'>{info.details.overview}</p>
  
            <h1 className='text-lg sm:text-2xl mb-3 mt-5'>Show Translated</h1>
            <p className='text-sm sm:text-base mb-10'>{info.translations.join(", ")}</p>
  
          </div>
        </div>
  
        <div className='w-full flex flex-col gap-y-5 mt-10'>
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className='flex gap-x-5 sm:gap-x-10 items-center text-white'>
              <h1 className='text-sm sm:text-base'>Available on Platform</h1>
              {info.watchproviders.flatrate.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className='w-[4vh] sm:w-[5vh] h-[4vh] sm:h-[5vh] object-fit rounded-md'
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />
              ))}
            </div>
          )}
  
          {info.watchproviders && info.watchproviders.rent && (
            <div className='flex gap-x-5 sm:gap-x-10 items-center text-white'>
              <h1 className='text-sm sm:text-base'>Available on rent</h1>
              {info.watchproviders.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className='w-[4vh] sm:w-[5vh] h-[4vh] sm:h-[5vh] object-fit rounded-md'
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />
              ))}
            </div>
          )}
  
          {info.watchproviders && info.watchproviders.buy && (
            <div className='flex gap-x-5 sm:gap-x-10 items-center text-white'>
              <h1 className='text-sm sm:text-base'>Available to Buy</h1>
              {info.watchproviders.buy.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className='w-[4vh] sm:w-[5vh] h-[4vh] sm:h-[5vh] object-fit rounded-md'
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
  
      {/* Seasons Section */}
        <hr className='mt-10 mb-5 border-none h-[2px]  bg-zinc-500' />
      <div className='w-screen lg:mx-52  bg-zinc-800'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-white'>Seasons</h1>
        <div className='w-full flex flex-wrap gap-5 overflow-y-hidden  p-5'>
          {info.details.seasons.length > 0 ? info.details.seasons.map((s, i) => (
            <div key={i} className='w-[30vw] sm:w-[15vh] mx-[2.5%]'>
              <img
                className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] min-w-[25vw] sm:min-w-[10vw] h-[25vh] sm:h-[30vh] object-cover'
                src={s.poster_path ? `https://image.tmdb.org/t/p/original/${s.poster_path}` : noImage}
              />
              <h1 className='text-base sm:text-2xl text-zinc-200 font-semibold mt-3'>{s.name}</h1>
            </div>
          )) : (
            <h1 className='text-3xl text-white font-black text-center mt-5'>Nothing to show</h1>
          )}
        </div>
      </div>
      </div>
      <div className='bg-zinc-800'>
          <hr className='border-none h-[2px] bg-zinc-500' />
          <div className='my-5 p-5 flex flex-col lg:flex-row justify-between items-center'>
            <h1 className='text-2xl sm:text-3xl   ml-[10%]  font-semibold text-white'>Recommendations and Similar Stuff</h1>
          </div>
          <div className='mx-4 lg:mx-52  '> {/* Adjust the margin for larger screens */}
            <HorizontalCards data={info.recommendation.length > 0 ? info.recommendation : info.similar} />
          </div>
        </div>
  
  
      <Outlet></Outlet>
    </div>
  ) : (
    <Loading />
  );
  
}

export default TvDetails;
