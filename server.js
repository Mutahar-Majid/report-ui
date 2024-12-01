
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(fileUpload());

app.post('/api/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, 'public', 'folders', file.name);

  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    // Update directory structure
    const directoryStructurePath = path.join(__dirname, 'public', 'folders', 'directoryStructure.json');
    const directoryStructure = JSON.parse(fs.readFileSync(directoryStructurePath, 'utf8'));

    const newFile = {
      name: file.name,
      path: `/folders/${file.name}`,
      createdBy: 'Unknown', // Can be added from form data using another field
      createdOn: new Date().toISOString().split('T')[0],
    };
    // Assuming adding to the root folder
    directoryStructure.folders[0].files.push(newFile);
    fs.writeFileSync(directoryStructurePath, JSON.stringify(directoryStructure, null, 2));

    res.send(newFile);
  });
});

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});