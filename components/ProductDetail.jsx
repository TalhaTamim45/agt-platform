'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { X, MessageSquare, ArrowUpRight, CheckCircle2, Package, Paintbrush, Truck, Shield, Palette, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetail({ product, isOpen, onClose, onSelectQuote }) {
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  // Gather all gallery images (from product.gallery or product.variants or main image)
  const galleryImages =
    product?.gallery && product.gallery.length > 0
      ? product.gallery
      : product?.variants && product.variants.length > 0
      ? product.variants.map((v) => v.image)
      : product?.image?.url
      ? [product.image.url]
      : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Synchronize on open or product change
  useEffect(() => {
    setActiveImageIndex(0);
    setIsPaused(false);
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [product, isOpen]);

  // Automatic swipe every 1.4 seconds (1400ms) as requested
  useEffect(() => {
    if (!isOpen || isPaused || galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => {
        const next = (prev + 1) % galleryImages.length;
        if (product?.variants) {
          const match = product.variants.find((v) => v.image === galleryImages[next]);
          if (match) setSelectedVariant(match);
        }
        return next;
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, galleryImages, product]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => {
      const next = (prev - 1 + galleryImages.length) % galleryImages.length;
      if (product?.variants) {
        const match = product.variants.find((v) => v.image === galleryImages[next]);
        if (match) setSelectedVariant(match);
      }
      return next;
    });
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => {
      const next = (prev + 1) % galleryImages.length;
      if (product?.variants) {
        const match = product.variants.find((v) => v.image === galleryImages[next]);
        if (match) setSelectedVariant(match);
      }
      return next;
    });
  };

  const handleSelectThumbnail = (idx) => {
    setActiveImageIndex(idx);
    if (product?.variants) {
      const match = product.variants.find((v) => v.image === galleryImages[idx]);
      if (match) setSelectedVariant(match);
    }
  };

  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
    const idx = galleryImages.indexOf(variant.image);
    if (idx !== -1) {
      setActiveImageIndex(idx);
    }
  };

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
    if (!isOpen || !imageRef.current) return;

    // Upright, professional floating without 3D tilt/rotation (matching e-commerce standard)
    const tween = gsap.to(imageRef.current, {
      y: -8,
      duration: 2.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => tween.kill();
  }, [isOpen, product, activeImageIndex]);

  if (!isOpen || !product) return null;

  const currentDisplayImage = galleryImages[activeImageIndex] || selectedVariant?.image || product.image?.url || '/images/products/stainless-bottle-300ml.webp';

  const variantText = selectedVariant ? ` [Color: ${selectedVariant.name}]` : '';
  const waInquiryUrl = `https://wa.me/8801787239863?text=${encodeURIComponent(
    `Hello Abdullah Global Trade, I'm interested in bulk ordering: [${product.serial || product.id}] ${product.name}${variantText}. Please share wholesale pricing and MOQ.`
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
      'Food & Beverages': 'Pure ingredients, certified hygiene & sealed packaging',
      'Kitchen & Appliances': 'Food-grade stainless steel & durable high-grade components',
      'Electronics & Gadgets': 'CE/FCC certified electronics with energy-efficient design',
      'Health & Personal Care': 'Clinically tested, hygienic & medical-grade certified standards',
      'Home & Lifestyle': 'Premium finish, retail-grade packaging & corporate gifting ready',
      'Sports & Fitness': 'Heavy-duty tournament quality, durable and long-lasting build',
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

        {/* Product Image Area with Auto-Swipe Carousel matching user's reference */}
        <div
          className="relative w-full bg-gradient-to-b from-cream-50 via-cream-100/40 to-white px-4 sm:px-6 pt-12 pb-3 flex flex-col items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,223,170,0.25),rgba(255,255,255,0))] pointer-events-none"></div>

          {/* Category Badge & Live Auto-Swipe Progress */}
          <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-100/90 border border-gold-500/30 text-gold-800 shadow-2xs">
              {product.category}
            </span>
            {galleryImages.length > 1 && (
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-navy-950/80 text-white/95 backdrop-blur-xs flex items-center gap-1.5 shadow-2xs">
                <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'}`} />
                <span>{activeImageIndex + 1}/{galleryImages.length}</span>
              </span>
            )}
          </div>

          {/* Main Upright Product Packshot (Matching Reference Photo) */}
          <div className="relative w-full flex items-center justify-center my-0.5">
            <div
              ref={imageRef}
              className="relative z-10 w-full h-48 sm:h-60 flex items-center justify-center product-image-wrap"
            >
              <Image
                key={currentDisplayImage}
                src={currentDisplayImage}
                alt={`${product.name} - slide ${activeImageIndex + 1}`}
                width={800}
                height={800}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(12,31,59,0.18)] select-none transition-all duration-300"
                priority
              />
            </div>
          </div>

          {/* Ground Shadow */}
          <div className="w-24 sm:w-28 h-2.5 rounded-[100%] bg-navy-950/15 blur-md pointer-events-none mt-0.5"></div>

          {/* Thumbnail Gallery Strip with < and > Arrows (EXACT MATCH TO REFERENCE PHOTO) */}
          {galleryImages.length > 1 && (
            <div className="w-full flex items-center justify-center gap-2 sm:gap-3 mt-2.5 pt-2.5 border-t border-cream-200/90">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-white border border-cream-300 hover:border-amber-500 hover:bg-amber-50/50 text-navy-700 hover:text-amber-700 shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none max-w-[calc(100%-80px)] justify-center">
                {galleryImages.map((imgUrl, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectThumbnail(idx)}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white p-1 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
                        isActive
                          ? 'border-2 border-amber-500 ring-2 ring-amber-400/35 shadow-sm scale-105'
                          : 'border border-cream-300 hover:border-amber-400/80 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        width={56}
                        height={56}
                        className="max-h-full max-w-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-white border border-cream-300 hover:border-amber-500 hover:bg-amber-50/50 text-navy-700 hover:text-amber-700 shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
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

          {/* E-commerce Style Interactive Color Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-3.5 p-3.5 rounded-xl bg-cream-50/90 border border-gold-500/25 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950">
                  <Palette className="w-3.5 h-3.5 text-gold-600" />
                  <span>Available Colors ({product.variants.length})</span>
                </div>
                {selectedVariant && (
                  <span className="text-[11px] font-bold text-navy-900 bg-white px-2.5 py-0.5 rounded-full border border-cream-300 shadow-2xs">
                    {selectedVariant.name}
                  </span>
                )}
              </div>

              {/* Color Swatch Options */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.variants.map((v, i) => {
                  const isSelected = selectedVariant?.name === v.name;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectVariant(v)}
                      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-navy-950 text-white shadow-sm ring-2 ring-gold-500/80 scale-[1.02]'
                          : 'bg-white text-navy-800 border border-cream-300 hover:border-gold-500/50 hover:bg-cream-100/60'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs shrink-0"
                        style={{ backgroundColor: v.hex }}
                      />
                      <span>{v.colorName || v.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                onSelectQuote({ ...product, selectedVariant });
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
