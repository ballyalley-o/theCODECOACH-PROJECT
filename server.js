const express = require('express');
const dotenv = require('dotenv');
const http = require('http');


const server = http.createServer((req, res) => {
  console.log(req);
});

const PORT = 5000;


server.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));


