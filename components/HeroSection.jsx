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
    image: '/images/hero-pano-slide1.webp',
    badge: 'FROM VISION TO VALUE | B2B CORPORATE SOURCING',
  },
  {
    id: 'apparel-desk',
    label: 'Corporate Apparel & Executive Desk Tech',
    image: '/images/hero-pano-slide2.webp',
    badge: 'BESPOKE BRAND MERCHANDISE | FACTORY DIRECT',
  },
  {
    id: 'vip-luxury',
    label: 'Prestige VIP Corporate Gift Sets',
    image: '/images/hero-pano-slide3.webp',
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
      className="relative w-full bg-[#003e4a] border-b border-teal-400/20 shadow-2xl overflow-hidden mb-4 sm:mb-6"
    >
      
      {/* =========================================================================
          1. DESKTOP / TABLET HERO (lg:block) - 100% Unchanged Full-Bleed Panoramic
          ========================================================================= */}
      <div className="hidden lg:block relative w-full">
        {/* Full-Bleed Studio Backgrounds */}
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
                className="object-cover object-bottom select-none"
              />
              {/* Desktop Left-to-Right Ambient Petrol Gradient */}
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#003e4a] via-[#003e4a]/85 to-transparent w-[50%] pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Desktop Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 top-[48%] -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl group"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 top-[48%] -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/35 hover:bg-black/60 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl group"
        >
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Desktop Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-10 lg:pt-12 pb-8 min-h-[500px] lg:min-h-[530px] flex flex-col justify-center">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Pre-header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-teal-100 text-xs font-bold uppercase tracking-widest shadow-xs mb-3.5 w-fit backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{active.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.12]">
              Your Trusted Partner in{' '}
              <span className="block mt-1.5 text-white">
                Global Corporate Sourcing
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 text-base lg:text-[15px] text-teal-50/95 leading-relaxed font-normal max-w-xl">
              From vision to verified value – reliable end-to-end merchandise solutions, bespoke executive gift sets, and custom-branded collateral for modern enterprises and pharmaceutical brands.
            </p>

            {/* 4-Item Corporate Value Proposition Checklist */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 w-full max-w-lg">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-[13px] font-semibold text-white">Custom Logo &amp; Laser Engraving</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-[13px] font-semibold text-white">Direct Factory Sourcing (Zero Markup)</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-[13px] font-semibold text-white">Pre-Production Physical Sampling</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-[13px] font-semibold text-white">Expedited Doorstep Delivery</span>
              </div>
            </div>

            {/* CTA Action Hub & Hotline */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuote}
                className="gold-btn py-3 px-6 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-gold-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Corporate Quote</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              <a
                href={waHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl border border-emerald-400/50 bg-emerald-600/30 hover:bg-emerald-600/50 text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href="tel:+8801787239863"
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white hover:text-amber-200 transition-colors px-3.5 py-2.5 rounded-xl bg-white/15 border border-white/25 hover:bg-white/20 backdrop-blur-md"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>+880 1787 239 863</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Indicator Dots */}
        <div className="relative z-10 flex items-center justify-center gap-2 pb-3">
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
      </div>

      {/* =========================================================================
          2. MOBILE / TABLET HERO (lg:hidden) - Tailored Visual Showcase & High Contrast
          ========================================================================= */}
      <div className="block lg:hidden w-full flex flex-col">
        
        {/* Upper Visual Stage: Dedicated Product Slider Window (Uncropped, vibrant & focused on merchandise) */}
        <div className="relative w-full h-[220px] sm:h-[260px] bg-[#002f38] overflow-hidden border-b border-teal-400/20">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.label}
                fill
                priority={index === 0}
                className="object-cover object-[80%_center] select-none"
              />
              {/* Subtle Vignette on edges so products pop cleanly */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#003e4a] via-transparent to-black/20 pointer-events-none" />
            </div>
          ))}

          {/* Floating Product Category Pill */}
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 border border-white/20 text-teal-100 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>{active.label}</span>
          </div>

          {/* Compact Mobile Prev/Next Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 text-white/90 border border-white/20 backdrop-blur-md shadow-md active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 text-white/90 border border-white/20 backdrop-blur-md shadow-md active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide Indicator Dots overlay on image */}
          <div className="absolute bottom-2.5 inset-x-0 z-10 flex items-center justify-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  index === currentSlide 
                    ? 'w-5 bg-white shadow-sm' 
                    : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Lower Content Area: Crisp Copy & Easy Touch Buttons */}
        <div className="p-4 sm:p-6 bg-[#003e4a] text-white flex flex-col">
          {/* Trust Tag */}
          <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>B2B CORPORATE SOURCING &amp; MERCHANDISE</span>
          </div>

          {/* Mobile Headline */}
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
            Your Trusted Partner in Global Corporate Sourcing
          </h1>

          {/* Mobile Subtitle */}
          <p className="mt-1.5 text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
            From vision to verified value – reliable end-to-end merchandise, bespoke executive gift hampers, and custom-branded collateral.
          </p>

          {/* Mobile CTA Stack */}
          <div className="mt-4 flex flex-col gap-2.5">
            {/* Primary Gold RFQ Button */}
            <button
              onClick={onOpenQuote}
              className="gold-btn py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] w-full"
            >
              <span>Request Corporate Quote</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary Action Row: WhatsApp & Hotline */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={waHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl border border-emerald-400/50 bg-emerald-600/30 active:bg-emerald-600/50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs backdrop-blur-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+8801787239863"
                className="py-2 px-3 rounded-xl border border-white/20 bg-white/10 active:bg-white/20 text-white text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-xs backdrop-blur-md"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          3. BOTTOM INTEGRATED TRUST STRIP (Common across PC & Mobile)
          ========================================================================= */}
      <div className="relative z-10 w-full border-t border-teal-400/20 bg-[#002b33]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <Factory className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">Direct Factory Sourcing</h4>
              <p className="text-[9px] sm:text-[10px] text-teal-100/75 leading-tight">Wholesale factory pricing.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">Pre-Production Sampling</h4>
              <p className="text-[9px] sm:text-[10px] text-teal-100/75 leading-tight">100% physical proof approval.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <Palette className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">Custom Brand Imprint</h4>
              <p className="text-[9px] sm:text-[10px] text-teal-100/75 leading-tight">Laser engraving &amp; UV printing.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 border border-white/20 text-white shrink-0">
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">Nationwide Delivery</h4>
              <p className="text-[9px] sm:text-[10px] text-teal-100/75 leading-tight">Insured doorstep logistics.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
