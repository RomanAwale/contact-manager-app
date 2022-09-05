import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import logger from '../misc/logger';
import CustomError from '../misc/CustomError';
import { sendErrorResponse} from '../utils/common';
import * as userService from '../services/userService'; 



export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Getting all users');
  userService
    .getAllUsers()
    .then(data => res.json(data))
    .catch(err => next(err));
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {

  const {userId} = req.params;

  userService
    .getUsers(+userId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};  

export const getUserPosts = (req: Request, res: Response, next: NextFunction) => {
  const {userId} = req.params;

  userService
    .getUserPosts(+userId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};  

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  userService
  .createUser({ name, email, password })

  .then((data) => res.json(data))

  .catch((err) => {console.log("err")
  next(err)});
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const {userId} = req.params;
  const {name, email, password} = req.body;

  if (!userId || !name || !email){
    logger.error('Missing parameters userId or name or email');
    throw new CustomError('Userid, name and email are all required', StatusCodes.BAD_REQUEST);
  }
  userService
  .updateUsers({
    name, email, id: +userId, password
  })
  .then((data) => res.json(data))
  .catch((err) => next(err));
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) =>{
  const {userId} = req.params;

  userService
  .deleteUsers(+userId)
  .then((data) => res.writeHead(StatusCodes.OK, { 'Content-Type': 'application/json'}).end(JSON.stringify(data)))
  .catch((err) => sendErrorResponse(res, err.statusCode, err.message));
};