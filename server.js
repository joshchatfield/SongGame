const express = require('express');
const app = express();
const port = 8080;
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/script.js');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});