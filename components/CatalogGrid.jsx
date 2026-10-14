'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Search, Grid2X2, Rows2 } from 'lucide-react';

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
    <section id="catalog" className="pb-16 sm:pb-24 pt-2 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Luxury Filter & Search Control Panel */}
        <div className="bg-white/95 rounded-2xl border border-gold-500/25 shadow-cream-md p-3.5 sm:p-5 mb-8 sm:mb-10 space-y-3.5 sm:space-y-4">
          
          {/* Row 1: Search Box + Items Count + Layout Selector */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gold-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products by name, category, or specifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cream-50/70 border border-gold-500/20 rounded-xl pl-11 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-navy-950 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cream-200 text-navy-700 hover:text-navy-950 hover:bg-cream-300 flex items-center justify-center text-xs font-bold transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Status Pill & Mobile Layout View Switcher */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cream-100/90 border border-gold-500/15 text-xs text-navy-800 font-semibold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>
                  Showing <strong className="text-gold-700 font-bold">{filteredProducts.length}</strong> of {products.length} Products
                </span>
              </div>

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

          {/* Subtle Champagne Gold Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

          {/* Row 2: Full-Width Clean Category Filter Rail (No scrollbars, clean wrap on desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar text-xs scroll-smooth md:flex-wrap">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'All'
                ? products.length
                : products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 text-xs flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-navy-950 text-white shadow-sm ring-1 ring-gold-500/50'
                      : 'bg-cream-50 text-navy-800 hover:text-navy-950 hover:bg-cream-150 border border-gold-500/15'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold transition-colors ${
                      isActive
                        ? 'bg-gold-500 text-white'
                        : 'bg-cream-200 text-navy-600 group-hover:bg-cream-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
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
