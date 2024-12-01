import React from 'react';
import { Search } from 'lucide-react';

const NoResultsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <Search className="w-16 h-16 text-gray-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
      <p className="text-gray-600">
        No results found for current filters applied. Please try removing some filters or trying different options.
      </p>
    </div>
  );
};

export default NoResultsPage;