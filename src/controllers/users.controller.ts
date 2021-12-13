import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/user.dto";
import userService from "@services/users.service";
import { User } from "../entity/user"

class UsersController {
    public userService = new userService();
    
    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
            const findAllUsersData: User[] = await this.userService.findAllUser();
            
            res.status(200).json({data: findAllUsersData, message: 'findAll'});
        } catch (error){
            next(error);
        }
    };
    
    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
            const userData: CreateUserDto = req.body;
            const createUserData: User = await this.userService.createUser(userData);
            res.status(201).json({data: createUserData, message: 'created'});
        } catch (error){
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const userData: User = req.body;
            const updateUserData: User = await this.userService.updateUser(userId, userData);
            res.status(200).json({ data: updateUserData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    }
}

export default UsersController;