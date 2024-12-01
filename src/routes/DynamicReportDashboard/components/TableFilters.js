import React from 'react';
import { X } from 'lucide-react';

const TableFilters = ({ reportData, filters, setFilters }) => {  
  return (
    <div className='pb-4 my-4 bg-white border-b'>
      <h2 className='text-md font-semibold'>Table Filters</h2>
      <div className='flex flex-wrap gap-2'>
        {Object.keys(reportData[0] || {}).map((column) => (
          <div key={column} className='relative'>
            <input
              placeholder={`Filter by ${column}`}
              value={filters[column] || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  [column]: e.target.value,
                }))
              }
              className='border rounded px-2 py-1 w-40'
            />
            {filters[column] && (
              <button
                onClick={() =>
                  setFilters((prev) => {
                    const newFilters = { ...prev };
                    delete newFilters[column];
                    return newFilters;
                  })
                }
                className='absolute right-2 top-1/2 -translate-y-1/2'
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableFilters;
