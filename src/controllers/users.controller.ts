import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/user.dto";
import userService from "@services/users.service";
import { UserEntity } from "../entity/userEntity"

class UsersController {
    public userService = new userService();
    
    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
            const findAllUsersData: UserEntity[] = await this.userService.findAllUser();
            
            res.status(200).json({data: findAllUsersData, message: 'findAll'});
        } catch (error){
            next(error);
        }
    };
}

export default UsersController;