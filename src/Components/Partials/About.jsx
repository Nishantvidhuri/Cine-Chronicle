import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 w-screen text-white min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-500 hover:text-blue-400 transition"
        >
          <i className="ri-arrow-left-line text-2xl mr-2"></i>
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-gray-800 flex-grow p-4 lg:p-10">
        <h1 className="text-4xl font-bold mb-6 text-center">About CineChronicle</h1>
        <p className="text-base text-gray-300 text-center max-w-3xl mb-6">
          CineChronicle is your ultimate destination for exploring the world of cinema. 
          Discover trending movies, popular shows, and all the stars behind them!
        </p>

        {/* Features Section */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h2 className="col-span-full text-3xl font-semibold text-center mb-6">Our Features</h2>

          {/* Feature Cards */}
          {[
            {
              title: "Trending Movies",
              description:
                "Stay updated with the latest trending movies. Find detailed ratings, trailers, and reviews to help you choose what to watch next!",
            },
            {
              title: "Trending Shows",
              description:
                "Discover the most talked-about shows of the moment. Watch trailers and read reviews to keep up with the latest episodes!",
            },
            {
              title: "Popular Movies",
              description:
                "Check out the most popular movies loved by our community. Each listing includes ratings and quick access to trailers!",
            },
            {
              title: "People",
              description:
                "Get to know the stars behind your favorite films and shows. Explore their works and contributions to the industry!",
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-4">
        <p className="text-sm text-gray-400">© 2024 CineChronicle. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
