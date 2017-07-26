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
  'access-control-max-age': 86400 // Seconds.
};



var MessageCreater = (body) => {

  var record = {
    username: null,
    roomname: null,
    text: null,
    objectId: Math.floor(Math.random() * 100000000),
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString()
  };
  
  var bodyArr = body.split('&');
  
  for (var items = 0; items < bodyArr.length; items ++) {
    let item = bodyArr[items].split('=');
    if (record.hasOwnProperty(item[0])) {
      
      record[item[0]] = item[1].toString();
    }
  }

  return record;
};


var getRequest = (request, response) => {
  var {headers, method, url} = request;
  let statusCode = 200;


  var {headers, method, url} = request;

  // let body = [];
  // request.on('data', (chunk) => {
  //   body.push(chunk);
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString();
  //   response.writeHead(statusCode, headers);
  // });
  var body = database;
  response.writeHead(statusCode, {'access-control-allow-origin': '*'});
  response.end(JSON.stringify(body));
};

var postRequest = (request, response) => {
  var {headers, method, url} = request;
  
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  });
  // request.on('data', (chunk) => {
  //   body.push(chunk);
  // });
  // request.on('end', () => {
  //   body = Buffer.concat(body).toString();
  //   database.results.push(MessageCreater(body));
  //   response.on('error', (err) => {
  //     console.error(err);
  //   });
  request.on('data', (data) => {
    console.log(data);
    var body = JSON.parse(data);
    database.results.push(body);
  });

  // body = MessageCreater(body);
  const responseBody = {headers, method, url, body};

  response.writeHead(201, {'access-control-allow-origin': '*'});
  response.end(JSON.stringify(responseBody));

};

var putRequest = (request, response) => {

  response.end();
};

var optionRequest = (request, response) => {
  var headers = defaultCorsHeaders;
  let statusCode = 200;
  response.writeHead(statusCode, headers);
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
  // console.log('Request Headers' + JSON.stringify(request.headers));
  // console.log('Response Items' + response);

  // The outgoing status.

  var routing = {
    POST: postRequest,
    GET: getRequest,
    PUT: putRequest,
    OPTIONS: optionRequest,
    DELETE: deleteRequest
  };

  if (request.url !== '/classes/messages' && request.url !== '/classes/room') {
    response.writeHead(404 , {'access-control-allow-origin': '*'});
    response.end();
  } else {
    routing[request.method](request, response);
  }


  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // // up in the browser.
  // var body = ('StatusCode' + statusCode + ', Headers:' + JSON.stringify(headers));
  

  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
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

