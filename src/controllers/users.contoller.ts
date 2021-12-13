import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/user.dto";
import { User} from "@interfaces/users.interface";
import userService from "@services/users.service";

class UsersContoller {
    public userService = new userService();
    
    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
            const findAllUsersData: User[] = await this.userService.findAllUser();
            
            res.status(200).json({data: findAllUsersData, message: 'findAll'});
        } catch (error){
            next(error);
        }
    };
}

export default UsersContoller;