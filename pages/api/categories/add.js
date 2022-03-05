import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);
  const addedCategory = await prisma.todoCategory.create({
    data: data,
  });
  console.log(addedCategory);
  res.status(200).json({ addedCategory });
}
