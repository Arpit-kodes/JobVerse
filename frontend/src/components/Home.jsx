import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useGetAllJobs();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <HeroSection />
        </div>
      </section>

      {/* Category Carousel */}
      <section className="py-14 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-4 tracking-tight"></h2>
          <CategoryCarousel />
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-medium mb-4 tracking-tight"></h2>
          <LatestJobs />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default Home;
