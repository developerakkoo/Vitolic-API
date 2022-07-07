const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const authHeader = req.get('Authorization');

   if(!authHeader){
       const error = new Error('Not Able to Authorize!')
       error.status = 401;
       throw error;
   }

   const token = authHeader.split(' ')[1];
   let decodedTokwn;

   try {
       decodedTokwn = jwt.verify(token, '!23ThisisaSecretFor@#$%^%^^&&allthebest')
   } catch (error) {
       err.status = 500;
       throw error;
   }

   if(!decodedTokwn){
       const error = new Error('You are Logged out! Please Login Again!');
       error.status = 401;
       throw error;

   }

   req.userId = decodedTokwn.userId;
    next();
}