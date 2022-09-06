// HTML References
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessage = document.querySelector('#ulMessage');
const btnLogout = document.querySelector('#btnLogout');

const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/api/auth/'
  : 'https://web-rest-server-nodejs.herokuapp.com/api/auth/';

let user = null;
let socket = null;

const validateJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('There is not token on server');
  }

  const res = await fetch(url, {
    headers: { 'x-token': token },
  });

  const { user: userDB, token: tokenDB } = await res.json();
  localStorage.setItem('token', tokenDB);
  user = userDB;
  document.title = user.name;

  await connectSocket();
};

const connectSocket = async () => {
  socket = io({
    extraHeaders: {
      'x-token': localStorage.getItem('token'),
    },
  });

  // Events
  socket.on('connect', () => {
    console.log('Socket ONLINE', user.name);
  });

  socket.on('disconnect', () => {
    console.log('Socket OFFLINE Elis');
  });

  socket.on('receive-messages', drawMessages);

  // Mi forma de draw users
  // socket.on('active-users', users => {
  //   console.log(users);
  //   return ulUsers.innerHTML = users.map(user => `<li>${user.name} - ${user.email}</li>`);
  // });

  socket.on('active-users', drawUsers);

  socket.on('private-message', (payload) => {
    console.log('Private message', payload);
  });
};

const drawUsers = (users = []) => {
  let usersHtml = '';

  users.forEach(({ name, uid }) => {
    usersHtml += `
    <li>
      <p>
        <h5 class="text-success">${name}</h5>
        <span class="fs-6 text-muted">${uid}</span>
      </p>
    </li>
    `;
  });

  ulUsers.innerHTML = usersHtml;
};

const drawMessages = (messages = []) => {
  let messagesHtml = '';

  messages.forEach(({ name, message }) => {
    messagesHtml += `
    <li>
      <p>
        <span class="text-primary">${name}:</span>
        <span>${message}</span>
      </p>
    </li>
    `;
  });

  ulMessage.innerHTML = messagesHtml;
};

// "keyup" event is for when we press a key.
txtMessage.addEventListener('keyup', ({ keyCode }) => {
  const message = txtMessage.value;
  const uid = txtUid.value;

  if (keyCode !== 13) {
    return;
  }
  if (message.length === 0) {
    return;
  }

  socket.emit('send-message', { message, uid });

  txtMessage.value = '';
});

const main = async () => {
  await validateJWT();
};

main();
