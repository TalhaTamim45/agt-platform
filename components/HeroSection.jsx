'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare, 
  Phone, 
  Factory, 
  Truck, 
  Palette,
  PackageCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const slides = [
  {
    id: 'sapphire-blue',
    label: 'Sapphire Royal Blue',
    image: '/images/hero-corporate-showcase.webp',
    bgColor: '#012ca6',
    gradientFrom: 'from-[#012ca6]',
    gradientVia: 'via-[#012ca6]/85',
    trustBarBg: 'bg-[#001f78]/90',
    dotColor: 'bg-blue-400',
    badgeText: 'FROM VISION TO VALUE | B2B CORPORATE SOURCING',
  },
  {
    id: 'petrol-teal',
    label: 'Deep Petrol Teal',
    image: '/images/hero-corporate-teal.webp',
    bgColor: '#006c80',
    gradientFrom: 'from-[#006c80]',
    gradientVia: 'via-[#006c80]/85',
    trustBarBg: 'bg-[#004754]/90',
    dotColor: 'bg-teal-300',
    badgeText: 'BESPOKE BRAND MERCHANDISE | FACTORY DIRECT',
  },
  {
    id: 'golden-amber',
    label: 'Executive Golden Amber',
    image: '/images/hero-corporate-amber.webp',
    bgColor: '#8c4e03',
    gradientFrom: 'from-[#8c4e03]',
    gradientVia: 'via-[#8c4e03]/85',
    trustBarBg: 'bg-[#5c3202]/90',
    dotColor: 'bg-amber-400',
    badgeText: 'PRESTIGE CORPORATE GIFTING | VIP SOLUTIONS',
  },
];

export default function HeroSection({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const waHeroUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    'Hello Abdullah Global Trade, I am looking for corporate merchandise & custom promotional sourcing for our company. Please share your catalog and bulk quotation details.'
  )}`;

  // Auto-play rotating carousel with pause-on-hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: active.bgColor }}
      className="relative w-full border-b border-white/15 shadow-2xl overflow-hidden mb-6 sm:mb-10 transition-colors duration-1000 ease-in-out"
    >
      
      {/* 100% Edge-to-Edge Panoramic Studio Backgrounds (Smooth Crossfade) */}
      <div className="absolute inset-0 pointer-events-none">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              priority={index === 0}
              className="object-cover object-right select-none"
            />
            {/* Soft Left-Only Gradient Overlay for Flawless Text Legibility Without Washing Out Products */}
            <div className={`absolute inset-0 bg-gradient-to-t ${slide.gradientFrom} ${slide.gradientVia} to-transparent lg:hidden`} />
            <div className={`absolute inset-y-0 left-0 hidden lg:block bg-gradient-to-r ${slide.gradientFrom} ${slide.gradientVia} to-transparent w-[55%] pointer-events-none`} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows (BS Factory Carousel Style) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl group"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl group"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Central Content Container: Aligned with Max-W-7xl */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] flex flex-col justify-center">
        
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Pre-header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm mb-4 w-fit backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{active.badgeText}</span>
          </div>

          {/* Main Headline - Crisp Pure White */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.12]">
            Your Trusted Partner in{' '}
            <span className="block mt-1 sm:mt-2 text-white">
              Global Corporate Sourcing
            </span>
          </h1>

          {/* Subtitle - Crisp High Contrast */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-blue-50/95 leading-relaxed font-normal max-w-xl">
            From vision to verified value – reliable end-to-end merchandise solutions, bespoke executive gift sets, and custom-branded collateral for modern enterprises and pharmaceutical brands.
          </p>

          {/* 4-Item Corporate Value Proposition Checklist */}
          <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-lg">
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Custom Logo &amp; Laser Engraving</span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Direct Factory Sourcing (Zero Markup)</span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Pre-Production Physical Sampling</span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Expedited Doorstep Delivery</span>
            </div>
          </div>

          {/* CTA Action Hub & Hotline */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary Quote Trigger */}
            <button
              onClick={onOpenQuote}
              className="gold-btn py-3 sm:py-3.5 px-6 sm:px-7 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-gold-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Request Corporate Quote</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary Direct WhatsApp B2B */}
            <a
              href={waHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 sm:py-3.5 px-5 rounded-xl border border-emerald-400/50 bg-emerald-600/30 hover:bg-emerald-600/50 text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp Desk</span>
            </a>

            {/* Direct Hotline Badge */}
            <a
              href="tel:+8801787239863"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white hover:text-amber-200 transition-colors px-3.5 py-2.5 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20 backdrop-blur-md"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>+880 1787 239 863</span>
            </a>
          </div>

        </div>

      </div>

      {/* Floating Theme Selector / Slide Indicators (BS Factory Style Dots) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-lg">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 mr-1 hidden sm:inline">Theme:</span>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Select ${slide.label}`}
              className={`transition-all duration-300 rounded-full flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold ${
                index === currentSlide
                  ? 'bg-white text-navy-950 font-bold shadow-md scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${slide.dotColor}`} />
              <span>{slide.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Carousel Slide Counter */}
        <div className="text-xs font-bold text-white/70 px-3 py-1 rounded-full bg-black/30 border border-white/15 backdrop-blur-sm">
          0{currentSlide + 1} / 0{slides.length}
        </div>
      </div>

      {/* Bottom Integrated Trust Strip: Full Width Bar with Centered Grid */}
      <div 
        style={{ backgroundColor: active.bgColor }} 
        className="relative z-10 w-full border-t border-white/15 bg-black/25 backdrop-blur-md transition-colors duration-1000 ease-in-out"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white shrink-0">
              <Factory className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Direct Factory Sourcing</h4>
              <p className="text-[10px] sm:text-[11px] text-blue-100/80 leading-tight">Wholesale factory pricing.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white shrink-0">
              <PackageCheck className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Pre-Production Sampling</h4>
              <p className="text-[10px] sm:text-[11px] text-blue-100/80 leading-tight">100% physical proof approval.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white shrink-0">
              <Palette className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Custom Brand Imprint</h4>
              <p className="text-[10px] sm:text-[11px] text-blue-100/80 leading-tight">Laser engraving &amp; UV printing.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white shrink-0">
              <Truck className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Nationwide Delivery</h4>
              <p className="text-[10px] sm:text-[11px] text-blue-100/80 leading-tight">Insured doorstep corporate logistics.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
