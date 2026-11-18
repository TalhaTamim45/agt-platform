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
  Boxes,
  Flame,
  TrendingUp,
  Tag,
  PackageCheck
} from 'lucide-react';

const partners = [
  {
    id: 'abul-khair',
    name: 'Abul Khair Group',
    tagline: 'Leading Industrial & Consumer Conglomerate',
    logo: '/images/partners/abul-khair-group.png',
    category: 'Conglomerate & FMCG',
    established: 'Est. 1953',
    dealCount: 2,
    badgeColor: 'border-rose-500/30 bg-rose-50/60 text-rose-800',
    waInquiry: 'Hello AGT, I would like to inquire about bulk corporate supply for Abul Khair Group products (Marks Milk, Ceylon Tea, etc.).'
  },
  {
    id: 'fresh-mgi',
    name: 'Fresh (Meghna Group of Industries)',
    tagline: 'Bangladesh’s #1 Household FMCG Masterbrand',
    logo: '/images/partners/fresh-mgi.png',
    category: 'FMCG & Consumer Staples',
    established: 'Est. 1976',
    dealCount: 2,
    badgeColor: 'border-red-500/30 bg-red-50/60 text-red-800',
    waInquiry: 'Hello AGT, I would like to inquire about bulk corporate supply for Fresh (Meghna Group) products (Soybean Oil, Sugar, etc.).'
  },
  {
    id: 'gacl',
    name: 'GACL (G A Company Limited)',
    tagline: 'Pioneering Healthcare & Cosmetics Formulations',
    logo: '/images/partners/gacl.png',
    category: 'Healthcare & Personal Care',
    established: 'GACO Group',
    dealCount: 1,
    badgeColor: 'border-sky-500/30 bg-sky-50/60 text-sky-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate supply for GACL / GACO products (Gacotouch, personal care).'
  },
  {
    id: 'sti',
    name: 'STI (Smart Trade International)',
    tagline: 'Healthcare Diagnostics & Medical Equipment',
    logo: '/images/partners/sti.png',
    category: 'Healthcare & Diagnostic Devices',
    established: 'Savar, Dhaka',
    dealCount: 2,
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
    dealCount: 2,
    badgeColor: 'border-emerald-500/30 bg-emerald-50/60 text-emerald-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate bulk hampers for Khaas Food products (Mustard Oil, Sundarban Honey).'
  },
  {
    id: 'toktalk',
    name: 'Toktalk (Artisan Gourmet Foods)',
    tagline: 'Artisan Pickles, Gourmet Sauces & Specialty Jams',
    logo: '/images/partners/toktalk.png',
    category: 'Artisan Gourmet Food',
    established: 'Artisan Culinary',
    dealCount: 3,
    badgeColor: 'border-orange-500/30 bg-orange-50/60 text-orange-800',
    waInquiry: 'Hello AGT, I would like to inquire about corporate bulk orders for Toktalk Viral Pickles & Jams.'
  },
  {
    id: 'pulse-dhaka',
    name: 'Pulse Enterprise (Pulse Dhaka)',
    tagline: 'Versatility of Refreshment • Air Fresheners, Perfumes & Personal Care',
    logo: '/images/partners/pulse-dhaka.png',
    category: 'Air Care & Fragrances',
    established: 'Dhaka, Bangladesh',
    dealCount: 2,
    badgeColor: 'border-amber-500/30 bg-amber-50/60 text-amber-800',
    waInquiry: 'Hello AGT, I would like to inquire about bulk corporate supply for Pulse Dhaka / Pulse Enterprise products (Dew Air Fresheners, Pocket Perfumes, etc.).'
  },
];

const hotProducts = [
  {
    id: 'marks-milk',
    brandId: 'abul-khair',
    brandName: 'Abul Khair Group',
    name: 'Marks Full Cream Milk Powder',
    bengaliName: 'মার্কস ফুল ক্রিম মিল্ক পাউডার (প্যান্ট্রি স্পেশাল)',
    tag: 'Corporate Pantry Leader',
    badgeColor: 'border-rose-500/30 bg-rose-50 text-rose-800',
    image: '/images/products/marks-full-cream-milk-powder.webp',
    spec: '500g Poly Pack • 24 Packs Master Carton',
    highlights: ['100% Pure Dairy Nutrition', 'High Calcium & Protein Formula', 'Direct Factory Batch Wholesale'],
    moq: 'MOQ: 5 Master Cartons',
    waInquiry: 'Hello AGT, I would like to inquire about wholesale corporate orders for Marks Full Cream Milk Powder (Abul Khair Group).'
  },
  {
    id: 'fresh-soybean-oil',
    brandId: 'fresh-mgi',
    brandName: 'Fresh (Meghna Group)',
    name: 'Fresh Fortified Soybean Oil (5L Jerrycan)',
    bengaliName: 'ফ্রেশ ফর্টিফাইড সয়াবিন তেল (৫ লিটার)',
    tag: 'Festival & Ration Best-Seller',
    badgeColor: 'border-red-500/30 bg-red-50 text-red-800',
    image: '/images/products/fresh-fortified-soybean-oil.webp',
    spec: '5 Litre Heavy Jerrycan • 4 Cans Master Box',
    highlights: ['Vitamin A & D Enriched', 'BSTI & Halal Quality Tested', 'Ideal for Employee Welfare Rations'],
    moq: 'MOQ: 10 Master Cartons',
    waInquiry: 'Hello AGT, I would like to inquire about bulk institutional supply for Fresh Fortified Soybean Oil 5L (Meghna Group).'
  },
  {
    id: 'toktalk-garlic-pickle',
    brandId: 'toktalk',
    brandName: 'Toktalk Gourmet',
    name: 'Toktalk Viral Garlic Pickle (এক কোয়া রসুনের আচার)',
    bengaliName: 'এক কোয়া রসুনের প্রিমিয়াম আচার (২০০ গ্রাম)',
    tag: 'Viral Social Hit',
    badgeColor: 'border-amber-500/30 bg-amber-50 text-amber-900',
    image: '/images/products/toktalk-garlic-pickle.webp',
    spec: '200g Food-Grade Glass Jar',
    highlights: ['Selected Single-Clove Medicinal Garlic', 'Cold-Pressed Mustard Oil & Spices', 'Top-Requested Corporate Gift Item'],
    moq: 'MOQ: 50 Jars (Gift Box Ready)',
    waInquiry: 'Hello AGT, I would like to inquire about corporate gifting orders for Toktalk Viral Garlic Pickle.'
  },
  {
    id: 'toktalk-beef-pickle',
    brandId: 'toktalk',
    brandName: 'Toktalk Gourmet',
    name: 'Toktalk Authentic Beef Pickle (গরুর মাংসের আচার)',
    bengaliName: 'ঝাল গরুর মাংসের ঐতিহ্যবাহী আচার (২০০ গ্রাম)',
    tag: 'Gourmet High-Demand Pick',
    badgeColor: 'border-orange-500/30 bg-orange-50 text-orange-900',
    image: '/images/products/toktalk-beef-pickle.webp',
    spec: '200g Airtight Glass Jar',
    highlights: ['Slow-Cooked Tender Beef Chunks', 'Authentic Home Recipe & Secret Spices', 'Premium Employee Festive Treat'],
    moq: 'MOQ: 50 Jars',
    waInquiry: 'Hello AGT, I would like to inquire about corporate orders for Toktalk Beef Pickle.'
  },
  {
    id: 'toktalk-pickles-combo',
    brandId: 'toktalk',
    brandName: 'Toktalk Gourmet',
    name: 'Toktalk Artisan Pickles 3-in-1 Combo Box',
    bengaliName: 'টকটক ট্রিপল প্রিমিয়াম আচার কম্বো গিফট বক্স',
    tag: 'B2B Gift Hamper Pick',
    badgeColor: 'border-amber-600/30 bg-amber-50 text-amber-900',
    image: '/images/products/toktalk-pickles-combo.webp',
    spec: 'Garlic + Beef + Tamarind Trio Box',
    highlights: ['3 Viral Flavors in Luxury Box', 'Custom Logo Sticker / Sleeves on Request', 'Corporate Milestone & Event Gift'],
    moq: 'MOQ: 30 Combo Sets',
    waInquiry: 'Hello AGT, I would like to inquire about Toktalk 3-in-1 Artisan Pickles Combo Box for corporate gifting.'
  },
  {
    id: 'sti-bp-machine',
    brandId: 'sti',
    brandName: 'STI (Smart Trade International)',
    name: 'STI Smart Digital Arm Blood Pressure Monitor',
    bengaliName: 'এসটিআই স্মার্ট ডিজিটাল আর্ম প্রেসার মেশিন (বিপি মনিটর)',
    tag: 'Clinical Healthcare Deal',
    badgeColor: 'border-blue-500/30 bg-blue-50 text-blue-900',
    image: '/images/products/sti-sphygmomanometer.webp',
    spec: 'One-Touch Automated Digital Display • Adult Arm Cuff',
    highlights: ['One-Touch Fully Automated Measurement', 'WHO Blood Pressure Classification Scale', 'Doctor PMD Promotional & Clinic Pack'],
    moq: 'MOQ: 20 Units',
    waInquiry: 'Hello AGT, I would like to inquire about bulk procurement for STI Smart Digital Arm Blood Pressure Monitor.'
  },
  {
    id: 'sti-oxygen-flowmeter',
    brandId: 'sti',
    brandName: 'STI (Smart Trade International)',
    name: 'STI Medical Oxygen Flow Meter & Humidifier',
    bengaliName: 'এসটিআই মেডিকেল অক্সিজেন ফ্লো মিটার',
    tag: 'Hospital & Clinic Certified',
    badgeColor: 'border-cyan-500/30 bg-cyan-50 text-cyan-900',
    image: '/images/products/sti-oxygen-flow-meter.webp',
    spec: 'Solid Brass Flow Regulator + Safety Bottle',
    highlights: ['Hospital & Medical Center Certified', 'Precision Flow Tube with Shockproof Guard', 'Institutional Healthcare Tender Supply'],
    moq: 'MOQ: 20 Units',
    waInquiry: 'Hello AGT, I would like to inquire about STI Medical Oxygen Flow Meter wholesale supply.'
  },
  {
    id: 'khaas-mustard-oil',
    brandId: 'khaas-food',
    brandName: 'Khaas Food',
    name: 'Khaas Food Cold-Pressed Mustard Oil (সরিষার তেল)',
    bengaliName: 'খাস ফুড ঘানি ভাঙা খাঁটি সরিষার তেল (১ লিটার)',
    tag: '100% Pure Organic Champion',
    badgeColor: 'border-emerald-500/30 bg-emerald-50 text-emerald-900',
    image: '/images/products/khaas-food-mustard-oil.webp',
    spec: '1 Litre Glass Bottle • Direct Wooden Ghani',
    highlights: ['Traditional Wood-Churned Cold-Pressed', 'Zero Chemicals & Zero Adulteration', 'BSTI Lab Tested Certified Purity'],
    moq: 'MOQ: 24 Bottles',
    waInquiry: 'Hello AGT, I would like to inquire about corporate bulk supply for Khaas Food Pure Mustard Oil.'
  },
  {
    id: 'khaas-sundarban-honey',
    brandId: 'khaas-food',
    brandName: 'Khaas Food',
    name: 'Khaas Food Raw Sundarban Honey (সুন্দরবনের মধু)',
    bengaliName: 'খাস ফুড সুন্দরবনের প্রাকৃতিক বুনো মধু (৫০০ গ্রাম)',
    tag: 'Executive Wellness Gifting',
    badgeColor: 'border-yellow-600/30 bg-yellow-50 text-yellow-900',
    image: '/images/products/khaas-food-sundarban-honey.webp',
    spec: '500g Glass Jar • Raw Unprocessed Honey',
    highlights: ['Sundarban Wildflower Natural Harvest', 'Unheated & Enzyme-Preserved Goodness', 'Luxury VIP Hamper & Health Pack'],
    moq: 'MOQ: 30 Jars',
    waInquiry: 'Hello AGT, I would like to inquire about Khaas Food Raw Sundarban Honey corporate gift hampers.'
  },
  {
    id: 'seylon-green-tea',
    brandId: 'abul-khair',
    brandName: 'Abul Khair Group',
    name: 'Seylon Naturally Smooth Green Tea',
    bengaliName: 'সিলন স্মুথ গ্রিন টি (২৫ টি-ব্যাগ প্যাক)',
    tag: 'Executive Pantry Essential',
    badgeColor: 'border-teal-500/30 bg-teal-50 text-teal-900',
    image: '/images/products/seylon-green-tea.webp',
    spec: '25 Enveloped Tea Bags Box',
    highlights: ['Handpicked Ceylon Tea Leaves', 'Smooth Blend Packed with Antioxidants', 'Corporate Executive Boardroom Staple'],
    moq: 'MOQ: 50 Boxes',
    waInquiry: 'Hello AGT, I would like to inquire about wholesale office supply for Seylon Green Tea (Abul Khair).'
  },
  {
    id: 'fresh-sugar',
    brandId: 'fresh-mgi',
    brandName: 'Fresh (Meghna Group)',
    name: 'Fresh Refined Pure White Sugar',
    bengaliName: 'ফ্রেশ রিফাইন্ড হোয়াইট সুগার (১ কেজি / ৫০ কেজি বস্তা)',
    tag: 'Institutional Volume Ration',
    badgeColor: 'border-red-500/30 bg-red-50 text-red-900',
    image: '/images/products/fresh-refined-sugar.webp',
    spec: '1kg Retail Poly Pack or 50kg Sack',
    highlights: ['Ultra-Refined Sparkling White Crystals', 'Automated Sulfur-Free Refining Process', 'Monthly Corporate Pantry & Cafeteria Ration'],
    moq: 'MOQ: 100 kg Bulk Tier',
    waInquiry: 'Hello AGT, I would like to inquire about institutional sugar supply from Fresh (Meghna Group).'
  },
  {
    id: 'gacotouch-scrub-soap',
    brandId: 'gacl',
    brandName: 'GACL (GACO Group)',
    name: 'Gacotouch Apricot Facial Scrub & Care Line',
    bengaliName: 'গ্যাকোটচ অ্যাপ্রিকট ফেসিয়াল স্ক্রাব ও ট্রিপল অ্যাকশন নিম সোপ',
    tag: 'Institutional Hygiene & Care',
    badgeColor: 'border-sky-500/30 bg-sky-50 text-sky-900',
    image: '/images/products/gacotouch-apricot-scrub.webp',
    spec: '200g Facial Scrub + 100g Antiseptic Soap',
    highlights: ['Natural Crushed Apricot Exfoliating Beads', 'Antibacterial & Deep Cleansing Formula', 'Corporate Hospitality & Guest Kit Supply'],
    moq: 'MOQ: 50 Sets',
    waInquiry: 'Hello AGT, I would like to inquire about Gacotouch / GACL personal care and institutional hygiene supplies.'
  },
  {
    id: 'pulse-dew-air-freshener',
    brandId: 'pulse-dhaka',
    brandName: 'Pulse Dhaka',
    name: 'Dew Fresh Premium Air Freshener (Orange & Citrus)',
    bengaliName: 'ডিউ ফ্রেশ প্রিমিয়াম এয়ার ফ্রেশনার (৩০০ মিলি)',
    tag: 'Office & Facility Essential',
    badgeColor: 'border-amber-500/30 bg-amber-50 text-amber-900',
    image: '/images/products/pulse-dew-air-freshener.webp',
    spec: '300ml Aerosol Spray Can • Master Carton (24 Cans)',
    highlights: ['Long-Lasting Odor Neutralization', 'Premium Citrus & Floral Fragrances', 'Corporate Boardroom & Washroom Supply'],
    moq: 'MOQ: 2 Master Cartons (48 Cans)',
    waInquiry: 'Hello AGT, I would like to inquire about wholesale corporate orders for Dew Air Freshener by Pulse Dhaka.'
  },
  {
    id: 'pulse-dew-pocket-perfume',
    brandId: 'pulse-dhaka',
    brandName: 'Pulse Dhaka',
    name: 'Dew Pocket Perfume – BOLD MAN (Travel & Executive)',
    bengaliName: 'ডিউ পকেট পারফিউম – বোল্ড ম্যান (২০ মিলি)',
    tag: 'Corporate Welcome Kit Pick',
    badgeColor: 'border-purple-500/30 bg-purple-50 text-purple-900',
    image: '/images/products/pulse-dew-pocket-perfume.webp',
    spec: '20ml Slim Pocket Spray (250+ Sprays)',
    highlights: ['Ultra-Compact Pocket & Bag Friendly', 'Long-Lasting Masculine Luxury Notes', 'Conference Kit & Employee Welcome Pack Pick'],
    moq: 'MOQ: 50 Units',
    waInquiry: 'Hello AGT, I would like to inquire about corporate gifting orders for Dew Pocket Perfume by Pulse Dhaka.'
  }
];

export default function AuthorizedDistributorPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const brandTabs = [
    { id: 'all', label: 'All Hot Deals', count: 14 },
    { id: 'pulse-dhaka', label: 'Pulse Dhaka', count: 2 },
    { id: 'fresh-mgi', label: 'Fresh (MGI)', count: 2 },
    { id: 'abul-khair', label: 'Abul Khair', count: 2 },
    { id: 'toktalk', label: 'Toktalk Gourmet', count: 3 },
    { id: 'sti', label: 'STI Medical', count: 2 },
    { id: 'khaas-food', label: 'Khaas Food', count: 2 },
    { id: 'gacl', label: 'GACL Healthcare', count: 1 },
  ];

  const filteredProducts = selectedBrandFilter === 'all'
    ? hotProducts
    : hotProducts.filter(p => p.brandId === selectedBrandFilter);

  const handleOpenQuote = (item = null) => {
    if (item && item.brandId) {
      setSelectedPartner({
        name: `Wholesale Deal: ${item.name} (${item.brandName})`,
        category: item.spec,
        code: item.id.toUpperCase(),
        image: { url: item.image }
      });
    } else if (item) {
      setSelectedPartner({
        name: `Authorized Sourcing: ${item.name}`,
        category: item.category,
        code: item.id.toUpperCase(),
        image: { url: item.logo }
      });
    } else {
      setSelectedPartner(null);
    }
    setIsQuoteOpen(true);
  };

  const handleFilterBrand = (brandId) => {
    setSelectedBrandFilter(brandId);
    const el = document.getElementById('hot-deals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-navy-950 relative selection:bg-gold-500 selection:text-white">
      {/* Header Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      <main className="flex-1">
        
        {/* =========================================================================
            1. HERO SECTION: Luxury Deep Petrol Teal Aesthetic
            ========================================================================= */}
        <section className="relative w-full bg-[#003e4a] border-b border-teal-400/20 shadow-xl overflow-hidden py-12 sm:py-16 lg:py-20 text-white">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-200/80 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Authorized Distribution</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-teal-100 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-xs mb-4 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>OFFICIAL CORPORATE DISTRIBUTION PARTNERS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
              Authorized Corporate Distributor for{' '}
              <span className="text-amber-300 block sm:inline">
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

        {/* =========================================================================
            2. BRAND SHOWCASE GRID: Clean, Big Logo Cards
            ========================================================================= */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-gold-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>OFFICIAL PORTFOLIO</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
                Authorized Distribution Partners
              </h2>
              <p className="text-sm text-navy-700 mt-1 max-w-xl">
                Explore the premier brands distributed by AGT for corporate gifting, institutional pantry supply, and large-scale enterprise procurement.
              </p>
            </div>

            <div className="text-xs font-bold text-navy-700 px-4 py-2 rounded-full bg-cream-200 border border-gold-500/20 w-fit">
              Showing {partners.length} Official Brands
            </div>
          </div>

          {/* Cards Grid */}
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

                    {/* Shortcut to Brand's Hot Deals */}
                    <button
                      onClick={() => handleFilterBrand(partner.id)}
                      className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-2xs"
                    >
                      <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                      <span>{partner.dealCount} Hot Deal Items Available</span>
                    </button>
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

        {/* =========================================================================
            3. NEW: VIRAL PRODUCTS & HOT DEALS SHOWCASE
            ========================================================================= */}
        <section id="hot-deals" className="py-14 sm:py-20 bg-cream-150/70 border-t border-gold-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>VIRAL HIT &amp; FACTORY DIRECT DEALS</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 font-serif tracking-tight">
                  Hot Deals &amp; Trending Products
                </h2>
                <p className="mt-2 text-sm sm:text-base text-navy-700 max-w-2xl leading-relaxed">
                  High-velocity corporate favorites, viral social bestsellers, and monthly institutional pantry supplies from our authorized brands — directly from factory warehouses with wholesale tier pricing.
                </p>
              </div>

              {/* View Counter Badge */}
              <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-gold-500/25 shadow-2xs text-xs font-bold text-navy-900">
                <PackageCheck className="w-4 h-4 text-emerald-600" />
                <span>Showing {filteredProducts.length} Hot Deal Items</span>
              </div>
            </div>

            {/* Brand Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
              {brandTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedBrandFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    selectedBrandFilter === tab.id
                      ? 'bg-navy-950 text-white shadow-md ring-1 ring-gold-500/50'
                      : 'bg-white text-navy-800 hover:bg-cream-100 border border-gold-500/20 shadow-2xs'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedBrandFilter === tab.id ? 'bg-amber-400 text-navy-950 font-extrabold' : 'bg-cream-200 text-navy-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Hot Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const productWa = `https://wa.me/8801787239863?text=${encodeURIComponent(product.waInquiry)}`;

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gold-500/25 p-5 shadow-cream-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
                  >
                    <div>
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold text-navy-700 bg-cream-100 px-2 py-0.5 rounded-full border border-cream-200 truncate max-w-[130px]">
                          {product.brandName}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${product.badgeColor} flex items-center gap-1 shrink-0`}>
                          <Flame className="w-2.5 h-2.5 fill-current" />
                          <span>{product.tag}</span>
                        </span>
                      </div>

                      {/* Product Photo Showcase */}
                      <div className="relative w-full h-48 sm:h-52 rounded-xl bg-cream-50/80 border border-cream-200/80 overflow-hidden flex items-center justify-center p-3 mb-3 group-hover:border-gold-500/40 transition-colors">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-contain p-2.5 transition-transform duration-300 group-hover:scale-105"
                          priority
                        />
                      </div>

                      {/* Title & Bengali Tagline */}
                      <h3 className="text-base font-bold text-navy-950 font-serif leading-snug line-clamp-2 group-hover:text-gold-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs font-medium text-gold-700/90 mt-1">
                        {product.bengaliName}
                      </p>

                      {/* Specification & MOQ */}
                      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                        <span className="bg-cream-100 text-navy-800 font-semibold px-2 py-0.5 rounded-md border border-cream-200">
                          {product.spec}
                        </span>
                        <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-400/30">
                          {product.moq}
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul className="mt-3 space-y-1 border-t border-cream-200/70 pt-2.5">
                        {product.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] text-navy-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="mt-4 pt-3 border-t border-cream-200 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenQuote(product)}
                        className="gold-btn py-2 px-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all"
                      >
                        <span>Wholesale RFQ</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </button>

                      <a
                        href={productWa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            4. CORPORATE ADVANTAGE SECTION
            ========================================================================= */}
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

        {/* =========================================================================
            5. CORPORATE RATE CARD CALL TO ACTION
            ========================================================================= */}
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
