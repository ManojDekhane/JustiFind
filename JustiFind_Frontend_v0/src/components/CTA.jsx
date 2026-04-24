import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Sparkles, Shield, Clock, Users } from 'lucide-react'

function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)
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

  const benefits = [
    { icon: Shield, text: 'Free forever' },
    { icon: Clock, text: '24/7 AI support' },
    { icon: Users, text: 'Join 10,000+ users' },
  ]

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/10 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/30 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div 
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Start Your Journey</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-balance">Ready to</span>{' '}
            <span className="gradient-text">Understand Your Rights?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
            Join thousands of people who have found clarity in complex legal matters. 
            Get started for free and discover how JustiFind can help you.
          </p>

          {/* Email signup */}
          <div 
            className={`max-w-md mx-auto mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div 
              className={`relative group transition-all duration-500 ${
                isHovered ? 'scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Glow effect */}
              <div 
                className={`absolute -inset-1 bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-2xl blur-lg transition-opacity duration-500 ${
                  isHovered ? 'opacity-60' : 'opacity-30'
                }`} 
              />
              
              <div className="relative flex items-center glass-strong rounded-2xl overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 h-14 px-5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="flex items-center gap-2 h-12 px-6 mr-1 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300 group/btn">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div 
            className={`flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {benefits.map((benefit, index) => (
              <div key={benefit.text} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Alternative CTA */}
          <p 
            className={`mt-8 text-sm text-muted-foreground transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Or{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              try the AI assistant now
            </a>
            {' '}— no signup required
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTA
