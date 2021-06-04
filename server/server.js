const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

// app.get('/api/product/:id', (req, res) => {
//   res.redirect(`http://localhost:3003/api/product/${req.params.id}`);
// });

// app.get('/images/org/:id', (req, res) => {
//   res.redirect(`http://localhost:3004/images/org/${req.params.id}`);

// });

// app.get('/api/sizes/:id', (req, res) => {
//   res.redirect(`http://ec2-18-221-34-3.us-east-2.compute.amazonaws.com:3002/api/sizes/${req.params.id}`);
// });

app.get('/api/reviews/:id/details', (req, res) => {
  res.redirect(`http://localhost:3000/api/reviews/${req.params.id}/details`);
});

app.post('/api/reviews/:itemID', (req, res, next) => {
    axios.post(`http://localhost:3000/api/reviews/${req.params.itemID}`, req.body )
    .then(result => {
      console.log(result.status);
      res.send(result.status)
    })
     .catch((err) => res.send(err.status));
});

// app.get('/similar-products-by-views/:id', (req, res) => {
//   axios.get(`http://18.222.25.224:3005/similar-products-by-views/${req.params.id}`)
//     .then((result) => {
//       res.send(result.data);
//     })
//     .catch((err) => console.error('GET OTHERS ALSO VIEWED FAILED: ', err))
// });



const server = app.listen(port, function () {
  console.log(`listening on port:${port}`);
});

module.exports = server;