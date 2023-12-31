const bcrypt = require('bcrypt');

const user = [
  {
    name: 'Admin user',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123', 10),
    isAdmin: true
  },
 {
    name: ' user',
    email: 'User@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    },
  {
    name: 'Aman',
    email: 'aman@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = user;
