import Navbar from "@/Components/Navbar"
export default function App({ Component, pageProps }) {
  return <>
    <Navbar></Navbar>
    <Component {...pageProps} />
  </>
}
