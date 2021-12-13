import { Request } from "express";
import {User} from "@entity/user";

export interface DataStoredInToken{
    id: number;
}

export interface TokenData{
    token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request{
    user: User;
}