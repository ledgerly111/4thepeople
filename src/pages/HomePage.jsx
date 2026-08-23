import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Proof from '../components/Proof'
import CustomOffer from '../components/CustomOffer'
import Systems from '../components/Systems'
import Contact from '../components/Contact'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const node = document.querySelector(location.hash)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-void font-mono text-cream">
      <Hero />
      <Proof />
      <CustomOffer />
      <Systems />
      <Contact />
    </main>
  )
}
