import { useState, useEffect, useRef } from 'react'
import { Search, Brain, FileCheck, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react'

function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % 3)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Ask Your Question',
      description: 'Type or speak your legal question in plain language. No legal jargon needed.',
      features: ['Natural language processing', 'Voice input supported', 'Any legal topic'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your question and searches through vast legal databases.',
      features: ['Real-time processing', 'Multiple source analysis', 'Context understanding'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '03',
      icon: FileCheck,
      title: 'Get Clear Answers',
      description: 'Receive easy-to-understand answers with relevant resources and next steps.',
      features: ['Plain language explanations', 'Relevant law citations', 'Actionable guidance'],
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Simple Process</span>
          </div>
          
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-balance">How</span>{' '}
            <span className="gradient-text">JustiFind</span>{' '}
            <span className="text-balance">Works</span>
          </h2>
          
          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto text-pretty transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Getting legal help has never been easier. Just three simple steps 
            to understand your rights and find the answers you need.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="hidden lg:block absolute top-24 left-1/6 right-1/6 h-0.5">
            <div 
              className="h-full bg-gradient-to-r from-primary to-cyan-500 transition-all duration-1000"
              style={{ width: `${(activeStep + 1) * 50}%` }}
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
              onClick={() => setActiveStep(index)}
            >
              {/* Step card */}
              <div 
                className={`relative p-8 rounded-3xl transition-all duration-500 cursor-pointer ${
                  activeStep === index 
                    ? 'glass-strong shadow-2xl shadow-primary/10 scale-[1.02]' 
                    : 'glass hover:bg-card/60'
                }`}
              >
                {/* Step number */}
                <div className={`absolute -top-4 left-8 px-4 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-bold shadow-lg transition-transform duration-500 ${
                  activeStep === index ? 'scale-110' : ''
                }`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg transition-all duration-500 ${
                  activeStep === index ? 'scale-110 rotate-3' : ''
                }`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2">
                  {step.features.map((feature, i) => (
                    <li 
                      key={i}
                      className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                        activeStep === index 
                          ? 'text-foreground translate-x-0' 
                          : 'text-muted-foreground'
                      }`}
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${activeStep === index ? 'text-primary' : 'text-muted-foreground/50'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Active indicator */}
                <div 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r ${step.color} transition-all duration-500 ${
                    activeStep === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Mobile connector */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-border to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a 
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 group"
          >
            Try It Now — It's Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
