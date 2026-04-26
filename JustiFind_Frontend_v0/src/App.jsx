import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Categories from './components/Categories.jsx'
import Testimonials from './components/Testimonials.jsx'
import Stats from './components/Stats.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

import NewsPage from './pages/NewsPage.jsx';
import AIAssistantPage from './pages/AIAssistantPage.jsx'
import MythFactHome from './pages/MythFactHome.jsx'
import MythFactDetail from './pages/MythFactDetail.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import LawDetail from './pages/LawDetail.jsx'
import RightsHome from './pages/Right_Home_Page.jsx';
import RightCategoryPage from './pages/Rights_Category_Page.jsx';
import RightsDetail from './pages/Rights_Detail_page.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-background text-foreground transition-colors duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        {/* background stays OUTSIDE routes */}
        <div className="fixed inset-0 gradient-mesh pointer-events-none" />

        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* ✅ ROUTES START HERE */}
          <Routes>

            {/* ✅ HOME PAGE (your full landing UI) */}
            <Route
              path="/"
              element={
                <main>
                  <Hero />
                  <Stats />
                  <Features />
                  <HowItWorks />
                  <Categories />
                  <Testimonials />
                  <CTA />
                </main>
              }
            />

            {/* ✅ NEWS PAGE */}
            <Route path="/rights" element={<RightsHome />} />
        <Route path="/rights/category/:category" element={<RightCategoryPage />} />
        <Route path="/rights/:slug" element={<RightsDetail />} />
            <Route path="/news" element={<NewsPage />} />

            <Route path='/assistant' element={<AIAssistantPage />} />

            <Route path='/myths' element={<MythFactHome />} />
            <Route path='/myth/:slug' element={<MythFactDetail />} />

            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/law/:id" element={<LawDetail />} />

          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App
