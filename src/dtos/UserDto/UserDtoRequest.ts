import IUserEntity from "../../entities/UserEntity/IUserEntity";
import IUserDto from "./IUserDto";
import {Column} from "typeorm";
import {IsNotEmpty, Length} from "class-validator";

export default class UserDtoRequest {
    @Length(4, 20)
    @IsNotEmpty()
    username!: string;

    @Length(4, 20)
    @IsNotEmpty()
    password!: string
}
