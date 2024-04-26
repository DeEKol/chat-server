import UserEntity from "../../entities/UserEntity/UserEntity";
import UserRepository from "../../repositories/UserRepository/UserRepository";
import * as bcrypt from "bcrypt";

export default class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(username: string, password: string) {
      const user = new UserEntity(username, password);
      const userFromDb = await this.userRepository.findOneByUsername(username);

      if (user.username === userFromDb?.username) {
        throw new Error("User exists");
      }

      const hashedPassword = await bcrypt.hash(password, 3);

      await this.userRepository.create(user, hashedPassword);

      return {
        ...user,
        password: hashedPassword,
      };

  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async findOneForUsername(username: string) {
    return await this.userRepository.findOneForUsername(username);
  }

  async remove(user: UserEntity) {
    return await this.userRepository.remove(user);
  }
}
