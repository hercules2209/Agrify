const express = require('express');
const request = require('request');
const app = express();
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
 if (req.method === 'OPTIONS') {
   return res.sendStatus(200);
 }
 next();
});

app.all('/chat', (req, res) => {
 req.pipe(request.post('https://us-central1-diseasedet.cloudfunctions.net/chat')).pipe(res);
});

app.listen(5000, () => {
 console.log('Proxy server listening on port 5000');
});
