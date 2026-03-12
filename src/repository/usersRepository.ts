import { Prisma, User } from "@prisma/client";
import { prisma } from "../database/prisma";

export class UsersRepository {
  static async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}
