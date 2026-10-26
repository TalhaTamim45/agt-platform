'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Phone, Mail, MapPin, Globe, MessageSquare } from 'lucide-react';

const DEFAULT_SITE_URL = 'https://abdullahglobaltrade.netlify.app';

export default function VisitingCard({ isOpen, onClose }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const siteUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : DEFAULT_SITE_URL;
  const qrUrl = `${siteUrl}/api/track-scan?ref=qr`;

  if (!isOpen) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Abdullah Global Trade (AGT)',
          text: 'Corporate Merchandise & Promotional Product Sourcing — From Vision to Value',
          url: siteUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(siteUrl);
      alert('Website link copied to clipboard!');
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Abdullah Global Trade
ORG:Abdullah Global Trade (AGT)
TEL;TYPE=WORK,VOICE:+8801787239863
EMAIL;TYPE=WORK:agtbd763@gmail.com
ADR;TYPE=WORK:;;G-85, Gulshan-Badda Link Road, Badda;Dhaka;;1212;Bangladesh
URL:${siteUrl}
NOTE:Connecting Business | Building Partnerships | Delivering Growth
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AGT-Contact.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card Container with Flip */}
        <div
          className="relative w-full cursor-pointer"
          style={{ perspective: '1200px' }}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className="relative w-full transition-transform duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* ========== FRONT SIDE ========== */}
            <div
              ref={cardRef}
              className="w-full rounded-2xl overflow-hidden shadow-cream-xl"
              style={{
                backfaceVisibility: 'hidden',
                aspectRatio: '1.75 / 1',
              }}
            >
              {/* Card Background */}
              <div className="relative w-full h-full bg-gradient-to-br from-cream-50 via-white to-cream-150 p-6 flex flex-col justify-between">
                {/* Top Decorative Gold Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600"></div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-100/60 to-transparent rounded-bl-full"></div>

                {/* Logo & Company Name */}
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 relative shrink-0">
                    <Image
                      src="/images/logo-clean.png"
                      alt="AGT Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-navy-950 leading-tight tracking-tight">
                      Abdullah Global Trade
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold-600">
                      From Vision to Value
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-1.5 relative z-10">
                  <div className="flex items-center gap-2 text-xs text-navy-800">
                    <Phone className="w-3 h-3 text-gold-600 shrink-0" />
                    <span className="font-semibold">+880 1787 239 863</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy-800">
                    <Mail className="w-3 h-3 text-gold-600 shrink-0" />
                    <span className="font-semibold">agtbd763@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy-800">
                    <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                    <span className="font-medium">G-85, Gulshan-Badda Link Road, Dhaka-1212</span>
                  </div>
                </div>

                {/* Bottom Slogan */}
                <div className="absolute bottom-3 right-5 text-[8px] font-bold text-gold-500/70 tracking-wider">
                  Connecting Business | Building Partnerships
                </div>
              </div>
            </div>

            {/* ========== BACK SIDE ========== */}
            <div
              className="absolute inset-0 w-full rounded-2xl overflow-hidden shadow-cream-xl"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                aspectRatio: '1.75 / 1',
              }}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-6 flex items-center justify-center">
                {/* Gold Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-500/40 rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-500/40 rounded-br-2xl"></div>

                {/* Center QR Code */}
                <div className="text-center space-y-2.5">
                  <div className="bg-white rounded-xl p-2.5 inline-block shadow-lg">
                    <Image
                      src="/images/qr-code.png"
                      alt="AGT Official Permanent QR Code"
                      width={120}
                      height={120}
                      className="w-[120px] h-[120px] object-contain rounded-lg"
                      priority
                    />
                  </div>
                  <p className="text-gold-400 text-[10px] font-bold tracking-widest uppercase">
                    Scan to View Catalog
                  </p>
                  <p className="text-cream-300/60 text-[8px] font-medium font-mono">
                    abdullahglobaltrade.netlify.app
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tap to flip hint */}
        <p className="text-center text-cream-300/80 text-xs mt-3 font-medium">
          Tap card to {flipped ? 'see front' : 'see QR code'}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadVCard();
            }}
            className="flex-1 gold-btn rounded-xl py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Contact</span>
          </button>

          <a
            href="/images/qr-code.png"
            download="AGT-Official-QR.png"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 border border-gold-500/35 bg-cream-50/10 text-gold-400 hover:bg-gold-500/20 rounded-xl py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold transition-colors text-center"
          >
            <Download className="w-3.5 h-3.5 text-gold-400" />
            <span>Save QR</span>
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="flex-1 navy-btn rounded-xl py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full mt-3 py-2.5 text-xs font-semibold text-cream-300/70 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
