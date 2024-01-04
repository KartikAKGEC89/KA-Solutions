const express = require('express')
const User = require('../models/userModel')
const asynchandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs')


const authUser = asynchandler( async (req,res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).send('UnAuthorized')
    }
})


const getUserProfile = asynchandler( async (req,res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})


const userRegister = asynchandler(async (req, res) => {
    const { name, email, password } = req.body
    
    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(400)
        throw new Error('User Already Register')
    }


    const user = await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 8)
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Not Created')
    }

})


const updateUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8)
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


module.exports = {authUser, userRegister, getUserProfile, updateUserProfile}