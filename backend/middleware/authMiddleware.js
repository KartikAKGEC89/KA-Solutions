const express = require('express')
const asynchandler = require('express-async-handler')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const User =  require('../models/userModel')

dotenv.config()


const authorizationToken = asynchandler(async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
           token = req.headers.authorization.split(' ')[1]
           
           const decoded = jwt.verify(token, process.env.SECRET)
           console.log(decoded)

           req.user = await User.findById(decoded.id).select('-password')

           next()
       } catch (error) {
        console.log(error)
       }
    } else {
        res.status(401)
        throw new Error('Not Authorized')
    }
})




module.exports = authorizationToken