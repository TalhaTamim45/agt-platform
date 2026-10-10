'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
      {/* Tooltip on hover */}
      {hovered && (
        <div className="hidden sm:block glass-panel px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 border border-emerald-500/30 shadow-xl animate-fade-in">
          💬 Instant WhatsApp Procurement (+8801787239863)
        </div>
      )}

      {/* Floating Button with pulsing ring */}
      <a
        href="https://wa.me/8801787239863?text=Hello%20Abdullah%20Global%20Trade%2C%20I%20would%20like%20to%20request%20a%20corporate%20quotation%20for%20promotional%20products."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-110"
        aria-label="Direct WhatsApp Contact"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30"></span>

        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500"></span>
        </span>
      </a>
    </div>
  );
}
