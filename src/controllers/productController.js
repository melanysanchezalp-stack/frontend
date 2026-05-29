import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import asyncHandler from '../ultils/asyncHandler.js';
import AppError from '../utils/appError.js'
import {HTTP_STATUS} from '../utils/httpCode.js'

const singToken = (user) =>
    jwt.sing(
        {
             userId: user.id,
             email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

export const register = asyncHandler(async (req, res, next) => {
    const {name,enail,password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        return next(new AppError('Email is alredy in use', HTTP_STATUS.BAD_REQUEST));
    }

    const user = await User.create({name,email,password});
    const token = singToken(user);

    return res.status(HTTP_STATUS_CREATED),json({
        success: true,
        message: 'User registered successfully',
        data: {
            user,
            token
        }
    })
});