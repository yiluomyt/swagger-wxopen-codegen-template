var fs = require('fs');
var request = require('request');
var CodeGen = require('swagger-js-codegen').CodeGen;

const swaggerPath = 'http://localhost:5000/swagger/v1/swagger.json';
const apiPath = './api.js';

request.get({
  url: swaggerPath,
  json: true
}, (e, res, body) => {
  var wxopenSourceCode = CodeGen.getCustomCode({
      className: 'API',
      swagger: body,
      template: {
          class: fs.readFileSync('wxopen.mustache', 'utf-8'),
          method: fs.readFileSync('method.mustache', 'utf-8')
      }
  });
  fs.writeFileSync(apiPath, wxopenSourceCode);
})