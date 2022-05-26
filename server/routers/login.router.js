const { auth, tokens, language } = require('../config');
const accessTokenSecret = auth.ACCESS_TOKEN_SECRET;
const accessTokenTimeOut = auth.ACCESS_TOKEN_TIMEOUT;
const refreshTokenSecret = auth.REFRESH_TOKEN_SECRET;
const refreshTokenTimeOut = auth.REFRESH_TOKEN_TIMEOUT;
const cookieName= auth.REFRESH_TOKEN_COOKIE_NAME;
const cookieTimeout = auth.REFRESH_TOKEN_COOKIE_TIMEOUT;

const express = require("express");
const loginRouter = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const cookieSettings = { httpOnly: true, sameSite: 'None', secure: true, maxAge: cookieTimeout }; 

let refreshToken_List = [];  //set it to database

const { errorHandler, validatorUser } = require('../middlewares');
const { Success, ErrorHandler } = require('../classes');

const  { UserModel }  = require('../models');


loginRouter.route('/register') //  localhost:3500/api/login/register //register
.post(  async (req, res, next) => { //validatorUser,
  console.log(':: user router post');
  errorHandler(req, res, next)( async () => {
    const { name, password } = req.body;
    const user = await UserModel.findOne({ name: name });
    if (user !== null) throw new ErrorHandler(452, 'user already exist!');
    const data = { name, password };
    data.password = await bcrypt.hash(data.password, 10);
    const result = await new UserModel(data).save();

    // console.log(':: 4365345643');
    // console.log(name);
    // console.log(password);

    return new Success(200, result);
    });  //error handler 
})


loginRouter.route('/') //  /api/login
.post( async (req, res, next) => {
  console.log(':: login router post');
  errorHandler(req, res, next)( async () => {
    const {name} = req.body;
    if (name === '') throw new ErrorHandler(400, 'no name set!');
    const user = await UserModel.findOne({ name: name });
    if (!user) throw new ErrorHandler(400, 'name or password is not correct! retry');
    if(req.body.password?.trim() === '' || !req.body.password) throw new ErrorHandler(400, 'no password set');
    if(!await bcrypt.compare(req.body.password, user.password)) throw new ErrorHandler(400, 'user or password is not correct!');
    return loginUserSuccess(user, res); //set auth login
    });  //error handler
})
.patch( (req, res, next) => {
  console.log(':: login router patch');
  errorHandler(req, res, next)( async () => {
  const refreshToken = ( req.cookies && req.cookies[cookieName]) || req.headers['authorization'] || req.header['x-auth-token'] || req.body['token'] || req.query['token'];
  if(!refreshToken) throw new ErrorHandler(401, 'Refresh Token missing.');

  let userTokenValue = jwt.verify(refreshToken, refreshTokenSecret);
  if (!userTokenValue) throw new ErrorHandler(403, 'Wrong Refresh Token supplied.');
  if(!refreshToken_List.find(x => x.user_id === userTokenValue.user_id)) throw new ErrorHandler(403, 'Refresh Token not stored.');
  const accessToken = generateAccessToken({ user_id: userTokenValue.user_id, name: userTokenValue.name });//(user)
  const user = await UserModel.findById( userTokenValue.user_id );
  const userClone = JSON.parse(JSON.stringify(user));
  delete userClone.password;
  userClone.accessToken = 'Bearer ' + accessToken;
  const result = userClone;

  if(!result) throw new Error();
  return new Success(200, result);

  });  //error handler 
})
.delete( (req, res, next) => {
  console.log(':: login router delete');
  errorHandler(req, res, next)( async () => {
    const refreshToken = ( req.cookies && req.cookies[cookieName]) || req.headers['authorization'] || req.header['x-auth-token'] || req.body['token'] || req.query['token'];
    if(!refreshToken) return new Success(200);
    if( req.cookies && req.cookies[cookieName] ) res.clearCookie(cookieName ,cookieSettings);
    jwt.verify(refreshToken, refreshTokenSecret, (err, userTokenValue) => {
      if(!err) refreshToken_List = refreshToken_List.filter(x => x.user_id !== userTokenValue.user_id);
    });
    return new Success(200);
  });  //error handler
})
;




module.exports = loginRouter;



function loginUserSuccess(user, res){ //cookie + accessToken and auth data for login
    const accessToken = generateAccessToken({ user_id: user._id, email: user.email });
    const refreshToken = jwt.sign({ user_id: user._id, email: user.email }, refreshTokenSecret, { expiresIn: refreshTokenTimeOut } );
    refreshToken_List.push({user_id: user._id.toHexString(), token: refreshToken});
    res.cookie(cookieName, refreshToken, cookieSettings); //change
    const data = JSON.parse(JSON.stringify(user));
    delete data.password;
    data.accessToken = 'Bearer ' + accessToken;
    return new Success(200, data);
}

function generateAccessToken(user) { return jwt.sign( user, accessTokenSecret, { expiresIn: accessTokenTimeOut } ); }