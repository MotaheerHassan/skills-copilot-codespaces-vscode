//create web server
const express = require('express');
const app = express();
const port = 3000;

//create web server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});