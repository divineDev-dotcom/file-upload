import React, { useState } from 'react';

const FileUpload = () => {
  const [userName, setUserName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('uploadedFile', selectedFile);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Upload failed');
        }
      })
      .then((data) => {
        setUploadMessage(data);
      })
      .catch((error) => {
        setUploadMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <h1>File Upload</h1>
      <h2>Instructions for Uploading the File for Practice Session</h2>
      <ol>
        <li>
          Enter Your Name
          <ul>
            <li>Type your name in the "Name" field below.</li>
          </ul>
        </li>
        <li>
          Upload Your File
          <ul>
            <li>Click on the "Select a file" button below.</li>
            <li>
              In the file selection dialog that appears, navigate to the
              location of your practice session file.
            </li>
            <li>Select the correct file and confirm your selection.</li>
          </ul>
        </li>
        <li>
          Submit Your File
          <ul>
            <li>Click on the "Upload" button below.</li>
            <li>
              Wait for a confirmation message indicating that your file has
              been successfully uploaded.
            </li>
          </ul>
        </li>
      </ol>
      <h2>Important Tips</h2>
      <p>
        Ensure that you have entered your name correctly.
        <br />
        Double-check that you have selected the correct file before submitting.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-name">Name:</label>
        <input
          type="text"
          id="user-name"
          name="userName"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
        <br />
        <label htmlFor="file-upload">Select a file:</label>
        <input
          type="file"
          id="file-upload"
          name="uploadedFile"
          onChange={handleFileChange}
          required
        />
        <br />
        <button type="submit">Upload</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default FileUpload;
