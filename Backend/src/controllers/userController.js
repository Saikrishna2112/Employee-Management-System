const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    let isMatch = false;
  if(password === user.password){
    isMatch = true
  }

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const SECURITY_KEY = process.env.SECURITY_CODE;
    const token  = jwt.sign({username:user.username},SECURITY_KEY,{expiresIn:'1h'});
    console.log(token)
    return res.status(200).json({ message: "Login successful", name:username ,token:token});

  
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};