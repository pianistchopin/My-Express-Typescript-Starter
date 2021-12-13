import { Router } from "express";
import UsersContoller from "@controllers/users.contoller";
import { CreateUserDto } from "@dtos/user.dto";
import { Routes } from '@interfaces/routes.interface'
import validationMiddleware from "@middlewares/validation.middleware";
import authMiddleware from "@middlewares/auth.middleware";

class UsersRoute implements Routes{
    public path = '/users';
    public router = Router();
    public usersController = new UsersContoller();
    
    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.usersController.getUsers);
        
    }
}

export default UsersRoute;