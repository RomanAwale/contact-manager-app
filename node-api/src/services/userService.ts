import logger from '../misc/logger';
import Success from '../domain/Success';
import UserModelV2 from  '../modelsV2/UserAccount';
import PostModel from '../modelsV2/Post';
import User, { RegisterUser } from '../domain/User';
import IPost from '../domain/Post';
import bcrypt from "bcrypt";
import Token from '../domain/Token';
import jwt from "jsonwebtoken";
import RefreshToken from '../modelsV2/RefreshToken';
import { createAccessToken } from '../utils/common';



/**
 * Get all the users
 * @returns {Promise<{users: User [], message: string}>}
 */
export const getAllUsers = async (): Promise<Success<User[]>> => {
  logger.info ('Getting all users');
  const users = await UserModelV2.getAllUser();

  return {
    data: users,
    message: 'Users fetched successfully'
  };
};

export const getUsers = async(userId: number): Promise<Success<User>> => {
  logger.info(`Getting user id : ${userId}`);
  const user = await UserModelV2.getUser(userId);

  return {
    data: user,
    message: 'Users fetched successfully'
  };
};

export const getUserPosts = async (
  userId: number
  ): Promise<Success<IPost[]>> => {
  logger.info(`Getting posts for user id: ${userId}`);
  const posts = await PostModel.getUserPosts(userId);

  return {
    data: posts,
    message: 'Users fetched successfully'
  };
};

export const createUser = async (
  user: RegisterUser
): Promise<Success<User>> => {
  const { password } = user;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const insertedUser = await UserModelV2.createUser({
    ...user,
    password: passwordHash,
  });

  // const insertedUser = await UserModel.createUser(user);
  logger.info("User created successfully");

  // TO DO : Send mail to user

  return {
    data: insertedUser,
    message: "User created successfully",
  };
};

export const updateUsers = async(user: User): Promise<Success<User>> => {
  const updateUser = await UserModelV2.updateUser(user);
  logger.info(`User updated successfully`);

  return {
    data: updateUser,
    message: 'Users updated successfully'
  };
};

export const deleteUsers = async(userId: number): Promise<Success<User>> => {
  await UserModelV2.deleteUser(userId);
  logger.info(`User deleted successfully`);

  return {
    message: 'Users deleted successfully'
  };
};
 
// export const getUserByEmail = async(email: string): Promise<Success<User>> => {
//   const user = await UserModelV2.getUserByEmail(email);

//   return {
//     data: user,
//     message: "User fetched successfully",
//   };
// };

export const login = async (
  email:string,
  password: string
  ): Promise<Success<Token>> => {
    const user = await UserModelV2.getUserByEmail(email);
    if(!user || !user.id) {
      return {
        message: "Invalid email and password",
      };
    }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if(!isPasswordMatch){
        return {
          message: "Password does not match",
        };
      }

      const accessToken = createAccessToken({ userId: user.id });
      const refreshToken = jwt.sign(
        {userId: user.id}, 
        process.env.JWT_REFRESH_TOKEN as string);


      await RefreshToken.createRefreshToken({
        refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 900000),
      });
      return {
        data: { accessToken, refreshToken },
        message: "Log in successful",
      };

      
    };
