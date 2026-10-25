'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { X, MessageSquare, ArrowUpRight, CheckCircle2, Package, Paintbrush, Truck, Shield } from 'lucide-react';

export default function ProductDetail({ product, isOpen, onClose, onSelectQuote }) {
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !panelRef.current) return;

    // Entrance animation
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(panelRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)', delay: 0.1 }
    );
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !imageRef.current || !product?.animation) return;

    const floating = product.animation.floating || {
      amplitudeY: 16, duration: 3.5, ease: 'sine.inOut',
      rotationDriftZ: 2.0, rotationDriftX: 3.0,
    };

    const baseScale = product.zoom || 1.0;
    gsap.set(imageRef.current, { scale: baseScale });

    const tween = gsap.to(imageRef.current, {
      y: -floating.amplitudeY * 1.2,
      rotationZ: floating.rotationDriftZ,
      rotationX: floating.rotationDriftX,
      duration: floating.duration,
      ease: floating.ease || 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => tween.kill();
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const waInquiryUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    `Hello Abdullah Global Trade, I'm interested in bulk ordering: [${product.serial || product.id}] ${product.name}. Please share wholesale pricing and MOQ.`
  )}`;

  // Generate professional features based on category
  const getFeatures = () => {
    const base = [
      { icon: <Package className="w-4 h-4" />, text: 'Bulk Order Available (MOQ applies)' },
      { icon: <Paintbrush className="w-4 h-4" />, text: 'Custom Logo — Laser Engraving / UV Print' },
      { icon: <Truck className="w-4 h-4" />, text: 'Doorstep Delivery Across Bangladesh' },
      { icon: <Shield className="w-4 h-4" />, text: 'Quality Tested Before Dispatch' },
    ];

    const categorySpecific = {
      'Drinkware': 'Food-grade stainless steel / BPA-free materials',
      'Gadgets': 'CE/FCC certified electronics with warranty',
      'Bags': 'Durable fabric with reinforced stitching',
      'Lifestyle': 'Premium finish, retail-grade packaging',
      'Accessories': 'Lightweight, compact, travel-friendly design',
      'Stationery': 'Professional grade with custom packaging options',
    };

    const extra = categorySpecific[product.category];
    if (extra) {
      base.push({ icon: <CheckCircle2 className="w-4 h-4" />, text: extra });
    }

    return base;
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-navy-950/60 backdrop-blur-md p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-2xl shadow-cream-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/95 border border-cream-300 flex items-center justify-center shadow-sm hover:bg-cream-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4.5 h-4.5 text-navy-800" />
        </button>

        {/* Product Image Area */}
        <div className="relative w-full bg-gradient-to-b from-cream-50 via-cream-100/50 to-white px-6 pt-12 pb-6 flex flex-col items-center justify-center overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,223,170,0.3),rgba(255,255,255,0))] pointer-events-none"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-100 border border-gold-500/30 text-gold-800">
              {product.category}
            </span>
          </div>

          {/* Floating Image */}
          <div
            ref={imageRef}
            className="relative z-10 w-full h-56 sm:h-72 flex items-center justify-center product-image-wrap perspective-container"
          >
            <Image
              src={product.image.url}
              alt={product.name}
              width={product.image.width}
              height={product.image.height}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_16px_32px_rgba(12,31,59,0.3)] select-none"
              priority
            />
          </div>

          {/* Ground Shadow */}
          <div className="w-28 h-4 rounded-[100%] bg-navy-950/20 blur-lg pointer-events-none mt-2"></div>
        </div>

        {/* Product Details */}
        <div className="px-5 sm:px-6 pb-6">
          {/* Name & ID */}
          <div className="pt-4 pb-3 border-b border-cream-200">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {product.serial && (
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-navy-950 text-gold-400 border border-gold-500/30 tracking-wider shadow-2xs">
                  {product.serial}
                </span>
              )}
              <p className="text-xs text-navy-600/60 font-medium uppercase tracking-wider">
                SKU: {product.id}
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 leading-tight">
              {product.name}
            </h2>
          </div>

          {/* Direct B2B Wholesale Pricing Box */}
          <div className="my-3.5 p-3.5 rounded-xl bg-gradient-to-r from-cream-50 via-gold-50/50 to-cream-50 border border-gold-500/25 flex items-center justify-between gap-3 shadow-xs">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold-800">
                Commercial Pricing
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-lg sm:text-xl font-extrabold text-navy-950">
                  Wholesale Price on Request
                </span>
              </div>
              <p className="text-[10px] text-navy-600/80 font-medium mt-0.5">
                Tailored corporate quotes based on quantity &amp; branding
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-600/30">
                Bulk Volume Tier
              </span>
              <p className="text-[10px] text-gold-700 font-bold mt-1">
                Direct WhatsApp Deal
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="py-4 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy-800">
              Product Highlights
            </h3>
            <div className="space-y-2.5">
              {getFeatures().map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-navy-800">
                  <span className="text-gold-600 mt-0.5 shrink-0">{feat.icon}</span>
                  <span className="font-medium leading-snug">{feat.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Branding Info */}
          <div className="py-3 px-4 rounded-xl bg-cream-50 border border-cream-200 mb-4">
            <p className="text-xs text-navy-700/80 font-medium leading-relaxed">
              <span className="font-bold text-navy-900">Custom Branding Available:</span> Add your company or pharma brand logo via laser engraving, UV printing, or screen printing. Custom packaging and gift boxing also available for conference distribution.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                onSelectQuote(product);
                onClose();
              }}
              className="flex-1 gold-btn py-3.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Request Quote
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={waInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 rounded-xl border-2 border-emerald-600/30 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all flex items-center justify-center gap-2 font-bold text-sm shrink-0"
            >
              <MessageSquare className="w-4.5 h-4.5 text-emerald-600" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
