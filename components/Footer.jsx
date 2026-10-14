import Image from 'next/image';
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight, CreditCard } from 'lucide-react';

export default function Footer({ onOpenCard }) {
  return (
    <footer id="contact" className="relative bg-white border-t border-gold-500/25 pt-16 pb-12 overflow-hidden">
      {/* Ambient background champagne glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-cream-300">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-14 flex items-center">
              <Image
                src="/images/logo.png"
                alt="Abdullah Global Trade Logo"
                width={200}
                height={86}
                style={{ width: 'auto', height: '52px' }}
                className="object-contain"
              />
            </div>

            <p className="text-xs uppercase tracking-widest font-extrabold text-gold-700">
              FROM VISION TO VALUE
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold text-navy-900 italic">
                &ldquo;Connecting Business | Building Partnerships | Delivering Growth&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-navy-950">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-navy-800 font-medium">
              <li>
                <a href="#catalog" className="hover:text-gold-700 transition-colors">
                  Product Catalog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-700 transition-colors">
                  Contact Procurement
                </a>
              </li>
              {onOpenCard && (
                <li>
                  <button
                    onClick={onOpenCard}
                    className="hover:text-gold-700 transition-colors flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Digital Business Card
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-navy-950">
              Headquarters & Procurement
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-navy-900 font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-gold-600 shrink-0 mt-0.5" />
                <span>
                  G-85, Gulshan-Badda Link Road, Badda,<br />
                  Dhaka-1212, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-600 shrink-0" />
                <a href="tel:+8801787239863" className="hover:text-gold-700 transition-colors">
                  +8801787239863
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                <a href="mailto:agtbd763@gmail.com" className="hover:text-gold-700 transition-colors">
                  agtbd763@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href="https://wa.me/8801787239863"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline font-bold"
                >
                  WhatsApp: +8801787239863 (Direct Support)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-navy-600 font-medium gap-4">
          <p>© {new Date().getFullYear()} Abdullah Global Trade (AGT). All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Connecting Business | Building Partnerships | Delivering Growth</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </p>
        </div>

      </div>
    </footer>
  );
}
