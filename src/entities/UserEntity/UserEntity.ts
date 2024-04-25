import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import IUserEntity from "./IUserEntity";

@Entity()
export default class UserEntity implements IUserEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

}
