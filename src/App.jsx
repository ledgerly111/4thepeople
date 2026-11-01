import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CustomSoftwarePage from './pages/CustomSoftwarePage'
import SoftwarePage from './pages/SoftwarePage'
import { PRODUCTS } from './data/products'
import { InkDefs } from './origami/paper'
import { useBoil } from './origami/useBoil'

export default function App() {
  useBoil()

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <InkDefs />
      <div className="paper-backdrop" aria-hidden="true" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/custom-software" element={<CustomSoftwarePage />} />
        {PRODUCTS.map((product) => (
          <Route
            key={product.slug}
            path={`/${product.slug}`}
            element={<SoftwarePage product={product} />}
          />
        ))}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
