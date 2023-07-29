import '@/styles/globals.css'

const poppins = Poppins({
  weight:['100','200','300','400','500','600','700','800','900'],
  style:['normal','italic'],
  subsets:["latin"]
})
import { Poppins } from 'next/font/google'

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
        <Component {...pageProps} />
    </main>
  )
  
}
