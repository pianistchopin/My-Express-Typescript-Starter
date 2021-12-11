import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from "@dtos/user.dto";
import { HttpException } from '@exceptions/HttpException';
import userModel from '@models/users.model';
import {User} from "@interfaces/users.interface";
import { isEmpty } from '@utils/util';

class AuthService{
    public users = userModel;

    public async signup(userData: CreateUserDto): Promise<User>{
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = this.users.find(user => user.email === userData.email);
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData: User = { id: this.users.length + 1, ...userData, password: hashedPassword};

        return createUserData;
    }
}

export default AuthService;