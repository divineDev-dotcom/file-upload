const express = require('express');
const path = require('path');
const multer = require('multer');
const fileUpload = require('express-fileupload'); // Import express-fileupload

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (req.files) {
    const username = req.body.userName;
    const uploadedFile = req.files.uploadedFile;

    const originalFilename = uploadedFile.name;
    const fileExtension = path.extname(originalFilename);

    const newFilename = `${username}${fileExtension}`;

    uploadedFile.mv(`uploads/${newFilename}`, (err) => {
      if (err) {
        console.error('Error moving uploaded file:', err);
        res.status(500).send('Upload failed!');
        return;
      }
      console.log(`File uploaded successfully for user: ${username}, filename: ${newFilename}`);
      res.send(`File uploaded successfully for user: ${username}`);
    });
  } else {
    console.error('Upload failed');
    res.status(400).send('Upload failed!');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
