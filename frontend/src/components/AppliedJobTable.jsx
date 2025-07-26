import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const statusColor = {
  rejected: 'bg-red-500',
  pending: 'bg-yellow-500',
  accepted: 'bg-green-500'
};

const formatDate = (isoDate) => {
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch {
    return 'N/A';
  }
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="mt-6 bg-zinc-900 text-white p-4 rounded-xl shadow-lg border border-zinc-700">
      <Table>
        <TableCaption className="text-zinc-400">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Job Role</TableHead>
            <TableHead className="text-white">Company</TableHead>
            <TableHead className="text-right text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-zinc-400 py-6">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-zinc-800 transition-colors">
                <TableCell>{formatDate(appliedJob?.createdAt)}</TableCell>
                <TableCell>{appliedJob.job?.title || 'N/A'}</TableCell>
                <TableCell>{appliedJob.job?.company?.name || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`capitalize text-white ${statusColor[appliedJob?.status] || 'bg-gray-500'}`}>
                    {appliedJob?.status || 'unknown'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
