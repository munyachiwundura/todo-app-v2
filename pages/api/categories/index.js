import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const categories = await prisma.todoCategory.findMany({
    where: {
      userId: user.id,
    },
  });

  res.status(200).json({ categories });
}
