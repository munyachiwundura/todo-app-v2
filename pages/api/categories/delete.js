import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const item = JSON.parse(req.body);
  const itemID = item.id;

  const deletedCategory = await prisma.todoCategory.delete({
    where: {
      id: itemID,
    },
  });
  console.log(deletedCategory);
  res.status(200).json({ deletedCategory });
}
