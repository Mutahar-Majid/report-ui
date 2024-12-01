import Papa from "papaparse";

async function readCSV(fileName) {
  try {
    // Fetch the CSV file
    const response = await fetch(fileName);
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.statusText}`);
    }

    // Read the file content as text
    const csvText = await response.text();

    // Parse the CSV content
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true, // Set to true if the CSV contains headers
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  } catch (error) {
    console.error("Error reading CSV file:", error);
    throw error;
  }
}

async function getDirectoryStructure() {
  try {
    const response = await fetch('/folders/directoryStructure.json');
    if (!response.ok) {
      throw new Error(`Failed to load directory structure: ${response.statusText}`);
    }
    const directoryStructure = await response.json();
    return directoryStructure;
  } catch (error) {
    console.error("Error fetching directory structure:", error);
    throw error;
  }
}

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:8080/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  return await response.json();
};

export { readCSV, getDirectoryStructure };