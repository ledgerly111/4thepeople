import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CustomSoftwarePage from './pages/CustomSoftwarePage'
import SoftwarePage from './components/SoftwarePage'
import { PRODUCTS } from './data/products'

export default function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}
