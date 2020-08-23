function requestLogger(request, response, next) {
  const { method, path, body } = request;
  console.log(`Method: ${method}`);
  console.log(`Path: ${path}`);
  console.log('Body: ', body);
  console.log('----');
  next();
}

function unknownEndPoint(request, response) {
  response
    .status(404)
    .send({ error: 'Come on dude. It is obviously an Unknown address' });
}

module.exports = {
  requestLogger,
  unknownEndPoint,
};
