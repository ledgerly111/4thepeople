import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Proof from '../components/Proof'
import Systems from '../components/Systems'
import CustomOffer from '../components/CustomOffer'
import Contact from '../components/Contact'
import SiteFooter from '../components/SiteFooter'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }
    const node = document.querySelector(location.hash)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Proof />
        <Systems />
        <CustomOffer />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
