import React, { useMemo } from 'react';

// Report Table Component
const ReportTable = ({ data, pageSize, currentPage }) => {
  const columns = Object.keys(data[0] || {});
  
  const paginatedData = useMemo(() => {
    if (pageSize === 'All') return data;
    const start = (currentPage - 1) * parseInt(pageSize);
    const end = start + parseInt(pageSize);
    return data.slice(start, end);
  }, [data, pageSize, currentPage]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th 
                key={column} 
                className="px-4 py-2 border border-gray-200 text-left font-semibold"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr 
              key={index} 
              className="hover:bg-gray-50 border-b border-gray-200"
            >
              {columns.map((column) => (
                <td 
                  key={column} 
                  className="px-4 py-2 border-r border-gray-200"
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;