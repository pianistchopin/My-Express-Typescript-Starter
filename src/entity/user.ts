import { BaseEntity,  Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
}