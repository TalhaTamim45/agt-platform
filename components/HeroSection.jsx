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
    id: 'tech-drinkware',
    label: 'Custom Executive Bags & Smart Drinkware',
    image: '/images/hero-corporate-teal.webp',
    badge: 'FROM VISION TO VALUE | B2B CORPORATE SOURCING',
  },
  {
    id: 'apparel-desk',
    label: 'Corporate Apparel & Executive Desk Tech',
    image: '/images/hero-slide-apparel.webp',
    badge: 'BESPOKE BRAND MERCHANDISE | FACTORY DIRECT',
  },
  {
    id: 'vip-luxury',
    label: 'Prestige VIP Corporate Gift Sets',
    image: '/images/hero-slide-vip.webp',
    badge: 'LUXURY EXECUTIVE GIFTING | VERIFIED QUALITY',
  },
];

export default function HeroSection({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const waHeroUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    'Hello Abdullah Global Trade, I am looking for corporate merchandise & custom promotional sourcing for our company. Please share your catalog and bulk quotation details.'
  )}`;

  // Automatic smooth slide rotation every 5.5 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
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
      className="relative w-full bg-[#00505f] border-b border-teal-400/25 shadow-xl overflow-hidden mb-4 sm:mb-6"
    >
      
      {/* 100% Edge-to-Edge Panoramic Studio Merchandise Backgrounds (Smooth Crossfade) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Dedicated Right-Aligned Visual Area: object-contain ensures ZERO product/bag clipping at the top */}
            <div className="absolute inset-y-0 right-0 w-full sm:w-[75%] lg:w-[62%] xl:w-[56%] h-full">
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                priority={index === 0}
                className="object-contain object-right-bottom sm:object-right select-none"
              />
            </div>

            {/* Seamless Left Petrol Teal Gradient Overlay for Razor-Sharp Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00505f] via-[#00505f]/80 to-transparent lg:hidden" />
            <div className="absolute inset-y-0 left-0 hidden lg:block bg-gradient-to-r from-[#00505f] via-[#00505f]/95 to-transparent w-[55%] pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows (BS Factory Carousel Style) */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 top-[48%] -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg group"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 top-[48%] -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg group"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Central Content Container: Balanced Luxury Height (Fits 1st Screen Cleanly) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 lg:pt-10 pb-5 sm:pb-7 min-h-[440px] sm:min-h-[480px] lg:min-h-[500px] flex flex-col justify-center">
        
        <div className="max-w-xl lg:max-w-2xl">
          {/* Pre-header Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-teal-100 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-xs mb-3 w-fit backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{active.badge}</span>
          </div>

          {/* Main Headline - Crisp Pure White */}
          <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.12]">
            Your Trusted Partner in{' '}
            <span className="block mt-1 sm:mt-1.5 text-white">
              Global Corporate Sourcing
            </span>
          </h1>

          {/* Subtitle - Crisp High Contrast */}
          <p className="mt-3 sm:mt-3.5 text-sm sm:text-base lg:text-[15px] text-teal-50/95 leading-relaxed font-normal max-w-xl">
            From vision to verified value – reliable end-to-end merchandise solutions, bespoke executive gift sets, and custom-branded collateral for modern enterprises and pharmaceutical brands.
          </p>

          {/* 4-Item Corporate Value Proposition Checklist */}
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-lg">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Custom Logo &amp; Laser Engraving</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Direct Factory Sourcing (Zero Markup)</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Pre-Production Physical Sampling</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="text-xs sm:text-[13px] font-semibold text-white">Expedited Doorstep Delivery</span>
            </div>
          </div>

          {/* CTA Action Hub & Hotline */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
            {/* Primary Quote Trigger */}
            <button
              onClick={onOpenQuote}
              className="gold-btn py-2.5 sm:py-3 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-gold-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Request Corporate Quote</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary Direct WhatsApp B2B */}
            <a
              href={waHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 sm:py-3 px-5 rounded-xl border border-emerald-400/50 bg-emerald-600/30 hover:bg-emerald-600/50 text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>WhatsApp Desk</span>
            </a>

            {/* Direct Hotline Badge */}
            <a
              href="tel:+8801787239863"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-white hover:text-amber-200 transition-colors px-3.5 py-2 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20 backdrop-blur-md"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>+880 1787 239 863</span>
            </a>
          </div>

        </div>

      </div>

      {/* Clean Minimal Slider Indicator Dots */}
      <div className="relative z-10 flex items-center justify-center gap-2 pb-2.5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              index === currentSlide 
                ? 'w-6 bg-white shadow-sm' 
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Bottom Integrated Trust Strip: Full Width Compact Bar */}
      <div className="relative z-10 w-full border-t border-teal-400/20 bg-[#003d49]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <Factory className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">Direct Factory Sourcing</h4>
              <p className="text-[10px] text-teal-100/75 leading-tight">Wholesale factory pricing.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">Pre-Production Sampling</h4>
              <p className="text-[10px] text-teal-100/75 leading-tight">100% physical proof approval.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <Palette className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">Custom Brand Imprint</h4>
              <p className="text-[10px] text-teal-100/75 leading-tight">Laser engraving &amp; UV printing.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">Nationwide Delivery</h4>
              <p className="text-[10px] text-teal-100/75 leading-tight">Insured doorstep logistics.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
