const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const fetch = require('node-fetch');

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


/* Server Side Rendering */
const clientBundles = '../public/services';
const serverBundles = '../templates/services';
const serviceConfig = require('../templates/service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('../templates/layout');
const App = require('../templates/app');
const Scripts = require('../templates/scripts');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    console.log(components[item], props);
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
};

/* Routes */

app.get('/:id', (req, res) => {
  console.log('services inside app get: ', services);
  let components = renderComponents(services, {itemID: req.params.id});
  console.log('components are: ', components);
  //console.log(Layout('Vikea Proxy', App(...components)));
  res.end(Layout(
    'Vikea Proxy',
    App(...components),
    Scripts(Object.keys(services))
    ));
  //res.redirect(`http://52.15.202.196:3000/api/reviews/${req.params.id}/details`);
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

app.get('/api/reviews/:id/details', (req, res) => {
  res.redirect(`http://52.15.202.196:3000/api/reviews/${req.params.id}/details`);
});

app.post('/api/reviews/:itemID', (req, res, next) => {
    axios.post(`http://52.15.202.196:3000/api/reviews/${req.params.itemID}`, req.body )
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



const server = app.listen(port, function () {
  console.log(`listening on port:${port}`);
});

module.exports = server;