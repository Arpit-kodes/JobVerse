import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const categories = ["Developer", "Designer", "Marketing", "Manager", "Internship", "Remote"];

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedQuery } = useSelector((state) => state.job);

  const handleSearch = async (keyword) => {
    if (!keyword || keyword === searchedQuery) return;

    setLoading(true);
    dispatch(setSearchedQuery(keyword));
    navigate('/browse');
    setTimeout(() => setLoading(false), 400); // simulate delay for smoother UX
  };

  const searchJobHandler = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    await handleSearch(query.trim());
  };

  const handleCategoryClick = async (cat) => {
    await handleSearch(cat);
  };

  return (
    <section className="relative bg-black text-[#E5E5E5] py-20 px-4 overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] bg-[#333] opacity-20 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-[#444] opacity-10 blur-2xl rounded-full z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block px-4 py-1 rounded-full bg-[#333] text-xs font-medium tracking-wide text-gray-300">
          #1 Job Hunt Platform
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-zinc-300 via-slate-500 to-gray-500 bg-clip-text text-transparent">
          Find Your <span className="text-gray-400">Dream Job</span> Now
        </h1>

        <p className="text-gray-400 text-md md:text-lg max-w-2xl mx-auto">
          Thousands of roles from top companies. Apply instantly and shape your future.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={searchJobHandler}
          className="flex max-w-xl mx-auto bg-[#1A1A1A] overflow-hidden rounded-full border border-[#333] shadow-md"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search job title, company..."
            className="flex-1 px-4 py-2 text-sm text-gray-200 bg-transparent outline-none placeholder:text-gray-500"
          />
          <Button
            type="submit"
            className="rounded-none rounded-r-full bg-[#333] hover:bg-[#444] px-6 h-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              <Search className="h-5 w-5 text-white" />
            )}
          </Button>
        </form>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat)}
              className="border border-[#333] px-4 py-1.5 rounded-full text-sm text-gray-300 hover:bg-[#333] hover:text-white transition"
              disabled={loading}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
