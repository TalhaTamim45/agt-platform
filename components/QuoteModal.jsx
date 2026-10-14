'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, MessageSquare, Mail, Building, Phone, User, Package } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, product, allProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(product);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [quantity, setQuantity] = useState('500');
  const [customBranding, setCustomBranding] = useState(true);

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentProduct = selectedProduct || allProducts?.[0];

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const text = `*B2B Corporate Quotation Request - AGT*
----------------------------------------
*Product:* ${currentProduct?.name || 'General Inquiry'} (ID: ${currentProduct?.id || 'N/A'})
*Category:* ${currentProduct?.category || 'General'}
*Indicative Base Price:* ৳${currentProduct?.price || 'N/A'} / unit (3–4% discount applicable on higher quantities)
*Target Quantity:* ${quantity} units
*Custom Branding/Logo:* ${customBranding ? 'Yes (Required)' : 'No (Blank stock)'}
----------------------------------------
*Company:* ${companyName || 'Not specified'}
*Contact Person:* ${contactName || 'Not specified'}
*Phone/Contact:* ${contactPhone || 'Not specified'}
----------------------------------------
Please provide official discounted bulk pricing and delivery lead time.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/8801787239863?text=${encoded}`, '_blank');
  };

  const handleEmailSubmit = () => {
    const subject = encodeURIComponent(`Quotation Request: ${currentProduct?.name || 'Bulk Inquiry'} - ${companyName}`);
    const body = encodeURIComponent(`Hello Abdullah Global Trade Procurement Team,\n\nWe would like to request an official corporate price quotation for the following:\n\nProduct: ${currentProduct?.name}\nEstimated Quantity: ${quantity} units\nCustom Branding: ${customBranding ? 'Yes' : 'No'}\nCompany: ${companyName}\nContact Person: ${contactName}\nPhone: ${contactPhone}\n\nPlease share availability and wholesale quotation.\n\nThank you.`);
    window.location.href = `mailto:agtbd763@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/60 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-white border border-gold-500/35 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-navy-400 hover:text-navy-950 hover:bg-cream-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold-700">
            Abdullah Global Trade (AGT)
          </span>
          <h3 className="text-2xl font-extrabold text-navy-950 mt-1">
            Request Corporate Quotation
          </h3>
          <p className="text-xs text-navy-700/80 mt-1 font-medium">
            Direct wholesale pricing for Pharmaceutical PMDs, Corporate Gifts & Bulk Imports.
          </p>
        </div>

        {/* Selected Product Highlight Card */}
        {currentProduct && (
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-cream-100 border border-gold-500/25 mb-6">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-1 relative shrink-0 shadow-sm border border-cream-300">
              <Image
                src={currentProduct.image?.url || '/images/products/stainless-bottle-300ml.webp'}
                alt={currentProduct.name}
                width={64}
                height={64}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-navy-950 truncate">
                {currentProduct.name}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gold-700 font-semibold">{currentProduct.category}</span>
                <span className="text-navy-300">•</span>
                <span className="text-xs font-extrabold text-navy-950">৳{currentProduct.price?.toLocaleString()} / unit</span>
              </div>
              <p className="text-[11px] font-medium text-emerald-700 mt-0.5">
                3–4% discount applied on higher volume orders
              </p>
            </div>
          </div>
        )}

        {/* Quotation Form */}
        <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
          
          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1.5 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-gold-600" />
              <span>Target Quantity (Units)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['200', '500', '1,000', '2,500+'].map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setQuantity(q.replace(',', '').replace('+', ''))}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    quantity === q.replace(',', '').replace('+', '')
                      ? 'gold-btn border-gold-500 text-white shadow-sm'
                      : 'bg-cream-100 border-cream-300 text-navy-800 hover:border-gold-500/50'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-bold text-navy-900 mb-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gold-600" />
              <span>Company / Institution Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Beximco Pharma, Square, Incepta, etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-navy-950 placeholder-navy-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Contact Person & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold-600" />
                <span>Contact Person</span>
              </label>
              <input
                type="text"
                required
                placeholder="Your Name / Designation"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-navy-950 placeholder-navy-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>Phone / WhatsApp</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+8801..."
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-navy-950 placeholder-navy-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Custom Branding Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="branding"
              checked={customBranding}
              onChange={(e) => setCustomBranding(e.target.checked)}
              className="w-4 h-4 rounded text-gold-600 bg-white border-cream-400 focus:ring-gold-500"
            />
            <label htmlFor="branding" className="text-xs text-navy-800 select-none cursor-pointer font-medium">
              Include custom corporate logo laser engraving / color decal printing
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-2.5">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Submit via WhatsApp (+8801787239863)</span>
            </button>

            <button
              type="button"
              onClick={handleEmailSubmit}
              className="w-full py-3 rounded-xl border border-cream-300 hover:border-gold-500 text-navy-800 hover:text-navy-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors bg-cream-100 hover:bg-cream-150"
            >
              <Mail className="w-4 h-4 text-gold-600" />
              <span>Send via Email (agtbd763@gmail.com)</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
