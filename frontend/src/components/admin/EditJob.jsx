import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import { Loader2, ArrowLeft } from 'lucide-react';

const experienceOptions = [
  { label: 'Fresher (0-1 yrs)', value: 'Fresher' },
  { label: 'Mid (1-2 yrs)', value: 'Mid' },
  { label: 'Intermediate (2-4 yrs)', value: 'Intermediate' },
  { label: 'Senior (4+ yrs)', value: 'Senior' },
];

const EditJob = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 1,
    companyId: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title,
            description: job.description,
            requirements: job.requirements.join(', '),
            salary: job.salary,
            location: job.location,
            jobType: job.jobType,
            experience: job.experienceLevel,
            position: job.position || 1,
            companyId: job.company._id,
          });
        }
      } catch (error) {
        toast.error('Failed to fetch job details');
      }
    };

    if (jobId) fetchJob();
  }, [jobId]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company._id === value);
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const experienceChangeHandler = (value) => {
    setInput({ ...input, experience: value });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        ...input,
        requirements: input.requirements.split(',').map((req) => req.trim()),
      };

      const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Job updated successfully');
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="flex items-center justify-center py-10 px-4">
        <form
          onSubmit={updateHandler}
          className="w-full max-w-4xl bg-zinc-900 border border-zinc-700 p-8 rounded-lg shadow-lg"
        >
          <div className="mb-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/jobs')}
              className="flex items-center gap-1 text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-center">Edit Job</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                name="title"
                required
                value={input.title}
                onChange={changeHandler}
                className="bg-zinc-800 text-white"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                required
                value={input.description}
                onChange={changeHandler}
                className="bg-zinc-800 text-white"
              />
            </div>
            <div>
              <Label>Requirements (comma separated)</Label>
              <Input
                name="requirements"
                required
                placeholder="Node.js, Express.js, Docker, AWS"
                value={input.requirements}
                onChange={changeHandler}
                className="bg-zinc-800 text-white"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                name="salary"
                required
                value={input.salary}
                onChange={changeHandler}
                className="bg-zinc-800 text-white"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                required
                value={input.location}
                onChange={changeHandler}
                className="bg-zinc-800 text-white"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                name="jobType"
                required
                value={input.jobType}
                onChange={changeHandler}
                className="bg-zinc-800 text-white"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Select value={input.experience} onValueChange={experienceChangeHandler}>
                <SelectTrigger className="bg-zinc-800 text-white">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 text-white">
                  <SelectGroup>
                    {experienceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                required
                value={input.position}
                onChange={changeHandler}
                className="bg-zinc-800 text-white"
              />
            </div>
            {companies.length > 0 && (
              <div>
                <Label>Select Company</Label>
                <Select value={input.companyId} onValueChange={selectChangeHandler}>
                  <SelectTrigger className="bg-zinc-800 text-white">
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full mt-6 bg-zinc-700" disabled>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700"
            >
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditJob;
