import IUserEntity from "../UserEntity/IUserEntity";

export default interface IRoomEntity {
    id: number;

    name: string;

    users?: IUserEntity[];
}
