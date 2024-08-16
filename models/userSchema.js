const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const validator = require('validator');


const UserAuthSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true })
// static methods
UserAuthSchema.statics.signup = async function (email, password, username, confirmPassword) {
  const existEmail = await this.findOne({ email })
  const existUsername = await this.findOne({ username })


  if (!email || !password || !username || !confirmPassword) {
    throw Error('All fields are required')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is invalid')
  }
  if (!validator.isAlphanumeric(username)) {
    throw Error('Username is invalid')
  }
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    throw Error('Password must be between 6 and 30 characters')
  }
  if (password !== confirmPassword) {
    throw Error('Password do not match')
  }
  if (existEmail) {
    throw Error('Emailalready exist')
  }
  if (existUsername) {
    throw Error('Username already exist')
  }

  // encrypt password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  try {
    const user = await this.create({ email, password: hash, username })
    return user
  } catch (error) {
    console.log(error, 'error created')
    throw Error(error)
  }


}

UserAuthSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Email or password is required')
  }
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('incorrect password')
  }
  return user
}
module.exports = mongoose.model('User', UserAuthSchema)
