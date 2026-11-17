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
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare, 
  PhoneCall, 
  Building2, 
  FileText, 
  Truck, 
  Sparkles, 
  ExternalLink,
  Gift,
  Boxes
} from 'lucide-react';

const partners = [
  {
    id: 'abul-khair',
    name: 'Abul Khair Group',
    tagline: 'Leading Industrial & Consumer Conglomerate',
    logo: '/images/partners/abul-khair-group.png',
    category: 'Conglomerate & FMCG',
    established: 'Est. 1953',
    description: 'Official corporate and institutional distribution partner for Abul Khair Consumer Products. Supplying bulk wholesale orders of Marks Full Cream Milk Powder, Ceylon Premium Tea & Coffee lines, beverage collections, and customized employee festive gift hampers directly from the manufacturer.',
    highlights: ['Marks Milk Powder', 'Ceylon Tea & Coffee', 'Employee Welfare Hampers', 'Factory-Direct Invoicing'],
    badgeColor: 'border-rose-500/30 bg-rose-50/60 text-rose-800',
    waInquiry: 'Hello AGT, I would like to inquire about bulk corporate supply for Abul Khair Group products (Marks, Ceylon, etc.).'
  },
  {
    id: 'fresh-mgi',
    name: 'Fresh (Meghna Group of Industries)',
    tagline: 'Bangladesh’s #1 Household FMCG Masterbrand',
    logo: '/images/partners/fresh-mgi.png',
    category: 'FMCG & Consumer Staples',
    established: 'Est. 1976',
    description: 'Authorized corporate distributor for Fresh (MGI). We fulfill monthly institutional pantry rations, corporate cafeteria supplies, and employee gift rations featuring Fresh Fortified Soybean Oil, Pure Spices, Refined Sugar, Atta/Maida, Mineral Water, and Hygiene Tissue lines at verified corporate volume tiers.',
    highlights: ['Fresh Edible Oils & Spices', 'Monthly Office Pantry Supplies', 'Fresh Tissue & Hygiene Range', 'Bulk Mill-Direct Delivery'],
    badgeColor: 'border-red-500/30 bg-red-50/60 text-red-800',
    waInquiry: 'Hello AGT, I would like to inquire about bulk corporate supply for Fresh (Meghna Group) products.'
  },
  {
    id: 'gacl',
    name: 'GACL (G A Company Limited)',
    tagline: 'Pioneering Healthcare & Cosmetics Formulations',
    logo: '/images/partners/gacl.png',
    category: 'Healthcare & Personal Care',
    established: 'GACO Group',
    description: 'Authorized distributor for G A Company Limited (GACO Group). We supply certified pharmaceuticals, specialized personal care formulations, Good Lord and Gocotouch toiletries, and institutional hygiene products engineered for corporate offices, hospitals, and commercial institutions.',
    highlights: ['Personal Care & Toiletries', 'Institutional Sanitization', 'GACO Healthcare Products', 'Batch Quality Certified'],
    badgeColor: 'border-sky-500/30 bg-sky-50/60 text-sky-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate supply for GACL / GACO products.'
  },
  {
    id: 'sti',
    name: 'STI (Smart Trade International)',
    tagline: 'Healthcare Diagnostics & Medical Equipment',
    logo: '/images/partners/sti.png',
    category: 'Healthcare & Diagnostic Devices',
    established: 'Savar, Dhaka',
    description: 'Official corporate and institutional distribution partner for Smart Trade International (STI). Supplying certified clinical diagnostics, digital upper-arm blood pressure monitors, pulse oximeters, and institutional health monitoring equipment for corporate wellness, employee benefits, and clinic supply.',
    highlights: ['STI Digital BP Monitors', 'Clinical Diagnostic Equipment', 'Corporate Wellness Packages', 'Warranty & Batch Tested'],
    badgeColor: 'border-blue-500/30 bg-blue-50/60 text-blue-800',
    waInquiry: 'Hello AGT, I would like to inquire about bulk corporate supply for STI (Smart Trade International) medical & diagnostic equipment.'
  },
  {
    id: 'khaas-food',
    name: 'Khaas Food',
    tagline: 'Pure Food, Safe Life • Organic & Natural Nutrition',
    logo: '/images/partners/khaas-food.png',
    category: 'Organic & Pure Food',
    established: 'Organic Pioneer',
    description: 'Authorized corporate gifting and institutional distributor for Khaas Food. We craft bespoke executive wellness hampers and employee health gift packs featuring 100% natural Sundarban wildflower honey, cold-pressed wood-churned mustard oil, organic grass-fed ghee, premium nuts, and chemical-free dates.',
    highlights: ['100% Natural Honey & Ghee', 'Cold-Pressed Mustard Oil', 'Executive Healthy Gift Boxes', 'BSTI & Lab-Tested Pure'],
    badgeColor: 'border-emerald-500/30 bg-emerald-50/60 text-emerald-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate bulk hampers for Khaas Food products.'
  },
  {
    id: 'toktalk',
    name: 'Toktalk (Artisan Gourmet Foods)',
    tagline: 'Artisan Pickles, Gourmet Sauces & Specialty Jams',
    logo: '/images/partners/toktalk.png',
    category: 'Artisan Gourmet Food',
    established: 'Artisan Culinary',
    description: 'Exclusive authorized corporate distributor for Toktalk’s culinary food brand. We supply corporate festive gift combos, gourmet employee treat boxes, and wholesale pantry orders of traditional single-clove garlic pickles, authentic spicy tamarind achar, artisan beef pickles, and gourmet mayonnaise.',
    highlights: ['Single-Clove Garlic Pickle', 'Artisan Tamarind & Beef Achar', 'Naga & Garlic Mayonnaise', 'Festive Gourmet Combos'],
    badgeColor: 'border-orange-500/30 bg-orange-50/60 text-orange-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate bulk orders for Toktalk Gourmet Pickles & Jams.'
  },
];

export default function AuthorizedDistributorPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const handleOpenQuote = (partner = null) => {
    setSelectedPartner(partner ? {
      name: `Authorized Sourcing: ${partner.name}`,
      category: partner.category,
      code: partner.id.toUpperCase(),
      image: { url: partner.logo }
    } : null);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-navy-950 relative selection:bg-gold-500 selection:text-white">
      {/* Header Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      <main className="flex-1">
        
        {/* Hero Section: Deep Petrol Teal Luxury Aesthetic */}
        <section className="relative w-full bg-[#003e4a] border-b border-teal-400/20 shadow-xl overflow-hidden py-12 sm:py-16 lg:py-20 text-white">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-200/80 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Authorized Distribution</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-teal-100 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-xs mb-4 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>OFFICIAL CORPORATE DISTRIBUTION PARTNERS</span>
            </div>

            {/* Title & Copy */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
              Authorized Corporate Distributor for{' '}
              <span className="text-white block sm:inline">
                Industry-Leading Brands
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-teal-50/90 leading-relaxed font-normal max-w-2xl">
              Abdullah Global Trade (AGT) is proud to be an authorized corporate distributor for Bangladesh&apos;s most reputable conglomerates, FMCG giants, and organic food producers. We connect your enterprise directly with genuine factory supply, wholesale institutional pricing, and guaranteed authenticity.
            </p>

            {/* 4 Trust Highlights */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-semibold text-white">100% Factory Origin</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-semibold text-white">Direct Wholesale Pricing</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-semibold text-white">VAT/Tax Compliant Invoices</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-semibold text-white">Nationwide Doorstep Delivery</span>
              </div>
            </div>

          </div>
        </section>

        {/* Brand Showcase Grid */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-gold-700">
                OFFICIAL PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
                Authorized Distribution Partners
              </h2>
              <p className="text-sm text-navy-700 mt-1 max-w-xl">
                Explore the premier brands distributed by AGT for corporate gifting, institutional pantry supply, and large-scale enterprise procurement.
              </p>
            </div>

            <div className="text-xs font-bold text-navy-700 px-4 py-2 rounded-full bg-cream-200 border border-gold-500/20 w-fit">
              Showing 6 Official Brands
            </div>
          </div>

          {/* Cards Grid: Clean, High-Impact Big Logos & Beautiful Typography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {partners.map((partner) => {
              const waUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(partner.waInquiry)}`;

              return (
                <div 
                  key={partner.id}
                  className="rounded-2xl bg-white border border-gold-500/25 shadow-cream-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5"
                >
                  <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                    {/* Header Row: Category Pill & Authorized Badge */}
                    <div className="w-full flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${partner.badgeColor}`}>
                        {partner.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Authorized</span>
                      </span>
                    </div>

                    {/* Big Prominent Official Logo Stage */}
                    <div className="relative w-full h-32 sm:h-36 max-w-[240px] flex items-center justify-center my-3">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} Official Logo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                    </div>

                    {/* Beautiful Company Name */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950 font-serif tracking-tight mt-3 group-hover:text-gold-700 transition-colors">
                      {partner.name}
                    </h3>
                    
                    {/* Clean Subtitle / Tagline */}
                    <p className="text-xs sm:text-sm font-semibold text-gold-700 mt-1">
                      {partner.tagline}
                    </p>
                  </div>

                  {/* Clean Bottom Action Row */}
                  <div className="p-4 bg-cream-50/80 border-t border-cream-200 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenQuote(partner)}
                      className="gold-btn py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span>Inquire RFQ</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* Corporate Advantage Section */}
        <section className="bg-white border-y border-gold-500/25 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest font-extrabold text-gold-700">
                WHY WORK WITH AN AUTHORIZED DISTRIBUTOR
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
                The AGT Enterprise Advantage
              </h2>
              <p className="text-sm text-navy-700 mt-2">
                Procuring through an authorized distribution partner gives corporate and institutional buyers complete peace of mind, verified authenticity, and reliable volume scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-cream-50 border border-gold-500/20">
                <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-700 w-fit mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-navy-950">100% Genuine Origin</h3>
                <p className="mt-2 text-xs sm:text-[13px] text-navy-700 leading-relaxed">
                  Direct mill and factory access guarantees authentic batches, fresh expiry dates, and manufacturer quality warranty. Zero counterfeit risks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cream-50 border border-gold-500/20">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 w-fit mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-navy-950">Wholesale Volume Tiers</h3>
                <p className="mt-2 text-xs sm:text-[13px] text-navy-700 leading-relaxed">
                  Transparent factory wholesale pricing structure with tiered volume discounts for 50, 500, or 10,000+ units. Zero middleman margins.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cream-50 border border-gold-500/20">
                <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-700 w-fit mb-4">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-navy-950">Custom Hamper Assembly</h3>
                <p className="mt-2 text-xs sm:text-[13px] text-navy-700 leading-relaxed">
                  Combine Abul Khair, Fresh, Khaas Food, or Toktalk items into custom-branded corporate gift hampers packed with your company logo and card.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cream-50 border border-gold-500/20">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 w-fit mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-navy-950">VAT &amp; Tax Compliant</h3>
                <p className="mt-2 text-xs sm:text-[13px] text-navy-700 leading-relaxed">
                  Full official commercial invoices with Musak 6.3 VAT chalans, corporate purchase orders, and bank settlement compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Action Call to Action */}
        <section className="bg-gradient-to-r from-navy-950 via-[#003e4a] to-navy-950 py-12 sm:py-16 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-widest font-extrabold text-gold-400">
              NEED INSTITUTIONAL SUPPLY OR CUSTOM HAMPERS?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              Request an Official Corporate Rate Card
            </h2>
            <p className="mt-3 text-sm sm:text-base text-cream-200/90 max-w-xl mx-auto leading-relaxed">
              Connect with our Institutional Sourcing Desk to receive official price sheets, product specifications, or bespoke corporate hamper proposals.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenQuote()}
                className="gold-btn py-3 sm:py-3.5 px-8 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Request Corporate Quotation</span>
              </button>

              <a
                href="https://wa.me/8801787239863?text=Hello%20AGT%2C%20I%20would%20like%20to%20request%20the%20official%20corporate%20price%20list%20for%20your%20authorized%20brands."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 sm:py-3.5 px-6 rounded-xl border border-emerald-500/50 bg-emerald-600/30 hover:bg-emerald-600/50 text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Chat on WhatsApp B2B</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer 
        onOpenCard={() => setIsCardOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* RFQ Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => {
          setIsQuoteOpen(false);
          setSelectedPartner(null);
        }}
        product={selectedPartner}
      />

      {/* Visiting Card Modal */}
      {isCardOpen && (
        <VisitingCard isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
      )}

      {/* QR Analytics Modal */}
      {isAnalyticsOpen && (
        <QRAnalytics isOpen={isAnalyticsOpen} onClose={() => setIsAnalyticsOpen(false)} />
      )}

      {/* Floating WhatsApp Quick Desk */}
      <FloatingWhatsApp />
    </div>
  );
}
