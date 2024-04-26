import {Column} from "typeorm";

export default interface IMessageEntity {
    id: number;
    text: string;
    time: string;
    room: number;
    user: number;
    isEdited: boolean;
    isRead: boolean;
    type: string;

}
