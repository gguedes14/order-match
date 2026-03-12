import { prisma } from "../database/prisma";

export class AuthRepository {
  static async login(username: string) {
    return prisma.user.findUnique({
      where: { username },
    });
  }
}
