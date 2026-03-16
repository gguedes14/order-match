import { Prisma, User } from "@prisma/client";
import { prisma } from "../../database/prisma";

export class UsersRepository {
  static async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  static async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username }
    });
  }

  static async getUserBalance(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        usd: true,
        btc: true,
      }
    });
  }
}
