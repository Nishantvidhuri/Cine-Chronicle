import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import DropDown from './DropDown';
import axios from '../../utils/axios';
import Cards from './Cards';
import Loading from '../../Components/Partials/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    document.title = "CineChronicle | Trending";

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

            if (data.results.length > 0) {
                settrending((prevState) => [...prevState, ...data.results]);
                setpage(page + 1);
                console.log(data);
            } else {
                sethasMore(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const refreshHandler = async () => {
        if (trending.length === 0) {
            GetTrending();
        } else {
            setpage(1);
            settrending([]);
            GetTrending();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category, duration]);

    return trending.length ? (
        <div className='w-screen h-screen bg-gray-900 text-white'>
            {/* First Line: Back Button, Trending Title, and Dropdowns */}
            <div className='w-full px-[5%] flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-zinc-400 flex items-center'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-24"></i>
                    Trending
                </h1>
                <div className='hidden md:flex justify-center w-[80%] md:justify-end'>
                    <TopNav />
                </div>
                {/* Dropdowns for larger screens */}
                <div className='hidden md:flex items-center'>
                    <DropDown 
                        title="Category"
                        options={["movie", "tv", "all"]}
                        func={(e) => {
                            setcategory(e.target.value);
                            console.log("Selected category:", e.target.value);
                        }}
                    />
                    <div className='w-[2%]'></div>
                    <DropDown 
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setduration(e.target.value)}
                    />
                </div>
            </div>

            {/* Dropdowns for mobile */}
            <div className='flex md:hidden items-center  flex-col w-full px-[5%] py-2'>
                <DropDown 
                    title="Category"
                    options={["movie", "tv", "all"]}
                    func={(e) => {
                        setcategory(e.target.value);
                        console.log("Selected category:", e.target.value);
                    }}
                />
                <DropDown 
                    title="Duration"
                    options={["week", "day"]}
                    func={(e) => setduration(e.target.value)}
                />
            </div>

            {/* Infinite Scroll Section */}
            <div className='flex justify-center items-center '>
                <InfiniteScroll 
                    next={GetTrending}
                    dataLength={trending.length}
                    hasMore={hasMore}
                    loader={<Loading />}
                >
                    <div className='flex flex-col items-center  '>
                        <Cards className='' data={trending} title={category} />
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default Trending;
