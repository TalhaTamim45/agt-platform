'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { MessageSquare, ArrowUpRight, Eye } from 'lucide-react';

export default function ProductCard({ product, onSelectQuote, onSelectDetail, compact = false, priority = false }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const shadowRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!imageRef.current || !shadowRef.current || !product?.animation) return;

    const anim = product.animation;
    const floating = anim.floating || {
      amplitudeY: 16,
      duration: 3.5,
      ease: 'sine.inOut',
      rotationDriftZ: 2.0,
      rotationDriftX: 3.0,
    };
    const shadow = anim.shadow || {
      baseBlur: 20,
      minOpacity: 0.2,
      maxOpacity: 0.5,
      scaleRange: [0.85, 1.0],
    };

    // Stagger phase slightly based on product ID character code
    const charSum = product.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const delay = (charSum % 10) * 0.15;
    const baseScale = product.zoom || 1.0;

    // Set initial base scale
    gsap.set(imageRef.current, { scale: baseScale });

    // Continuous Zero-Gravity Floating Loop
    const floatTween = gsap.to(imageRef.current, {
      y: -floating.amplitudeY,
      rotationZ: floating.rotationDriftZ,
      rotationX: floating.rotationDriftX,
      duration: floating.duration,
      ease: floating.ease || 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: delay,
    });

    // Dynamic Synchronized Ground Shadow Loop (diffuse warm navy/charcoal)
    const shadowTween = gsap.to(shadowRef.current, {
      scale: shadow.scaleRange[0] * (product.zoom ? Math.min(product.zoom, 1.15) : 1.0),
      opacity: shadow.minOpacity + 0.1,
      filter: `blur(${shadow.baseBlur * 1.2}px)`,
      duration: floating.duration,
      ease: floating.ease || 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: delay,
    });

    // Viewport Visibility Observer: Pause heavy 60fps physics & blur computation when offscreen
    let observer;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window && cardRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            floatTween.play();
            shadowTween.play();
          } else {
            floatTween.pause();
            shadowTween.pause();
          }
        },
        { rootMargin: '200px' }
      );
      observer.observe(cardRef.current);
    }

    return () => {
      floatTween.kill();
      shadowTween.kill();
      if (observer) observer.disconnect();
    };
  }, [product]);

  // 3D Tilt on Hover
  const handleMouseMove = (e) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const sensitivity = product?.animation?.interaction?.tiltSensitivity || 14;
    const baseScale = product.zoom || 1.0;

    gsap.to(imageRef.current, {
      rotationY: (x / rect.width) * sensitivity,
      rotationX: (-y / rect.height) * sensitivity,
      scale: baseScale * 1.06,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    const baseScale = product.zoom || 1.0;
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: baseScale,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const waInquiryUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    `Hello Abdullah Global Trade, I would like to request a bulk corporate quotation for: [${product.serial || product.id}] ${product.name}. Please share wholesale pricing and availability.`
  )}`;

  return (
    <div
      ref={cardRef}
      onClick={() => onSelectDetail && onSelectDetail(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between rounded-2xl bg-white ${
        compact ? 'p-3 sm:p-4' : 'p-3.5 sm:p-5'
      } border border-cream-200/90 shadow-cream-sm hover:shadow-cream-xl hover:border-gold-500/50 transition-all duration-300 cursor-pointer`}
    >
      {/* Top Header: Serial & Quick View Specs (Concept B) */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
        {product.serial ? (
          <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cream-100/90 text-navy-950 border border-gold-500/30 tracking-wider shadow-2xs">
            {product.serial}
          </span>
        ) : (
          <div></div>
        )}
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-navy-700/80 bg-cream-50/90 hover:bg-cream-100 px-2 py-0.5 rounded-md border border-cream-200/70 transition-colors">
          <Eye className="w-3.5 h-3.5 text-gold-600" />
          <span className="hidden sm:inline">Specs</span>
        </div>
      </div>

      {/* Floating Canvas Box (Concept B Seamless Stage) */}
      <div className="relative w-full h-36 sm:h-56 flex flex-col items-center justify-center perspective-container overflow-hidden my-1 rounded-xl bg-[#faf8f5]">
        {/* Ambient Warm Champagne Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,223,170,0.18),rgba(255,255,255,0))] pointer-events-none"></div>

        {/* Luxury Shimmer Skeleton Placeholder while image loads */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-gold-500/10 via-cream-200/60 to-gold-500/15 animate-pulse" />
          </div>
        )}

        {/* Floating WebP Product Asset (Authentic Original Untouched) */}
        <div
          ref={imageRef}
          className="relative z-10 w-full h-28 sm:h-44 flex items-center justify-center product-image-wrap p-1 sm:p-2"
        >
          <Image
            src={product.image.url}
            alt={product.name}
            width={product.image.width}
            height={product.image.height}
            onLoad={() => setIsLoaded(true)}
            className={`max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(12,31,59,0.22)] sm:drop-shadow-[0_10px_20px_rgba(12,31,59,0.28)] select-none transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
          />
        </div>

        {/* Dynamic Reactive Ground Shadow */}
        <div
          ref={shadowRef}
          className="w-20 sm:w-32 h-2.5 sm:h-4 rounded-[100%] bg-navy-950/30 blur-sm sm:blur-md pointer-events-none mt-1 transition-all"
        ></div>
      </div>

      {/* Product Information (Concept B: Category Kicker + Modern Title + Unified Strip) */}
      <div className="mt-2.5 sm:mt-3 pt-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtle Category Kicker */}
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gold-700/90 block mb-1">
            {product.category}
          </span>

          <h3 className="text-xs sm:text-[15px] font-bold text-navy-950 group-hover:text-gold-700 transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>

          {/* Unified Wholesale Pricing & MOQ Strip */}
          <div className="mt-2.5 pt-2 border-t border-cream-200/80 flex items-center justify-between gap-1 text-[10px] sm:text-[11px] text-navy-800">
            <span className="flex items-center gap-1 font-semibold truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-pulse shrink-0"></span>
              <span className="text-navy-600 hidden sm:inline">Wholesale:</span>
              <span className="font-bold text-navy-950">Price on Request</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-600/25 shrink-0 whitespace-nowrap">
              MOQ: Bulk Ready
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: Request a Quote & Direct WhatsApp */}
      <div className="mt-3 sm:mt-4 pt-1 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectQuote(product);
          }}
          className="flex-1 gold-btn py-2 sm:py-2.5 px-3 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all"
        >
          <span>Request Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white shrink-0" />
        </button>

        <a
          href={waInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 sm:p-2.5 rounded-xl border border-gold-500/35 text-emerald-700 bg-cream-50 hover:bg-emerald-50 hover:border-emerald-500/50 transition-all hover:scale-105 shrink-0 flex items-center justify-center shadow-2xs"
          title="Direct WhatsApp Inquiry"
          aria-label={`Chat about ${product.name} on WhatsApp`}
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
        </a>
      </div>
    </div>
  );
}
