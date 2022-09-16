import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) throw new Error("Invalid username or password");

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) throw new Error("Invalid username or password");

    const token = sign({ username }, "62c9097e8cbb16caafe2adc43909120b", {
      subject: client.id,
      expiresIn: "7d",
    });

    return token;
  }
}
