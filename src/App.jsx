import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Dumbbell, Users, Calendar, Phone, Mail, MapPin, 
  Globe, Send, ChevronRight, Activity, Heart, 
  Shield, Zap, ArrowUp, MessageCircle, Moon, Sun, CheckCircle,
  PlayCircle, Award, Clock
} from 'lucide-react';

// --- CUSTOM STYLES & ANIMATIONS ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700;800&display=swap');

  :root {
    --neon-green: #a3e635; /* Tailwind lime-400 */
    --neon-green-glow: rgba(163, 230, 53, 0.4);
  }

  body {
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
  }

  .font-heading {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.05em;
  }

  .glass-panel {
    background: rgba(31, 41, 55, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .glass-panel-light {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  /* Scroll Animations */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .text-gradient {
    background: linear-gradient(90deg, #a3e635, #10b981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .bg-gradient-neon {
    background: linear-gradient(135deg, #a3e635 0%, #10b981 100%);
  }

  .hover-glow:hover {
    box-shadow: 0 0 20px var(--neon-green-glow);
  }
`;

// --- DATA CONSTANTS ---
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
  trainers: [
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1470&auto=format&fit=crop"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1631&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1469&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1469&auto=format&fit=crop"
  ]
};

// --- REUSABLE COMPONENTS ---
const SectionHeading = ({ title, subtitle, isDark }) => (
  <div className="text-center mb-16 animate-on-scroll">
    <h2 className={`font-heading text-4xl md:text-5xl lg:text-6xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {title.split(' ').map((word, i, arr) => 
        i === arr.length - 1 ? <span key={i} className="text-gradient">{word}</span> : word + ' '
      )}
    </h2>
    {subtitle && <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', ...props }) => {
  const baseStyle = "px-8 py-3 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-neon text-gray-900 hover-glow hover:scale-105",
    outline: "border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900",
    secondary: "bg-gray-800 text-white hover:bg-gray-700"
  };
  return (
    <button type={type} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll handler for navbar and animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
          el.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]); // Re-run when page changes to animate new elements

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [currentPage]);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Classes', id: 'classes' },
    { name: 'Trainers', id: 'trainers' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  const glassClass = isDark ? 'glass-panel' : 'glass-panel-light';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const bgMain = isDark ? 'bg-gray-900' : 'bg-gray-50';

  // --- VIEWS ---

  const HomeView = () => (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.hero} alt="Gym Workout" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${isDark ? 'bg-gray-900/80' : 'bg-gray-900/60'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center animate-on-scroll">
          <span className="inline-block py-1 px-3 rounded-full bg-lime-400/20 text-lime-400 font-semibold mb-6 border border-lime-400/30">
            Unleash Your Potential
          </span>
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-none">
            Transform Your <br className="hidden md:block"/>
            <span className="text-gradient">Body & Mind</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Strength. Discipline. Results. Join Ayan Fitness and embark on a journey to become your best version. No pain, no gain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigateTo('pricing')}>Join Now <ChevronRight size={20}/></Button>
            <Button variant="outline" onClick={() => navigateTo('contact')}>Free Trial <PlayCircle size={20}/></Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${bgMain}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-20">
            {[
              { icon: <Dumbbell size={32} />, title: 'Personal Training', desc: '1-on-1 coaching tailored to your specific fitness goals.' },
              { icon: <Activity size={32} />, title: 'Cardio Equipment', desc: 'State-of-the-art treadmills, ellipticals, and bikes.' },
              { icon: <Zap size={32} />, title: 'Strength Training', desc: 'Free weights and machines to build pure muscle.' },
              { icon: <Heart size={32} />, title: 'Diet Plans', desc: 'Customized nutrition to fuel your body and recovery.' }
            ].map((feature, i) => (
              <div key={i} className={`${glassClass} p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 animate-on-scroll shadow-xl`}>
                <div className="w-14 h-14 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 mb-6">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textPrimary}`}>{feature.title}</h3>
                <p className={textSecondary}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative animate-on-scroll">
              <img src={IMAGES.about} alt="About Ayan Fitness" className="rounded-2xl shadow-2xl relative z-10" />
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-lime-400 rounded-2xl z-0 hidden md:block"></div>
              <div className="absolute -top-6 -left-6 bg-gradient-neon p-6 rounded-2xl z-20 text-gray-900 shadow-xl hidden md:block">
                <p className="font-heading text-4xl leading-none">10+</p>
                <p className="font-semibold text-sm">Years Experience</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 animate-on-scroll">
              <h2 className={`font-heading text-5xl mb-6 ${textPrimary}`}>More Than Just a <span className="text-lime-400">Gym</span></h2>
              <p className={`${textSecondary} mb-6 text-lg leading-relaxed`}>
                At Ayan Fitness, we believe that fitness is a lifestyle, not a phase. We provide a premium environment equipped with cutting-edge technology, expert trainers, and a supportive community to help you crush your goals.
              </p>
              <ul className={`mb-8 space-y-3 ${textSecondary}`}>
                {['Modern Equipment', 'Certified Trainers', 'Supportive Community', 'Flexible Hours'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-lime-400" /> {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigateTo('about')}>Read Our Story</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-neon opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay z-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center animate-on-scroll">
          <h2 className="font-heading text-5xl md:text-7xl text-gray-900 mb-6">Start Your Fitness Journey Today</h2>
          <p className="text-xl text-gray-800 mb-10 font-medium">First session is on us. Experience the Ayan Fitness difference.</p>
          <Button variant="secondary" onClick={() => navigateTo('contact')} className="mx-auto bg-gray-900 text-white hover:bg-gray-800 border-none">
            Claim Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  );

  const AboutView = () => (
    <div className={`pt-32 pb-20 ${bgMain} min-h-screen`}>
      <div className="container mx-auto px-6">
        <SectionHeading title="Our Story" subtitle="Building champions since 2015" isDark={isDark} />
        
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          <div className="w-full lg:w-1/2 animate-on-scroll">
            <h3 className={`text-3xl font-bold mb-6 ${textPrimary}`}>The Ayan Fitness Mission</h3>
            <p className={`${textSecondary} mb-4 text-lg leading-relaxed`}>
              Founded on the principles of hard work and dedication, Ayan Fitness was created to provide a sanctuary for those who demand more from themselves. We aren't just a facility with weights; we are a community of individuals striving for excellence.
            </p>
            <p className={`${textSecondary} mb-8 text-lg leading-relaxed`}>
              Our vision is to empower people through physical fitness, instilling discipline that translates to all areas of life. We provide the tools, the knowledge, and the atmosphere. You bring the effort.
            </p>
            <div className={`p-6 border-l-4 border-lime-400 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-r-lg`}>
              <p className={`italic ${textPrimary}`}>"We don't just build bodies; we build character, resilience, and unshakeable confidence."</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 animate-on-scroll">
            <img src={IMAGES.gallery[0]} alt="Gym Interior" className="rounded-2xl shadow-2xl w-full h-[400px] object-cover" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 animate-on-scroll">
          {[
            { number: "500+", label: "Active Members" },
            { number: "15+", label: "Expert Trainers" },
            { number: "50+", label: "Weekly Classes" },
            { number: "10k+", label: "Pounds Lost" }
          ].map((stat, i) => (
            <div key={i} className={`${glassClass} p-8 rounded-2xl text-center border-t-4 border-t-lime-400`}>
              <h4 className="font-heading text-5xl text-lime-400 mb-2">{stat.number}</h4>
              <p className={`font-semibold ${textPrimary}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center animate-on-scroll">
          <h3 className={`font-heading text-4xl mb-12 ${textPrimary}`}>Why Choose Us</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Premium Facilities", desc: "Top-tier equipment from industry-leading brands, meticulously maintained." },
              { title: "Expert Coaching", desc: "Our trainers are certified professionals dedicated to your success and safety." },
              { title: "Vibrant Community", desc: "Surround yourself with motivated individuals who will push you to be your best." }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white shadow-lg'}`}>
                <Shield className="text-lime-400 w-12 h-12 mb-6" />
                <h4 className={`text-xl font-bold mb-3 ${textPrimary}`}>{item.title}</h4>
                <p className={textSecondary}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesView = () => (
    <div className={`pt-32 pb-20 ${bgMain} min-h-screen`}>
      <div className="container mx-auto px-6">
        <SectionHeading title="Our Services" subtitle="Comprehensive solutions for every fitness goal" isDark={isDark} />
        
        <div className="space-y-16">
          {[
            { 
              title: "Personal Training", 
              icon: <Users size={40} />, 
              desc: "Get personalized attention with tailored workout plans designed specifically for your body type, fitness level, and goals. Our trainers ensure proper form, motivate you through tough reps, and track your progress.",
              benefits: ["Customized workout plans", "Nutritional guidance", "Accountability & motivation", "Injury prevention"],
              img: IMAGES.trainers[0],
              reverse: false
            },
            { 
              title: "Strength & Conditioning", 
              icon: <Dumbbell size={40} />, 
              desc: "Build raw power, increase muscle mass, and improve functional strength. Access our extensive free weight area, Olympic lifting platforms, and specialized machines.",
              benefits: ["Increased muscle mass", "Better bone density", "Enhanced athletic performance", "Metabolism boost"],
              img: IMAGES.gallery[1],
              reverse: true
            },
            { 
              title: "Group Fitness Classes", 
              icon: <Activity size={40} />, 
              desc: "Experience the energy of a group setting. From high-intensity HIIT and CrossFit to calming Yoga and energetic Zumba, our classes are designed to keep you engaged and sweating.",
              benefits: ["Community support", "Structured workouts", "Variety of disciplines", "Fun and energetic atmosphere"],
              img: IMAGES.gallery[2],
              reverse: false
            }
          ].map((service, i) => (
            <div key={i} className={`flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 animate-on-scroll`}>
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-lime-400/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img src={service.img} alt={service.title} className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="text-lime-400 mb-4">{service.icon}</div>
                <h3 className={`font-heading text-4xl mb-4 ${textPrimary}`}>{service.title}</h3>
                <p className={`${textSecondary} text-lg mb-6`}>{service.desc}</p>
                <h4 className={`font-semibold mb-3 ${textPrimary}`}>Key Benefits:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.benefits.map((benefit, j) => (
                    <li key={j} className={`flex items-center gap-2 ${textSecondary}`}>
                      <CheckCircle size={18} className="text-lime-400 flex-shrink-0" /> {benefit}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => navigateTo('pricing')}>View Pricing</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ClassesView = () => {
    const schedule = [
      { time: "06:00 AM", mon: "HIIT", tue: "Yoga", wed: "CrossFit", thu: "Spinning", fri: "HIIT", sat: "Yoga", sun: "-" },
      { time: "08:00 AM", mon: "CrossFit", tue: "Zumba", wed: "Strength", thu: "Yoga", fri: "CrossFit", sat: "Zumba", sun: "Open Gym" },
      { time: "12:00 PM", mon: "Yoga", tue: "Strength", wed: "HIIT", thu: "CrossFit", fri: "Yoga", sat: "-", sun: "Open Gym" },
      { time: "05:00 PM", mon: "Spinning", tue: "CrossFit", wed: "Zumba", thu: "Strength", fri: "Spinning", sat: "HIIT", sun: "-" },
      { time: "07:00 PM", mon: "Strength", tue: "HIIT", wed: "Yoga", thu: "Zumba", fri: "Strength", sat: "-", sun: "-" },
    ];

    const getClassColor = (className) => {
      switch(className) {
        case "HIIT": return "bg-red-500/20 text-red-500 border-red-500/30";
        case "Yoga": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
        case "CrossFit": return "bg-lime-500/20 text-lime-500 border-lime-500/30";
        case "Zumba": return "bg-purple-500/20 text-purple-500 border-purple-500/30";
        case "Strength": return "bg-orange-500/20 text-orange-500 border-orange-500/30";
        case "Spinning": return "bg-cyan-500/20 text-cyan-500 border-cyan-500/30";
        default: return isDark ? "bg-gray-800 text-gray-400 border-gray-700" : "bg-gray-100 text-gray-500 border-gray-200";
      }
    };

    return (
      <div className={`pt-32 pb-20 ${bgMain} min-h-screen`}>
        <div className="container mx-auto px-6">
          <SectionHeading title="Class Schedule" subtitle="Find the perfect time to crush your goals" isDark={isDark} />
          
          <div className="mb-12 flex flex-wrap justify-center gap-4 animate-on-scroll">
            {['HIIT', 'Yoga', 'CrossFit', 'Zumba', 'Strength', 'Spinning'].map((cls) => (
              <span key={cls} className={`px-4 py-2 rounded-full text-sm font-semibold border ${getClassColor(cls)}`}>
                {cls}
              </span>
            ))}
          </div>

          <div className={`${glassClass} rounded-2xl overflow-hidden shadow-2xl animate-on-scroll`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={isDark ? 'bg-gray-800/80' : 'bg-gray-100'}>
                    <th className={`p-4 font-heading text-xl ${textPrimary} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}><Clock className="inline mr-2"/> Time</th>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <th key={day} className={`p-4 font-heading text-xl ${textPrimary} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, i) => (
                    <tr key={i} className={`hover:${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
                      <td className={`p-4 font-semibold ${textPrimary}`}>{row.time}</td>
                      {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun].map((cls, j) => (
                        <td key={j} className="p-4">
                          {cls !== "-" ? (
                            <div className={`p-2 rounded text-center text-sm font-medium border ${getClassColor(cls)} cursor-pointer hover:scale-105 transition-transform`}>
                              {cls}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500">-</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => navigateTo('contact')}>Book a Class</Button>
          </div>
        </div>
      </div>
    );
  };

  const TrainersView = () => {
    const trainers = [
      { name: "Marcus Johnson", specialty: "Head Strength Coach", exp: "12 Years", img: IMAGES.trainers[0], desc: "Former competitive bodybuilder specializing in hypertrophy and powerlifting." },
      { name: "Sarah Williams", specialty: "Yoga & Mobility", exp: "8 Years", img: IMAGES.trainers[1], desc: "Certified Yoga instructor helping athletes improve flexibility and prevent injuries." },
      { name: "David Chen", specialty: "CrossFit & HIIT", exp: "6 Years", img: IMAGES.trainers[2], desc: "High-energy coach focused on cardiovascular endurance and functional fitness." },
      { name: "Elena Rodriguez", specialty: "Nutrition & Fat Loss", exp: "10 Years", img: IMAGES.gallery[3], desc: "Registered dietitian and fitness expert helping you fuel your body right." }
    ];

    return (
      <div className={`pt-32 pb-20 ${bgMain} min-h-screen`}>
        <div className="container mx-auto px-6">
          <SectionHeading title="Meet Our Experts" subtitle="Learn from the best to become your best" isDark={isDark} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer, i) => (
              <div key={i} className={`${glassClass} rounded-2xl overflow-hidden group animate-on-scroll hover:-translate-y-2 transition-all duration-300`}>
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                  <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1">{trainer.name}</h3>
                    <p className="text-lime-400 font-medium">{trainer.specialty}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-sm font-semibold ${isDark ? 'bg-gray-800' : 'bg-gray-200'} px-3 py-1 rounded-full ${textPrimary}`}>Exp: {trainer.exp}</span>
                    <div className="flex gap-2 text-gray-400">
                      
                    </div>
                  </div>
                  <p className={`${textSecondary} text-sm mb-6`}>{trainer.desc}</p>
                  <Button variant="outline" className="w-full py-2 text-sm" onClick={() => navigateTo('contact')}>Book Session</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const PricingView = () => {
    const plans = [
      {
        name: "Basic Plan",
        price: "$49",
        period: "/month",
        features: ["Full Gym Access", "Locker Room Access", "2 Classes per month", "Free WiFi"],
        disabled: ["Personal Training", "Diet Plan", "Guest Passes"],
        recommended: false
      },
      {
        name: "Standard Plan",
        price: "$89",
        period: "/month",
        features: ["Full Gym Access", "Unlimited Classes", "Monthly Body Assessment", "Basic Diet Plan", "Locker Room Access"],
        disabled: ["1-on-1 Personal Training", "Unlimited Guest Passes"],
        recommended: true
      },
      {
        name: "Premium Plan",
        price: "$149",
        period: "/month",
        features: ["Full Gym Access", "Unlimited Classes", "Weekly PT Session", "Custom Diet Plan", "Unlimited Guest Passes", "Spa & Sauna Access"],
        disabled: [],
        recommended: false
      }
    ];

    return (
      <div className={`pt-32 pb-20 ${bgMain} min-h-screen`}>
        <div className="container mx-auto px-6">
          <SectionHeading title="Membership Plans" subtitle="Invest in your health today" isDark={isDark} />
          
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 mt-12">
            {plans.map((plan, i) => (
              <div key={i} className={`w-full max-w-md ${plan.recommended ? 'lg:-mt-8 lg:mb-8 scale-105 z-10' : ''} animate-on-scroll`}>
                <div className={`${glassClass} rounded-3xl p-8 h-full flex flex-col relative ${plan.recommended ? 'border-2 border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.2)]' : ''}`}>
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-neon text-gray-900 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>{plan.name}</h3>
                    <div className="flex items-center justify-center">
                      <span className={`text-5xl font-heading ${textPrimary}`}>{plan.price}</span>
                      <span className={`${textSecondary} ml-2`}>{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, j) => (
                         <li key={`f-${j}`} className={`flex items-center gap-3 ${textPrimary}`}>
                           <CheckCircle size={20} className="text-lime-400" /> {feature}
                         </li>
                      ))}
                      {plan.disabled.map((feature, j) => (
                         <li key={`d-${j}`} className={`flex items-center gap-3 ${textSecondary} opacity-50`}>
                           <X size={20} className="text-red-400" /> {feature}
                         </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant={plan.recommended ? 'primary' : 'outline'} 
                    className="w-full"
                    onClick={() => navigateTo('login')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const GalleryView = () => (
    <div className={`pt-32 pb-20 ${bgMain} min-h-screen`}>
      <div className="container mx-auto px-6">
        <SectionHeading title="Gym Gallery" subtitle="Take a look inside our state-of-the-art facility" isDark={isDark} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
          {IMAGES.gallery.map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden group h-72 cursor-pointer">
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-lime-400/0 group-hover:bg-lime-400/20 mix-blend-overlay transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900/40 backdrop-blur-sm">
                <span className="text-white font-semibold border-2 border-white px-6 py-2 rounded-full">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactView = () => (
    <div className={`pt-32 pb-20 ${bgMain} min-h-screen`}>
      <div className="container mx-auto px-6">
        <SectionHeading title="Contact Us" subtitle="We're here to answer any questions" isDark={isDark} />
        
        <div className="flex flex-col lg:flex-row gap-12 animate-on-scroll">
          <div className="w-full lg:w-1/3">
            <div className={`${glassClass} p-8 rounded-2xl h-full`}>
              <h3 className={`text-2xl font-bold mb-8 ${textPrimary}`}>Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${textPrimary}`}>Location</h4>
                    <p className={textSecondary}>123 Fitness Boulevard, Muscle City, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${textPrimary}`}>Phone</h4>
                    <p className={textSecondary}>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${textPrimary}`}>Email</h4>
                    <p className={textSecondary}>info@ayanfitness.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className={`font-semibold mb-4 ${textPrimary}`}>Follow Us</h4>
                <div className="flex gap-4">
                  {[Globe, MessageCircle, Send].map((Icon, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center text-lime-400 hover:bg-lime-400 hover:text-gray-900 cursor-pointer transition-colors`}>
                      <Icon size={20} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className={`${glassClass} p-8 rounded-2xl`}>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>First Name</label>
                    <input type="text" required className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-lime-400 transition-colors`} placeholder="John" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Last Name</label>
                    <input type="text" required className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-lime-400 transition-colors`} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Email Address</label>
                  <input type="email" required className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-lime-400 transition-colors`} placeholder="john@example.com" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Message</label>
                  <textarea rows="5" required className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-lime-400 transition-colors`} placeholder="How can we help you?"></textarea>
                </div>
                <Button type="submit" className="w-full py-4">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginSignupView = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
      <div className={`pt-32 pb-20 ${bgMain} min-h-screen flex items-center justify-center`}>
        <div className="container mx-auto px-6 max-w-md animate-on-scroll">
          <div className={`${glassClass} p-8 rounded-3xl`}>
            <div className="text-center mb-8">
              <h2 className={`font-heading text-4xl mb-2 ${textPrimary}`}>{isLogin ? 'Welcome Back' : 'Join the Family'}</h2>
              <p className={textSecondary}>{isLogin ? 'Sign in to access your account' : 'Create an account to start your journey'}</p>
            </div>

            <div className="flex bg-gray-800 rounded-full p-1 mb-8">
              <button
                type="button"
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${isLogin ? 'bg-lime-400 text-gray-900' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${!isLogin ? 'bg-lime-400 text-gray-900' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigateTo('home'); }}>
              {!isLogin && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Full Name</label>
                  <input type="text" required className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-lime-400`} placeholder="John Doe" />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Email Address</label>
                <input type="email" required className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-lime-400`} placeholder="you@example.com" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Password</label>
                <input type="password" required className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-lime-400`} placeholder="••••••••" />
              </div>
              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-lime-400 text-sm hover:underline">Forgot Password?</button>
                </div>
              )}
              <Button type="submit" className="w-full py-4 mt-4">
                {isLogin ? 'Login' : 'Create Account'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // --- LAYOUT COMPONENTS ---

  const Navbar = () => (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? (isDark ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-white/95 backdrop-blur-md shadow-lg py-4') : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigateTo('home')}
        >
          <div className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <Dumbbell className="text-gray-900" size={24} />
          </div>
          <span className={`font-heading text-3xl tracking-wider ${isScrolled ? textPrimary : 'text-white'}`}>
            AYAN<span className="text-lime-400">FIT</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`font-medium text-sm uppercase tracking-wide transition-colors hover:text-lime-400 ${currentPage === link.id ? 'text-lime-400' : (isScrolled ? textPrimary : 'text-gray-300')}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${isScrolled ? (isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600') : 'hover:bg-white/20 text-white'} transition-colors`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Button onClick={() => navigateTo('login')} variant="outline" className={!isScrolled && !isDark ? 'border-white text-white hover:bg-white hover:text-gray-900' : ''}>Login</Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full ${isScrolled ? textPrimary : 'text-white'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={isScrolled ? textPrimary : 'text-white'}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 w-full ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'} shadow-2xl py-4 flex flex-col`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`py-3 px-6 text-left font-medium uppercase tracking-wide ${currentPage === link.id ? 'text-lime-400 bg-lime-400/10' : textPrimary} hover:bg-gray-800/50`}
            >
              {link.name}
            </button>
          ))}
          <div className="px-6 pt-4 mt-2 border-t border-gray-800">
            <Button onClick={() => navigateTo('login')} className="w-full">Login / Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-gray-950 text-gray-400 pt-20 pb-10 border-t border-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-lime-400 rounded flex items-center justify-center">
                <Dumbbell className="text-gray-900" size={20} />
              </div>
              <span className="font-heading text-2xl tracking-wider text-white">AYAN<span className="text-lime-400">FIT</span></span>
            </div>
            <p className="mb-6">Empowering individuals to achieve their peak physical condition through expert guidance and premium facilities.</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-lime-400 hover:text-gray-900 cursor-pointer transition-colors"><Globe size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-lime-400 hover:text-gray-900 cursor-pointer transition-colors"><MessageCircle size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-lime-400 hover:text-gray-900 cursor-pointer transition-colors"><Send size={18} /></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', page: 'home' },
                { label: 'About Us', page: 'about' },
                { label: 'Classes', page: 'classes' },
                { label: 'Pricing', page: 'pricing' },
                { label: 'Contact', page: 'contact' },
              ].map((link) => (
                <li key={link.page}>
                  <button onClick={() => navigateTo(link.page)} className="hover:text-lime-400 transition-colors flex items-center gap-2">
                    <ChevronRight size={14} /> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase">Working Hours</h4>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-gray-800 pb-2"><span>Mon - Fri:</span> <span className="text-white">5:00 AM - 11:00 PM</span></li>
              <li className="flex justify-between border-b border-gray-800 pb-2"><span>Saturday:</span> <span className="text-white">6:00 AM - 10:00 PM</span></li>
              <li className="flex justify-between border-b border-gray-800 pb-2"><span>Sunday:</span> <span className="text-white">8:00 AM - 8:00 PM</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase">Newsletter</h4>
            <p className="mb-4">Subscribe to get tips, offers, and gym news.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" className="bg-gray-900 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-lime-400" />
              <button type="submit" className="bg-lime-400 text-gray-900 px-4 py-2 rounded-r-lg font-bold hover:bg-lime-500 transition-colors">
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-900 text-sm">
          <p>&copy; {new Date().getFullYear()} Ayan Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const FloatingButtons = () => (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <button 
        onClick={() => window.open('https://wa.me/1234567890', '_blank')}
        className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover-glow"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
      {isScrolled && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-gray-800 text-lime-400 rounded-full flex items-center justify-center shadow-lg border border-gray-700 hover:bg-gray-700 hover:scale-110 transition-all animate-fade-in"
          title="Back to Top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );

  // --- RENDER ---
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomeView />;
      case 'about': return <AboutView />;
      case 'services': return <ServicesView />;
      case 'classes': return <ClassesView />;
      case 'trainers': return <TrainersView />;
      case 'pricing': return <PricingView />;
      case 'gallery': return <GalleryView />;
      case 'contact': return <ContactView />;
      case 'login': return <LoginSignupView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className={`min-h-screen ${bgMain} ${textPrimary} font-sans selection:bg-lime-400 selection:text-gray-900 transition-colors duration-300`}>
      <style>{customStyles}</style>
      <Navbar />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
