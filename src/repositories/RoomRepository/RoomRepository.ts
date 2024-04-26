import {AppDataSource} from "../../data-source";
import UserEntity from "../../entities/UserEntity/UserEntity";
import RoomEntity from "../../entities/RoomEntity/RoomEntity";
import IRoomEntity from "../../entities/RoomEntity/IRoomEntity";
import {Repository} from "typeorm";
import IUserEntity from "../../entities/UserEntity/IUserEntity";

export default class RoomRepository {
    roomRepository: any;

    constructor() {
        this.roomRepository = AppDataSource.getRepository(RoomEntity)
    }

    async create(room: any, user: UserEntity) {
        const newRoom = await this.roomRepository.save({...room, users: [user]});

        return newRoom;
    }

    async update(roomId: number, user: UserEntity) {
        const room = await this.roomRepository.find({
            relations: {
                users: true,
            },
            where: {
                id: roomId,
            }
        })


        await this.roomRepository.save({...room[0], users: [...room[0].users, user]});

        return room;
    }

    async findAll() {
        return await this.roomRepository.find({
            relations: {
                users: true,
            },
        });
    }

    async findOne(id: number) {
        return await this.roomRepository.find({
            where: {
                id: id,
            }
        })
    }

    async findOneByRoomName(name: string) {
        return await this.roomRepository.findOne({
            where: {
                name: name,
            }
        })
    }

    async findRoomWithUsers(roomId: number) {
        return this.roomRepository.find({
            relations: {
                users: true,
            },
            where: {
                id: roomId
            }
        })
    }

    async addUser(room: any, user: IUserEntity) {
        return this.roomRepository.save({...room, users: [...room.users, user]})
    }

    async remove(room: IRoomEntity) {
        return await this.roomRepository.remove(room);
    }

    async findUsers(roomId: number) {
        return await this.roomRepository.find({
            relations: ["users"],
            where: {
                id: roomId,
            }
        });
    }
}
