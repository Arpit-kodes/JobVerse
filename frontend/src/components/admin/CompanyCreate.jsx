import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">📝 Create Your Company</h1>
          <p className="mt-2 text-zinc-400 text-sm">
            Give your company a name. You can always change this later.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">Company Name</Label>
          <Input
            type="text"
            placeholder="JobHunt, Microsoft, etc."
            className="bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-10">
          <button
            onClick={() => navigate('/admin/companies')}
            className="px-4 py-2 border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={registerNewCompany}
            className="px-4 py-2 bg-zinc-800 text-white hover:bg-zinc-700 transition rounded-md"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
