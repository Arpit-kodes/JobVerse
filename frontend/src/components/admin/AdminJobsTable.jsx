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
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteJobById, getAllJobs, getAdminJobs } from '../../redux/jobSlice';
import { toast } from 'sonner';

const AdminJobsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await dispatch(deleteJobById(id)).unwrap();

      // ✅ Sync public job list and admin jobs list
      await dispatch(getAllJobs());
      await dispatch(getAdminJobs());

      toast.success("Job deleted and listings updated!");
    } catch (err) {
      toast.error("Failed to delete job.");
    }
  };

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
              <TableRow key={job._id} className="hover:bg-zinc-800 transition-colors">
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="hover:bg-zinc-700 p-1 rounded">
                      <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-44 bg-zinc-800 border border-zinc-700 text-white p-2 rounded-lg"
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
                      <div
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center gap-2 px-2 py-1 mt-1 rounded hover:bg-red-700 cursor-pointer text-sm"
                      >
                        <Trash2 className="w-4 text-red-400" />
                        <span className="text-red-400">Delete</span>
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
