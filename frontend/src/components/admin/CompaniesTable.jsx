import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCompanyById } from '../../redux/companySlice'; // ✅ Correct import

const CompaniesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companies, searchCompanyByText, loading, error } = useSelector((state) => state.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useEffect(() => {
    const filtered = companies?.filter((company) =>
      !searchCompanyByText
        ? true
        : company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (confirmDelete) {
      dispatch(deleteCompanyById(id))
        .unwrap()
        .then(() => {
          alert("Company deleted successfully.");
        })
        .catch((err) => {
          alert("Error deleting company: " + err);
        });
    }
  };

  return (
    <div className="overflow-x-auto mt-6 rounded-xl border border-zinc-800 bg-zinc-900 shadow-md">
      <Table className="min-w-full text-sm text-white">
        <TableCaption className="py-4 text-zinc-500 italic">
          Recently Registered Companies
        </TableCaption>

        <TableHeader className="bg-zinc-800/80">
          <TableRow>
            <TableHead className="text-zinc-300 font-semibold">Logo</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Company</TableHead>
            <TableHead className="text-zinc-300 font-semibold">Registered</TableHead>
            <TableHead className="text-zinc-300 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies?.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow key={company._id} className="hover:bg-zinc-800/70 transition duration-150">
                <TableCell>
                  <Avatar className="h-10 w-10 border border-zinc-600">
                    <AvatarImage src={company.logo} alt={company.name} className="object-cover" />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>
                  <span className="text-zinc-400 text-xs">
                    {company.createdAt?.split('T')[0]}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="hover:bg-zinc-700 p-1 rounded transition">
                      <MoreHorizontal className="w-5 h-5 text-zinc-400" />
                    </PopoverTrigger>
                    <PopoverContent className="w-44 bg-zinc-800 border border-zinc-700 rounded-md p-2 shadow-lg">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-zinc-700 cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                        <span className="text-white">Edit Company</span>
                      </div>
                      <div
                        onClick={() => handleDelete(company._id)}
                        className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-red-600/80 cursor-pointer transition mt-1"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">Delete Company</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-zinc-500">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
