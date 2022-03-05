import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);

  const request = await prisma.user.findUnique({
    where: { email: data.userName },
  });

  res.status(200).json({ request });
}
