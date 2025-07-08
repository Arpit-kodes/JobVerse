import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto mt-6 border border-zinc-800 rounded-xl shadow-lg bg-zinc-900">
      <Table className="min-w-full text-sm text-white">
        <TableCaption className="italic text-zinc-400 py-4">
          Recently Posted Jobs
        </TableCaption>
        <TableHeader className="bg-zinc-800">
          <TableRow>
            <TableHead className="text-zinc-300 font-medium">Company Name</TableHead>
            <TableHead className="text-zinc-300 font-medium">Role</TableHead>
            <TableHead className="text-zinc-300 font-medium">Posted On</TableHead>
            <TableHead className="text-zinc-300 font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-zinc-800 transition-colors"
              >
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="hover:bg-zinc-700 p-1 rounded">
                      <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-40 bg-zinc-800 border border-zinc-700 text-white p-2 rounded-lg"
                      sideOffset={5}
                    >
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-700 cursor-pointer text-sm"
                      >
                        <Edit2 className="w-4 text-zinc-300" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 px-2 py-1 mt-1 rounded hover:bg-zinc-700 cursor-pointer text-sm"
                      >
                        <Eye className="w-4 text-zinc-300" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-zinc-500 py-6">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
