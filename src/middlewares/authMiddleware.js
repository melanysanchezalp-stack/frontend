import jwt from 'jsonwebtoken'

import AppError from '../utils/AppError'
import {HTTP_STATUS} from '../utils/httpCodes.js'

const authenticate = (req, _res, next) => {
    const authHeader = req.headers.authorization || '';
    const [schame, token] = authHeader.split(' ');

    if (scheme !== 'Barer' || !token){
        return next(new AppError('Missing or invalid authorization token', HTTP_STATUS.UNAUTHORIZED));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId, email: payload.email};
        return next();
    } catch(_error){
        return next(new AppError('Invalid or expired'))

    }
};

export default
authenticate;