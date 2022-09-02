const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers/generate-jwt');

// TODO: I will have delete "new Socket()" in the parameters
const socketController = async (socket = new Socket()) => {
  const token = socket.handshake.headers['x-token'];
  const user = await checkJWT(token);

  if (!user) {
    return socket.disconnect();
  }

  console.log('User logged in:', user.name);
};

module.exports = {
  socketController,
};
