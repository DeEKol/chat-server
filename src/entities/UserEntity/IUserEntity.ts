import {Column} from "typeorm";

export interface IUserEntity {
    id: number;

    username: string;

    password: string;
}