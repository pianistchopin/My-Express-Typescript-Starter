import config from "config";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, RequestWithUser } from "@interfaces/auth.interface";
import {User} from "@entity/user";

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction ) => {
    try {
        const Authorization = req.header('Authorization').split('Bearer ')[1] || null;
        
        if(Authorization){
            const secretKey: string = 'secretKey';
            const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
            const userId = verificationResponse.id;
            const users: User[] = await User.find();
            const findUser = users.find(user => user.id === userId);
            
            if(findUser){
                req.user = findUser;
                next();
            }else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
};

export default authMiddleware;