import {Router} from "express";
import  { Routes } from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";
import { CreateUserDto } from "../dtos/user.dto";
import validationMiddleware from "@middlewares/validation.middleware";
import authMiddleware from "@middlewares/auth.middleware";


class AuthRoute implements Routes{
    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
        this.router.post( `${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
        this.router.get(`${this.path}logout`, authMiddleware, this.authController.logOut)
    }
}

export default AuthRoute;