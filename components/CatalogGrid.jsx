'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Search, Layers, Grid2X2, Rows2 } from 'lucide-react';

export default function CatalogGrid({ products, onSelectQuote, onSelectDetail }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileCols, setMobileCols] = useState(2); // Default to 2 columns on mobile

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cream-50 border border-gold-500/30 text-gold-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-cream-sm">
            <Layers className="w-3.5 h-3.5 text-gold-600" />
            <span>Corporate Sourcing Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight">
            Curated Corporate <span className="gold-gradient-text">Product Showcase</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 text-navy-800/80 text-xs sm:text-base font-normal max-w-2xl mx-auto">
            Browse our ready-to-order selection of corporate gifts, promotional hardware, and medical conference merchandise available for bulk supply with customized branding.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white/95 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gold-500/25 shadow-cream-md mb-6 sm:mb-10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 scrollbar-none text-xs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold whitespace-nowrap transition-all text-xs ${
                    isActive
                      ? 'gold-btn shadow-sm text-white'
                      : 'bg-cream-100 text-navy-800 hover:text-navy-950 hover:bg-cream-200 border border-cream-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-navy-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 text-xs text-navy-950 placeholder-navy-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-navy-500 hover:text-navy-950"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Products Count Indicator & Mobile Layout Selector */}
        <div className="flex items-center justify-between text-xs text-navy-700/80 mb-4 sm:mb-6 px-1 font-medium">
          <span>
            Showing <strong className="text-gold-700 font-bold">{filteredProducts.length}</strong> of{' '}
            {products.length} Products
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline">
              Bulk Wholesale Sourcing • Custom Logo Printing Available
            </span>
            {/* Mobile View Toggle: 2-Column Grid vs 1-Column Single */}
            <div className="sm:hidden flex items-center bg-cream-200/80 p-0.5 rounded-lg border border-cream-300">
              <button
                onClick={() => setMobileCols(1)}
                className={`p-1.5 rounded-md transition-all ${
                  mobileCols === 1
                    ? 'bg-gold-500 text-white shadow-xs'
                    : 'text-navy-600 hover:text-navy-950'
                }`}
                title="Single Column View"
                aria-label="Single Column View"
              >
                <Rows2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setMobileCols(2)}
                className={`p-1.5 rounded-md transition-all ${
                  mobileCols === 2
                    ? 'bg-gold-500 text-white shadow-xs'
                    : 'text-navy-600 hover:text-navy-950'
                }`}
                title="2-Column Grid View"
                aria-label="2-Column Grid View"
              >
                <Grid2X2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid ${
              mobileCols === 1 ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-3'
            } sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectQuote={onSelectQuote}
                onSelectDetail={onSelectDetail}
                compact={mobileCols === 2}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 rounded-2xl text-center border border-cream-300 shadow-cream-sm">
            <p className="text-navy-900 text-lg font-bold">
              No products found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-navy-700/70 text-xs mt-1">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl text-xs gold-btn font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
