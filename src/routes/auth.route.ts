import {Router} from "express";
import RoutesInterface from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";
import ValidationMiddleware from "../middlewares/validation.middleware";
import { CreateUserDto } from "../dtos/user.dto";

class AuthRoute implements RoutesInterface{
    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    }
}

export default AuthRoute;