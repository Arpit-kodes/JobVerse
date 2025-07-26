import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from '../ui/table';
import {
  Popover, PopoverContent, PopoverTrigger
} from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const capitalize = (word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();

const statusBadge = (status) => {
  const capitalStatus = capitalize(status);
  if (capitalStatus === "Accepted")
    return <span className="bg-green-700/20 text-green-400 px-2 py-1 rounded text-xs font-medium">Accepted</span>;
  if (capitalStatus === "Rejected")
    return <span className="bg-red-700/20 text-red-400 px-2 py-1 rounded text-xs font-medium">Rejected</span>;
  return <span className="bg-yellow-700/20 text-yellow-300 px-2 py-1 rounded text-xs font-medium">Pending</span>;
};

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [localApplicants, setLocalApplicants] = useState([]);

  useEffect(() => {
    setLocalApplicants(applicants?.applications || []);
  }, [applicants]);

  const fetchUpdatedApplicants = async () => {
    try {
      const jobId = applicants?.jobId;
      if (!jobId) return;

      const res = await axios.get(`${APPLICATION_API_END_POINT}/job/${jobId}/applicants`, {
        withCredentials: true,
      });
      setLocalApplicants(res.data?.applications || []);
    } catch (error) {
      toast.error("Failed to fetch updated applicants");
    }
  };

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchUpdatedApplicants();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="overflow-x-auto mt-6 shadow border border-zinc-800 rounded-md bg-zinc-900">
      <Table className="min-w-full text-sm text-white">
        <TableCaption className="italic text-zinc-400 py-4">Applicants for this job</TableCaption>
        <TableHeader className="bg-zinc-800 border-b border-zinc-700">
          <TableRow>
            <TableHead className="text-zinc-300 font-semibold">Full Name</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Email</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Phone</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Resume</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Applied On</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Status</TableHead>
            <TableHead className="text-right text-zinc-300 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {localApplicants.length > 0 ? (
            localApplicants.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-zinc-800 transition-colors"
              >
                <TableCell>{item?.applicant?.fullname || "NA"}</TableCell>
                <TableCell>{item?.applicant?.email || "NA"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "NA"}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300 transition"
                    >
                      {item.applicant.profile.resumeOriginalName || "View Resume"}
                    </a>
                  ) : (
                    <span className="text-zinc-500">NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "NA"}
                </TableCell>
                <TableCell>{statusBadge(item.status)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="hover:bg-zinc-800 p-1 rounded">
                      <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2 bg-zinc-900 border border-zinc-700 text-white shadow-lg">
                      {shortlistingStatus.map((status, index) => {
                        const isSelected = capitalize(item.status) === status;
                        return (
                          <div
                            key={index}
                            onClick={() => statusHandler(status.toLowerCase(), item._id)}
                            className={`px-2 py-1 rounded cursor-pointer text-sm
                              ${isSelected
                                ? 'bg-green-700/20 text-green-400 font-medium'
                                : 'hover:bg-zinc-800 text-zinc-200'}`}
                          >
                            {status}
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="7" className="text-center text-zinc-500 py-4">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
