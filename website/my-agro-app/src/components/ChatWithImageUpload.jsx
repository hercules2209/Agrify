import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { GrCloudUpload } from "react-icons/gr";
import './styles.css';

const ChatWithImageUpload = () => {
  const [selectedFile, setInternalSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState();
  const [showUploadSection, setShowUploadSection] = useState(true);
  const [response, setResponse] = useState('');
  const [ showSubmitButton,setShowSubmitButton] = useState(false);


  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setInternalSelectedFile(file);
    previewFile(file);
    setShowUploadSection(false);
    setShowSubmitButton(true);
  }, []);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleCancel = () => {
    setInternalSelectedFile(null);
    setPreviewSource(null);
    setShowUploadSection(true);
    setShowSubmitButton(false);
    setResponse('');
  };

  const handleImageSubmit = async () => {
    if (!selectedFile || !(selectedFile instanceof File) || !selectedFile.type.startsWith('image/')) {
      console.error("Please select an image file");
      setResponse("Please select an image file");
      setShowSubmitButton(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const result = await fetch('https://us-central1-diseasedet.cloudfunctions.net/predict', {
      method: 'POST',
      body: formData,
    });

    const data = await result.json();
    console.log(data);

    const details = data.details;
    setResponse(details);
    setShowSubmitButton(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div className="background">
    <div className="App" >
      <div style={{ alignContent: 'center' }}>
        {showUploadSection && (
          <div id="Upload">
            <h1 style={{ alignContent: 'center', textAlign: 'center', fontFamily:'Noto Sans',fontSize:30}}><b>Upload Image</b></h1>
            <div {...getRootProps()} className="dropzone-container" >
              <input {...getInputProps()} />
                <GrCloudUpload size={300} style={{ color: 'white' }} />
                <p className="dropzone-message"> Click or drag a photo to diagnose plant issues </p>
              </div>
          </div>
        )} 

        {!showUploadSection && (
          <div id="Display">
            <aside>
              <h4 style={{ textAlign: 'center' }}>Files</h4>
            </aside>
            {previewSource && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
              </div>
            )}
          </div>
        )}
        {selectedFile && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button onClick={handleCancel} style={{ marginRight: '10px' }}>
              Cancel
            </button>
            {showSubmitButton && (
            <button
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                backgroundColor: '#007BFF',
                color: 'white',
                cursor: 'pointer',
                marginTop: '20px',
              }}
              onClick={handleImageSubmit}
            >
              Submit
            </button>
            )}
          </div>
        )}
      </div>

      {response && <div id="Chat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: "10px" }}>
        <h1 style={{ marginTop: '20px' }}>Chat</h1>
        <div style={{ border: '1px solid #fff', borderRadius: '20px',display: 'flex', padding: '20px', marginTop: '20px', width: '80%', overflow: 'auto', minHeight: '200px',  backgroundColor:"#F6FFC4"}}>
           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src="/Avatar.jpeg" alt="Avatar" style={{ borderRadius: '50%', marginRight: '10px', width: '50px', height: '50px' }} />
            <div id style={{ backgroundColor: '#f0f0f0', borderRadius: '20px', padding: '10px', maxWidth: '80%' }}>
              <p style={{ whiteSpace: 'pre-wrap', fontSize: '18px' }}>{response}</p>
            </div>
          </div>
        </div>

      </div>}
    </div>
    </div>
  );
};

export default ChatWithImageUpload;
