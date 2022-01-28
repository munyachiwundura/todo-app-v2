import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed"})
    }

    const item = JSON.parse(req.body)
    const itemID = item.id

    const deletedTodo = await prisma.todo.delete({
        where: {
          id: itemID
        }
      })
      console.log(deletedTodo)
    res.status(200).json({ deletedTodo })
  }