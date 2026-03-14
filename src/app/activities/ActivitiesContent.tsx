'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import { activities, categories, formatPrice } from '@/lib/sample-data';
import { ActivityCard } from '@/components/activities/ActivityCard';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

const DURATION_OPTIONS = [
  { value: '', label: 'Any duration' },
  { value: '0-120', label: 'Under 2 hours' },
  { value: '120-240', label: '2 - 4 hours' },
  { value: '240-480', label: '4 - 8 hours' },
  { value: '480-9999', label: 'Full day (8+ hrs)' },
];

export default function ActivitiesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState('popular');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...activities];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.shortDesc.toLowerCase().includes(q) ||
        a.category?.name.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat) result = result.filter(a => a.categoryId === cat.id);
    }

    // Duration
    if (selectedDuration) {
      const [min, max] = selectedDuration.split('-').map(Number);
      result = result.filter(a => a.duration >= min && a.duration <= max);
    }

    // Price
    result = result.filter(a => a.priceAdult >= priceRange[0] && a.priceAdult <= priceRange[1]);

    // Sort
    switch (selectedSort) {
      case 'rating':
        result.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case 'price-asc':
        result.sort((a, b) => a.priceAdult - b.priceAdult);
        break;
      case 'price-desc':
        result.sort((a, b) => b.priceAdult - a.priceAdult);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.totalBookings - a.totalBookings);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSort, selectedDuration, priceRange]);

  const activeFiltersCount = [selectedCategory, selectedDuration, priceRange[0] > 0 || priceRange[1] < 500].filter(Boolean).length;

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-cabo-white">
      {/* Top bar */}
      <div className="bg-white border-b border-cabo-ocean/5 sticky top-16 lg:top-20 z-40">
        <div className="section-padding py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-cabo-dark/30" />
              <input
                type="text"
                placeholder="Search activities, tours, experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30 focus:ring-2 focus:ring-cabo-ocean/10 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cabo-dark/30 hover:text-cabo-dark/60">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category quick filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('')}
                className={`shrink-0 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  !selectedCategory
                    ? 'bg-cabo-ocean text-white border-cabo-ocean'
                    : 'bg-white text-cabo-dark/60 border-cabo-ocean/10 hover:border-cabo-ocean/30'
                }`}>
                All
              </button>
              {categories.slice(0, 5).map(cat => (
                <button key={cat.slug}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                  className={`shrink-0 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-cabo-ocean text-white border-cabo-ocean'
                      : 'bg-white text-cabo-dark/60 border-cabo-ocean/10 hover:border-cabo-ocean/30'
                  }`}>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Filters button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                filtersOpen || activeFiltersCount > 0
                  ? 'bg-cabo-ocean text-white border-cabo-ocean'
                  : 'bg-white text-cabo-dark/60 border-cabo-ocean/10 hover:border-cabo-ocean/30'
              }`}>
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-cabo-sunset text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Expanded filters */}
          {filtersOpen && (
            <div className="mt-4 pt-4 border-t border-cabo-ocean/5 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-down">
              {/* Duration */}
              <div>
                <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-2">Duration</label>
                <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-3 py-2.5 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30">
                  {DURATION_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-2">Sort By</label>
                <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full px-3 py-2.5 bg-cabo-white rounded-xl border border-cabo-ocean/10 text-sm focus:outline-none focus:border-cabo-ocean/30">
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-semibold text-cabo-dark/50 uppercase tracking-wider block mb-2">
                  Price: {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
                </label>
                <input type="range" min="0" max="500" step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-cabo-ocean" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="section-padding py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-cabo-dark/50">
            <span className="font-semibold text-cabo-dark">{filtered.length}</span> activities found
            {selectedCategory && (
              <span> in <span className="font-medium text-cabo-ocean">{categories.find(c => c.slug === selectedCategory)?.name}</span></span>
            )}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏝️</div>
            <h3 className="heading-3 mb-2">No activities found</h3>
            <p className="text-cabo-dark/50 mb-6">Try adjusting your filters or search terms</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory(''); setSelectedDuration(''); setPriceRange([0, 500]); }}
              className="btn-primary">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
