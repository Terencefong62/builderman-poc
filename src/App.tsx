import { useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ContactPage from './pages/ContactPage'
import MatchResultsPage from './pages/MatchResultsPage'
import MatchingPage from './pages/MatchingPage'
import StyleSelectPage from './pages/StyleSelectPage'
import UnitDetailsPage from './pages/UnitDetailsPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/match/styles" replace />} />
        <Route path="/match/styles" element={<StyleSelectPage />} />
        <Route path="/match/unit" element={<UnitDetailsPage />} />
        <Route path="/match/contact" element={<ContactPage />} />
        <Route path="/match/matching" element={<MatchingPage />} />
        <Route path="/match/results" element={<MatchResultsPage />} />
      </Routes>
    </>
  )
}
