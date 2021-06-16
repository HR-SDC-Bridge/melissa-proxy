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
app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const redis = require('redis');
const redis_client = redis.createClient(process.env.PORT_REDIS);
redis_client.on('error', err => {
  console.log('Redis Error ' + err);
});

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

app.get('/api/reviews/:id/details', async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await axios.get(`http://18.224.41.155/api/reviews/${req.params.id}/details`);

    const reviewsData = reviews.data;
    redis_client.setex(id, 3600, JSON.stringify(reviewsData));

  } catch (err) {
    console.log(err);
    return res.status(500).json(error);
  }

});

app.post('/api/reviews/:itemID', (req, res, next) => {
  axios.post(`http://18.224.41.155/api/reviews/${req.params.itemID}`, req.body)
    .then(result => {
      console.log(result.status);
      res.send(result.status)
    })
    .catch((err) => res.send(err.status));
});

app.get('/similar-products-by-views/:id', (req, res) => {
  axios.get(`http://3.143.80.36:5500/similar-products-by-views/${req.params.id}`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => console.error('GET OTHERS ALSO VIEWED FAILED: ', err))
});

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});

const server = app.listen(port, function () {
  console.log(`listening on port:${port}`);
});

module.exports = server;