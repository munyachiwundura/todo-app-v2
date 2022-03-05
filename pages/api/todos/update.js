import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const update = JSON.parse(req.body);
  const itemID = update.id;
  const data = update.data;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: itemID,
    },
    data: data,
  });
  res.status(200).json({ updatedTodo });
}
