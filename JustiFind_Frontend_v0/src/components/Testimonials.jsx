import { useState, useEffect, useRef } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, Verified } from 'lucide-react'

function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
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
    if (isAutoPlaying && isVisible) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, isVisible])

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Small Business Owner',
      avatar: 'PS',
      rating: 5,
      text: 'JustiFind helped me understand my rights as a tenant when my landlord was trying to evict me illegally. The AI gave me clear steps to follow and even connected me with a legal aid organization. I couldn\'t have navigated this without them!',
      location: 'Mumbai',
      verified: true,
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      role: 'IT Professional',
      avatar: 'RM',
      rating: 5,
      text: 'When I faced workplace discrimination, I didn\'t know where to start. JustiFind not only explained my legal options but also helped me document everything properly. Their AI assistant is incredibly knowledgeable and available 24/7.',
      location: 'Bangalore',
      verified: true,
    },
    {
      id: 3,
      name: 'Anita Desai',
      role: 'Teacher',
      avatar: 'AD',
      rating: 5,
      text: 'As a consumer, I was cheated by an online seller. JustiFind guided me through the consumer court process step by step. The platform is so easy to use, and the information is presented in simple language anyone can understand.',
      location: 'Delhi',
      verified: true,
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Retired Government Employee',
      avatar: 'VS',
      rating: 5,
      text: 'I was worried about my pension rights after retirement. JustiFind clarified all my doubts and even helped me file an RTI application. This platform is a blessing for common citizens who can\'t afford expensive lawyers.',
      location: 'Jaipur',
      verified: true,
    },
  ]

  const nextTestimonial = () => {
    setIsAutoPlaying(false)
    setActiveIndex(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setIsAutoPlaying(false)
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Testimonials</span>
          </div>
          
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-balance">Trusted by</span>{' '}
            <span className="gradient-text">Thousands</span>
          </h2>
          
          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto text-pretty transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Hear from real people who found the legal help they needed through JustiFind.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div 
          className={`relative transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Main testimonial */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-accent/50 transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-accent/50 transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Testimonial card */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
                      {/* Quote decoration */}
                      <div className="absolute top-6 right-6 w-20 h-20 text-primary/10">
                        <Quote className="w-full h-full" />
                      </div>
                      
                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                        ))}
                      </div>
                      
                      {/* Text */}
                      <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 relative z-10">
                        "{testimonial.text}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-lg font-bold text-primary-foreground shadow-lg">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                            {testimonial.verified && (
                              <Verified className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-xs text-muted-foreground/70">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActiveIndex(index)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-border/50 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { value: '4.9', label: 'Concept Rating' },
            { value: 'Prototype', label: 'System Stage' },
            { value: 'Academic', label: 'Use Case' },
            { value: '24/7', label: 'Availability' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center px-4">
              <p className="text-2xl md:text-3xl font-display font-bold gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
