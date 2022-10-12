import '../styles/globals.css'
import Layout from '../components/layout'
import { ToastContainer } from "react-toastify"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer limit={1} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
