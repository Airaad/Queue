//This function will be used to handle the custom error
export const errorHandler = (statusCode, message)=>{
    const error = new Error(); //using Error constructor from javascript to create error
    error.statusCode = statusCode;
    error.message = message;
    return error;

};