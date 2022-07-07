const AppError = require('./../Utils/globalErrorHandler');
const mongoose = require('mongoose');


const sendErrorDev = (err, res) => {
    res.status(err.statuscode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const sendErrorProd = (err, res) =>{ 

    if(err.isOperational){
        res.status(err.statuscode).json({
            status: err.status,
            message: err.message
        })
    }else{
        console.log(err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        })
    }
}


const handleCastError = (err, res) =>{
    const message = `Invalid ${err.value} for path ${err.path}.`;
    return new AppError(message, 404);
}

const handleValidationError = (err) => {
    //const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    //console.log(value);
    const message = `Duplicate Field values: x. Please Use another value!`;
    return new AppError(message, 404);
};

module.exports = (err, req, res, next) => {
    console.log(err.stack);

    //we need to check for the error type first
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    //we need to check if it  is production or developement so that
    //we can send error messages as per the status

    if (process.env.NODE_ENV === 'development') {
        let error = {
            ...err,
        };
        //we check if the error is CastError
        if (error.message instanceof mongoose.Error.CastError)
            error = handleCastError(error);
        // if (error instanceof mongoose.CastError) error = handleCastError(error);

        //To Handle duplicate fields
        if (error.name === 'ValidationError') error = handleValidationError(error);

        sendErrorDev(error, res);
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(error, res);
    }

    next();
};

