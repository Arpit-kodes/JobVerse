import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const skills = user?.profile?.skills || [];
  const hasResume = user?.profile?.resume && user?.profile?.resumeOriginalName;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl my-6 p-8 shadow-md">
        <div className="flex justify-between items-start">
          {/* Avatar & Name */}
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 border border-zinc-700 shadow-md">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{user?.fullname || 'Full Name'}</h1>
              <p className="text-gray-400 text-sm">{user?.profile?.bio || 'No bio provided.'}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={() => setOpen(true)}
            className="border border-zinc-500 text-white hover:bg-white hover:text-black"
            variant="outline"
          >
            <Pen className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2 text-gray-300">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4" />
            <span>{user?.email || 'Not Provided'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-4 h-4" />
            <span>{user?.phoneNumber || 'Not Provided'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="font-medium mb-2 text-white">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-zinc-800 text-gray-200 border border-gray-600"
                  variant="outline"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <Label className="text-md font-semibold mb-1 block">Resume</Label>
          {hasResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-400 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md">
        <h1 className="font-bold text-xl mb-4 text-white">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
