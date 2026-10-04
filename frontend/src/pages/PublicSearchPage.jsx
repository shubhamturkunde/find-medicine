import React, { useState, useEffect } from 'react';
import { Search, Pill, Filter, Clock, Utensils, RefreshCw, Info, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import MedicineCard from '../components/MedicineCard';
import MedicineDetailModal from '../components/MedicineDetailModal';

export default function PublicSearchPage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealTiming, setSelectedMealTiming] = useState('');
  const [selectedTimingFilter, setSelectedTimingFilter] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Fetch medicines from backend
  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery.trim()) params.query = searchQuery.trim();
      if (selectedMealTiming) params.mealTiming = selectedMealTiming;
      if (selectedTimingFilter) {
        params[selectedTimingFilter] = 'true';
      }

      const res = await api.get('/medicines', { params });
      setMedicines(res.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedicines();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedMealTiming, selectedTimingFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMealTiming('');
    setSelectedTimingFilter('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-16">
      
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-sky-900 via-sky-800 to-slate-900 text-white pt-8 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Background Decorative Rings */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 sm:w-96 h-72 sm:h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 sm:w-96 h-72 sm:h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-200 text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Public Medicine Schedule Lookup (No Login Required)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 sm:mb-4">
            Find Medicine Take Time & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-200 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
              Intake Guidelines Instantly
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 sm:mb-8 font-normal leading-relaxed px-2">
            Search any medicine to check exact daily schedules — Morning, Afternoon, Evening, Night, Before Lunch, or After Lunch.
          </p>

          {/* Search Bar Container */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-2 text-slate-800">
            <div className="flex items-center gap-2 w-full px-2">
              <Search className="w-5 h-5 text-sky-600 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicine name (e.g. Paracetamol, Pan-40)..."
                className="w-full py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={fetchMedicines}
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2.5 sm:py-3 rounded-xl text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Search</span>
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="mt-4 flex items-center justify-center flex-wrap gap-1.5 text-xs text-sky-200">
            <span className="opacity-75 text-[11px]">Popular:</span>
            {['Paracetamol', 'Pan-40', 'Metformin', 'Amoxicillin', 'Cetirizine'].map((item) => (
              <button
                key={item}
                onClick={() => setSearchQuery(item)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-[11px] font-medium"
              >
                {item}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-3.5 sm:p-4 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
            
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <Filter className="w-4 h-4 text-sky-600" />
              <span>Filter Intake Time:</span>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full lg:w-auto">
              
              {/* Timing filters (Morning, Afternoon, Evening, Night) - Responsive Horizontal Scroll */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
                <button
                  onClick={() => setSelectedTimingFilter('')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTimingFilter === ''
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Times
                </button>
                <button
                  onClick={() => setSelectedTimingFilter('morning')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTimingFilter === 'morning'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Morning
                </button>
                <button
                  onClick={() => setSelectedTimingFilter('afternoon')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTimingFilter === 'afternoon'
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Afternoon
                </button>
                <button
                  onClick={() => setSelectedTimingFilter('evening')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTimingFilter === 'evening'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Evening
                </button>
                <button
                  onClick={() => setSelectedTimingFilter('night')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedTimingFilter === 'night'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Night
                </button>
              </div>

              {/* Meal timing filter dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedMealTiming}
                  onChange={(e) => setSelectedMealTiming(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="">All Meal Rules</option>
                  <option value="Before Meal">Before Meal (Before Lunch/Breakfast)</option>
                  <option value="After Meal">After Meal (After Lunch/Dinner)</option>
                  <option value="Empty Stomach">Empty Stomach</option>
                  <option value="With Food">With Food</option>
                </select>
              </div>

              {(searchQuery || selectedMealTiming || selectedTimingFilter) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-sky-600 shrink-0" />
            <span>Available Schedules</span>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
              {medicines.length}
            </span>
          </h2>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-600">Searching medicine database...</p>
          </div>
        ) : medicines.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Info className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
              No Medicines Found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              We couldn't find any medicine matching your search query or filter.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
            >
              Clear Search & Show All Medicines
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {medicines.map((med) => (
              <MedicineCard
                key={med._id}
                medicine={med}
                onSelect={(medicine) => setSelectedMedicine(medicine)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Modal for detailed view */}
      {selectedMedicine && (
        <MedicineDetailModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
        />
      )}

    </div>
  );
}
