import { useState, useEffect, useRef } from 'react'
import { Bot, BookOpen, Newspaper, HelpCircle, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)
  const navigate = useNavigate();

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

  const features = [
    {
      icon: Bot,
      title: 'AI Legal Assistant',
      description: 'Chat with our AI Legal Assistant to get instant answers to legal questions, understand laws, and get guided help 24/7.',
      color: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/25',
      stats: 'Live AI Chatbot',
      link: '/assistant', 
    },
    {
      icon: BookOpen,
      title: 'Know Your Rights',
      description: 'Access comprehensive guides about your legal rights in various situations. Easy-to-understand content for everyone.',
      color: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/25',
      stats: '200+ guides available',
      link: '/rights',
    },
    {
      icon: Newspaper,
      title: 'Legal News & Updates',
      description: 'Stay informed with the latest legal news, law changes, and important updates that might affect your rights.',
      color: 'from-purple-500 to-pink-500',
      shadow: 'shadow-purple-500/25',
      stats: 'Daily updates',
      link: '/news',
    },
    {
      icon: HelpCircle,
      title: 'Myths vs Facts',
      description: 'Debunk common legal misconceptions with our fact-checking section. Know the truth about your legal rights.',
      color: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/25',
      stats: '100+ myths busted',
      link: '/myths',
    },
  ]

  const highlights = [
    { icon: Zap, label: 'Instant Responses', description: 'Get answers in seconds' },
    { icon: Shield, label: 'Verified Information', description: 'Fact-checked by experts' },
    { icon: Clock, label: '24/7 Available', description: 'Anytime, anywhere' },
  ]

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Powerful Features</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="text-balance">Everything You Need for</span>
            <br />
            <span className="gradient-text">Legal Clarity</span>
          </h2>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto text-pretty transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Our comprehensive platform provides all the tools and resources you need
            to understand and navigate legal matters with confidence.
          </p>
        </div>

        {/* Highlights bar */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          {highlights.map((highlight, index) => (
            <div key={highlight.label} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <highlight.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{highlight.label}</p>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              onClick={() => {
                // feature.link !== "#" && navigate(feature.link)
                if (feature.link !== "#") {
                  navigate(feature.link);
                }
              }}
              className={`group relative cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card glow effect */}
              <div
                className={`absolute -inset-px bg-gradient-to-br ${feature.color} rounded-2xl blur-sm transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
              />

              {/* Card content */}
              <div className="relative h-full glass rounded-2xl p-6 hover:bg-card/90 transition-all duration-500 overflow-hidden">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} ${feature.shadow} shadow-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Stats badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/50 rounded-full text-xs font-medium text-muted-foreground mb-4">
                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`} />
                  {feature.stats}
                </div>

                {/* Link */}
                <div
                  className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>

                {/* Corner decoration */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
