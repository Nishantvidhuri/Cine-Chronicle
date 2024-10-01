import React, { useEffect, useState } from 'react';
import SideNav from './Partials/SideNav';
import TopNav from './Partials/TopNav';
import axios from '../utils/axios';
import Header from './Partials/Header';
import HorizontalCards from './Partials/HorizontalCards';
import DropDown from './Partials/DropDown';
import Loading from './Partials/Loading';

function Home() {
    document.title = "CineChronicle | Homepage";

    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all");
    const [loading, setLoading] = useState(true); // Add loading state

    // Function to fetch wallpaper
    const getWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            const randomData = data.results[Math.floor(Math.random() * data.results.length)];
            setWallpaper(randomData);
        } catch (err) {
            console.error("Error fetching wallpaper:", err);
        }
    };

    // Function to fetch trending data
    const getTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);
            setTrending(data.results);
        } catch (err) {
            console.error("Error fetching trending data:", err);
        } finally {
            setLoading(false); // Set loading to false after fetch
        }
    };

    // Effect to fetch wallpaper and trending data on mount
    useEffect(() => {
        getWallpaper();
        getTrending();
    }, [category]);

    // Show loading while fetching data
    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <SideNav />

            {/* Responsive container for main content */}
            <div className='w-full lg:w-[80%] h-full overflow-auto overflow-x-hidden bg-zinc-900 z-10 md:ml-[20%]'>
                <TopNav />

                {/* Responsive wrapper for Header with Wallpaper */}
                <div className='mx-4 md:mx-0'> {/* Add margin for mobile */}
                    <Header data={wallpaper} />
                </div>

                {/* Trending Section */}
                <div className='my-5 p-5 flex flex-col lg:flex-row justify-between items-center'>
                    <h1 className='text-2xl lg:text-3xl font-semibold text-zinc-400 mb-4 lg:mb-0'>
                        Trending
                    </h1>

                    {/* Dropdown Filter */}
                    <div className='w-full lg:w-auto'>
                        <DropDown
                            title="Filter"
                            options={['tv', 'movie', 'all']}
                            func={(e) => {
                                setCategory(e.target.value);
                                setLoading(true); // Reset loading when category changes
                            }}
                        />
                    </div>
                </div>

                {/* Horizontal Cards */}
                <HorizontalCards data={trending} func={setCategory} />
            </div>
        </>
    );
}

export default Home;
