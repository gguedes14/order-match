import { Prisma } from "@prisma/client";
import { UsersRepository } from "../../repository/users/usersRepository";
import { AppError } from "../../errors/apiError";

export class UsersService {
  static async createUser(data: Prisma.UserCreateInput) {
    const findUser = await UsersRepository.findByUsername(data.username);

    if (findUser) {
      throw new AppError(409, "User cannot be created");
    }

    await UsersRepository.createUser(data);

    return 'User created with successfully';
  }
}
