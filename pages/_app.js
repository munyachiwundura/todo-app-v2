import Layout from '../components/layout'
import '../styles/globals.css'
import { Provider } from "../context";
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, session }) {

  return (
    <SessionProvider session={session}>
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </SessionProvider>
    )
}

export default MyApp
