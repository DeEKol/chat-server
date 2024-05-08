import IUserEntity from "../../entities/UserEntity/IUserEntity";
import IUserDto from "./IUserDto";

export default class UserDto implements IUserDto {
    id: number;
    username: string;

    constructor(user: IUserEntity) {
        this.id = user.id;
        this.username = user.username;
    }

}
