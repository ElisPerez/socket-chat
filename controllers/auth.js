const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Email not valid' });
    }

    // Check if user is active
    if (!user.state) {
      return res.status(404).json({ msg: 'User not active' });
    }

    // Check if password is correct
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ msg: 'Password not valid' });
    }

    // Create token
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Server error. There is an error here!',
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, email, picture } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        email,
        google: true,
        name,
        password: 'google',
        picture,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(404).json({ msg: 'User not active' });
    }

    // Create token
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ msg: 'Invalid Google Token' });
  }
};

module.exports = {
  login,
  googleSignIn,
};
