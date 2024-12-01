import React from 'react';
import { File } from 'lucide-react';

const NoFilesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <File className="w-16 h-16 text-gray-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Files Found</h2>
      <p className="text-gray-600">
        No files are present in selected folder. Please add files or select a different folder.
      </p>
    </div>
  );
};

export default NoFilesPage;