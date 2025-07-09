import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    position: '',
    companyId: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="flex items-center justify-center py-10 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-zinc-900 border border-zinc-700 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">🧾 Post a New Job</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-zinc-300">Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="bg-zinc-800 border border-zinc-700 text-white"
                placeholder="e.g. Backend Developer"
              />
            </div>
            <div>
              <Label className="text-zinc-300">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="bg-zinc-800 border border-zinc-700 text-white"
                placeholder="Short job summary"
              />
            </div>
            <div>
              <Label className="text-zinc-300">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="bg-zinc-800 border border-zinc-700 text-white"
                placeholder="e.g. Node.js, MongoDB"
              />
            </div>
            <div>
              <Label className="text-zinc-300">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="bg-zinc-800 border border-zinc-700 text-white"
                placeholder="e.g. ₹4 LPA"
              />
            </div>
            <div>
              <Label className="text-zinc-300">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="bg-zinc-800 border border-zinc-700 text-white"
                placeholder="e.g. Remote / Bangalore"
              />
            </div>
            <div>
              <Label className="text-zinc-300">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="bg-zinc-800 border border-zinc-700 text-white"
                placeholder="e.g. Full-time"
              />
            </div>

            {/* ✅ Experience Level Dropdown */}
            <div>
              <Label className="text-zinc-300">Experience Level</Label>
              <Select
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, experienceLevel: value }))
                }
              >
                <SelectTrigger className="bg-zinc-800 border border-zinc-700 text-white">
                  <SelectValue
                    placeholder={
                      input.experienceLevel || 'Choose experience level'
                    }
                  />
                </SelectTrigger>
                <SelectContent className="text-white bg-zinc-800 border border-zinc-700">
                  <SelectGroup>
                    <SelectItem value="Fresher">Fresher (0-1 yrs)</SelectItem>
                    <SelectItem value="Mid">Mid (1-2 yrs)</SelectItem>
                    <SelectItem value="Intermediate">
                      Intermediate (2-4 yrs)
                    </SelectItem>
                    <SelectItem value="Senior">Senior (4+ yrs)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-zinc-300">No. of Positions</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="bg-zinc-800 border border-zinc-700 text-white"
                placeholder="e.g. 2"
              />
            </div>

            {/* Company Dropdown */}
            {companies.length > 0 && (
              <div className="col-span-1 sm:col-span-2">
                <Label className="text-zinc-300">Select Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full bg-zinc-800 border border-zinc-700 text-white">
                    <SelectValue placeholder="Choose a company..." />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-zinc-800 border border-zinc-700">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                          className="hover:bg-zinc-800 cursor-pointer"
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="mt-8">
            {loading ? (
              <Button className="w-full bg-zinc-700 text-white" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                Post Job
              </Button>
            )}
            {companies.length === 0 && (
              <p className="text-red-500 text-sm mt-4 text-center font-semibold">
                * Please register a company before posting a job.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
