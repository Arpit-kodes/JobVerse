import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0 - 5 LPA', '6 - 10 LPA', '11 - 20 LPA', '20+ LPA'],
  },
];

const salaryMap = {
  '0 - 5 LPA': { min: 0, max: 5 },
  '6 - 10 LPA': { min: 6, max: 10 },
  '11 - 20 LPA': { min: 11, max: 20 },
  '20+ LPA': { min: 21, max: Infinity },
};

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [activeFilterType, setActiveFilterType] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value, type) => {
    setSelectedValue(value);
    setActiveFilterType(type);
  };

  useEffect(() => {
    if (activeFilterType === 'Salary' && salaryMap[selectedValue]) {
      dispatch(setSearchedQuery({ salaryRange: salaryMap[selectedValue] }));
    } else if (activeFilterType === 'Industry') {
      dispatch(setSearchedQuery({ role: selectedValue }));
    } else if (activeFilterType === 'Location') {
      dispatch(setSearchedQuery({ location: selectedValue }));
    } else {
      dispatch(setSearchedQuery(''));
    }
  }, [selectedValue, activeFilterType, dispatch]);

  return (
    <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-md text-white">
      <h2 className="font-semibold text-xl mb-6 text-gray-100">🔍 Filter Jobs</h2>

      {filterData.map((data, index) => (
        <RadioGroup
          key={index}
          value={selectedValue}
          onValueChange={(value) => changeHandler(value, data.filterType)}
        >
          <div className="mb-6">
            <h3 className="text-gray-300 font-medium mb-3">{data.filterType}</h3>
            {data.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-3 my-2">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="text-white border-gray-600 focus:ring-white"
                  />
                  <Label htmlFor={itemId} className="text-sm text-gray-300 hover:text-white cursor-pointer">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        </RadioGroup>
      ))}
    </div>
  );
};

export default FilterCard;
