const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const request = require('request');
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log middleware for general request information
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
 console.log(`Received ${req.method} request for ${req.url}`);
 if (req.method === 'OPTIONS') {
   console.log('Handling CORS preflight request');
   return res.sendStatus(200);
   
 }
 next();
});

// Route for image predictions with logging
app.all('/predict', (req, res) => {
  console.log('Forwarding image prediction request');
  req.pipe(request.post('https://us-central1-diseasedet.cloudfunctions.net/predict'))
      .on('error', (error) => console.error('Error during image prediction request:', error))
      .pipe(res)
      .on('finish', () => console.log('Image prediction request completed'));
});

// Route for text chat interactions with logging
app.all('/chat', (req, res) => {
  req.pipe(request.post('https://us-central1-diseasedet.cloudfunctions.net/chat')).pipe(res);
 });


// Route for crop recommendations with logging
app.post('/recommend', upload.any(), async (req, res) => {
    console.log('Received crop recommendation request:', req.body);
    try {
      const response = await axios.post('https://us-central1-diseasedet.cloudfunctions.net/recommend', req.files, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Forwarding crop recommendation response:', response.data);
      res.status(response.status).send(response.data);
    } catch (error) {
      console.error('Error during crop recommendation request:', error);
      res.status(500).send(error.message);
    }
});


app.listen(5000, () => {
  console.log('Proxy server listening on port 5000');
});