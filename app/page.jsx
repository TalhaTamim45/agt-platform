'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CatalogGrid from '../components/CatalogGrid';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import QuoteModal from '../components/QuoteModal';
import VisitingCard from '../components/VisitingCard';
import QRAnalytics from '../components/QRAnalytics';
import ProductDetail from '../components/ProductDetail';

// Load the 29-product master catalog
import productsData from '../public/data/products.json';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
        {/* Hero Section */}
        <Hero onOpenQuote={() => handleOpenQuote()} />

        {/* Corporate Sourcing Capabilities Strip */}
        <section id="features" className="py-8 sm:py-10 border-y border-gold-500/20 bg-white/70 shadow-cream-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold gold-gradient-text">Factory Direct</div>
                <div className="text-xs text-navy-700/80 font-bold">International Sourcing & Wholesale Pricing</div>
              </div>

              <div className="space-y-1">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold gold-gradient-text">PMD Tailored</div>
                <div className="text-xs text-navy-700/80 font-bold">Doctor Gifts & Conference Merchandise</div>
              </div>

              <div className="space-y-1">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold gold-gradient-text">Custom Branding</div>
                <div className="text-xs text-navy-700/80 font-bold">Laser Engraving, UV Print & Packaging</div>
              </div>

              <div className="space-y-1">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold gold-gradient-text">Strict Quality QA</div>
                <div className="text-xs text-navy-700/80 font-bold">Sample Testing & Doorstep Delivery</div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Catalog Showcase Grid */}
        <CatalogGrid
          products={productsData}
          onSelectQuote={(product) => handleOpenQuote(product)}
          onSelectDetail={(product) => handleOpenDetail(product)}
        />

        {/* About & Corporate Mission Section */}
        <AboutSection />
      </main>

      {/* Footer & Contact */}
      <Footer
        onOpenCard={() => setIsCardOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
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

      {/* QR Scan Analytics Dashboard */}
      <QRAnalytics
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

    </div>
  );
}
