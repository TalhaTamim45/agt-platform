'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CatalogGrid from '../components/CatalogGrid';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import QuoteModal from '../components/QuoteModal';
import VisitingCard from '../components/VisitingCard';
import ProductDetail from '../components/ProductDetail';
import { Sparkles } from 'lucide-react';

// Load the 29-product master catalog
import productsData from '../public/data/products.json';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Track Real-World QR Code Scans in Google Analytics 4
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('ref') === 'qr' || urlParams.get('scanned') === '1') {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'qr_scan', {
            event_category: 'engagement',
            event_label: 'Physical QR Badge / Standee',
            value: 1,
          });
        }
      }
    }
  }, []);

  const handleOpenQuote = (product = null) => {
    setSelectedProduct(product || productsData[0]);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenDetail = (product) => {
    setSelectedDetailProduct(product);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedDetailProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-navy-950 relative selection:bg-gold-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Main Brand Headline */}
        <section className="pt-10 pb-4 sm:pt-16 sm:pb-6 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-gold-500/35 text-gold-700 text-xs font-bold uppercase tracking-widest shadow-cream-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>FROM VISION TO VALUE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-950 leading-tight">
            Premium Corporate Sourcing &amp;{' '}
            <span className="gold-gradient-text block mt-1">
              Merchandise Catalog
            </span>
          </h1>
        </section>

        {/* Floating Catalog Showcase Grid */}
        <CatalogGrid
          products={productsData}
          onSelectQuote={(product) => handleOpenQuote(product)}
          onSelectDetail={(product) => handleOpenDetail(product)}
        />
      </main>

      {/* Footer & Contact */}
      <Footer
        onOpenCard={() => setIsCardOpen(true)}
      />

      {/* Persistent Floating WhatsApp B2B CTA */}
      <FloatingWhatsApp />

      {/* Product Detail Modal with Big Image & Specs */}
      <ProductDetail
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        product={selectedDetailProduct}
        onSelectQuote={(product) => handleOpenQuote(product)}
      />

      {/* Quotation Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        product={selectedProduct}
        allProducts={productsData}
      />

      {/* Digital Visiting Card Modal */}
      <VisitingCard
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

    </div>
  );
}
