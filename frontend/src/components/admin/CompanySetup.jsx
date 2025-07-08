import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector(store => store.company);

  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: null, // don't prefill file input
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={submitHandler} className="bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-800">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/companies')}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-white">Edit Company</h1>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-zinc-300 mb-1 block">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-500"
                placeholder="Ex: Google"
              />
            </div>

            <div>
              <Label className="text-zinc-300 mb-1 block">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-500"
                placeholder="Ex: Search engine giant"
              />
            </div>

            <div>
              <Label className="text-zinc-300 mb-1 block">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label className="text-zinc-300 mb-1 block">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-500"
                placeholder="Ex: Bengaluru, India"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-zinc-300 mb-1 block">Logo (optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="bg-zinc-800 text-white border-zinc-700 file:text-zinc-400 file:bg-zinc-700 hover:file:bg-zinc-600"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-zinc-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                'Update Company'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
