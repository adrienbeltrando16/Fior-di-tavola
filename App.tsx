import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Twitter as Pinterest, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  Sparkles,
  Leaf,
  Utensils,
  Moon,
  Users,
  Eye,
  Info,
  ArrowRight
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'menu' | 'reservations' | 'contact';

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' as Page },
    { name: 'Menu', id: 'menu' as Page },
    { name: 'Boutique', id: 'home' as Page }, // Mocked for now
    { name: 'Contact', id: 'contact' as Page },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-widest uppercase">Fior di Tavola</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setCurrentPage(link.id)}
              className={`text-xs uppercase tracking-[0.2em] transition-colors hover:text-brand-gold ${currentPage === link.id ? 'text-brand-gold font-semibold' : 'text-brand-dark/70'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('reservations')}
            className="bg-brand-gold text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-brand-gold/90 transition-all"
          >
            Reserve
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setCurrentPage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm uppercase tracking-widest text-left"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('reservations');
                setIsMobileMenuOpen(false);
              }}
              className="bg-brand-gold text-white px-6 py-3 text-sm uppercase tracking-widest w-full"
            >
              Reserve Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="text-brand-gold w-6 h-6" />
            <span className="font-serif text-2xl font-bold tracking-widest uppercase">Fior di Tavola</span>
          </div>
          <p className="text-white/60 font-serif italic text-lg leading-relaxed">
            "Nature's bounty served with Florentine elegance."
          </p>
          <div className="flex gap-4 mt-8">
            <Instagram className="w-5 h-5 text-white/50 hover:text-brand-gold cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 text-white/50 hover:text-brand-gold cursor-pointer transition-colors" />
            <Pinterest className="w-5 h-5 text-white/50 hover:text-brand-gold cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] mb-8">Explore</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/70">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Our Story</button></li>
            <li><button className="hover:text-white transition-colors">Seasonal Menu</button></li>
            <li><button className="hover:text-white transition-colors">The Garden</button></li>
            <li><button className="hover:text-white transition-colors">Gift Cards</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] mb-8">Contact</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Via delle Rose, 42, Florence</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <span>+39 055 123 4567</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 text-brand-gold shrink-0" />
              <span>ciao@fiorditavola.it</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-gold text-xs uppercase tracking-[0.2em] mb-8">Newsletter</h4>
          <p className="text-sm text-white/60 mb-6">Be the first to hear about seasonal menus and floral workshops.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm w-full focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="bg-brand-gold px-4 py-3 hover:bg-brand-gold/90 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/40">
        <p>© 2024 FIOR DI TAVOLA FLORENCE. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <button className="hover:text-white transition-colors">Privacy Policy</button>
          <button className="hover:text-white transition-colors">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = ({ onReserve }: { onReserve: () => void }) => {
  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Botanical Restaurant" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-serif mb-8 leading-tight">
              Fior di Tavola
            </h1>
            <p className="text-lg md:text-2xl font-serif italic mb-12 max-w-2xl mx-auto opacity-90">
              A hidden botanical dining journey in San Niccolò, Florence.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                onClick={onReserve}
                className="bg-brand-gold text-white px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all duration-500"
              >
                Reserve a Table
              </button>
              <button className="border border-white/30 backdrop-blur-sm text-white px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all duration-500">
                Explore the Experience
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      {/* The Hidden Secret */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-6 block">The Hidden Secret</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Where Gastronomy Meets Botany</h2>
          <p className="text-brand-dark/70 leading-relaxed text-lg italic font-serif">
            Step into a world where your dinner begins with the scent of fresh blooms. Enter through our boutique flower shop, following a fragrant floral path that weaves through the historic stone walls of San Niccolò. Your journey culminates in a secret courtyard garden—a sanctuary where the plates are as vibrant as the petals surrounding you.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              id: '1',
              title: "Enter through the boutique",
              desc: "Begin your evening surrounded by artisanal arrangements and the intoxicating aroma of seasonal flowers.",
              img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800"
            },
            {
              id: '2',
              title: "Follow the floral path",
              desc: "A curated sensory transition that prepares your palate and spirit for the culinary wonders ahead.",
              img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800"
            },
            {
              id: '3',
              title: "Dine in the courtyard",
              desc: "The destination: an intimate oasis under the Tuscan stars, where nature and fine dining are one.",
              img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
            }
          ].map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-8 aspect-[3/4]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-serif mb-4">{item.id}. {item.title}</h3>
              <p className="text-brand-dark/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* A Symphony for the Senses */}
      <section className="py-32 px-6 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-full border-[20px] border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
                alt="Edible Art" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold rounded-full flex items-center justify-center p-10 text-center text-white hidden md:flex">
              <p className="font-serif italic text-xl">"Every dish is a tribute to the earth."</p>
            </div>
          </div>
          
          <div>
            <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-6 block">The Experience</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-12">A Symphony for the Senses</h2>
            
            <div className="space-y-10">
              {[
                { icon: <Sparkles className="w-5 h-5" />, title: "Edible Botanical Art", desc: "Every dish features hand-picked edible flowers and herbs from our own garden." },
                { icon: <Leaf className="w-5 h-5" />, title: "Circular & Low-Waste", desc: "Our menus are strictly seasonal, prioritizing zero-waste techniques and local foraging." },
                { icon: <Utensils className="w-5 h-5" />, title: "Multisensory Design", desc: "From the acoustic ambiance to the tactile linen, every detail is meaningfully curated." },
                { icon: <Users className="w-5 h-5" />, title: "Meaningful Moments", desc: "An inherently photogenic space designed for conversation and connection." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-gold shrink-0 shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif mb-2">{feature.title}</h4>
                    <p className="text-brand-dark/60 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Take the Journey Home */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-16">
          <div>
            <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 block">Our Boutique</span>
            <h2 className="text-4xl md:text-5xl font-serif">Take the Journey Home</h2>
          </div>
          <button className="text-xs uppercase tracking-widest border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-all">
            Shop All
          </button>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Signature Bouquets", price: "From €45", img: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=800" },
            { title: "Botanical Tea Blends", price: "From €18", img: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800" },
            { title: "Botanical Skincare", price: "From €32", img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800" }
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="aspect-square bg-brand-cream overflow-hidden mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-lg font-serif mb-1">{item.title}</h4>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Invitation */}
      <section className="py-32 px-6 bg-brand-dark text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif mb-16">An Invitation for the Curious</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            {[
              { icon: <Utensils className="w-6 h-6" />, label: "Food Lovers" },
              { icon: <Users className="w-6 h-6" />, label: "Intimate Couples" },
              { icon: <MapPin className="w-6 h-6" />, label: "Florence Locals" },
              { icon: <Leaf className="w-6 h-6" />, label: "Eco-Conscious" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="text-brand-gold">{item.icon}</div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">{item.label}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-20">
            <h3 className="text-2xl font-serif italic mb-4">Accessible Emotional Luxury</h3>
            <p className="text-white/40 text-sm mb-12">Dinner Tasting Menu: €30 - €60. Simple, instant online reservations.</p>
            <button 
              onClick={onReserve}
              className="bg-brand-gold text-white px-12 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all"
            >
              Book Your Experience
            </button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 px-6 bg-brand-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="bg-white p-4 shadow-xl">
            <div className="aspect-video bg-gray-200 overflow-hidden relative">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Via%20di%20San%20Niccol%C3%B2,%2012R,%2050125%20Firenze%20FI&t=&z=15&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
          
          <div>
            <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-6 block">Our Neighborhood</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Found in San Niccolò</h2>
            <p className="text-brand-dark/70 leading-relaxed mb-10">
              Nestled at the base of the hills, San Niccolò is the soul of Florence. Far from the tourist crowds, our restaurant occupies a 16th-century space where art, flowers, and community converge.
            </p>
            <div className="flex items-start gap-4 text-brand-gold">
              <MapPin className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest leading-relaxed">Via di San Niccolò, 12R, 50125 Firenze FI</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ReservationsPage = ({ onViewMenu }: { onViewMenu: () => void }) => {
  const [selectedSeating, setSelectedSeating] = useState('Nook');

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-6 block">Experience the Bloom</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Reserve your botanical table</h1>
          <p className="text-brand-dark/70 text-lg italic font-serif mb-12">
            Choose your moment. The garden sets the tone for an unforgettable culinary journey.
          </p>
          <button className="bg-brand-gold text-white px-10 py-4 text-xs uppercase tracking-widest hover:bg-brand-dark transition-all">
            Book now
          </button>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1550966842-2849a2830a28?auto=format&fit=crop&q=80&w=1000" 
            alt="Botanical Table" 
            className="w-full h-full object-cover rounded-xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-xl hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center text-brand-gold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-dark/50">Next Available</p>
                <p className="font-serif text-lg">Tonight, 19:30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Features */}
      <section className="bg-brand-cream py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-serif mb-4">The Botanical Experience</h2>
          <p className="text-brand-dark/60">Immerse yourself in a dining experience that transcends the ordinary.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Sparkles />, title: "Multisensory", desc: "Engage all your senses with our curated acoustic and aromatic environment." },
            { icon: <Leaf />, title: "Garden-to-Table", desc: "Freshly harvested ingredients from our own greenhouse, minutes before serving." },
            { icon: <Info />, title: "Floral Gastronomy", desc: "Exquisite dishes infused with edible floral notes and botanical extracts." },
            { icon: <Moon />, title: "Calm Atmosphere", desc: "A serene escape from the bustling city outside, designed for connection." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-brand-gold mb-6">{item.icon}</div>
              <h4 className="text-xl font-serif mb-4">{item.title}</h4>
              <p className="text-sm text-brand-dark/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seating Choice */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-4xl font-serif mb-4">Choose Your Seating</h2>
          <p className="text-brand-dark/60">Select the perfect environment for your party</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Nook Tables", desc: "Intimate dining for 2-4 guests", icon: <Users />, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" },
            { title: "Garden-Facing Seats", desc: "Scenic views for 2-4 guests", icon: <Eye />, img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800" },
            { title: "Farmhouse Table", desc: "Communal dining for 6-8 guests", icon: <Users />, img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800" }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-serif mb-1">{item.title}</h4>
                  <p className="text-xs italic text-brand-dark/50">{item.desc}</p>
                </div>
                <div className="text-brand-gold/50">{item.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menus & Pricing */}
      <section className="py-32 px-6 bg-brand-cream">
        <div className="max-w-7xl mx-auto bg-white/50 backdrop-blur-sm p-12 md:p-20 rounded-2xl flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-serif mb-8">Seasonal Menus & Pricing</h2>
            <p className="text-brand-dark/60 mb-12 leading-relaxed">
              Our menu changes with the cycles of the moon and the harvest of our botanical garden. Every plate is a tribute to the earth.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex justify-between items-end border-b border-brand-dark/10 pb-4">
                <div>
                  <h4 className="text-lg font-serif">À La Carte Selection</h4>
                  <p className="text-xs italic text-brand-dark/50">Inspired garden ingredients</p>
                </div>
                <span className="font-serif text-xl">€30 - €45</span>
              </div>
              <div className="flex justify-between items-end border-b border-brand-dark/10 pb-4">
                <div>
                  <h4 className="text-lg font-serif">Signature Tasting Menu</h4>
                  <p className="text-xs italic text-brand-dark/50">A 4-course journey through the seasons</p>
                </div>
                <span className="font-serif text-xl">€50</span>
              </div>
            </div>

            <button 
              onClick={onViewMenu}
              className="text-xs uppercase tracking-widest border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              View Full Seasonal Menu
            </button>
          </div>
          
          <div className="flex-1 flex gap-4">
            <div className="w-1/2 aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" 
                alt="Dish 1" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-1/2 aspect-[3/4] rounded-xl overflow-hidden shadow-xl mt-12">
              <img 
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800" 
                alt="Dish 2" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto bg-white p-12 md:p-20 shadow-2xl border border-brand-cream rounded-xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">How It Works</h2>
            <p className="text-brand-dark/60">Secure your place in the garden in three simple steps.</p>
          </div>
          
          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Select Date</label>
                <input type="date" className="w-full border-b border-brand-dark/20 py-3 focus:outline-none focus:border-brand-gold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Select Time</label>
                <select className="w-full border-b border-brand-dark/20 py-3 focus:outline-none focus:border-brand-gold bg-transparent">
                  <option>18:30</option>
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold block">Seating Style</label>
              <div className="flex gap-2">
                {['Nook', 'Garden', 'Farmhouse'].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setSelectedSeating(style)}
                    className={`flex-1 py-4 text-xs uppercase tracking-widest border transition-all ${selectedSeating === style ? 'bg-brand-gold text-white border-brand-gold' : 'border-brand-dark/10 hover:border-brand-gold'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Dietary Notes</label>
              <textarea 
                placeholder="Allergies, preferences, or special requests..."
                className="w-full border-b border-brand-dark/20 py-3 focus:outline-none focus:border-brand-gold min-h-[100px] resize-none"
              ></textarea>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold block">Enhance Your Visit (Optional)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Floral Cocktail", sub: "WELCOME DRINK" },
                  { label: "Take-home Tea", sub: "HAND-BLENDED" },
                  { label: "Bouquet Pickup", sub: "SEASONAL FLOWERS" }
                ].map((item, i) => (
                  <label key={i} className="flex flex-col gap-1 p-4 border border-brand-dark/5 bg-brand-cream/30 cursor-pointer hover:bg-brand-cream/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="accent-brand-gold" />
                      <span className="text-sm font-serif">{item.label}</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-brand-dark/40 ml-5">{item.sub}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-brand-gold text-white py-5 text-xs uppercase tracking-[0.3em] hover:bg-brand-dark transition-all shadow-lg">
              Confirm Reservation
            </button>
            
            <p className="text-[10px] text-center text-brand-dark/40 italic">
              By clicking confirm, you agree to our 24h cancellation policy.
            </p>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-brand-cream">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="text-brand-gold text-2xl mb-4">“</div>
          <h2 className="text-4xl font-serif">Whispers From the Garden</h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { text: "The discovery of hidden flavors in the floral menu was revelation. It's not just food; it's a sensory journey.", author: "Elena V." },
            { text: "The atmosphere is so serene. I felt like I was dining in a dream. The garden-facing seats are spectacular at sunset.", author: "Marc D." },
            { text: "Finally, a place that values the origin of its ingredients. The garden-to-table approach is authentic and delicious.", author: "Sophie R." }
          ].map((item, i) => (
            <div key={i} className="text-center px-6">
              <p className="text-lg italic font-serif leading-relaxed mb-8 text-brand-dark/80">"{item.text}"</p>
              <span className="text-xs uppercase tracking-widest font-bold">— {item.author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" 
            alt="Ready to bloom" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-6">
          <h2 className="text-5xl md:text-7xl font-serif mb-12 italic">Ready to bloom?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-brand-gold text-white px-12 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all">
              Reserve Now
            </button>
            <button className="border border-white/30 text-white px-12 py-5 text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all">
              Private Events & Collabs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
            Find us in <br />
            <span className="text-brand-gold italic">San Niccolò</span>
          </h1>
          <p className="text-brand-dark/70 text-lg italic font-serif mb-12 max-w-md">
            A calm courtyard tucked away behind a blooming flower boutique in the heart of Oltrarno.
          </p>
          <button className="bg-brand-gold text-white px-10 py-4 text-xs uppercase tracking-widest hover:bg-brand-dark transition-all">
            Send an Inquiry
          </button>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Details & Map */}
      <section className="bg-brand-cream py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-16">
            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-8 block font-bold">Contact Details</span>
              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2 font-bold">Address</h4>
                  <p className="text-xl font-serif">San Niccolò, Oltrarno — Florence, Italy</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2 font-bold">Email</h4>
                  <p className="text-xl font-serif">ciao@fiorditavola.com</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-brand-dark/40 mb-2 font-bold">Phone</h4>
                  <p className="text-xl font-serif">+39 055 123 4567</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-8 block font-bold">Hours</span>
              <div className="space-y-4 max-w-xs">
                <div className="flex justify-between border-b border-brand-dark/10 pb-2">
                  <span className="text-sm">Boutique</span>
                  <span className="font-bold text-sm">10:00 – 19:00</span>
                </div>
                <div className="flex justify-between border-b border-brand-dark/10 pb-2">
                  <span className="text-sm">Restaurant</span>
                  <span className="font-bold text-sm">19:30 – 23:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-4 shadow-xl rounded-lg">
              <div className="aspect-video bg-gray-200 overflow-hidden relative rounded">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Via%20di%20San%20Niccol%C3%B2,%2012R,%2050125%20Firenze%20FI&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-white p-8 border border-brand-dark/5 flex gap-6 items-start">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-white shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">How to find us</h4>
                <p className="text-sm text-brand-dark/60 leading-relaxed">
                  Our restaurant is hidden from the main street. To find the entrance, look for the 'Fior di Tavola' floral boutique; our courtyard gate is located directly through the shop interior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Inquiries & Reservations</h2>
          <p className="text-brand-dark/60">For special events, press inquiries, or large group bookings, please complete the form below.</p>
        </div>
        
        <form className="max-w-4xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold">Name</label>
              <input type="text" placeholder="Your name" className="w-full bg-brand-cream/50 border-b border-brand-dark/10 px-6 py-4 focus:outline-none focus:border-brand-gold" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold">Email</label>
              <input type="email" placeholder="email@address.com" className="w-full bg-brand-cream/50 border-b border-brand-dark/10 px-6 py-4 focus:outline-none focus:border-brand-gold" />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold">Subject</label>
            <select className="w-full bg-brand-cream/50 border-b border-brand-dark/10 px-6 py-4 focus:outline-none focus:border-brand-gold appearance-none">
              <option>General Inquiry</option>
              <option>Private Event</option>
              <option>Press & Media</option>
              <option>Workshop Booking</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
            <textarea placeholder="Tell us how we can help you..." className="w-full bg-brand-cream/50 border-b border-brand-dark/10 px-6 py-4 focus:outline-none focus:border-brand-gold min-h-[200px] resize-none"></textarea>
          </div>
          
          <button className="w-full bg-brand-gold text-white py-6 text-xs uppercase tracking-[0.3em] hover:bg-brand-dark transition-all shadow-xl">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

const MenuPage = () => {
  const [activeSeason, setActiveSeason] = useState<'Spring' | 'Summer' | 'Autumn' | 'Winter'>('Spring');

  const menus = {
    Spring: {
      flowers: "Violet, borage, marigold, chamomile, chive blossom",
      starters: [
        { name: "Fresh violet in three textures with light ricotta", price: "9" },
        { name: "Borage carpaccio with sweet oil", price: "8" },
        { name: "Spring vegetable cream soup infused with marigold", price: "7" },
        { name: "Fresh chamomile broth with a soft-boiled egg", price: "8" }
      ],
      mainCourses: [
        { name: "White chamomile risotto with floral butter", price: "21" },
        { name: "Steamed sea bass with a chive blossom sauce", price: "25" },
        { name: "Farm-raised poultry with a concentrated marigold jus", price: "27" },
        { name: "Vegetarian: Violet gnocchi with light cream", price: "19" }
      ],
      sideDishes: [
        { name: "Violet: Soft violet gnocchi", price: "6" },
        { name: "Borage: Crunchy fennel marinated in borage oil", price: "5" },
        { name: "Marigold: Roasted potatoes with candied marigold petals", price: "7" },
        { name: "Chamomile: Silky chamomile-infused mash", price: "6" }
      ],
      desserts: [
        { name: "Fresh violet crème brûlée", price: "7" },
        { name: "Garden chamomile sorbet", price: "6" },
        { name: "French toast with yogurt ice cream and candied marigold honey", price: "8" },
        { name: "Chive blossom tiramisu", price: "8" }
      ]
    },
    Summer: {
      flowers: "Nasturtium, zucchini blossom, flowering basil, lavender",
      starters: [
        { name: "Zucchini blossom stuffed with ricotta", price: "9" },
        { name: "Heirloom tomatoes with nasturtium vinaigrette", price: "8" },
        { name: "White fish carpaccio with heirloom rose oil", price: "10" },
        { name: "Crunchy cucumber with flowering basil", price: "7" }
      ],
      mainCourses: [
        { name: "Fresh lavender risotto with sweet lemon", price: "21" },
        { name: "Fresh pasta with zucchini blossom butter", price: "22" },
        { name: "Grilled fish with a light nasturtium sauce", price: "25" },
        { name: "Vegetarian: Roasted zucchini blossom with herb stuffing", price: "17" }
      ],
      sideDishes: [
        { name: "Nasturtium: Summer vegetables roasted in nasturtium oil", price: "7" },
        { name: "Zucchini Blossom: Yellow and green zucchini with blossom butter", price: "6" },
        { name: "Flowering Basil: Tomato and peach salad with basil flowers", price: "5" },
        { name: "Lavender: Baby potatoes with lavender salt", price: "6" }
      ],
      desserts: [
        { name: "Peach poached in lavender", price: "7" },
        { name: "Heirloom rose granita", price: "6" },
        { name: "Cold flowering basil cream", price: "7" },
        { name: "Tomato and nasturtium sorbet", price: "6" }
      ]
    },
    Autumn: {
      flowers: "Marigold, heirloom rose, chamomile, nasturtium",
      starters: [
        { name: "Root vegetable cream soup with infused marigold", price: "8" },
        { name: "Roasted beetroot with heirloom rose", price: "9" },
        { name: "Sautéed mushrooms in chamomile broth", price: "7" },
        { name: "Marinated squash tartare with nasturtium oil", price: "8" }
      ],
      mainCourses: [
        { name: "Marigold risotto (naturally saffron-like notes)", price: "21" },
        { name: "Roasted duck with late-season rose jus", price: "29" },
        { name: "Pan-seared white fish with chamomile emulsion", price: "25" },
        { name: "Vegetarian: Roasted squash with marigold cream", price: "18" }
      ],
      sideDishes: [
        { name: "Marigold: Roasted squash with marigold-infused butter", price: "7" },
        { name: "Heirloom Rose: Roasted beets with a short rose jus", price: "6" },
        { name: "Chamomile: Pan-fried mushrooms with chamomile infusion", price: "5" },
        { name: "Nasturtium: Stewed lentils with nasturtium oil", price: "6" }
      ],
      desserts: [
        { name: "Roasted pear with rose", price: "7" },
        { name: "Sweet marigold custard (flan)", price: "8" },
        { name: "Warm chamomile biscuit", price: "6" },
        { name: "Apple and candied nasturtium compote", price: "7" }
      ]
    },
    Winter: {
      flowers: "Chamomile, marigold, heirloom rose, lavender",
      starters: [
        { name: "Root vegetable broth with dried chamomile", price: "7" },
        { name: "Confited leek with marigold oil", price: "8" },
        { name: "Perfect egg with warm dried rose cream", price: "9" },
        { name: "White cream soup with subtle lavender", price: "8" }
      ],
      mainCourses: [
        { name: "Winter lavender risotto (balanced infusion)", price: "21" },
        { name: "Braised beef cheeks with heirloom rose jus", price: "28" },
        { name: "Fish confit with chamomile butter", price: "26" },
        { name: "Vegetarian: Polenta with root vegetables and marigold oil", price: "18" }
      ],
      sideDishes: [
        { name: "Chamomile: Roasted root vegetables with chamomile butter", price: "7" },
        { name: "Marigold: Braised cabbage with marigold oil", price: "6" },
        { name: "Heirloom Rose (Dried): Roasted celeriac with dried rose jus", price: "6" },
        { name: "Lavender: Creamy spelt with lavender", price: "5" }
      ],
      desserts: [
        { name: "Chamomile rice pudding", price: "7" },
        { name: "Chocolate and rose ganache", price: "8" },
        { name: "Roasted apple with lavender", price: "6" },
        { name: "Marigold shortbread cookie", price: "6" }
      ]
    }
  };

  const currentMenu = menus[activeSeason];

  return (
    <div className="pt-24 min-h-screen bg-brand-cream">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <span className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-6 block">Gastronomy & Botany</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Our Seasonal Menus</h1>
          <p className="text-brand-dark/60 max-w-2xl mx-auto italic font-serif text-lg">
            "A tasting journey through the cycles of nature, where every plate is a tribute to the earth."
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {(['Spring', 'Summer', 'Autumn', 'Winter'] as const).map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`px-8 py-3 text-xs uppercase tracking-[0.2em] border transition-all duration-500 ${activeSeason === season ? 'bg-brand-dark text-white border-brand-dark' : 'border-brand-dark/10 hover:border-brand-gold hover:text-brand-gold'}`}
            >
              {season}
            </button>
          ))}
        </div>

        {/* Menu Display */}
        <motion.div 
          key={activeSeason}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-12 md:p-24 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative elements based on season */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <Leaf className="w-full h-full text-brand-gold" />
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Fior Di Tavola</h2>
            <p className="text-brand-gold text-xs uppercase tracking-widest mb-6">Tasting menu: 4 courses €50</p>
            <div className="flex items-center justify-center gap-2 text-brand-dark/40 italic text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Garden Flowers: {currentMenu.flowers}</span>
            </div>
          </div>

          <div className="space-y-16">
            {/* Starters */}
            <div>
              <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-8 text-center font-bold border-b border-brand-gold/20 pb-2">Starters</h3>
              <div className="space-y-6">
                {currentMenu.starters.map((item, i) => (
                  <div key={i} className="flex justify-between items-end gap-4 group">
                    <span className="font-serif text-lg group-hover:text-brand-gold transition-colors">{item.name}</span>
                    <div className="flex-grow border-b border-dotted border-brand-dark/10 mb-1"></div>
                    <span className="font-serif text-lg">€{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Courses */}
            <div>
              <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-8 text-center font-bold border-b border-brand-gold/20 pb-2">Main Courses</h3>
              <div className="space-y-6">
                {currentMenu.mainCourses.map((item, i) => (
                  <div key={i} className="flex justify-between items-end gap-4 group">
                    <span className="font-serif text-lg group-hover:text-brand-gold transition-colors">{item.name}</span>
                    <div className="flex-grow border-b border-dotted border-brand-dark/10 mb-1"></div>
                    <span className="font-serif text-lg">€{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floral Side Dishes */}
            <div>
              <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-8 text-center font-bold border-b border-brand-gold/20 pb-2">Floral Side Dishes</h3>
              <div className="space-y-6">
                {currentMenu.sideDishes.map((item, i) => (
                  <div key={i} className="flex justify-between items-end gap-4 group">
                    <span className="font-serif text-lg group-hover:text-brand-gold transition-colors">{item.name}</span>
                    <div className="flex-grow border-b border-dotted border-brand-dark/10 mb-1"></div>
                    <span className="font-serif text-lg">€{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desserts */}
            <div>
              <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-8 text-center font-bold border-b border-brand-gold/20 pb-2">Desserts</h3>
              <div className="space-y-6">
                {currentMenu.desserts.map((item, i) => (
                  <div key={i} className="flex justify-between items-end gap-4 group">
                    <span className="font-serif text-lg group-hover:text-brand-gold transition-colors">{item.name}</span>
                    <div className="flex-grow border-b border-dotted border-brand-dark/10 mb-1"></div>
                    <span className="font-serif text-lg">€{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 text-center text-[10px] uppercase tracking-widest text-brand-dark/30 italic">
            * All ingredients are hand-picked from our garden or locally foraged.
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentPage === 'home' && <HomePage onReserve={() => setCurrentPage('reservations')} />}
            {currentPage === 'menu' && <MenuPage />}
            {currentPage === 'reservations' && <ReservationsPage onViewMenu={() => setCurrentPage('menu')} />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
