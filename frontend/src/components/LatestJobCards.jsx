import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl bg-[#1A1A1A] border border-[#2e2e2e] cursor-pointer transition-all duration-300 hover:shadow-white/10 hover:scale-[1.02]"
    >
      {/* Company Info */}
      <div className="mb-3">
        <h2 className="font-semibold text-white text-sm">{job?.company?.name}</h2>
        <p className="text-xs text-gray-500">India</p>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-white leading-tight">{job?.title}</h1>
        <p className="text-sm text-gray-400 mt-1 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <Badge className="bg-[#2a2a2a] text-gray-300 border border-[#3a3a3a] font-medium">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="bg-[#2a2a2a] text-gray-300 border border-[#3a3a3a] font-medium">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#2a2a2a] text-gray-300 border border-[#3a3a3a] font-medium">
          ₹ {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
