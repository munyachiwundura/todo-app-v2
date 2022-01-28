import prisma from '../../lib/prisma';



export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed"})
    }

    const update = JSON.parse(req.body)
    const todoItemID = update.id
    const todoItemStatus = update.status

    const updatedTodo = await prisma.todo.update({
        where: {
          id: todoItemID
        },
        data: {
          status: todoItemStatus
        }
      })
    res.status(200).json({ updatedTodo })
  }
  