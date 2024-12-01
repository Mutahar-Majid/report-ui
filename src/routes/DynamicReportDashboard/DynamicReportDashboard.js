import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { Folder, FileText, BarChart2 } from 'lucide-react';
import Pagination from './components/Pagination';
import ReportTable from './components/ReportTable';
import { readCSV, getDirectoryStructure } from '../../utils/csvServices';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './components/Tabs';
import TableFilters from './components/TableFilters';
import GroupFilters from './components/GroupFilters';
import NoResultsPage from './components/NoResultsPage';
import NoFilesPage from './components/NoFilesPage';
import FileUpload from './components/FileUpload';
import { initialState, reducer } from './utils/constants';


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

  function handleFolderChange(index) {
    dispatch({
      type: 'SET_STATE',
      payload: {
        ...initialState,
        folders: state.folders,
        selectedFolder: state.folders[index],
        selectedFile: state.folders[index].files.length
          ? state.folders[index].files[0]
          : null,
      },
    });
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='hero bg-blue-500 text-white p-4 rounded-lg shadow-md text-center w-max mx-auto mb-2 flex items-center'>
          <BarChart2 className='w-8 h-8 mx-auto' />
          <h1 className='text-2xl font-bold flex-1'>Reports Dashboard</h1>
      </div>
      <div className='bg-white shadow-2xl border-t-4 rounded-lg overflow-hidden p-4 relative max-w-[80%] mx-auto'>
        <Tabs onSelect={handleFolderChange}>
          {/* Render folders */}
          <TabList>
            {folders.map((folder, index) => (
              <Tab key={folder.name} tab={index} icon={Folder}>
                {folder.name}
              </Tab>
            ))}
          </TabList>
          {/* File Upload */}
          {/* File Upload */}
          <FileUpload setData={setData} />

          {/* Group filters */}
          {!!selectedFolder?.files.length && (
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
            {folders.map((folder) =>
              !!selectedFolder?.files.length ? (
                !!groupedFiles.length && (
                  <TabPanel key={folder.name}>
                    <div className='text-md font-semibold'>Files</div>
                    <div className='flex space-x-2'>
                      {groupedFiles.map((file) => (
                        <button
                          key={file.name}
                          onClick={() => setData('selectedFile', file)}
                          className={`px-4 py-2 rounded flex items-center ${selectedFile?.name === file.name
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
              ) : (
                <NoFilesPage />
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
        ) : !!selectedFolder?.files.length && (
          <NoResultsPage />
        )}
      </div>
    </div>
  );
};

export default DynamicReportDashboard;
