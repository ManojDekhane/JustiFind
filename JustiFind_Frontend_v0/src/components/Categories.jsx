import { useState, useEffect, useRef } from 'react'
import {
  Home, Briefcase, Users, ShoppingBag, Heart, Car,
  Landmark, Shield, FileText, Scale, ArrowRight, Search,
  Leaf
} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { lawData } from "../localData/lawData";

const iconMap = {
  // Core law types
  "criminal-law": Shield,
  "civil-law": Landmark,
  "constitutional-law": Scale,
  "administrative-law": FileText,
  "international-law": Users,

  // Special domains
  "cyber-law": FileText,
  "environmental-law": Leaf,
  "consumer-law": ShoppingBag,

  // Acts
  "factories-act": Briefcase,
  "minimum-wages-act": Briefcase,
  "industrial-disputes-act": Briefcase,

  "environment-protection-act": Leaf,
  "wildlife-protection-act": Leaf,

  "patents-act": FileText,
  "copyright-act": FileText,
  "trademark-act": FileText,

  "information-technology-act": FileText,

  "code-of-criminal-procedure": Shield,
  "code-of-civil-procedure": Landmark,

  "right-to-information-act": FileText,
  "consumer-protection-act": ShoppingBag,
  "prevention-of-corruption-act": Shield,

  // fallback categories
  "labour-law": Briefcase,
  "other": Scale,
};

const colorMap = {
  "criminal-law": "from-red-500 to-rose-500",
  "civil-law": "from-purple-500 to-indigo-500",
  "constitutional-law": "from-indigo-500 to-blue-500",
  "administrative-law": "from-gray-500 to-slate-600",
  "international-law": "from-blue-400 to-cyan-500",

  "cyber-law": "from-cyan-500 to-blue-600",
  "environmental-law": "from-green-500 to-emerald-600",
  "consumer-law": "from-orange-500 to-amber-500",

  "labour-law": "from-pink-500 to-purple-500",

  "factories-act": "from-yellow-500 to-orange-500",
  "minimum-wages-act": "from-yellow-400 to-amber-500",
  "industrial-disputes-act": "from-orange-500 to-red-500",

  "environment-protection-act": "from-green-500 to-lime-500",
  "wildlife-protection-act": "from-green-600 to-emerald-700",

  "patents-act": "from-indigo-500 to-purple-500",
  "copyright-act": "from-violet-500 to-purple-600",
  "trademark-act": "from-purple-500 to-pink-500",

  "information-technology-act": "from-blue-500 to-cyan-500",

  "code-of-criminal-procedure": "from-red-600 to-rose-700",
  "code-of-civil-procedure": "from-indigo-600 to-blue-700",

  "right-to-information-act": "from-teal-500 to-cyan-500",
  "consumer-protection-act": "from-orange-500 to-red-500",
  "prevention-of-corruption-act": "from-red-700 to-rose-800",

  "other": "from-gray-400 to-gray-600",
};

function Categories() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredCategory, setHoveredCategory] = useState(null)
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

  // const categories = [
  //   {
  //     icon: Home,
  //     name: 'Property & Housing',
  //     slug: 'property-housing',
  //     count: 45,
  //     color: 'from-blue-500 to-cyan-500'
  //   },
  //   {
  //     icon: Briefcase,
  //     name: 'Employment',
  //     slug: 'employment',
  //     count: 38,
  //     color: 'from-purple-500 to-pink-500'
  //   },
  //   {
  //     icon: Users,
  //     name: 'Family Law',
  //     slug: 'family-law',
  //     count: 52,
  //     color: 'from-rose-500 to-red-500'
  //   },
  //   {
  //     icon: ShoppingBag,
  //     name: 'Consumer Rights',
  //     slug: 'consumer-rights',
  //     count: 29,
  //     color: 'from-amber-500 to-orange-500'
  //   },
  //   {
  //     icon: Heart,
  //     name: 'Healthcare',
  //     slug: 'healthcare',
  //     count: 31,
  //     color: 'from-emerald-500 to-teal-500'
  //   },
  //   {
  //     icon: Car,
  //     name: 'Traffic & Vehicle',
  //     slug: 'traffic-vehicle',
  //     count: 24,
  //     color: 'from-indigo-500 to-blue-500'
  //   },
  //   {
  //     icon: Landmark,
  //     name: 'Civil Rights',
  //     slug: 'civil-rights',
  //     count: 41,
  //     color: 'from-fuchsia-500 to-purple-500'
  //   },
  //   {
  //     icon: Shield,
  //     name: 'Criminal Law',
  //     slug: 'criminal-law',
  //     count: 36,
  //     color: 'from-red-500 to-rose-500'
  //   },
  //   {
  //     icon: FileText,
  //     name: 'Contracts',
  //     slug: 'contracts',
  //     count: 27,
  //     color: 'from-cyan-500 to-teal-500'
  //   },
  //   {
  //     icon: Scale,
  //     name: 'Business Law',
  //     slug: 'business-law',
  //     count: 33,
  //     color: 'from-violet-500 to-indigo-500'
  //   },
  // ]

  const categoryMap = {};

  lawData.forEach((law) => {
    if (!categoryMap[law.category]) {
      categoryMap[law.category] = {
        name: law.categoryName,
        slug: law.category,
        count: 0,
        icon: iconMap[law.category] || Scale,
        color: colorMap[law.category] || "from-indigo-500 to-blue-500",
      };
    }

    categoryMap[law.category].count++;
  });

  const categories = Object.values(categoryMap);

  const filteredCategories = categories.filter(cat =>
    (cat.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section ref={sectionRef} id="categories" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Browse by Category</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="text-balance">Explore</span>{' '}
            <span className="gradient-text">Legal Topics</span>
          </h2>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto text-pretty mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Find information on a wide range of legal topics. Click on any category
            to explore related laws, rights, and resources.
          </p>

          {/* Category search */}
          <div
            className={`max-w-md mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-full h-12 pl-12 pr-4 glass rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCategories.map((category, index) => (

            <div
              key={category.name}
              // onClick={() =>
              //   navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`)
              // }
              onClick={() => navigate(`/category/${category.slug}`)}
              className={`group relative cursor-pointer transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionDelay: `${400 + index * 50}ms` }}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Card glow */}
              <div
                className={`absolute -inset-px bg-gradient-to-br ${category.color} rounded-2xl blur-sm transition-opacity duration-500 ${hoveredCategory === index ? 'opacity-70' : 'opacity-0'
                  }`}
              />

              <div className="relative glass rounded-2xl p-5 text-center hover:bg-card/90 transition-all duration-500 h-full flex flex-col items-center justify-center">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>

                {/* Name */}
                <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>

                {/* Count */}
                <span className="text-xs text-muted-foreground">
                  {category.count} articles
                </span>

                {/* Hover arrow */}
                <div className={`absolute bottom-3 right-3 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ${hoveredCategory === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        {/* < div
          className={`text-center mt-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        > */}
          {/* <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 group"
          >
            View all categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a> */}
        {/* </div> */}


      </div>
    </section>
  )
}

export default Categories
