import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const registerUserByPhone = asyncHandler(async (req, res) => {
  // console.log(req.body)
  const { phoneNumber, displayName } = req.body

  if (!phoneNumber || !displayName) {
    throw new ApiError(400, 'Phone number and display name are required')
  }

  const userExist = await User.findOne({ phoneNumber })
  if (userExist) {
    throw new ApiError(409, 'User with this phone number already exists')
  }

  const user = await User.create({ phoneNumber, displayName })
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '350d',
  })

  return res
    .status(201)
    .json(new ApiResponse(201, { user, token }, 'Registration successful'))
})

const loginUserByPhone = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body

  if (!phoneNumber) {
    throw new ApiError(400, 'Phone number is required')
  }

  const user = await User.findOne({ phoneNumber })
  if (!user) {
    throw new ApiError(404, 'User not found, please register')
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '350d',
  })

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, 'Login successful'))
})

export { registerUserByPhone, loginUserByPhone }
