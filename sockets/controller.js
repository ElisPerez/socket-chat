const { Socket } = require('socket.io');

// TODO: I will have delete "new Socket()" in the parameters
const socketController = (socket = new Socket()) => {
  
};

module.exports = {
  socketController,
};
