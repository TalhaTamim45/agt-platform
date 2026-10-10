'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Factory } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  const heroImageRef = useRef(null);
  const heroShadowRef = useRef(null);
  const heroContainerRef = useRef(null);

  useEffect(() => {
    if (!heroImageRef.current || !heroShadowRef.current) return;

    // GSAP Floating Physics for the Hero Product
    const floatAnim = gsap.to(heroImageRef.current, {
      y: -22,
      rotationZ: 2.8,
      rotationX: 3.5,
      duration: 3.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    const shadowAnim = gsap.to(heroShadowRef.current, {
      scale: 0.82,
      opacity: 0.35,
      filter: 'blur(22px)',
      duration: 3.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      floatAnim.kill();
      shadowAnim.kill();
    };
  }, []);

  // 3D Perspective Mouse Hover Physics
  const handleMouseMove = (e) => {
    if (!heroContainerRef.current || !heroImageRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(heroImageRef.current, {
      rotationY: (x / rect.width) * 22,
      rotationX: (-y / rect.height) * 22,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!heroImageRef.current) return;
    gsap.to(heroImageRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Background Decorative Rings in Warm Gold & Champagne */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-1/6 w-[450px] h-[450px] bg-cream-300/40 rounded-full blur-2xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-50 border border-gold-500/35 text-gold-700 text-xs font-bold uppercase tracking-widest shadow-cream-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>FROM VISION TO VALUE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 leading-tight">
              Premium Corporate Sourcing for{' '}
              <span className="gold-gradient-text block mt-1">
                Pharmaceutical PMDs
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-lg text-navy-800/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Empowering Pharmaceutical Product Management Departments and Corporate Leaders with high-impact promotional merchandise, medical conference gifts, and custom-branded hardware.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
              <a
                href="#catalog"
                className="w-full sm:w-auto gold-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-center font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Explore Product Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => onOpenQuote?.()}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-cream-50 border border-navy-900/15 text-navy-900 font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-cream-sm"
              >
                Request Corporate Quote
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 sm:pt-8 border-t border-cream-300 grid grid-cols-3 gap-2 sm:gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold-100 border border-gold-500/30 flex items-center justify-center text-gold-700 shadow-sm">
                  <Factory className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-950">Direct Import</div>
                  <div className="text-[11px] text-navy-700/70">Factory Sourced</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-emerald-700 shadow-sm">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-950">PMD Quality</div>
                  <div className="text-[11px] text-navy-700/70">Sample Testing</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-500/30 flex items-center justify-center text-blue-700 shadow-sm">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-950">Custom Branding</div>
                  <div className="text-[11px] text-navy-700/70">Laser & UV Print</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase — Floating Featured Product */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={heroContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md aspect-square perspective-container flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-gold-500/30 shadow-cream-xl overflow-hidden group cursor-pointer"
            >
              {/* Radial warm champagne backdrop highlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,223,170,0.35),rgba(255,255,255,0.95))] pointer-events-none"></div>

              {/* Featured product badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gold-100 border border-gold-500/40 text-gold-800 shadow-sm">
                  Featured Item
                </span>
              </div>

              {/* Floating Product Image */}
              <div
                ref={heroImageRef}
                className="relative z-10 w-48 sm:w-56 h-64 sm:h-72 product-image-wrap flex items-center justify-center"
              >
                <Image
                  src="/images/products/stainless-bottle-300ml.webp"
                  alt="Stainless Bottle 300ml - Matte Black"
                  width={369}
                  height={786}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(12,31,59,0.35)]"
                  priority
                />
              </div>

              {/* Dynamic Ground Shadow */}
              <div
                ref={heroShadowRef}
                className="w-36 h-6 rounded-[100%] bg-navy-950/40 blur-xl pointer-events-none mt-2 transition-all"
              ></div>

              {/* Hero Item Specs Overlay */}
              <div className="relative z-20 mt-4 text-center">
                <h3 className="text-base font-bold text-navy-950">Stainless Bottle 300ml (Matte Black)</h3>
                <p className="text-xs text-gold-700 font-semibold mt-0.5">Drinkware • Double-Walled Thermal Insulation</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-[11px] font-medium text-navy-800 bg-cream-150 px-2.5 py-1 rounded-md border border-cream-300">
                    MOQ: 100 Units
                  </span>
                  <span className="text-[11px] font-medium text-navy-800 bg-cream-150 px-2.5 py-1 rounded-md border border-cream-300">
                    Custom Logo Ready
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
