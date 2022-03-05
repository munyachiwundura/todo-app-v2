import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  let request;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  request = await prisma.todoCategory.findFirst({
    where: {
      title: "Default",
      userId: user.id,
    },
  });

  if (request === null) {
    request = await prisma.todoCategory.create({
      data: {
        title: "Default",
        icon: "✔",
        color: "#276BF2",
        userId: user.id,
      },
    });
  }

  res.status(200).json({ request });
}
