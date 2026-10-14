'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream-50/95 backdrop-blur-md border-b border-gold-500/25 shadow-cream-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group py-1">
          <div className="relative h-14 sm:h-16 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Abdullah Global Trade Logo"
              width={220}
              height={95}
              style={{ width: 'auto', height: '56px' }}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-navy-900">
          <a href="#catalog" className="hover:text-gold-600 transition-colors">
            Product Catalog
          </a>
          <a href="#contact" className="hover:text-gold-600 transition-colors">
            Contact
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/8801787239863?text=Hello%20AGT%2C%20I%20would%20like%20to%20inquire%20about%20corporate%20bulk%20orders."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border border-emerald-600/30 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-all hover:scale-105 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp B2B</span>
          </a>

          <button
            onClick={() => onOpenQuote?.()}
            className="gold-btn text-xs px-5 py-2.5 rounded-full shadow-md flex items-center gap-2 font-bold uppercase tracking-wider"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>Request Quote</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-navy-900 hover:text-gold-600"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-gold-500/30 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-4 text-base font-semibold text-navy-900">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-gold-600 transition-colors"
            >
              Product Catalog
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-gold-600 transition-colors"
            >
              Contact &amp; Location
            </a>
          </nav>
          <div className="pt-4 border-t border-cream-300 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote?.();
              }}
              className="w-full gold-btn py-3 rounded-xl text-center text-sm font-bold uppercase tracking-wider"
            >
              Request Corporate Quote
            </button>
            <a
              href="https://wa.me/8801787239863"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-emerald-600/30 text-emerald-800 bg-emerald-50 text-sm font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Chat on WhatsApp (+8801787239863)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
