'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { MessageSquare, ArrowUpRight, Eye } from 'lucide-react';

export default function ProductCard({ product, onSelectQuote, onSelectDetail, compact = false }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const shadowRef = useRef(null);

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
      scale: shadow.scaleRange[0],
      opacity: shadow.minOpacity + 0.1,
      filter: `blur(${shadow.baseBlur * 1.2}px)`,
      duration: floating.duration,
      ease: floating.ease || 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: delay,
    });

    return () => {
      floatTween.kill();
      shadowTween.kill();
    };
  }, [product]);

  // 3D Tilt on Hover
  const handleMouseMove = (e) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const sensitivity = product?.animation?.interaction?.tiltSensitivity || 14;

    gsap.to(imageRef.current, {
      rotationY: (x / rect.width) * sensitivity,
      rotationX: (-y / rect.height) * sensitivity,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: 1.0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const waInquiryUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    `Hello Abdullah Global Trade, I would like to request a bulk corporate quotation for: ${product.name} (ID: ${product.id}, Base Price: ৳${product.price}). Please provide discounted pricing for higher quantities.`
  )}`;

  return (
    <div
      ref={cardRef}
      onClick={() => onSelectDetail && onSelectDetail(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between rounded-xl sm:rounded-2xl bg-white ${
        compact ? 'p-3 sm:p-5' : 'p-3.5 sm:p-5'
      } border border-gold-500/25 shadow-cream-sm hover:shadow-cream-xl hover:border-gold-500/60 transition-all duration-300 cursor-pointer`}
    >
      {/* Top Header: Category & Commercial Tag */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-cream-100 border border-gold-500/30 text-gold-800 truncate max-w-[135px] sm:max-w-none">
          {product.category}
        </span>
        <span className="text-[9px] sm:text-[10px] text-gold-700 bg-gold-50 px-2 py-0.5 rounded-md border border-gold-500/25 font-bold uppercase tracking-wider shrink-0">
          Bulk Ready
        </span>
      </div>

      {/* Floating Canvas Box */}
      <div className="relative w-full h-36 sm:h-56 flex flex-col items-center justify-center perspective-container overflow-hidden my-1 rounded-lg sm:rounded-xl bg-cream-50/70">
        {/* Ambient Warm Champagne Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,223,170,0.25),rgba(255,255,255,0))] pointer-events-none"></div>

        {/* Quick View Pill on Desktop Hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
          <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold bg-white/95 backdrop-blur-sm text-navy-900 px-2 py-0.5 rounded-full border border-gold-500/35 shadow-xs">
            <Eye className="w-3 h-3 text-gold-600" />
            <span className="hidden sm:inline">View Specs</span>
          </span>
        </div>

        {/* Floating WebP Product Asset */}
        <div
          ref={imageRef}
          className="relative z-10 w-full h-28 sm:h-44 flex items-center justify-center product-image-wrap p-1 sm:p-2"
        >
          <Image
            src={product.image.url}
            alt={product.name}
            width={product.image.width}
            height={product.image.height}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(12,31,59,0.25)] sm:drop-shadow-[0_10px_20px_rgba(12,31,59,0.3)] select-none"
            loading="lazy"
          />
        </div>

        {/* Dynamic Reactive Ground Shadow */}
        <div
          ref={shadowRef}
          className="w-20 sm:w-32 h-2.5 sm:h-4 rounded-[100%] bg-navy-950/35 blur-sm sm:blur-md pointer-events-none mt-1 transition-all"
        ></div>
      </div>

      {/* Product Information */}
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-cream-200 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xs sm:text-base font-bold text-navy-950 group-hover:text-gold-700 transition-colors line-clamp-2 min-h-[2rem] sm:min-h-0 leading-snug">
            {product.name}
          </h3>

          {/* Price & Bulk Discount Badge */}
          <div className="mt-2.5 flex items-baseline justify-between gap-1.5 flex-wrap">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-lg font-extrabold text-navy-950">
                ৳{product.price?.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs text-navy-600/70 font-medium">/ unit</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-600/25 whitespace-nowrap">
              3–4% off on bulk
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: Request a Quote & Direct WhatsApp */}
      <div className="mt-3 sm:mt-4 pt-1 sm:pt-2 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectQuote(product);
          }}
          className="flex-1 gold-btn py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 shadow-sm"
        >
          <span className="hidden sm:inline">Request Quote</span>
          <span className="sm:hidden">Quote</span>
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0" />
        </button>

        <a
          href={waInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-emerald-600/30 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all hover:scale-105 shrink-0"
          title="Direct WhatsApp Inquiry"
          aria-label={`Chat about ${product.name} on WhatsApp`}
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
        </a>
      </div>
    </div>
  );
}
