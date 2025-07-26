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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || 'Login successful!');
        navigate('/');
      } else {
        toast.error(res.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login failed. Try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="flex items-center justify-center max-w-4xl mx-auto px-4 pt-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg space-y-5"
        >
          <h1 className="font-bold text-2xl text-center">Login</h1>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="arpit@gmail.com"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div>
            <Label className="block mb-2">Role</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                Recruiter
              </label>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full bg-zinc-700 hover:bg-zinc-600 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
              Login
            </Button>
          )}

          <p className="text-center text-sm text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-white underline hover:text-zinc-300">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
