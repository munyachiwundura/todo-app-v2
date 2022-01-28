import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed"})
    }

    const data = JSON.parse(req.body)
    const addedTodo = await prisma.todo.create({
        data: data,
        include: {
          category: true,
        },
      })
    console.log(addedTodo)
    res.status(200).json({ addedTodo })
  }
  