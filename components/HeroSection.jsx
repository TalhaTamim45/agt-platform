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
  Clock,
  Sparkle
} from 'lucide-react';

export default function HeroSection({ onOpenQuote }) {
  const waHeroUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    'Hello Abdullah Global Trade, I am looking for corporate merchandise & custom promotional sourcing for our company. Please share your catalog and bulk quotation details.'
  )}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-emerald-400/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (58% on Desktop): Brand Narrative, Title, Value Prop & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Pre-header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-gold-500/35 text-gold-800 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-2xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>FROM VISION TO VALUE | B2B CORPORATE SOURCING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-navy-950 leading-[1.15]">
              Your Trusted Partner in{' '}
              <span className="gold-gradient-text block mt-1 sm:mt-2">
                Global Corporate Sourcing
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-navy-800/80 max-w-2xl leading-relaxed font-medium">
              From vision to verified value – reliable end-to-end merchandise solutions, bespoke gift sets, and custom-branded collateral for modern enterprises and pharmaceutical brands.
            </p>

            {/* 4-Item Corporate Value Proposition Checklist */}
            <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-xl text-left">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-cream-300 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-navy-900">Custom Logo & Laser Engraving</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-cream-300 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-navy-900">Direct Factory Sourcing (Zero Markup)</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-cream-300 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-navy-900">Pre-Production Physical Sampling</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-cream-300 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-navy-900">Expedited Doorstep Delivery</span>
              </div>
            </div>

            {/* Action Buttons Hub & Hotline */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              {/* Primary Quote Trigger */}
              <button
                onClick={onOpenQuote}
                className="gold-btn py-3 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-cream-md hover:shadow-cream-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Corporate Quote</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              {/* Secondary Direct WhatsApp B2B */}
              <a
                href={waHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl border border-emerald-600/35 bg-white text-emerald-800 hover:bg-emerald-50/80 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>

              {/* Direct Hotline Pill */}
              <a
                href="tel:+8801787239863"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-navy-900/85 hover:text-gold-700 transition-colors px-3 py-2 rounded-lg bg-cream-50/90 border border-cream-200"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>+880 1787 239 863</span>
              </a>
            </div>

          </div>

          {/* Right Column (42% on Desktop): Luxury Staged Corporate Gift Showcase */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-[#faf8f5] to-[#f5f0e6]/70 border border-gold-500/30 p-5 sm:p-7 shadow-cream-lg overflow-hidden group">
              
              {/* Internal Radiant Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,223,170,0.3),rgba(255,255,255,0))] pointer-events-none" />

              {/* Floating Top Badge: Factory Direct Guarantee */}
              <div className="flex items-center justify-between gap-2 relative z-10 mb-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-navy-950 text-gold-400 border border-gold-500/30 tracking-wider shadow-xs">
                  FLAGSHIP SHOWCASE
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-600/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  MOQ 50 pcs Ready
                </span>
              </div>

              {/* Staged Product Cluster (3 Featured Products) */}
              <div className="relative h-64 sm:h-72 w-full flex items-center justify-center my-2">
                
                {/* Secondary Left Asset: Executive Desk Organizer (AGT-118) */}
                <div className="absolute left-0 bottom-2 w-32 sm:w-40 z-10 opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-x-1">
                  <Image
                    src="/images/products/stationery-organizer-2027-calendar.webp"
                    alt="Desk Organizer & Flip Calendar"
                    width={850}
                    height={676}
                    className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(12,31,59,0.22)] select-none pointer-events-none"
                    priority
                  />
                  <div className="w-24 h-2 rounded-[100%] bg-navy-950/25 blur-xs mx-auto mt-1" />
                </div>

                {/* Main Foreground Asset: Luxury Stainless Vacuum Flask (AGT-80) with YOUR LOGO badge */}
                <div className="relative z-20 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <div className="relative w-28 sm:w-36 h-48 sm:h-56">
                    <Image
                      src="/images/products/portable-vacuum-flask-450.webp"
                      alt="Stainless Corporate Tumbler"
                      width={374}
                      height={729}
                      className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(12,31,59,0.32)] select-none pointer-events-none"
                      priority
                    />
                    
                    {/* "YOUR LOGO" Custom Imprint Indicator Pill */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-navy-950/90 backdrop-blur-xs text-gold-400 border border-gold-400/50 px-2.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase shadow-md pointer-events-none animate-pulse">
                      YOUR LOGO HERE
                    </div>
                  </div>

                  {/* Reactive Ground Shadow */}
                  <div className="w-24 sm:w-32 h-3 rounded-[100%] bg-navy-950/35 blur-sm mt-1" />
                </div>

                {/* Secondary Right Asset: Luxury Embossed Gold Chocolate (AGT-126) */}
                <div className="absolute right-0 bottom-2 w-28 sm:w-36 z-10 opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:translate-x-1">
                  <Image
                    src="/images/products/cocoa-lab-gold-birthday-chocolate.webp"
                    alt="Luxury Gold Embossed Box"
                    width={505}
                    height={736}
                    className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(12,31,59,0.25)] select-none pointer-events-none"
                    priority
                  />
                  <div className="w-20 h-2 rounded-[100%] bg-navy-950/25 blur-xs mx-auto mt-1" />
                </div>

              </div>

              {/* Bottom Showcase Trust Badges */}
              <div className="mt-3 pt-3 border-t border-cream-200/90 flex items-center justify-between gap-1 text-[10px] sm:text-[11px] text-navy-800/90 font-semibold relative z-10">
                <span className="flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>Laser &amp; UV Print</span>
                </span>
                <span className="text-cream-300">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>7–10 Days Delivery</span>
                </span>
                <span className="text-cream-300">•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span>QC Inspected</span>
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Metric B2B Enterprise Trust Strip (Immediately Below Hero) */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-gold-500/20">
          
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-cream-200/90 shadow-2xs hover:border-gold-500/40 transition-colors">
            <div className="p-2 rounded-lg bg-gold-50 text-gold-700 shrink-0 mt-0.5">
              <Factory className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-navy-950">Direct Factory Sourcing</h4>
              <p className="text-[10px] sm:text-xs text-navy-700/75 mt-0.5 leading-snug">Zero middleman markup with wholesale factory rates.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-cream-200/90 shadow-2xs hover:border-gold-500/40 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
              <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-navy-950">Pre-Production Sampling</h4>
              <p className="text-[10px] sm:text-xs text-navy-700/75 mt-0.5 leading-snug">Physical proof approval before bulk mass production.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-cream-200/90 shadow-2xs hover:border-gold-500/40 transition-colors">
            <div className="p-2 rounded-lg bg-gold-50 text-gold-700 shrink-0 mt-0.5">
              <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-navy-950">Custom Precision Branding</h4>
              <p className="text-[10px] sm:text-xs text-navy-700/75 mt-0.5 leading-snug">Laser engraving, UV printing &amp; blind deboss.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/80 border border-cream-200/90 shadow-2xs hover:border-gold-500/40 transition-colors">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-navy-950">Reliable Doorstep Delivery</h4>
              <p className="text-[10px] sm:text-xs text-navy-700/75 mt-0.5 leading-snug">Secure insured logistics for conferences &amp; offices.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
