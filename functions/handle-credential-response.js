const jwt = require('jsonwebtoken');

function handleCredentialResponse(response) {
  const decodeJWT = jwt.verify(response.credential, process.env.SECRET_OR_PRIVATE_KEY);
  console.log(`Encoded JWT ID token: ${response.credential} and decoded JWT: ${decodeJWT}`);
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id: 'process.env.GOOGLE_CLIENT_ID',
    callback: handleCredentialResponse,
    context: 'signin',
    ux_mode: 'popup',
    auto_prompt: 'false',
  });
  google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    {
      type: 'standard',
      shape: 'rectangular',
      text: '$ {button.text}',
      logo_alignment: 'left',
      theme: 'outline',
      size: 'large',
    } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
};
