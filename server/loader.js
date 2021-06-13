// For each key in config
// Fetch the bundle
// Write it to the corresponding folder

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

module.exports = (clientPath, serverPath, config) => {
  console.log('Inside loader.js: ', clientPath, serverPath, config);
  let services = {};
  for (const property in config) {
    console.log(`${property}: ${config[property]}`);
    fetch(`${config[property]}`)
      .then(response => response.text())
      .then(data => {
        let serviceName = `${property}`;
        services[serviceName] = serviceName;

        let serviceBundlePath = path.join(__dirname, `../templates/services/${property.toLowerCase()}.js`);
        fs.writeFile(serviceBundlePath, data, err => {
          if (err) {
            console.error(`Problem writing the bundle in server templates ${err}`);
          }
        });

        let clientBundlePath = path.join(__dirname, `/../public/services/${property.toLowerCase()}.js`);
        fs.writeFile(clientBundlePath, data, err => {
          if (err) {
            console.error(`Problem writing the bundle in client services ${err}`);
          }
        });
      });

  }
  return services;
}