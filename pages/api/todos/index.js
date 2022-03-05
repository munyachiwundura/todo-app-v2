import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const data = await prisma.todo.findMany({
    where: {
      User: { email: session.user.email },
    },
    include: {
      category: true,
    },
  });

  res.status(200).json({ data });
}
