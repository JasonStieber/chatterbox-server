const database = require('./database/data.js');
const fs = require('fs');
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key',
  'access-control-max-age': 10, // Seconds.
};



var MessageCreater = (body) => {
  var record = {
    username: body.username,
    roomname: body.roomname,
    text: body.text,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString()
  };
  
  return record;
};


var getRequest = (request, response) => {

  //404 for non-existent endpoint
  request.headers;
  //Split into useable format;
  //http://127.0.0.1:8080/?username=Batman

  response.end(JSON.stringify(testbody));
};

var postRequest = (request, response) => {
  console.log("post requewust recievedd3edd 34");
  // request.headers;
  //404 for non-existent
  var uri = request.url.split('/');
  var size = uri.length;
  var statusCode;
  if (database[uri[size - 2 ]][uri[size - 1]] === undefined) {
    statusCode = 404;
    response.end();
  } 
  
  console.log('body is', request);
  database[uri[size - 2]][uri[size - 1]].push(MessageCreater(request.body));
    
  response.end();
};
var putRequest = (request, response) => {
  request.headers;
  //404 for non-existent



  response.end();
};
var optionRequest = (request, response) => {
  request.headers;
  //404 for non-existent
  response.end();
};
var deleteRequest = (request, response) => {
  request.headers;
  //404 for non-existent

  response.end();
};


//Post Function
//Get Function
//Option Function
//Put Function
//Get Function
//Date Function


var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  console.log('Request Headers' + JSON.stringify(request.headers));
  console.log('Response Items' + response);

  // The outgoing status.
  var statusCode = 200;

  var routing = {
    POST: postRequest,
    GET: getRequest,
    PUT: putRequest,
    OPTION: optionRequest,
    DELETE: deleteRequest
  };

  if (request.method === 'POST') {
    
    routing[request.method](request, response);
  }
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  var body = ('StatusCode' + statusCode + ', Headers:' + JSON.stringify(headers));

  


  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(JSON.stringify(database['classes']['messages']));
};



// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.requestHandler = requestHandler;

