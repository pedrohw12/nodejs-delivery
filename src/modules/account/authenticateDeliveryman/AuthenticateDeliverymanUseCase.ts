import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) throw new Error("Invalid username or password");

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) throw new Error("Invalid username or password");

    const token = sign({ username }, "62c9097e8cbb16cbbfe2adc43909120b", {
      subject: deliveryman.id,
      expiresIn: "7d",
    });

    return token;
  }
}
