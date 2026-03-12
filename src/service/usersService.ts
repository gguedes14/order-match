import { Prisma } from "@prisma/client";
import { UsersRepository } from "../repository/usersRepository";

export class UsersService {
  static async createUser(data: Prisma.UserCreateInput) {
    await UsersRepository.createUser(data)

    return 'User created with successfully'
  }
}
