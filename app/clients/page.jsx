'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import QuoteModal from '../../components/QuoteModal';
import VisitingCard from '../../components/VisitingCard';
import QRAnalytics from '../../components/QRAnalytics';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  MessageSquare, 
  PhoneCall, 
  CheckCircle2, 
  Briefcase, 
  Gift, 
  Award,
  Layers,
  ChevronRight,
  Stethoscope,
  HeartHandshake
} from 'lucide-react';

const clients = [
  {
    id: 'opsonin',
    name: 'Opsonin Pharma Limited',
    shortName: 'Opsonin Pharma',
    sector: 'pharma',
    sectorLabel: 'Pharmaceutical Leader',
    tagline: 'Ideas for Healthcare • Since 1956',
    logo: '/images/clients/opsonin.png',
    scope: 'Doctor Promotional Items & PMD Gifting',
    description: 'Premier supplier of customized medical conference collateral, bespoke executive doctor promotional kits, leatherette planners, and commemorative employee milestone gift hampers for Opsonin Pharma.',
    deliverables: ['Custom Doctor Promotional Kits', 'PMD Medical Conference Collateral', 'Laser-Engraved Smart Drinkware', 'Annual Sales Conference Kits'],
    badgeColor: 'border-blue-500/30 bg-blue-50/60 text-blue-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate merchandise and doctor promotional gifting similar to Opsonin Pharma.'
  },
  {
    id: 'incepta',
    name: 'Incepta Pharmaceuticals Ltd.',
    shortName: 'Incepta Pharma',
    sector: 'pharma',
    sectorLabel: 'Pharmaceutical Giant',
    tagline: 'Committed to Global Healthcare Excellence',
    logo: '/images/clients/incepta.png',
    scope: 'Executive PMD Sourcing & Corporate Gifts',
    description: 'Providing bespoke executive gift boxes, branded high-capacity power banks, custom medical conference bags, and tailored clinician appreciation items meeting Incepta’s rigorous corporate branding standards.',
    deliverables: ['Executive Clinician Gift Sets', 'Branded Conference Laptop Backpacks', 'Precision Laser-Engraved Thermos Sets', 'Specialty PMD Collateral'],
    badgeColor: 'border-cyan-500/30 bg-cyan-50/60 text-cyan-800',
    waInquiry: 'Hello AGT, I would like to inquire about executive gifting and conference merchandise similar to Incepta Pharmaceuticals.'
  },
  {
    id: 'acme',
    name: 'The ACME Laboratories Ltd.',
    shortName: 'ACME Laboratories',
    sector: 'pharma',
    sectorLabel: 'Heritage Pharmaceutical Pioneer',
    tagline: 'For All Your Health Needs • Est. 1954',
    logo: '/images/clients/acme.svg',
    scope: 'Institutional Merchandise & Doctor Gifts',
    description: 'Supplying bulk custom-branded promotional stationery, medical desktop organizers, premium leather conference folders, and seasonal executive gift collections for ACME Laboratories.',
    deliverables: ['Custom Medical Desktop Organizers', 'Executive Leather Conference Folders', 'Branded Metal Executive Pens', 'Seasonal Executive Hampers'],
    badgeColor: 'border-emerald-500/30 bg-emerald-50/60 text-emerald-800',
    waInquiry: 'Hello AGT, I would like to inquire about institutional merchandise and promotional items similar to ACME Laboratories.'
  },
  {
    id: 'popular',
    name: 'Popular Pharmaceuticals PLC',
    shortName: 'Popular Pharma',
    sector: 'pharma',
    sectorLabel: 'Healthcare & Specialized Pharma',
    tagline: 'Caring for Health • World-Class Formulations',
    logo: '/images/clients/popular.png',
    scope: 'Doctor Gifts & Conference Merchandise',
    description: 'Designing and manufacturing custom doctor utility merchandise, branded digital smart accessories, premium drinkware, and medical conference delegate kits for Popular Pharma teams.',
    deliverables: ['Clinician Utility Gift Sets', 'Custom Digital Desk Accessories', 'Delegate Kits & Conference Bags', 'Festive Employee Gift Sets'],
    badgeColor: 'border-indigo-500/30 bg-indigo-50/60 text-indigo-800',
    waInquiry: 'Hello AGT, I would like to inquire about doctor gifts and delegate merchandise similar to Popular Pharmaceuticals.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare Pharmaceuticals Ltd.',
    shortName: 'Healthcare Pharma (HPL)',
    sector: 'pharma',
    sectorLabel: 'Global Standard Healthcare',
    tagline: 'Pioneering Healthcare Solutions',
    logo: '/images/clients/healthcare.png',
    scope: 'Premium PMD Collateral & Executive Gifting',
    description: 'Crafting luxury executive gift hampers, personalized corporate drinkware, high-grade leather planners, and doctor appreciation collateral for Healthcare Pharmaceuticals Limited.',
    deliverables: ['Personalized Luxury Drinkware Sets', 'Premium Executive Planners', 'Doctor Appreciation Hampers', 'Medical Rep Field Gear'],
    badgeColor: 'border-teal-500/30 bg-teal-50/60 text-teal-800',
    waInquiry: 'Hello AGT, I would like to inquire about premium PMD collateral and executive hampers similar to Healthcare Pharmaceuticals.'
  },
  {
    id: 'skf',
    name: 'Eskayef Pharmaceuticals Ltd. (SK+F)',
    shortName: 'Eskayef (SK+F)',
    sector: 'pharma',
    sectorLabel: 'Transcom Group Enterprise',
    tagline: 'Excellence in Global Pharma Manufacturing',
    logo: '/images/clients/skf.png',
    scope: 'PMD Brand Collateral & Conference Bags',
    description: 'Corporate merchandise and gifting partner supplying heavy-duty branded backpacks, laser-engraved executive pens, conference folios, and medical representative field collateral for SK+F.',
    deliverables: ['Heavy-Duty Branded Backpacks', 'Laser-Engraved Executive Pens', 'Conference Folios & Notebooks', 'Corporate Milestone Gifts'],
    badgeColor: 'border-red-500/30 bg-red-50/60 text-red-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate merchandise and conference bags similar to Eskayef (SK+F).'
  },
  {
    id: 'aristopharma',
    name: 'Aristopharma Ltd.',
    shortName: 'Aristopharma',
    sector: 'pharma',
    sectorLabel: 'Quality Healthcare Pioneer',
    tagline: 'Dedicated to Quality Healthcare • Est. 1986',
    logo: '/images/clients/aristopharma.png',
    scope: 'Doctor Promotional Kits & Institutional Items',
    description: 'Custom manufacturing tailored doctor gifting articles, branded medical event souvenirs, custom windproof umbrella lines, and seasonal executive appreciation gift packs for Aristopharma.',
    deliverables: ['Doctor Gifting Articles', 'Custom Windproof Umbrella Lines', 'Branded Medical Event Souvenirs', 'Annual Celebration Gift Hampers'],
    badgeColor: 'border-purple-500/30 bg-purple-50/60 text-purple-800',
    waInquiry: 'Hello AGT, I would like to inquire about customized doctor promotional items similar to Aristopharma.'
  },
  {
    id: 'c2c',
    name: 'C2C Pharma Ltd.',
    shortName: 'C2C Pharma (Coast to Coast)',
    sector: 'pharma',
    sectorLabel: 'Emerging Pharmaceutical Concern',
    tagline: 'Coast to Coast Group Innovation',
    logo: '/images/clients/c2c.png',
    scope: 'Corporate Merchandise & Field Collateral',
    description: 'Supplying custom-branded stationery, corporate apparel, promotional drinkware, and launch event gifting kits for C2C Pharma under the Coast to Coast Group.',
    deliverables: ['Product Launch Gift Kits', 'Branded Corporate Polo Shirts', 'Custom Printed Drinkware', 'Sales Representative Gear'],
    badgeColor: 'border-amber-500/30 bg-amber-50/60 text-amber-800',
    waInquiry: 'Hello AGT, I would like to inquire about product launch kits and merchandise similar to C2C Pharma.'
  },
  {
    id: 'berger',
    name: 'Berger Paints Bangladesh Ltd.',
    shortName: 'Berger Paints',
    sector: 'corporate',
    sectorLabel: 'Multinational Paints Leader',
    tagline: 'Paint Your Imagination • 250+ Years Heritage',
    logo: '/images/clients/berger.png',
    scope: 'Dealer Appreciation & Executive Merchandise',
    description: 'Delivering premium dealer appreciation gift packs, annual sales conference kits, bespoke executive bags, and branded corporate rewards for Berger Paints Bangladesh.',
    deliverables: ['Dealer Appreciation Gift Packs', 'Annual Sales Conference Kits', 'Bespoke Executive Laptop Bags', 'High-End Commemorative Plaques'],
    badgeColor: 'border-rose-500/30 bg-rose-50/60 text-rose-800',
    waInquiry: 'Hello AGT, I would like to inquire about dealer appreciation gifts and conference bags similar to Berger Paints.'
  },
  {
    id: 'jotun',
    name: 'Jotun Paints Bangladesh',
    shortName: 'Jotun Paints',
    sector: 'corporate',
    sectorLabel: 'Global Coatings Corporation',
    tagline: 'Jotun Protects Property • Norwegian Heritage',
    logo: '/images/clients/jotun.svg',
    scope: 'Corporate Merchandise & Partner Gifting',
    description: 'Supplying high-grade vacuum flasks, branded corporate apparel, corporate golf umbrellas, and premium partner appreciation hampers adhering to Jotun’s Norwegian brand standards.',
    deliverables: ['Smart Temperature Vacuum Flasks', 'Corporate Golf Umbrellas', 'Partner Appreciation Hampers', 'Branded Tech Accessories'],
    badgeColor: 'border-sky-500/30 bg-sky-50/60 text-sky-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate merchandise and partner gifts similar to Jotun Paints.'
  },
  {
    id: 'philip-morris',
    name: 'Philip Morris (PMI Bangladesh)',
    shortName: 'Philip Morris International',
    sector: 'corporate',
    sectorLabel: 'Multinational FMCG Leader',
    tagline: 'Delivering a Smoke-Free Future',
    logo: '/images/clients/philip-morris.svg',
    scope: 'Corporate Event Merchandise & Executive Gifts',
    description: 'Designing sophisticated corporate event collateral, luxury metal executive pens, leather accessories, and bespoke employee recognition gifts for Philip Morris.',
    deliverables: ['Luxury Metal Executive Pens', 'Genuine Leather Desk Accessories', 'Corporate Event Collateral', 'Employee Recognition Hampers'],
    badgeColor: 'border-slate-500/30 bg-slate-50/60 text-slate-800',
    waInquiry: 'Hello AGT, I would like to inquire about executive recognition gifts similar to Philip Morris.'
  },
  {
    id: 'wave-foundation',
    name: 'WAVE Foundation',
    shortName: 'WAVE Foundation',
    sector: 'development',
    sectorLabel: 'Development & Social Enterprise',
    tagline: 'Sustainable Development & Social Justice',
    logo: '/images/clients/wave-foundation.png',
    scope: 'Institutional Event Kits & Welfare Gifting',
    description: 'Supplying customized institutional conference bags, eco-friendly jute totes, field staff utility kits, and annual employee welfare packages for WAVE Foundation projects across Bangladesh.',
    deliverables: ['Eco-Friendly Jute & Cotton Totes', 'Institutional Conference Bags', 'Field Staff Utility Kits', 'Annual Employee Welfare Packages'],
    badgeColor: 'border-emerald-500/30 bg-emerald-50/60 text-emerald-800',
    waInquiry: 'Hello AGT, I would like to inquire about institutional event kits and eco-friendly bags similar to WAVE Foundation.'
  }
];

export default function ClientsPage() {
  const [selectedSector, setSelectedSector] = useState('all');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const filteredClients = selectedSector === 'all'
    ? clients
    : clients.filter(c => c.sector === selectedSector);

  const stats = [
    { label: 'Enterprise Clients', value: '12+', desc: 'Pharma & MNC giants' },
    { label: 'Doctor Promotional Kits', value: '100K+', desc: 'Delivered nationwide' },
    { label: 'Bespoke Customization', value: '100%', desc: 'Laser, UV & Embroidery' },
    { label: 'On-Time Delivery', value: '99.8%', desc: 'Insured logistics SLA' }
  ];

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col selection:bg-gold-500 selection:text-white">
      {/* Global Navigation */}
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* =========================================================================
            1. HERO SECTION: Luxury Deep Petrol Teal & Gold
            ========================================================================= */}
        <section className="relative w-full bg-[#003e4a] text-white border-b border-teal-400/20 shadow-xl overflow-hidden py-14 sm:py-20 lg:py-24">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_70%_30%,rgba(13,148,136,0.35),transparent)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-100 text-xs font-bold uppercase tracking-widest shadow-xs mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>CORPORATE MERCHANDISE &amp; GIFTING PORTFOLIO</span>
              </div>

              {/* Page Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Trusted by Bangladesh’s Foremost{' '}
                <span className="text-amber-300 block sm:inline">
                  Corporate &amp; Healthcare Leaders
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-sm sm:text-base lg:text-lg text-teal-50/90 leading-relaxed font-normal">
                From precision doctor promotional gifts and tailored PMD brand collateral to premium corporate employee hampers and conference kits — Abdullah Global Trade is the trusted sourcing partner behind the nation’s top pharmaceutical giants, multinational leaders, and development organizations.
              </p>

              {/* Action Button Row */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsQuoteOpen(true)}
                  className="gold-btn py-3 px-6 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-gold-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Request Corporate Quote</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>

                <a
                  href="https://wa.me/8801787239863?text=Hello%20AGT%2C%20I%20would%20like%20to%20discuss%20corporate%20gifting%20and%20merchandise%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl border border-emerald-400/50 bg-emerald-600/30 hover:bg-emerald-600/50 text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Desk</span>
                </a>

                <a
                  href="tel:+8801787239863"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white hover:text-amber-200 transition-colors px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 backdrop-blur-md"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                  <span>+880 1787 239 863</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. STATS & CREDIBILITY BAR
            ========================================================================= */}
        <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gold-500/25 shadow-cream-lg p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-cream-200">
            {stats.map((stat, idx) => (
              <div key={idx} className={`flex flex-col items-center sm:items-start text-center sm:text-left ${idx > 0 ? 'pt-3 sm:pt-0 sm:pl-6' : ''}`}>
                <span className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-serif">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-gold-700 mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] sm:text-xs text-navy-600 font-medium mt-0.5">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. SECTOR FILTER & CLIENT SHOWCASE
            ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          
          {/* Header & Sector Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gold-500/20">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 mb-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Our Corporate Clients</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                Organizations We Serve &amp; Provide Gifting Solutions
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => setSelectedSector('all')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 ${
                  selectedSector === 'all'
                    ? 'bg-navy-950 text-white shadow-sm ring-1 ring-gold-500/50'
                    : 'bg-white text-navy-800 hover:bg-cream-150 border border-gold-500/20'
                }`}
              >
                All Clients ({clients.length})
              </button>
              <button
                onClick={() => setSelectedSector('pharma')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedSector === 'pharma'
                    ? 'bg-navy-950 text-white shadow-sm ring-1 ring-gold-500/50'
                    : 'bg-white text-navy-800 hover:bg-cream-150 border border-gold-500/20'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
                <span>Pharmaceuticals (8)</span>
              </button>
              <button
                onClick={() => setSelectedSector('corporate')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedSector === 'corporate'
                    ? 'bg-navy-950 text-white shadow-sm ring-1 ring-gold-500/50'
                    : 'bg-white text-navy-800 hover:bg-cream-150 border border-gold-500/20'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Multinational &amp; Corporate (3)</span>
              </button>
              <button
                onClick={() => setSelectedSector('development')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedSector === 'development'
                    ? 'bg-navy-950 text-white shadow-sm ring-1 ring-gold-500/50'
                    : 'bg-white text-navy-800 hover:bg-cream-150 border border-gold-500/20'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
                <span>Development &amp; NGO (1)</span>
              </button>
            </div>
          </div>

          {/* Client Cards Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="group relative bg-white rounded-2xl border border-gold-500/25 p-6 shadow-cream-sm hover:shadow-cream-lg hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Authentic Logo Stage */}
                  <div className="relative w-full h-28 sm:h-32 rounded-xl bg-gradient-to-b from-cream-50 to-white border border-cream-200/90 p-4 sm:p-6 flex items-center justify-center overflow-hidden mb-5 group-hover:border-gold-500/40 transition-colors">
                    <div className="relative w-full h-16 max-w-[220px] flex items-center justify-center">
                      <Image
                        src={client.logo}
                        alt={`${client.name} Official Logo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>

                  {/* Sector Pill & Tagline */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${client.badgeColor}`}>
                      {client.sectorLabel}
                    </span>
                    <span className="text-[11px] font-semibold text-navy-500">
                      {client.tagline}
                    </span>
                  </div>

                  {/* Company Name */}
                  <h3 className="text-lg font-extrabold text-navy-950 group-hover:text-gold-700 transition-colors">
                    {client.name}
                  </h3>

                  {/* Supply Scope Tag */}
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-teal-800">
                    <Gift className="w-3.5 h-3.5 text-gold-600" />
                    <span>{client.scope}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-2.5 text-xs text-navy-700 leading-relaxed font-normal">
                    {client.description}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="mt-4 pt-3.5 border-t border-cream-200 space-y-1.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-navy-400">
                      Gifting &amp; Merchandise Scope:
                    </p>
                    <ul className="space-y-1">
                      {client.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-navy-800 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/8801787239863?text=${encodeURIComponent(client.waInquiry)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inquire Similar Supply</span>
                  </a>

                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="py-2 px-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-xs"
                    title="Request Quotation"
                  >
                    <span>RFQ</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. FOUR SPECIALIZED SOURCING PILLARS
            ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
          <div className="bg-[#002f38] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-teal-400/20 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                END-TO-END PROCUREMENT ARCHITECTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                How We Deliver for Enterprise &amp; Pharma Brands
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
                Corporate gifting and PMD promotional procurement requires strict timeline adherence, zero-defect quality control, and exact corporate identity compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold mb-3">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Doctor Promotional Items</h4>
                <p className="text-xs text-teal-100/80 mt-1 leading-relaxed">
                  Clinician utility desk accessories, laser-engraved pens, leather organizers, and medical congress giveaways crafted to strict pharmaceutical standards.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold mb-3">
                  <Gift className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Executive &amp; Festive Hampers</h4>
                <p className="text-xs text-teal-100/80 mt-1 leading-relaxed">
                  Bespoke Eid, New Year, and annual milestone gift boxes packed with premium dry fruits, organic honey, smart bottles, and custom executive merchandise.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-sky-400/20 text-sky-300 flex items-center justify-center font-bold mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Conferences &amp; AGMs</h4>
                <p className="text-xs text-teal-100/80 mt-1 leading-relaxed">
                  Complete delegate kit fulfillment: branded laptop backpacks, conference notepads, ID badge lanyards, and commemorative mementos on tight turnaround.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <div className="w-9 h-9 rounded-xl bg-purple-400/20 text-purple-300 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Pre-Production Sampling</h4>
                <p className="text-xs text-teal-100/80 mt-1 leading-relaxed">
                  100% physical proof approval before mass manufacturing. Color-calibrated UV printing, laser engraving depth checks, and insured doorstep dispatch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. FINAL CALL TO ACTION
            ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
          <div className="bg-gradient-to-r from-cream-100 via-white to-cream-150 rounded-2xl border border-gold-500/30 p-8 sm:p-12 text-center shadow-cream-md flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-700">
              CUSTOM CORPORATE SOLUTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1.5 max-w-xl">
              Ready to Partner with Abdullah Global Trade for Your Corporate Gifting?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-navy-700 max-w-lg leading-relaxed">
              Contact our corporate procurement desk today to discuss your next doctor promotional campaign, executive gift hamper, or annual conference merchandising.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="gold-btn py-3 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <span>Request Corporate Quotation</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="https://wa.me/8801787239863?text=Hello%20AGT%2C%20I%20would%20like%20to%20request%20a%20corporate%20quotation%20for%20bulk%20merchandise%20and%20gifting."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp (+8801787239863)</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer */}
      <Footer
        onOpenCard={() => setIsCardOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Direct WhatsApp Floating Icon */}
      <FloatingWhatsApp />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        selectedProduct={null}
      />

      <VisitingCard
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

      <QRAnalytics
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}
