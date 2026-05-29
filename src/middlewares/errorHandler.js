import { HTTP_STATUS } from '../utils/httpCodes';

const errorHandler = (error,_req, res, _next) => {
    let statusCode = error.statusCode || HTTP_STATUS.ITERNAL_SERVER_ERROR;
    let mesagge = error.mesagge || 'Internal server error';

    if(error.name === 'Validation'){
        statusCode = HTTP_STATUS.UNPROCESSABLE_ENTIY;
        mesagge = Object.values(error.errors).map((item)=> item.massage).join(', ');
    }

    if(error.name === 'CastError'){
        statusCode = HTTP_STATUS.BAD_REQUEST;
        mesagge = 'Imvalid resource id';
    }

    if(error.code === 11000){
        statusCode = HTTP_STATUS.BAD_REQUEST;
        MESSAGE = 'resource alredy exist';
    }

    const response = {
        sucess: false,
        mesagge
    };
        if(process.env.NODE_ENV !== 'production'){
            Response.stack = error.stack;
        }
        return res.status(statusCode).json(response);
    
};

export default errorHandler