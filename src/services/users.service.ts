import bcrypt from "bcrypt";
import { CreateUserDto } from "@dtos/user.dto";
import { HttpException } from "@exceptions/HttpException";
import { isEmpty } from "@utils/util";
import { User } from "../entity/user"

class UserService {
    
    public async findAllUser(): Promise<User[]>{
        const users: User[] = await User.find();
        return users;
    }
    
    public async findUserById(userId: number): Promise<User>{
        const users: User[] = await User.find();
        const findUser: User = users.find(user => user.id === userId);
        if(!findUser) throw new HttpException(409, "You're not user");
        
        return findUser;
    }
    
    public async createUser(userData: CreateUserDto): Promise<User>{
        if(isEmpty(userData)) throw new HttpException(400, "You're not userData");
        const users: User[] = await User.find();
        
        const findUser: User = users.find(user => user.email === userData.email);
        if(findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);
        
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const createUserData:User = User.create(userData);
        createUserData.password = hashedPassword;
        const result = await User.save(createUserData);
        return result;
    }

    public async updateUser(userId: number, userData: User): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = await User.findOne(userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword
        
        await User.update(userId, userData);

        const user: User = await User.findOne(userId);
        return user;

    }
}

export default UserService;