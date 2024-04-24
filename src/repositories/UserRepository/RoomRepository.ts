import {AppDataSource} from "../../data-source";
import {UserEntity} from "../../entities/UserEntity/UserEntity";
import * as bcrypt from 'bcrypt';
import {TokenService} from "../../services/TokenService/TokenService";
import {RoomEntity} from "../../entities/RoomEntity/RoomEntity";

export class RoomRepository {
    roomRepository: any;

    constructor() {
        this.roomRepository = AppDataSource.getRepository(RoomEntity)
    }

    async create(name: string) {
        const room = new RoomEntity(name)

        await this.roomRepository.save(room);

        return room;
    }

    async update(roomId: number, user: UserEntity) {
        // const room = new RoomEntity(name)
        const room = await this.roomRepository.find({
            relations: {
                users: true,
            },
            where: {
                id: roomId
            }
        })

        console.log(room)
        console.log(user)

        await this.roomRepository.save({...room[0], users: [...room[0].users, user]});

        return room;
    }

    async findAll() {
        return await this.roomRepository.find();
    }

    async findOne(id: number) {
        return await this.roomRepository.find({
            where: {
                id: id,
            }
        })
    }

    // async findOneForUsername(username: string) {
    //     return await this.roomRepository.find({
    //         where: {
    //             username: username,
    //         }
    //     })
    // }

    async remove(room: RoomEntity) {
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