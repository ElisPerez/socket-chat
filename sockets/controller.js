// This is the SERVER SIDE of socket

const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers/generate-jwt');
const ChatMessages = require('../models/chat-messages');

const chatMessages = new ChatMessages();

// TODO: I will have delete "new Socket()" in the parameters
const socketController = async (socket = new Socket(), io) => {
  const token = socket.handshake.headers['x-token'];
  const user = await checkJWT(token);
  // console.log('user ID from controller:', user.uid.toString());

  if (!user) {
    return socket.disconnect();
  }

  // Add the user connected
  chatMessages.connectUser(user);
  // console.log(chatMessages.usersArr);

  // Emit to all active users with "io.emit"
  io.emit('active-users', chatMessages.usersArr);

  socket.emit('receive-messages', chatMessages.last10);

  // Connect it to a special room for private chat.
  socket.join(user.uid.toString());

  // Clear user on logout
  socket.on('disconnect', () => {
    chatMessages.disconnectUser(user.uid);
    io.emit('active-users', chatMessages.usersArr);
  });

  socket.on('send-message', ({ uid, message }) => {
    if (uid) {
      // Private message
      socket.to(uid).emit('private-message', { from: user.name, message });
    } else {
      // Public message
      chatMessages.sendMessage(user.uid, user.name, message);

      io.emit('receive-messages', chatMessages.last10);
    }
  });
};

module.exports = {
  socketController,
};
