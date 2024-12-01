import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { uploadCSV, getDirectoryStructure } from '../../../utils/csvServices';

const FileUpload = ({ setData }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const newFile = await uploadCSV(file);
      const updatedFolders = await getDirectoryStructure();
      setData('folders', updatedFolders.folders);
      setData('selectedFolder', updatedFolders.folders.find(folder => folder.name === newFile.folderName));
      setData('selectedFile', newFile);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="my-4 max-w-[240px] absolute right-4 top-0">
      <label className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
        <Upload className="w-5 h-5 mr-2" />
        <span>Upload CSV</span>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {uploading && <div className="mt-2 text-blue-500">Uploading...</div>}
    </div>
  );
};

export default FileUpload;