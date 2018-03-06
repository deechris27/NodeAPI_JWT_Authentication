const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/post/token', (req, res) => {
   res.json({
      message: 'Posts created...'
   });
}); //end of post 1

app.post('/api/login', (req, res) => {
  
    //Test user
    const user = {
        id: 1,
        username: 'deeps',
        email: 'deeps@gmail.com'
    }

    jwt.sign({user: user}, {expiredIn: '30s'}, 'secretooo', (err, token) => {
         res.json({
             token: token
         });
    });
});

app.post('/api/pozzt', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretooo', (err, authData)=>{
       if(err){
           res.sendStatus(403);
       }else{
            res.json({
                message: 'jwt check',
                authData
            });
       }
    });
});

function verifyToken(req, res, next){
    //Auth header value
   const bearerHeader = req.headers['authorization'];

   if(typeof bearerHeader != 'undefined'){
       const bearer = bearerHeader.split(' ');
       const bearerToken = bearer[1];
       req.token = bearerToken;
       next();
   }else{
      res.sendStatus(403);
   }
}

app.listen(5000, () => {
   console.log('Port started on 5000');
});