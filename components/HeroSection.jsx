'use client';

import Image from 'next/image';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare, 
  Phone, 
  Factory, 
  ShieldCheck, 
  Truck, 
  Palette,
  PackageCheck,
  Clock
} from 'lucide-react';

export default function HeroSection({ onOpenQuote }) {
  const waHeroUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    'Hello Abdullah Global Trade, I am looking for corporate merchandise & custom promotional sourcing for our company. Please share your catalog and bulk quotation details.'
  )}`;

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-2 pb-8 sm:pb-12 max-w-7xl mx-auto">
      
      {/* Grand Panoramic B2B Hero Showcase Banner (BS Factory Inspired - Luxury Elevated) */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#071224] border border-gold-500/35 shadow-2xl overflow-hidden min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between">
        
        {/* Panoramic Studio Merchandise Background (Right Anchored) */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/hero-corporate-showcase.webp"
            alt="Corporate Merchandise Showcase"
            fill
            priority
            className="object-cover object-right lg:object-center opacity-40 sm:opacity-55 lg:opacity-85 select-none"
          />
          {/* Deep Navy Radial & Linear Gradient Overlays for Razor-Sharp Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071224] via-[#071224]/80 to-transparent lg:hidden" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#071224] via-[#071224]/85 to-transparent w-full" />
          <div className="absolute inset-0 hidden xl:block bg-gradient-to-r from-[#071224] via-[#071224]/90 to-transparent w-3/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content Fold */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex-1 flex flex-col justify-center max-w-2xl lg:max-w-3xl">
          
          {/* Pre-header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-400/40 text-gold-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-xs mb-4 w-fit backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>FROM VISION TO VALUE | B2B CORPORATE SOURCING</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.12]">
            Your Trusted Partner in{' '}
            <span className="gold-gradient-text block mt-1 sm:mt-2">
              Global Corporate Sourcing
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-cream-200/90 leading-relaxed font-normal max-w-xl">
            From vision to verified value – reliable end-to-end merchandise solutions, bespoke executive gift sets, and custom-branded collateral for modern enterprises and pharmaceutical brands.
          </p>

          {/* 4-Item Corporate Value Proposition Checklist */}
          <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-lg">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-navy-950/75 border border-gold-500/25 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium text-cream-100">Custom Logo &amp; Laser Engraving</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-navy-950/75 border border-gold-500/25 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium text-cream-100">Direct Factory Sourcing (Zero Markup)</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-navy-950/75 border border-gold-500/25 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium text-cream-100">Pre-Production Physical Sampling</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-navy-950/75 border border-gold-500/25 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium text-cream-100">Expedited Doorstep Delivery</span>
            </div>
          </div>

          {/* CTA Action Hub & Hotline */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary Quote Trigger */}
            <button
              onClick={onOpenQuote}
              className="gold-btn py-3 sm:py-3.5 px-6 sm:px-7 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-gold-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Request Corporate Quote</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary Direct WhatsApp B2B */}
            <a
              href={waHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 sm:py-3.5 px-5 rounded-xl border border-emerald-500/40 bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>

            {/* Direct Hotline Badge */}
            <a
              href="tel:+8801787239863"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-cream-200/90 hover:text-gold-300 transition-colors px-3 py-2 rounded-lg bg-navy-900/60 border border-gold-500/20 backdrop-blur-sm"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>+880 1787 239 863</span>
            </a>
          </div>

        </div>

        {/* Bottom Integrated Trust Strip (Inside Grand Banner) */}
        <div className="relative z-10 border-t border-gold-500/20 bg-navy-950/80 backdrop-blur-md px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 shrink-0">
              <Factory className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Direct Factory Sourcing</h4>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 leading-tight">Wholesale factory pricing.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <PackageCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Pre-Production Sampling</h4>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 leading-tight">100% physical proof approval.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 shrink-0">
              <Palette className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Custom Brand Imprint</h4>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 leading-tight">Laser engraving &amp; UV printing.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
              <Truck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs sm:text-[13px] font-bold text-white">Nationwide Delivery</h4>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 leading-tight">Insured doorstep corporate logistics.</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
