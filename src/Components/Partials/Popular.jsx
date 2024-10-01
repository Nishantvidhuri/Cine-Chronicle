import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import DropDown from './DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards';
import Loading from './Loading';

const Popular = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    document.title = "CineChronicle | Popular";

    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`/${category}/popular?page=${page}`);

            if (data.results.length > 0) {
                setpopular((prevState) => [...prevState, ...data.results]);
                setpage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const refreshHandler = async () => {
        if (popular.length === 0) {
            GetPopular();
        } else {
            setpage(1);
            setpopular([]);
            GetPopular();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return popular.length ? (
        <div className='w-screen h-screen'>
            <div className='w-full px-[5%] flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate("/")} className="hover:text-[#6556CD] ri-arrow-left-line mr-24"></i>
                    Popular
                </h1>
            </div>
            <div className='flex items-center justify-center w-full px-[5%]'>
                {/* TopNav is hidden on mobile screens */}
                <div className='hidden md:flex  w-[80%]'>
                    <TopNav />
                </div>
                <DropDown
                 
                    title="Category"
                    options={["movie", "tv"]}
                    func={(e) => {
                        setcategory(e.target.value);
                        console.log("Selected category:", e.target.value);
                    }}
                />
                <div className='w-[2%]'></div>
            </div>
            <InfiniteScroll 
                next={GetPopular}
                dataLength={popular.length}
                hasMore={hasMore}
                loader={<Loading />}
            >
                <Cards data={popular} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Popular;
