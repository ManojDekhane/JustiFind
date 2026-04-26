import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Scale, ChevronDown } from 'lucide-react'
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#' },
    {
      name: 'Resources',
      href: '#',
      dropdown: [
        { name: 'Laws by Category', href: '#categories' },
        { name: 'NGOs & Legal Aid', href: '#' },
        { name: 'Know Your Rights', href: '#' },
      ]
    },
    { name: 'News', to: '/news' },
    { name: 'Myths vs Facts', to: '/myths' },
    { name: 'AI Assistant', to: '/assistant' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled
        ? 'py-3 glass-strong shadow-lg shadow-background/5'
        : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary/25">
                <Scale className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-cyan-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">
              <span className="gradient-text">Justi</span>
              <span className="text-foreground">Find</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.to || "#"}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-accent/50"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </Link>


                {/* Dropdown */}
                {link.dropdown && (
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-300 ${activeDropdown === link.name
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                  >
                    <div className="glass rounded-xl p-2 min-w-48 shadow-xl shadow-background/10">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-10 h-10 rounded-xl glass hover:bg-accent/50 flex items-center justify-center transition-all duration-300 hover:scale-105 group"
              aria-label="Toggle dark mode"
            >
              <Sun className={`w-5 h-5 absolute transition-all duration-500 ${darkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} text-amber-500`} />
              <Moon className={`w-5 h-5 absolute transition-all duration-500 ${darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'} text-blue-400`} />
            </button>

            {/* CTA Button */}
            <button
              onClick={() => {
                if (location.pathname !== "/") {
                  navigate("/") // go to home
                  return
                } 
                
                  const input = document.getElementById("searchInput")

                  if (input) {
                    input.scrollIntoView({ behavior: "smooth", block: "center" })

                    setTimeout(() => {
                      input.focus()
                    }, 500)
                  }
                
              }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-medium text-sm rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl glass hover:bg-accent/50 flex items-center justify-center transition-all duration-300"
              aria-label="Toggle menu"
            >
              <Menu className={`w-5 h-5 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <X className={`w-5 h-5 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="glass rounded-2xl p-4 space-y-1">
            {navLinks.map((link, index) => (
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <a
              href="#searchInput"
              onClick={(e) => {
                e.preventDefault();

                const input = document.getElementById("searchInput");

                if (input) {
                  input.scrollIntoView({ behavior: "smooth", block: "center" });

                  // wait for scroll, then focus
                  setTimeout(() => {
                    input.focus();
                  }, 500);
                }
              }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-medium text-sm rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
