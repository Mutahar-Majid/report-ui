import React from 'react';

const GroupFilters = ({ selectedFolder, createdBy, setCreatedBy, createdOn, setCreatedOn }) => {
  return (
    <div className='group-filters inline-grid gap-4 grid-cols-2 max-w-[50%]'>
      <div className='mb-4'>
        <label className='block mb-2 text-md font-semibold'>Group by Author:</label>
        <select
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          className='p-2 border rounded'
        >
          <option value=''>All</option>
          {[
            ...new Set(
              selectedFolder.files.map((file) => file.createdBy)
            ),
          ].map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
      <div className='mb-4'>
        <label className='block mb-2 text-md font-semibold'>Group by Creation Date:</label>
        <input
          type='date'
          value={createdOn}
          onChange={(e) => setCreatedOn(e.target.value)}
          className='p-2 border rounded'
        />
      </div>
    </div>
  );
};

export default GroupFilters;