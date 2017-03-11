const fs = require('fs');
try {
  const token = JSON.parse(fs.readFileSync('./accessToken.json'));
} catch (e) {
  console.log('Configure accessToken.json in service folder');
}
const axios = require('axios');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.listings = (event, context, callback) => {

}