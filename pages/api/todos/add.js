import prisma from "../../../lib/prisma";
const webPush = require("web-push");

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);
  const addedTodo = await prisma.todo.create({
    data: data.todo,
    include: {
      category: true,
    },
  });

  webPush
    .sendNotification(
      data.subscription,
      JSON.stringify({
        title: "Upcomming task",
        message: addedTodo.title,
        time: addedTodo.completeBy,
      })
    )
    .then((response) => {
      res.writeHead(response.statusCode, response.headers).end(response.body);
    })
    .catch((err) => {
      if ("statusCode" in err) {
        res.writeHead(err.statusCode, err.headers).end(err.body);
      } else {
        console.error(err);
        res.statusCode = 500;
        res.end();
      }
    });

  console.log(addedTodo);
  res.status(200).json({ addedTodo });
}
