import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import {CreateUserDto} from "../dtos/user.dto";
import {User} from "../interfaces/users.interface";
import AuthService from '@services/auth.service';

class AuthController{

    public authService = new AuthService();

    public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDto = req.body;
            const signUpUserData: User = await this.authService.signup(userData);

            res.status(201).json({ data: signUpUserData, message: 'signup' });
        } catch (error) {
            next(error);
        }
    }

    public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    }

    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {

    }
}

export default AuthController;