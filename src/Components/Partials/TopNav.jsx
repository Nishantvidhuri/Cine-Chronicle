import axios from '../../utils/axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Noimage from "../../../public/Noimage.jpg";

function TopNav() {
    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);
    const searchRef = useRef(null); // Ref for handling clicks outside
    const inputRef = useRef(null); // Ref for input field
    const [isInputVisible, setIsInputVisible] = useState(false); // For mobile input visibility

    const GetSearches = async () => {
        if (query.length === 0) return; // Avoid API call if query is empty
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        GetSearches();
    }, [query]);

    // Close search results on clicking outside of the search input
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearches([]); // Clear search results when clicking outside
                if (isInputVisible) {
                    setIsInputVisible(false); // Hide input on click outside (mobile only)
                }
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isInputVisible]);

    const handleSearchIconClick = () => {
        setIsInputVisible(true);
        if (inputRef.current) {
            inputRef.current.focus(); // Focus the input field to open the keyboard
        }
    };

    const handleClearInput = () => {
        setQuery(""); // Clear the input value
        if (inputRef.current) {
            inputRef.current.focus(); // Keep the input focused after clearing
        }
    };

    return (
        <div className='w-[80%] h-[10vh] mx-auto relative flex items-center justify-between topnav-container'>
            {/* Desktop Search Input */}
            <div className='hidden md:flex items-center w-[100%]'>
                <i className="text-3xl text-zinc-400 ri-search-2-line"></i>
                <input 
                    onChange={(e) => { setQuery(e.target.value); }} 
                    value={query} 
                    className='w-[50%] text-zinc-200 mx-10 text-xl outline-none border-none bg-transparent' 
                    type='text' 
                    placeholder='Search anything'
                />
                {query.length > 0 && 
                    <i 
                        onClick={handleClearInput} 
                        className="text-3xl right-0 text-zinc-400 ri-close-line cursor-pointer"
                    ></i>
                }
            </div>

            {/* Mobile Search Icon and Input - Positioned at Top Right */}
            <div className='md:hidden flex items-center relative ml-auto'>
                <i 
                    className={`text-3xl text-zinc-400 ri-search-2-line cursor-pointer ${isInputVisible ? 'hidden' : 'block'}`}
                    onClick={handleSearchIconClick} // Show input and focus when clicked
                ></i>
                <div className={`flex items-center ${isInputVisible ? 'flex' : 'hidden'} absolute right-0`}>
                    <input 
                        ref={inputRef} // Attach ref to the input
                        onChange={(e) => { setQuery(e.target.value); }} 
                        value={query} 
                        className='w-[200px] text-zinc-200 p-3 text-xl outline-none border-none bg-transparent'
                        type='text' 
                        placeholder='Search anything'
                        onBlur={() => setIsInputVisible(false)} // Hide input on blur
                    />
                    {query.length > 0 && 
                        <i 
                            onClick={handleClearInput} 
                            className="text-3xl text-zinc-400 ri-close-line cursor-pointer ml-2"
                        ></i>
                    }
                </div>
            </div>

            {/* Dropdown for Search Results */}
            {searches.length > 0 && (
                <div 
                    className='z-[1000] w-full max-h-[50vh] overflow-auto dropdown-container absolute top-full left-0 right-0' 
                    ref={searchRef}
                >
                    <div className='bg-zinc-800 bg-opacity-90 rounded-lg shadow-lg p-2'> {/* Updated background color */}
                        {searches.map((s, i) => (
                            <Link 
                                to={`/${s.media_type}/details/${s.id}`} 
                                key={i} 
                                className='dropdown-item hover:bg-zinc-700 duration-300 font-semibold text-white p-4 w-full flex justify-start border-b-2 border-zinc-600 items-center'
                            >
                                <img
                                    className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg' 
                                    src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}` : Noimage} 
                                    alt=''
                                />
                                <span>{s.name || s.title || s.original_name || s.original_title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopNav;
