const express = require('express');
const app = express();
const port = 8080;
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/public/script.js');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
});