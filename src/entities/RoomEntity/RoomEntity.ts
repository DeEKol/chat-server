import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import UserEntity from "../UserEntity/UserEntity";

@Entity()
export default class RoomEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users?: UserEntity[];

    constructor(name: string) {
        this.name = name;
    }

}
