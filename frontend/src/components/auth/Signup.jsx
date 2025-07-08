import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: null,
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 pt-10">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg space-y-5"
        >
          <h1 className="font-bold text-2xl text-center">Sign Up</h1>

          <div className="space-y-1">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Arpit Gupta"
              required
              className="bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="arpit@gmail.com"
              required
              className="bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          <div className="space-y-1">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="9988776655"
              required
              className="bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="******"
              required
              className="bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-zinc-600"
            />
          </div>

          <div className="space-y-1">
            <Label>Role</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="accent-zinc-400"
                  required
                />
                <span className="text-zinc-300">Student</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="accent-zinc-400"
                  required
                />
                <span className="text-zinc-300">Recruiter</span>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Profile Photo (optional)</Label>
            <Input
              type="file"
              name="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="bg-zinc-800 border-zinc-700 text-white file:text-sm file:bg-zinc-700 file:text-white file:rounded file:px-4 file:py-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white transition"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              'Signup'
            )}
          </Button>

          <p className="text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-white underline hover:text-zinc-300">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
