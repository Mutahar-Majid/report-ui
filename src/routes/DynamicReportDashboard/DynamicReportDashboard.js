import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { Folder, FileText } from 'lucide-react';
import Pagination from './components/Pagination';
import ReportTable from './components/ReportTable';
import { readCSV, getDirectoryStructure } from '../../utils/csvServices';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './components/Tabs';
import TableFilters from './components/TableFilters';
import GroupFilters from './components/GroupFilters';
import NoResultsPage from './components/NoResultsPage';

// Initial state for the reducer
const initialState = {
  folders: [],
  selectedFolder: null,
  selectedFile: null,
  reportData: [],
  pageSize: 20,
  currentPage: 1,
  createdBy: '',
  createdOn: '',
};

// Reducer function to manage state
function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, [action.context]: action.payload };
    default:
      return state;
  }
}

// Main Dashboard Component
const DynamicReportDashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filters, setFilters] = useState({});

  const {
    folders,
    selectedFolder,
    selectedFile,
    reportData,
    pageSize,
    currentPage,
    createdBy,
    createdOn,
  } = state;

  // Helper function to dispatch actions
  const setData = (context, payload) => {
    dispatch({ type: 'SET_DATA', context, payload });
  };

  // Load folder structure on component mount
  useEffect(() => {
    const fetchDirectoryData = async () => {
      try {
        const { folders: folderStructure } = await getDirectoryStructure();
        setData('folders', folderStructure);
        // Select first folder by default
        if (folderStructure.length > 0) {
          setData('selectedFolder', folderStructure[0]);
          setData('selectedFile', folderStructure[0].files[0]);
        }
      } catch (error) {
        console.error('Error loading folder structure:', error);
      }
    };

    fetchDirectoryData();
  }, []);

  useEffect(() => {
    const loadFileData = async () => {
      try {
        if (selectedFile) {
          const data = await readCSV(selectedFile.path);
          setData('reportData', data);
          setData('currentPage', 1); // Reset to first page
        }
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    loadFileData();
  }, [selectedFile]);

  // Filter report data based on user-defined filters
  const filteredData = useMemo(() => {
    return reportData.filter((row) => {
      return Object.entries(filters).every(([key, value]) =>
        row[key]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
  }, [reportData, filters]);

  // Group files by createdBy user or createdOn date
  const groupedFiles = useMemo(() => {
    if (!selectedFolder) return [];
    return selectedFolder.files.filter(
      (file) =>
        (!createdBy || file.createdBy === createdBy) &&
        (!createdOn ||
          new Date(file.createdOn).toISOString().split('T')[0] === createdOn)
    );
  }, [selectedFolder, createdBy, createdOn]);

  return (
    <div className='container mx-auto p-4'>
      <div className='title text-2xl mb-4 text-center'>Reports Dashboard</div>
      <div className='bg-white shadow-2xl border-t-4 rounded-lg overflow-hidden p-4'>
        <Tabs onSelect={(index) => setData('selectedFolder', folders[index])}>
          {/* Render folders */}
          <TabList>
            {folders.map((folder, index) => (
              <Tab key={folder.name} tab={index} icon={Folder}>
                {folder.name}
              </Tab>
            ))}
          </TabList>
          {/* Group filters */}
          {!!selectedFolder && (
            <GroupFilters
              selectedFolder={selectedFolder}
              createdBy={createdBy}
              setCreatedBy={(value) => setData('createdBy', value)}
              createdOn={createdOn}
              setCreatedOn={(value) => setData('createdOn', value)}
            />
          )}
          {/* Render files of the selected folder */}
          <TabPanels>
            {folders.map(
              (folder) =>
                !!groupedFiles.length && (
                  <TabPanel key={folder.name}>
                    <div className='text-md font-semibold'>Files</div>
                    <div className='flex space-x-2'>
                      {groupedFiles.map((file) => (
                        <button
                          key={file.name}
                          onClick={() => setData('selectedFile', file)}
                          className={`px-4 py-2 rounded ${
                            selectedFile?.name === file.name
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          <FileText className='w-4 h-4 mr-2' />
                          {file.name}
                        </button>
                      ))}
                    </div>
                  </TabPanel>
                )
            )}
          </TabPanels>
        </Tabs>

        {/* Table Filtering */}
        {groupedFiles.length > 0 && (
          <TableFilters
            reportData={reportData}
            filters={filters}
            setFilters={setFilters}
          />
        )}

        {/* Report Table */}
        {selectedFile && !!filteredData?.length && groupedFiles.length ? (
          <>
            <ReportTable
              data={filteredData}
              pageSize={pageSize}
              currentPage={currentPage}
            />
            <Pagination
              totalRows={filteredData.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageSizeChange={(size) => {
                setData('pageSize', size);
                setData('currentPage', 1);
              }}
              onPageChange={(page) => setData('currentPage', page)}
            />
          </>
        ) : (
          <NoResultsPage />
        )}
      </div>
    </div>
  );
};

export default DynamicReportDashboard;
