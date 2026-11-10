import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, Users, Shield, Award, Calendar, Phone, Mail, MapPin, 
  CheckCircle, ArrowRight, Download, Share2, Filter, Search, Plus, Trash2, 
  Edit, Lock, Eye, Video, Image as ImageIcon, UserCheck, Sparkles, X, ChevronRight,
  Menu, Facebook, Instagram, Youtube, MessageCircle, ExternalLink, Check, FileText, Info
} from 'lucide-react';

// --- EXACT 25 COMMUNITIES LIST ---
const OFFICIAL_25_COMMUNITIES = [
  { id: 1, name: "World Peace & Human Unity", icon: "🕊️", desc: "Promoting interfaith harmony, universal brotherhood, and non-violence across communities.", obj: "Foster global peace, resolve social conflicts through dialogue, and promote unity.", activities: "Peace rallies, unity workshops, cultural harmony conventions." },
  { id: 2, name: "Tree Conservation & Green India", icon: "🌱", desc: "Mass tree plantation drives, seed ball creation, and protection of existing forests.", obj: "Increase green cover across Maharashtra and India with sustainable sapling care.", activities: "Plantation drives, urban forestry programs, school eco-clubs." },
  { id: 3, name: "Clean India & Plastic-Free Earth", icon: "♻️", desc: "Swachh Bharat initiatives, single-use plastic reduction, and waste segregation drives.", obj: "Make villages and cities cleaner through community plastic collection and recycling.", activities: "Public cleanups, plastic replacement campaigns, composting education." },
  { id: 4, name: "Humanity First & Emergency Support", icon: "🚑", desc: "Rapid disaster response, emergency medical assistance, and crisis relief operations.", obj: "Deliver immediate relief during floods, accidents, and social emergencies.", activities: "Emergency ambulance liaison, flood relief kits, crisis food supplies." },
  { id: 5, name: "Crime Prevention & Citizen Safety", icon: "🛡️", desc: "Creating safe neighborhoods, crime awareness, and police-public cooperation.", obj: "Educate citizens on fundamental rights, crime prevention, and personal safety.", activities: "Safety awareness seminars, neighborhood watch assistance, legal safety guidance." },
  { id: 6, name: "Women Empowerment", icon: "👩", desc: "Vocational skill development, self-reliance, and financial independence for women.", obj: "Empower 50,000+ women with self-employment tools and leadership skills.", activities: "Sewing classes, micro-business guidance, self-defense training." },
  { id: 7, name: "Education Rights & Digital Literacy", icon: "📚", desc: "Ensuring every child receives free quality education and basic digital skills.", obj: "Zero school dropouts in operational districts and digital inclusion for rural kids.", activities: "Free evening coaching, laptop distribution, stationary donation." },
  { id: 8, name: "Water Conservation", icon: "💧", desc: "Rainwater harvesting, borewell recharge, and riverbank restoration.", obj: "Recharge groundwater tables in drought-prone rural sectors.", activities: "Check-dam construction support, water harvesting workshops, desilting ponds." },
  { id: 9, name: "Cyber Safety & Digital Security", icon: "💻", desc: "Protecting citizens from online frauds, cyberbullying, and financial scams.", obj: "Create cyber-aware communities across all age groups.", activities: "Cyber awareness workshops for seniors and students, fraud prevention guides." },
  { id: 10, name: "Youth Skills & Employment", icon: "🚀", desc: "Vocational training, resume building, and career guidance for unemployed youth.", obj: "Bridge the gap between education and job market demands for rural youth.", activities: "Skill bootcamps, job fairs, soft skill and computer coaching." },
  { id: 11, name: "Wildlife Conservation", icon: "🐾", desc: "Protection of natural wildlife habitats, stray animal care, and biodiversity safety.", obj: "Protect local flora/fauna and assist injured animals.", activities: "Stray animal feeding, water pot installation in summer, wildlife rescue support." },
  { id: 12, name: "Farmers Welfare", icon: "🌾", desc: "Organic farming techniques, crop guidance, water management, and fair pricing support.", obj: "Improve agricultural yield and reduce farmer distress through modern eco-farming.", activities: "Organic compost workshops, soil testing guidance, farmer melas." },
  { id: 13, name: "Senior Citizens Welfare", icon: "👵", desc: "Healthcare support, companionship, legal security, and recreational care for elders.", obj: "Ensure dignity, physical wellness, and social inclusion for senior citizens.", activities: "Elderly health checkups, companionship visits, legal rights awareness." },
  { id: 14, name: "Anti-Corruption Awareness", icon: "⚖️", desc: "Promoting transparency, civic duty awareness, and anti-graft public initiatives.", obj: "Build a transparent society through citizen right awareness (RTI & public schemes).", activities: "Civic rights seminars, guidance on government welfare scheme access." },
  { id: 15, name: "Hunger Relief & Food Distribution", icon: "🍲", desc: "Nutritious meal distribution to homeless, daily wage workers, and needy families.", obj: "Eradicate local hunger and eliminate daily food insecurity.", activities: "Annadaanam drives, mobile meal vans, dry ration distribution." },
  { id: 16, name: "Global Health & Medical Awareness", icon: "🩺", desc: "Organizing free medical checkups, blood donation drives, and hygiene campaigns.", obj: "Accessible preventive health care for rural and low-income populations.", activities: "Free health diagnostic camps, blood donation drives, eye care camps." },
  { id: 17, name: "Cultural Friendship & Unity", icon: "🎨", desc: "Celebrating traditional arts, cultural festivals, and cross-cultural brotherhood.", obj: "Preserve Indian heritage and foster cross-cultural understanding.", activities: "Cultural showcases, folk art exhibitions, festival unity gatherings." },
  { id: 18, name: "Sustainable Living & Development", icon: "☀️", desc: "Promoting solar energy, zero-waste lifestyle, and eco-friendly housing.", obj: "Accelerate adoption of clean energy and sustainable lifestyle habits.", activities: "Solar lighting guidance, terrace gardening, waste management demos." },
  { id: 19, name: "Divorced Women Support & Empowerment", icon: "🤝", desc: "Legal counsel, psychological therapy, and self-sufficiency for single mothers.", obj: "Social dignity and financial independence for divorced and destitute women.", activities: "Counseling sessions, skill training, single parent support groups." },
  { id: 20, name: "Children & Parents Welfare", icon: "👶", desc: "Parenting guidance, child rights defense, and mental health care for families.", obj: "Nurture safe and healthy family environments for child development.", activities: "Parenting workshops, child abuse prevention sessions, health checks." },
  { id: 21, name: "Schools & Colleges Development", icon: "🏫", desc: "Upgrading rural school infrastructure, libraries, and sanitation facilities.", obj: "Equip government schools with modern learning tools and clean toilets.", activities: "School painting, library setup, drinking water filter installation." },
  { id: 22, name: "NGO & Social Organization Network", icon: "🌐", desc: "Uniting local non-profits for joint humanitarian missions and resource sharing.", obj: "Amplify social impact by networking non-profit forces.", activities: "NGO coordination meets, joint disaster response coalitions." },
  { id: 23, name: "Public Representatives & Social Development", icon: "🏛️", desc: "Interacting with local leaders for civic infrastructure development.", obj: "Bridge civic needs between public citizens and local governing bodies.", activities: "Gram Sabha representation, civic problem petitions, public infrastructure follow-ups." },
  { id: 24, name: "Teachers & Professors Network", icon: "👩‍🏫", desc: "Mobilizing educators to volunteer for free teaching and mentorship.", obj: "Leverage academic expertise for rural literacy and mentorship.", activities: "Free teacher training workshops, mentorship camps for board exam students." },
  { id: 25, name: "Bharat Jan Running Mission", icon: "🏃", desc: "Fitness awareness, marathon runs, and healthy lifestyle promotion among youth.", obj: "Promote physical fitness, anti-addiction, and athletic spirit nationwide.", activities: "Community unity runs, fitness awareness drives, sports equipment distribution." }
];

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Mega Tree Plantation & Eco Rally 2026",
    poster: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    desc: "Join VKSF volunteers in planting 5,000 native saplings in Wagholi and surrounding areas.",
    date: "2026-11-25",
    startTime: "07:00 AM",
    endTime: "12:00 PM",
    address: "Wagholi Eco-Grounds, Taluka Haveli, District Pune, Maharashtra 412207",
    mapUrl: "https://maps.google.com/?q=Wagholi+Pune",
    contact: "+91 87671 21501",
    status: "Upcoming",
    category: "Tree Conservation & Green India"
  },
  {
    id: 2,
    title: "Free Medical & Eye Checkup Camp",
    poster: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    desc: "Free diagnostic checkups, spectacles distribution, and consultations for senior citizens and villagers.",
    date: "2026-12-05",
    startTime: "09:00 AM",
    endTime: "04:00 PM",
    address: "VKSF Community Center, Wagholi, Pune 412207",
    mapUrl: "https://maps.google.com/?q=Wagholi+Pune",
    contact: "+91 87671 21501",
    status: "Upcoming",
    category: "Global Health & Medical Awareness"
  },
  {
    id: 3,
    title: "Women Skill Workshop & Digital Seminar",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800",
    desc: "Empowering local women with basic digital literacy, financial safety, and self-reliance techniques.",
    date: "2026-10-15",
    startTime: "10:00 AM",
    endTime: "03:00 PM",
    address: "Town Hall, Wagholi, Pune",
    mapUrl: "https://maps.google.com/?q=Wagholi+Pune",
    contact: "+91 87671 21501",
    status: "Completed",
    category: "Women Empowerment"
  }
];

const INITIAL_GALLERY = [
  { id: 1, title: "1000 Saplings Planted at Wagholi", type: "photo", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", category: "Tree Conservation & Green India", date: "2026-10-20", desc: "Volunteers gathered to plant native trees in Pune district." },
  { id: 2, title: "Blood Donation Drive", type: "photo", url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800", category: "Global Health & Medical Awareness", date: "2026-10-10", desc: "150 units collected to support local hospital blood banks." },
  { id: 3, title: "Free Digital Literacy Camp for Students", type: "photo", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", category: "Education Rights & Digital Literacy", date: "2026-09-28", desc: "Providing computer exposure to rural school children." },
  { id: 4, title: "Annadaanam Meal Distribution", type: "photo", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800", category: "Hunger Relief & Food Distribution", date: "2026-09-15", desc: "Serving warm nutritious food to needy families." },
  { id: 5, title: "Women Skill Development Session", type: "photo", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", category: "Women Empowerment", date: "2026-08-30", desc: "Handicrafts and financial literacy for self-reliance." }
];

const INITIAL_VIDEOS = [
  { id: 1, title: "VKSF Reforestation Mission Highlights", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Tree Conservation & Green India", platform: "YouTube", desc: "Watch our volunteers transform degraded land into a green belt." },
  { id: 2, title: "Cleanliness & Anti-Plastic Drive Reel", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Clean India & Plastic-Free Earth", platform: "Instagram Reel", desc: "Youth volunteers collecting waste plastic along riverbanks." }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data State with LocalStorage Persistence
  const [communities, setCommunities] = useState(() => {
    const saved = localStorage.getItem('vksf_communities_v2');
    return saved ? JSON.parse(saved) : OFFICIAL_25_COMMUNITIES;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('vksf_events_v2');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('vksf_gallery_v2');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('vksf_videos_v2');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    const saved = localStorage.getItem('vksf_social_links');
    return saved ? JSON.parse(saved) : {
      instagram: "https://instagram.com/vksf_foundation",
      facebook: "https://facebook.com/vksf.org",
      youtube: "https://youtube.com/@vksf_foundation",
      whatsapp: "https://wa.me/918767121501"
    };
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('vksf_registrations_v2');
    return saved ? JSON.parse(saved) : [
      { 
        id: "VKSF-2026-8812", 
        fullName: "Sanjay Patil", 
        email: "sanjay@example.com", 
        mobile: "+91 87671 21501", 
        city: "Pune", 
        district: "Haveli", 
        state: "Maharashtra", 
        country: "India", 
        profession: "Educator", 
        communities: ["Education Rights & Digital Literacy", "Tree Conservation & Green India"], 
        reason: "Desire to support free education for village kids.", 
        status: "Approved", 
        date: "2026-10-05" 
      }
    ];
  });

  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminTab, setAdminTab] = useState('overview');

  // Selected Detail Modals
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedEventForReg, setSelectedEventForReg] = useState(null);
  const [memberSuccessCard, setMemberSuccessCard] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Form States
  const [regForm, setRegForm] = useState({
    fullName: '', mobile: '', email: '', dob: '', address: '', city: 'Pune', district: 'Haveli', state: 'Maharashtra', country: 'India', profession: '', reason: '', communities: [], privacyConsent: false
  });

  const [contactForm, setContactForm] = useState({ name: '', email: '', mobile: '', message: '', subject: 'General Inquiry' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Persistence Effects
  useEffect(() => { localStorage.setItem('vksf_communities_v2', JSON.stringify(communities)); }, [communities]);
  useEffect(() => { localStorage.setItem('vksf_events_v2', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('vksf_gallery_v2', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('vksf_videos_v2', JSON.stringify(videos)); }, [videos]);
  useEffect(() => { localStorage.setItem('vksf_social_links', JSON.stringify(socialLinks)); }, [socialLinks]);
  useEffect(() => { localStorage.setItem('vksf_registrations_v2', JSON.stringify(registrations)); }, [registrations]);

  // Handlers
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'vksf2026' || adminPassword === 'admin') {
      setIsAdminLoggedIn(true);
      setShowAdminModal(false);
      setAdminPassword('');
      setActiveTab('admin');
    } else {
      alert('Invalid Password! Demo Passcode: admin or vksf2026');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.mobile || regForm.communities.length === 0) {
      alert('Please fill out all required fields and select at least 1 community.');
      return;
    }
    if (!regForm.privacyConsent) {
      alert('Please accept the privacy consent to complete registration.');
      return;
    }
    const newId = `VKSF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMember = {
      ...regForm,
      id: newId,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    setRegistrations([newMember, ...registrations]);
    setMemberSuccessCard(newMember);
    setRegForm({
      fullName: '', mobile: '', email: '', dob: '', address: '', city: 'Pune', district: 'Haveli', state: 'Maharashtra', country: 'India', profession: '', reason: '', communities: [], privacyConsent: false
    });
  };

  const toggleCommunitySelection = (commName) => {
    setRegForm(prev => {
      const exists = prev.communities.includes(commName);
      if (exists) {
        return { ...prev, communities: prev.communities.filter(c => c !== commName) };
      } else {
        return { ...prev, communities: [...prev.communities, commName] };
      }
    });
  };

  const updateMemberStatus = (id, newStatus) => {
    setRegistrations(registrations.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* --- TOP BRANDING & INFORMATION HEADER STRIP --- */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <a href="tel:+918767121501" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 87671 21501
            </a>
            <a href="mailto:madanharal12@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> madanharal12@gmail.com
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Wagholi, Pune, Maharashtra 412207
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-emerald-600/30 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border border-emerald-500/30">
              Govt. Registered NGO
            </span>
            <button 
              onClick={() => isAdminLoggedIn ? setActiveTab('admin') : setShowAdminModal(true)}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 underline underline-offset-2 transition-colors"
            >
              <Lock className="w-3 h-3" /> {isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo & Foundation Title */}
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-900 via-emerald-600 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-amber-400 font-extrabold text-xl tracking-tighter">
                  VKSF
                </div>
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-base sm:text-lg leading-snug tracking-tight group-hover:text-blue-900 transition-colors">
                  Vishwa Kalyan Shanti Foundation
                </h1>
                <p className="text-[11px] font-semibold text-emerald-600 tracking-wide">
                  Together for Humanity, Peace and a Better Tomorrow.
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'communities', label: 'Our 25 Communities' },
                { id: 'join', label: 'Registration' },
                { id: 'activities', label: 'Our Activities' },
                { id: 'gallery', label: 'Posters & Photos' },
                { id: 'videos', label: 'Video Gallery' },
                { id: 'contact', label: 'Contact Us' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Header Join Button */}
            <div className="hidden xl:flex items-center space-x-3">
              <button 
                onClick={() => setActiveTab('join')}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" /> Join VKSF
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="xl:hidden flex items-center space-x-2">
              <button 
                onClick={() => setActiveTab('join')}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-semibold"
              >
                Join Us
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'communities', label: 'Our 25 Communities' },
              { id: 'join', label: 'Registration & Join' },
              { id: 'activities', label: 'Our Activities' },
              { id: 'gallery', label: 'Posters & Photos' },
              { id: 'videos', label: 'Video Gallery' },
              { id: 'contact', label: 'Contact Us' },
              ...(isAdminLoggedIn ? [{ id: 'admin', label: '⚙️ Admin Dashboard' }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                  activeTab === tab.id ? 'bg-blue-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* --- BODY PAGES ROUTER --- */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomePage 
            setActiveTab={setActiveTab} 
            communities={communities} 
            events={events} 
            gallery={gallery}
            videos={videos}
            socialLinks={socialLinks}
            setSelectedCommunity={setSelectedCommunity}
          />
        )}
        {activeTab === 'about' && <AboutPage setActiveTab={setActiveTab} />}
        {activeTab === 'communities' && (
          <CommunitiesPage 
            communities={communities} 
            setSelectedCommunity={setSelectedCommunity} 
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'join' && (
          <JoinPage 
            regForm={regForm} 
            setRegForm={setRegForm} 
            communities={communities} 
            handleRegisterSubmit={handleRegisterSubmit}
            toggleCommunitySelection={toggleCommunitySelection}
          />
        )}
        {activeTab === 'activities' && <ActivitiesPage events={events} setSelectedEventForReg={setSelectedEventForReg} />}
        {activeTab === 'gallery' && <PhotoGalleryPage gallery={gallery} setLightboxImage={setLightboxImage} />}
        {activeTab === 'videos' && <VideoGalleryPage videos={videos} />}
        {activeTab === 'contact' && (
          <ContactPage 
            contactForm={contactForm} 
            setContactForm={setContactForm} 
            contactSubmitted={contactSubmitted} 
            setContactSubmitted={setContactSubmitted} 
            socialLinks={socialLinks}
          />
        )}
        {activeTab === 'admin' && isAdminLoggedIn && (
          <AdminDashboard 
            adminTab={adminTab} 
            setAdminTab={setAdminTab} 
            registrations={registrations} 
            updateMemberStatus={updateMemberStatus} 
            communities={communities}
            setCommunities={setCommunities}
            events={events}
            setEvents={setEvents}
            gallery={gallery}
            setGallery={setGallery}
            videos={videos}
            setVideos={setVideos}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        )}
      </main>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Col 1: Foundation Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-900 text-amber-400 font-black flex items-center justify-center text-base border border-amber-500/30">
                  VKSF
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Vishwa Kalyan Shanti Foundation</h3>
                  <p className="text-[10px] text-emerald-400 font-semibold">Reg. NGO - Wagholi, Pune</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                VKSF works for global peace, human unity, ecological restoration, free education, women empowerment, and disaster relief across 25 dedicated community wings.
              </p>
              <div className="pt-2 flex items-center space-x-3 text-white">
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="font-semibold text-white mb-3 tracking-wider uppercase text-[11px]">Pages & Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-400">Home</button></li>
                <li><button onClick={() => setActiveTab('about')} className="hover:text-amber-400">About Us</button></li>
                <li><button onClick={() => setActiveTab('communities')} className="hover:text-amber-400">Our 25 Communities</button></li>
                <li><button onClick={() => setActiveTab('join')} className="hover:text-amber-400">Registration</button></li>
                <li><button onClick={() => setActiveTab('activities')} className="hover:text-amber-400">Activities</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-400">Contact Us</button></li>
              </ul>
            </div>

            {/* Col 3: Key Wings Teaser */}
            <div>
              <h4 className="font-semibold text-white mb-3 tracking-wider uppercase text-[11px]">Key Communities</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('communities')} className="hover:text-amber-400 text-left">World Peace & Unity</button></li>
                <li><button onClick={() => setActiveTab('communities')} className="hover:text-amber-400 text-left">Tree Conservation</button></li>
                <li><button onClick={() => setActiveTab('communities')} className="hover:text-amber-400 text-left">Clean India Mission</button></li>
                <li><button onClick={() => setActiveTab('communities')} className="hover:text-amber-400 text-left">Humanity First</button></li>
                <li><button onClick={() => setActiveTab('communities')} className="hover:text-amber-400 text-left">Women Empowerment</button></li>
                <li><button onClick={() => setActiveTab('communities')} className="hover:text-amber-400 text-left">Bharat Jan Running</button></li>
              </ul>
            </div>

            {/* Col 4: Official Contact HQ */}
            <div>
              <h4 className="font-semibold text-white mb-3 tracking-wider uppercase text-[11px]">Headquarters</h4>
              <div className="space-y-2.5">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Wagholi, PIN 412207, Taluka Haveli, District Pune, Maharashtra, India.</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="tel:+918767121501" className="hover:text-white">+91 87671 21501</a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href="mailto:madanharal12@gmail.com" className="hover:text-white">madanharal12@gmail.com</a>
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-500">
            <p>© 2026 Vishwa Kalyan Shanti Foundation. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <span>Humanity First</span>
              <span>•</span>
              <span>World Peace</span>
              <span>•</span>
              <span>Social Development</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- MODAL DIALOGS --- */}

      {/* 1. Admin Login Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setShowAdminModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-900 text-amber-400 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Administrator Login</h3>
                <p className="text-xs text-slate-500">VKSF Admin Portal Access</p>
              </div>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Passcode</label>
                <input 
                  type="password" 
                  value={adminPassword} 
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter passcode (demo: admin)" 
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 outline-none"
                  autoFocus
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                <p className="font-semibold mb-0.5">Demo Passcode:</p>
                <p className="font-mono">Use passcode <code className="bg-amber-200 px-1 rounded font-bold">admin</code> or <code className="bg-amber-200 px-1 rounded font-bold">vksf2026</code></p>
              </div>
              <button 
                type="submit" 
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg text-sm shadow transition-colors"
              >
                Authenticate & Access Dashboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Community Detail Modal */}
      {selectedCommunity && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedCommunity(null)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-500">
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl p-3 bg-slate-100 rounded-2xl">{selectedCommunity.icon}</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Community #{selectedCommunity.id} of 25</span>
                <h3 className="text-2xl font-bold text-slate-900">{selectedCommunity.name}</h3>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wide">Community Overview</h4>
                <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">{selectedCommunity.desc}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wide">Key Objectives</h4>
                <p className="leading-relaxed text-slate-600">{selectedCommunity.obj}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wide">Community Activities</h4>
                <p className="leading-relaxed text-slate-600">{selectedCommunity.activities}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button 
                  onClick={() => {
                    setSelectedCommunity(null);
                    if (!regForm.communities.includes(selectedCommunity.name)) {
                      setRegForm(prev => ({ ...prev, communities: [...prev.communities, selectedCommunity.name] }));
                    }
                    setActiveTab('join');
                  }}
                  className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Join This Community Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Event Registration Modal */}
      {selectedEventForReg && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setSelectedEventForReg(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Event Pass Registration</h3>
            <p className="text-xs text-blue-900 font-semibold mb-4">{selectedEventForReg.title}</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Success! You have registered for ${selectedEventForReg.title}. SMS details sent to provided mobile number.`);
              setSelectedEventForReg(null);
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input required type="text" placeholder="John Doe" className="w-full px-3 py-2 border rounded-lg text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input required type="tel" placeholder="+91 9876543210" className="w-full px-3 py-2 border rounded-lg text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <input required type="text" defaultValue="Pune" className="w-full px-3 py-2 border rounded-lg text-xs" />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow">
                Confirm Free Pass
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Volunteer Member ID Card Modal */}
      {memberSuccessCard && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border-t-8 border-blue-900">
            <button onClick={() => setMemberSuccessCard(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Registration Successful!</h3>
              <p className="text-xs text-slate-500">Your Volunteer Application Has Been Submitted</p>
            </div>

            {/* Printable Digital Card */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl p-5 shadow-inner mb-6 relative overflow-hidden border border-amber-500/30">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-amber-400 text-sm">Vishwa Kalyan Shanti Foundation</h4>
                  <p className="text-[10px] text-slate-300">Volunteer Registration Pass</p>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  PENDING REVIEW
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <p><span className="text-slate-400">Reg ID:</span> <strong className="font-mono text-amber-300">{memberSuccessCard.id}</strong></p>
                <p><span className="text-slate-400">Name:</span> <strong className="text-white">{memberSuccessCard.fullName}</strong></p>
                <p><span className="text-slate-400">Location:</span> {memberSuccessCard.city}, {memberSuccessCard.state}</p>
                <p><span className="text-slate-400">Enrolled Wings:</span> {memberSuccessCard.communities.length} Communities</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Print Card
              </button>
              <button 
                onClick={() => setMemberSuccessCard(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4">
          <button onClick={() => setLightboxImage(null)} className="absolute top-6 right-6 text-white hover:text-amber-400">
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-3xl w-full space-y-3 text-center">
            <img src={lightboxImage.url} alt={lightboxImage.title} className="max-h-[75vh] mx-auto rounded-xl shadow-2xl object-contain" />
            <h4 className="text-white font-bold text-lg">{lightboxImage.title}</h4>
            <p className="text-slate-300 text-xs">{lightboxImage.desc}</p>
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// --- PAGE 1: HOME PAGE ---
// ==========================================
function HomePage({ setActiveTab, communities, events, gallery, videos, socialLinks, setSelectedCommunity }) {
  return (
    <div className="space-y-16 pb-16">

      {/* Hero Banner Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1920" 
            alt="Humanity Relief Work" 
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Vishwa Kalyan Shanti Foundation (VKSF)
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              "Together for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-300">Humanity, Peace</span> and a Better Tomorrow."
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              Vishwa Kalyan Shanti Foundation works for global human welfare, social development, tree conservation, hunger relief, free education, water protection, and citizen security across 25 dedicated communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setActiveTab('join')}
                className="px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Join Our Foundation <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('communities')}
                className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                Explore 25 Communities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Intro & Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            About VKSF
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">United for Peace, Unity and Social Progress</h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Vishwa Kalyan Shanti Foundation (VKSF) is headquartered in Wagholi, Pune, Maharashtra. We operate grassroots initiatives with dedicated volunteer networks across 25 distinct social wings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              To bring meaningful social change through 25 specialized community wings dedicated to tree conservation, free education, women empowerment, water saving, and citizen rights.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Vision</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              A peaceful world where human dignity, non-violence, environmental sustainability, and equal rights are preserved for every citizen regardless of background.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Objectives</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Mobilize youth, educators, and public citizens into organized humanitarian action, creating self-reliant, clean, green, and safe villages and towns.
            </p>
          </div>
        </div>
      </section>

      {/* 25 Communities Teaser Grid */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-900">25 Specialized Wings</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Our 25 Social Communities</h2>
            </div>
            <button 
              onClick={() => setActiveTab('communities')}
              className="mt-4 sm:mt-0 text-blue-900 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All 25 Communities <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.slice(0, 6).map((c) => (
              <div 
                key={c.id} 
                onClick={() => setSelectedCommunity(c)}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{c.icon}</span>
                  <span className="text-[10px] bg-slate-100 font-semibold px-2 py-0.5 rounded text-slate-600">Wing #{c.id}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-900 transition-colors">{c.name}</h3>
                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">{c.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-600">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Photos Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Photo Highlights</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Ground Activities & Campaigns</h2>
          </div>
          <button onClick={() => setActiveTab('gallery')} className="text-xs font-bold text-blue-900 hover:underline">
            Open Photo Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {gallery.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <img src={item.url} alt={item.title} className="w-full h-44 object-cover" />
              <div className="p-4 space-y-1">
                <span className="text-[10px] text-emerald-600 font-bold uppercase">{item.category}</span>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

// ==========================================
// --- PAGE 2: ABOUT US PAGE ---
// ==========================================
function AboutPage({ setActiveTab }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          About VKSF
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">Vishwa Kalyan Shanti Foundation</h2>
        <p className="text-slate-600 text-sm mt-2">
          Registered Non-Governmental Organization working for global peace, human unity, ecological balance, free education, and social development.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">About Our Foundation</h3>
          <p className="leading-relaxed">
            Vishwa Kalyan Shanti Foundation (VKSF) is a non-profit organization headquartered in Wagholi, Pune district, Maharashtra. Founded on the core philosophy of "World Welfare and Universal Peace", VKSF organizes social change through 25 structured community wings that address environmental, educational, health, legal safety, and youth development issues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <h4 className="font-bold text-blue-900 text-base flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-900" /> Mission Statement
            </h4>
            <p className="text-xs leading-relaxed text-slate-600">
              To build a compassionate, clean, educated, and crime-free society by empowering local citizens, youth, teachers, and women into organized community service.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-emerald-700 text-base flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-700" /> Vision Statement
            </h4>
            <p className="text-xs leading-relaxed text-slate-600">
              To foster an inclusive environment where peace, human dignity, environmental safety, and universal brotherhood prevail across all sectors of society.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Our Social Responsibilities & Commitment</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Planting thousands of trees to ensure a green India for future generations.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Providing free literacy, computer access, and digital safety for rural students.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Supporting women, single mothers, and elders with skill training and healthcare.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Deploying volunteers for immediate disaster relief and hunger eradication.</span>
            </li>
          </ul>
        </div>

        <div className="pt-6 border-t border-slate-200 text-center">
          <button 
            onClick={() => setActiveTab('join')}
            className="px-8 py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs shadow-md"
          >
            Become a Registered VKSF Member
          </button>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// --- PAGE 3: OUR 25 COMMUNITIES PAGE ---
// ==========================================
function CommunitiesPage({ communities, setSelectedCommunity, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommunities = useMemo(() => {
    return communities.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [communities, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Humanitarian Directory
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">Our 25 Communities</h2>
        <p className="text-slate-600 text-sm mt-2">
          Each wing operates with dedicated objectives and activities. Click on any community to view complete details or to join.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search among 25 communities..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 shadow-sm"
        />
      </div>

      {/* Grid of 25 Communities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((c) => (
          <div 
            key={c.id} 
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-3 bg-slate-50 rounded-2xl border border-slate-100">{c.icon}</span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Wing #{c.id}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{c.name}</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">{c.desc}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button 
                onClick={() => setSelectedCommunity(c)}
                className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
              >
                View Details
              </button>
              <button 
                onClick={() => setSelectedCommunity(c)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow transition-colors"
              >
                Join Community
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// --- PAGE 4: REGISTRATION PAGE ---
// ==========================================
function JoinPage({ regForm, setRegForm, communities, handleRegisterSubmit, toggleCommunitySelection }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Volunteer Registration
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">Join Vishwa Kalyan Shanti Foundation</h2>
        <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
          Enroll as an official volunteer member. Select one or multiple communities out of our 25 social wings.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Multi-Community Checklist */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1 uppercase tracking-wider">
            Select One or Multiple Communities *
          </label>
          <p className="text-xs text-slate-500 mb-3">Click to select the community wings you wish to enroll in:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-200">
            {communities.map((c) => {
              const selected = regForm.communities.includes(c.name);
              return (
                <div 
                  key={c.id}
                  onClick={() => toggleCommunitySelection(c.name)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    selected ? 'bg-blue-900 text-white border-blue-900 font-semibold' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{c.icon}</span>
                    <span>{c.name}</span>
                  </span>
                  {selected && <Check className="w-4 h-4 text-amber-400" />}
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-2">
            Selected: {regForm.communities.length} Wings
          </p>
        </div>

        {/* Demographic Inputs */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Member Particulars</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input 
                required 
                type="text" 
                placeholder="Ramesh Sharma" 
                value={regForm.fullName}
                onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
              <input 
                required 
                type="tel" 
                placeholder="+91 9876543210" 
                value={regForm.mobile}
                onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                placeholder="ramesh@example.com" 
                value={regForm.email}
                onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth (Optional)</label>
              <input 
                type="date" 
                value={regForm.dob}
                onChange={(e) => setRegForm({ ...regForm, dob: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Profession</label>
              <input 
                type="text" 
                placeholder="Teacher / Farmer / Student" 
                value={regForm.profession}
                onChange={(e) => setRegForm({ ...regForm, profession: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
            <input 
              type="text" 
              placeholder="House/Street details" 
              value={regForm.address}
              onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
              className="w-full px-3.5 py-2 border rounded-xl text-xs" 
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
              <input 
                required
                type="text" 
                placeholder="Pune" 
                value={regForm.city}
                onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
              <input 
                type="text" 
                placeholder="Haveli / Pune" 
                value={regForm.district}
                onChange={(e) => setRegForm({ ...regForm, district: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
              <input 
                type="text" 
                placeholder="Maharashtra" 
                value={regForm.state}
                onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
              <input 
                type="text" 
                placeholder="India" 
                value={regForm.country}
                onChange={(e) => setRegForm({ ...regForm, country: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl text-xs" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Why do you want to join VKSF?</label>
            <textarea 
              rows={3} 
              placeholder="Briefly share your motivation..." 
              value={regForm.reason}
              onChange={(e) => setRegForm({ ...regForm, reason: e.target.value })}
              className="w-full px-3.5 py-2 border rounded-xl text-xs"
            />
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input 
              type="checkbox" 
              id="privacyConsent"
              checked={regForm.privacyConsent}
              onChange={(e) => setRegForm({ ...regForm, privacyConsent: e.target.checked })}
              className="mt-1 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
            />
            <label htmlFor="privacyConsent" className="text-xs text-slate-600">
              I consent to Vishwa Kalyan Shanti Foundation storing my details for volunteer coordination purposes under strict privacy norms.
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-2xl text-sm shadow-md transition-all"
        >
          Submit Registration
        </button>
      </form>

    </div>
  );
}

// ==========================================
// --- PAGE 5: POSTERS & PHOTO GALLERY ---
// ==========================================
function PhotoGalleryPage({ gallery, setLightboxImage }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Tree Conservation & Green India', 'Global Health & Medical Awareness', 'Education Rights & Digital Literacy', 'Hunger Relief & Food Distribution', 'Women Empowerment'];

  const filteredGallery = useMemo(() => {
    if (activeCategory === 'All') return gallery;
    return gallery.filter(item => item.category === activeCategory);
  }, [gallery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Media & Campaign Posters
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">Posters & Photo Gallery</h2>
        <p className="text-slate-600 text-sm mt-2">
          Explore photographs of social campaigns, awareness posters, and community drives.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat 
                ? 'bg-blue-900 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setLightboxImage(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="relative h-52 bg-slate-100">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>
            <div className="p-4 space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold">{item.date}</span>
              <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
              <p className="text-slate-600 text-xs line-clamp-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// --- PAGE 6: VIDEO GALLERY ---
// ==========================================
function VideoGalleryPage({ videos }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Video Highlights
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">Video Gallery & Reels</h2>
        <p className="text-slate-600 text-sm mt-2">
          Watch foundation social work videos, official YouTube releases, and Instagram reels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border">
              <iframe 
                src={vid.url} 
                title={vid.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                <span className="text-emerald-600 uppercase">{vid.category}</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded">{vid.platform}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{vid.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{vid.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// --- PAGE 7: OUR ACTIVITIES ---
// ==========================================
function ActivitiesPage({ events, setSelectedEventForReg }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return events;
    return events.filter(e => e.status === activeFilter);
  }, [events, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Field Activities
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">Our Activities & Events</h2>
        <p className="text-slate-600 text-sm mt-2">
          View completed, current ongoing, and upcoming humanitarian drives.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center space-x-2">
        {['All', 'Upcoming', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === tab 
                ? 'bg-blue-900 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {tab} Activities
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredEvents.map((ev) => (
          <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 shadow-sm">
            <img src={ev.poster} alt={ev.title} className="w-full md:w-52 h-44 rounded-xl object-cover" />
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    ev.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ev.status}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{ev.category}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{ev.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{ev.desc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-900" /> {ev.date} ({ev.startTime})</p>
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {ev.address}</p>
              </div>

              {ev.status === 'Upcoming' && (
                <div className="pt-1 flex justify-end">
                  <button 
                    onClick={() => setSelectedEventForReg(ev)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow"
                  >
                    Register for Event
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// --- PAGE 8: CONTACT US PAGE ---
// ==========================================
function ContactPage({ contactForm, setContactForm, contactSubmitted, setContactSubmitted, socialLinks }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
          Get In Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">Contact Vishwa Kalyan Shanti Foundation</h2>
        <p className="text-slate-600 text-sm mt-2">
          Reach out for community membership queries, social partnerships, or general information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Box */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-slate-800">
          <h3 className="text-xl font-bold">Official Headquarters</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Contact Number</p>
                <a href="tel:+918767121501" className="text-amber-300 font-mono text-sm hover:underline">+91 87671 21501</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Official Email</p>
                <a href="mailto:madanharal12@gmail.com" className="text-slate-300 hover:underline">madanharal12@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Address</p>
                <p className="text-slate-300 mt-0.5">Wagholi, PIN 412207, Taluka Haveli, District Pune, Maharashtra, India.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <a 
              href={socialLinks.whatsapp} 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow"
            >
              <MessageCircle className="w-4 h-4" /> Message on WhatsApp
            </a>
            <a 
              href="tel:+918767121501" 
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>

        {/* Form & Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            {contactSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Inquiry Sent Successfully!</h3>
                <p className="text-xs text-slate-500">Thank you for reaching out to VKSF. We will contact you shortly.</p>
                <button onClick={() => setContactSubmitted(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-3">Send Us a Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-3 py-2 border rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input required type="tel" placeholder="+91 9876543210" className="w-full px-3 py-2 border rounded-xl text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-3 py-2 border rounded-xl text-xs" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message Detail *</label>
                  <textarea required rows={3} placeholder="Write your query here..." className="w-full px-3 py-2 border rounded-xl text-xs" />
                </div>

                <button type="submit" className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs shadow">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Map Preview */}
          <div className="bg-white p-3 rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-52">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.355325852924!2d73.97883231489332!3d18.57940898737482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c38c82300001%3A0x6b49980000000000!2sWagholi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              className="w-full h-full rounded-2xl border-0" 
              allowFullScreen="" 
              loading="lazy" 
              title="VKSF Google Map Location"
            />
          </div>
        </div>

      </div>

    </div>
  );
}

// ==========================================
// --- SIMPLE ADMIN DASHBOARD ---
// ==========================================
function AdminDashboard({ 
  adminTab, setAdminTab, registrations, updateMemberStatus, 
  communities, setCommunities, events, setEvents,
  gallery, setGallery, videos, setVideos,
  socialLinks, setSocialLinks
}) {
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">ADMIN CONTROL PANEL</span>
          <h2 className="text-2xl font-bold mt-1">VKSF Content & Member Portal</h2>
        </div>

        {/* Sub Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'registrations', label: `Members (${registrations.length})` },
            { id: 'media', label: 'Upload Gallery/Videos' },
            { id: 'social', label: 'Social & Links' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setAdminTab(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                adminTab === t.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW PANEL */}
      {adminTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-400 font-bold uppercase">Total Registered Members</span>
            <div className="text-3xl font-black text-blue-900 mt-2">{registrations.length}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-400 font-bold uppercase">Specialized Community Wings</span>
            <div className="text-3xl font-black text-emerald-600 mt-2">{communities.length} Wings</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-400 font-bold uppercase">Gallery Media Posts</span>
            <div className="text-3xl font-black text-amber-600 mt-2">{gallery.length + videos.length} Items</div>
          </div>
        </div>
      )}

      {/* REGISTRATION VIEWER */}
      {adminTab === 'registrations' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">Volunteer Applications Directory</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Member ID</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Mobile / Email</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Enrolled Wings</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-blue-900">{r.id}</td>
                    <td className="p-3 font-bold text-slate-900">{r.fullName}</td>
                    <td className="p-3">
                      <p>{r.mobile}</p>
                      <p className="text-[10px] text-slate-400">{r.email}</p>
                    </td>
                    <td className="p-3">{r.city}, {r.state}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-bold">{r.communities?.length || 0} Wings</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        r.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 space-x-1">
                      {r.status !== 'Approved' && (
                        <button 
                          onClick={() => updateMemberStatus(r.id, 'Approved')}
                          className="px-2 py-0.5 bg-emerald-600 text-white rounded font-bold text-[10px]"
                        >
                          Approve
                        </button>
                      )}
                      {r.status !== 'Rejected' && (
                        <button 
                          onClick={() => updateMemberStatus(r.id, 'Rejected')}
                          className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-bold text-[10px]"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MEDIA MANAGER */}
      {adminTab === 'media' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo Poster Upload */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Add Photo Poster / Campaign</h3>
            <input 
              type="text" 
              placeholder="Poster Title" 
              value={newPhotoTitle} 
              onChange={(e) => setNewPhotoTitle(e.target.value)} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
            <input 
              type="text" 
              placeholder="Image URL (Unsplash/Direct link)" 
              value={newPhotoUrl} 
              onChange={(e) => setNewPhotoUrl(e.target.value)} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
            <button 
              onClick={() => {
                if (!newPhotoTitle || !newPhotoUrl) return;
                const newP = {
                  id: gallery.length + 1,
                  title: newPhotoTitle,
                  type: 'photo',
                  url: newPhotoUrl,
                  category: 'Tree Conservation & Green India',
                  date: new Date().toISOString().split('T')[0],
                  desc: 'New campaign poster added by administrator.'
                };
                setGallery([newP, ...gallery]);
                setNewPhotoTitle('');
                setNewPhotoUrl('');
              }}
              className="w-full py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
            >
              Publish Poster
            </button>
          </div>

          {/* Video Manager */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Add Video / Reel Link</h3>
            <input 
              type="text" 
              placeholder="Video Title" 
              value={newVideoTitle} 
              onChange={(e) => setNewVideoTitle(e.target.value)} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
            <input 
              type="text" 
              placeholder="YouTube Embed URL (https://www.youtube.com/embed/...)" 
              value={newVideoUrl} 
              onChange={(e) => setNewVideoUrl(e.target.value)} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
            <button 
              onClick={() => {
                if (!newVideoTitle || !newVideoUrl) return;
                const newV = {
                  id: videos.length + 1,
                  title: newVideoTitle,
                  url: newVideoUrl,
                  category: 'Social Work',
                  platform: 'YouTube',
                  desc: 'Video highlight added by administrator.'
                };
                setVideos([newV, ...videos]);
                setNewVideoTitle('');
                setNewVideoUrl('');
              }}
              className="w-full py-2 bg-blue-900 text-white font-bold rounded-xl text-xs"
            >
              Publish Video Link
            </button>
          </div>
        </div>
      )}

      {/* SOCIAL LINKS MANAGER */}
      {adminTab === 'social' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 max-w-xl">
          <h3 className="font-bold text-slate-900 text-base">Update Social Media & Contact Links</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Instagram URL</label>
            <input 
              type="text" 
              value={socialLinks.instagram} 
              onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook URL</label>
            <input 
              type="text" 
              value={socialLinks.facebook} 
              onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Channel URL</label>
            <input 
              type="text" 
              value={socialLinks.youtube} 
              onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Launcher Link</label>
            <input 
              type="text" 
              value={socialLinks.whatsapp} 
              onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })} 
              className="w-full px-3 py-2 border rounded-xl text-xs" 
            />
          </div>
          <p className="text-[11px] text-emerald-700 font-bold">✓ Changes saved continuously to local store.</p>
        </div>
      )}

    </div>
  );
}