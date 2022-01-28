import { signOut, useSession, signIn } from 'next-auth/react'


export default function Login() {
  const {data: session} = useSession();
  console.log(session)
  return (
    <div>
      {session? <button onClick={()=> signOut()}>Logout</button> : <button onClick={()=> signIn()}>Login</button>}
    </div>
  )
}
