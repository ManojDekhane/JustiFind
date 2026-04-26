import { useState, useEffect, useRef } from 'react'
import { Users, MessageSquare, BookOpen, Clock, TrendingUp } from 'lucide-react'
import { lawData } from "../localData/lawData";

function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ users: 0, queries: 0, articles: 0, hours: 0 })
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
          animateCounters()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const targets = { users: 30, queries: 120, articles: lawData.length, hours: 24 }
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCounts({
        users: Math.floor(targets.users * easeOut),
        queries: Math.floor(targets.queries * easeOut),
        articles: Math.floor(targets.articles * easeOut),
        hours: Math.floor(targets.hours * easeOut),
      })

      if (step >= steps) {
        clearInterval(interval)
        setCounts(targets)
      }
    }, stepDuration)
  }

  const stats = [
    { 
      icon: Users, 
      value: counts.users.toLocaleString() + '+', 
      label: 'Active Users',
      description: 'People trusting JustiFind',
      color: 'from-blue-500 to-cyan-500',
      growth: 'Active'
    },
    { 
      icon: MessageSquare, 
      value: counts.queries.toLocaleString() + '+', 
      label: 'Queries Answered',
      description: 'Legal questions resolved',
      color: 'from-purple-500 to-pink-500',
      growth: 'Live'
    },
    { 
      icon: BookOpen, 
      value: counts.articles.toLocaleString() + '+', 
      label: 'Legal Articles',
      description: 'Comprehensive guides',
      color: 'from-emerald-500 to-teal-500',
      growth: 'Updated'
    },
    { 
      icon: Clock, 
      value: counts.hours + '/7', 
      label: 'Availability',
      description: 'Always here for you',
      color: 'from-amber-500 to-orange-500',
      growth: '24/7'
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div 
                className={`absolute -inset-px bg-gradient-to-br ${stat.color} rounded-2xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
              />
              
              <div className="relative glass rounded-2xl p-6 hover:bg-card/90 transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Growth badge */}
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 rounded-full">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">{stat.growth}</span>
                  </div>
                </div>
                
                {/* Value */}
                <p className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1 tracking-tight">
                  {stat.value}
                </p>
                
                {/* Label */}
                <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground">{stat.description}</p>

                {/* Bottom decoration */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
