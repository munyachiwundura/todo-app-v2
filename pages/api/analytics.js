import prisma from '../../lib/prisma';



export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: "Method not allowed"})
}
const user = JSON.parse(req.body)
const today = new Date()
const dayNames = ["S", "M", "T", "W", "T", "F", "S"]
  let analytics = {}

  const data = await prisma.todo.findMany({
    where: {
      User: { email: user.email }
    },
   include: {
     category: true,
   }
  })

const thisMonth = data.filter(x => x.completeby.getMonth() === today.getMonth())
const completed = data.filter(x => x.status === true)
// console.log(data[0].completedby.getDate())
const thisWeek = []
for (let index = 0; index < 7; index++) {
  var d = new Date()
  d.setDate(d.getDate() - index)
  console.log(d.toLocaleDateString())
  var day = data.filter(x => x.completeby.getDate() === d.getDate()) 
  var dayCompleted = completed.filter(x => x.completeby.getDate() === d.getDate()) 
  
thisWeek[index] = {
  total: day.length,
  completed: dayCompleted.length,
  day: dayNames[d.getDay()]
}

}
console.log(thisWeek)
analytics["total"] = {completed: data.filter(x => x.status === true).length, total: data.length}
analytics["monthly"] = {completed: thisMonth.filter(x => x.status === true).length, total: thisMonth.length, month: today.getMonth()}
analytics["weekly"] = thisWeek

    
    res.status(200).json({ analytics })
  }
  