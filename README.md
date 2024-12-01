# Dynamic Report Dashboard

## Setup and Run the Project

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation
  - After cloning the repol, run The following command 
  ```bash
    npm install
  ```
### Running the project
  - After installation, run The following command to start the project:
  ```bash
    npm start
  ```

## Features
1. CSV File Upload Mechanism
  - Folder and File Handling:
    - Dynamic Report Loading: Automatically loads CSV files from the specified folder and displays them on the
    dashboard.
    - Pagination: Supports the user’s choice of page sizes
    of 20, 50, 100, 1000, and All with the content displaye in a tabular form to improve
    performance and usability.
    - Filtering & Grouping: Provides options filter report data and group reports based on
    date or user-created tags.
  - File Upload
    - Allow dynamic uploads from user in root folder

2. UI Elements:
  - Tabs: Uses tabs to represent different folders for easy navigation.
  - Modular Code
  - Modern and reponsive design

3. Fallback Handling: 
  - Display fallbacks for no result with filtering options 
  - Display fallbacks for empty folder uploads


## Technical Stack
- React
- Papaparse (CSV Parsing)
- Tailwind CSS
- Express
- Node.js


## Usage Tips
- Click "Upload CSV" to add new reports
- Switch between reports via tabs
- Use grid features: filtering, pagination

### Recommendations for Production:
1. Implement proper error handling for file uploads
2. Add file size validation.
3. Create persistent storage for uploaded reports
4. Enhance accessibility features
5. Add color customization for tabs and tags.
