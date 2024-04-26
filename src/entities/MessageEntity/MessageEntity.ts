import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import RoomEntity from "../RoomEntity/RoomEntity";
import UserEntity from "../UserEntity/UserEntity";
import IMessageEntity from "./IMessageEntity";

@Entity()
export default class MessageEntity implements IMessageEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "longtext" })
    text: string;

    @Column()
    time: string;

    @Column()
    isEdited: boolean = false;

    @Column()
    isRead: boolean = false;

    @Column()
    type: string = "text";

    @ManyToOne(() => RoomEntity, (room) => room.id)
    room: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: number;

    constructor(text: string, room: number, user: number, time: string, type: string = "text") {
        this.text = text;
        this.room = room;
        this.user = user;
        this.time = time;
        this.type = type;
    }

}
