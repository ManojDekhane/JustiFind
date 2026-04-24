import { Scale, Twitter, Linkedin, Github, Mail, MapPin, Phone, Heart, ArrowUp } from 'lucide-react'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    product: [
      { name: 'AI Assistant', href: '#' },
      { name: 'Know Your Rights', href: '#' },
      { name: 'Legal News', href: '#' },
      { name: 'Myths vs Facts', href: '#' },
      { name: 'Categories', href: '#categories' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Status', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Disclaimer', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="relative pt-24 pb-8 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Top section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-border/50">
          {/* Brand section */}
          <div className="space-y-6">
            <a href="#" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">
                <span className="gradient-text">Justi</span>
                <span className="text-foreground">Find</span>
              </span>
            </a>
            
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Making legal information accessible to everyone. Our AI-powered platform helps you 
              understand your rights and navigate complex legal matters with confidence.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="mailto:help@justifind.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Mail className="w-5 h-5" />
                <span>justifind2026@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Pune, India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl glass hover:bg-accent/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Links section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-foreground mb-4 capitalize">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 animated-underline inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Stay Updated
              </h3>
              <p className="text-muted-foreground">
                Get the latest legal news, updates, and tips delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-12 px-4 glass rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
              <button className="px-6 h-12 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-medium rounded-xl hover:shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} JustiFind. Made with 
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> 
            for everyone.
          </p>
          
          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            Back to top
            <div className="w-8 h-8 rounded-lg glass group-hover:bg-accent/50 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
