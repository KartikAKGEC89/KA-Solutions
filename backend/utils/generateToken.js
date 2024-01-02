const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.SECRET, { expiresIn: 60 * 60 });
}

module.exports = generateToken