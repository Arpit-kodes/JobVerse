import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(prev => !prev);
    // Optionally: Trigger backend API here
  };

  const daysAgo = (dateString) => {
    const created = new Date(dateString);
    const now = new Date();
    const diff = now - created;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? 'Today' : `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-zinc-900 border border-zinc-700 text-white transition duration-300 hover:shadow-lg hover:scale-[1.01] h-full flex flex-col justify-between">
      
      {/* Top: Date & Bookmark */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-400">{daysAgo(job?.createdAt)}</p>
        <button
          onClick={toggleBookmark}
          className="p-2 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-400 text-white hover:from-zinc-500 hover:to-white transition shadow-md"
          title="Bookmark this job"
        >
          {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12 border border-zinc-600">
          <AvatarImage src={job?.company?.logo || '/placeholder.png'} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h1 className="font-bold text-xl mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-400 line-clamp-3">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Badge className="bg-zinc-800 text-gray-200 border border-gray-600 font-medium">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="bg-zinc-800 text-gray-200 border border-gray-600 font-medium">
          {job?.jobType}
        </Badge>
        <Badge className="bg-zinc-800 text-gray-200 border border-gray-600 font-medium">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="px-4 py-2 rounded-md border border-white text-white bg-zinc-800 hover:bg-white hover:text-black transition"
        >
          View Details
        </button>
        <button
          onClick={toggleBookmark}
          className="px-4 py-2 rounded-md border border-gray-500 text-white bg-zinc-700 hover:bg-white hover:text-black transition"
        >
          {bookmarked ? 'Saved' : 'Save For Later'}
        </button>
      </div>
    </div>
  );
};

export default Job;
