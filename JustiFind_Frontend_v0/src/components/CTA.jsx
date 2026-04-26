import { useState, useEffect, useRef } from 'react'
import { PenLine } from 'lucide-react'

function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10" />

      <div className="max-w-4xl mx-auto relative">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Help Us Improve 🚀
          </h2>

          <p className="text-lg text-muted-foreground mb-10">
            Your feedback helps us make JustiFind better for everyone.
          </p>

          {/* BUTTON (fixed) */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5nw6oBHPzE6A1N2jZ1D2l9vATcjzwUYhJGfYKQGZ03SK8ng/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-medium
                       bg-gradient-to-r from-primary to-cyan-500 text-white
                       rounded-xl shadow-lg
                       hover:scale-105 hover:shadow-xl
                       active:scale-95
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <PenLine className="w-5 h-5" />
            Give Feedback
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA