import React from 'react';
import { Sun, Sunset, Moon, Clock, Utensils, AlertCircle, Building2, ChevronRight } from 'lucide-react';

export default function MedicineCard({ medicine, onSelect, isPharmacistView, onEdit, onDelete }) {
  const { timings, mealTiming } = medicine;

  // Meal timing color scheme
  const getMealBadgeStyle = (timing) => {
    switch (timing) {
      case 'Before Meal':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Empty Stomach':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'With Food':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'After Meal':
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Section */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-sky-100 text-sky-800 mb-1">
              {medicine.category || 'General Medicine'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
              {medicine.name}
            </h3>
            {medicine.genericName && (
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Generic: {medicine.genericName}
              </p>
            )}
          </div>
          
          <div className="text-right shrink-0">
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg inline-block border border-slate-200">
              {medicine.dosage}
            </span>
          </div>
        </div>

        {/* Purpose / Indication */}
        {medicine.purpose && (
          <p className="text-xs text-slate-600 mb-3 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100 leading-relaxed">
            <strong className="text-slate-700">For:</strong> {medicine.purpose}
          </p>
        )}

        {/* Schedule Timings Grid (Morning, Afternoon, Evening, Night) */}
        <div className="my-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Daily Dosage Schedule
          </p>
          <div className="grid grid-cols-4 gap-1 text-center">
            
            {/* Morning */}
            <div className={`p-1.5 sm:p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
              timings?.morning 
                ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold shadow-xs' 
                : 'bg-slate-50 border-slate-200/60 text-slate-300 opacity-60'
            }`}>
              <Sun className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 ${timings?.morning ? 'text-amber-500' : 'text-slate-300'}`} />
              <span className="text-[10px] sm:text-[11px] leading-tight">Morn</span>
              <span className="text-[9px] font-bold mt-0.5">{timings?.morning ? 'YES' : 'OFF'}</span>
            </div>

            {/* Afternoon */}
            <div className={`p-1.5 sm:p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
              timings?.afternoon 
                ? 'bg-orange-50 border-orange-300 text-orange-900 font-semibold shadow-xs' 
                : 'bg-slate-50 border-slate-200/60 text-slate-300 opacity-60'
            }`}>
              <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 ${timings?.afternoon ? 'text-orange-500' : 'text-slate-300'}`} />
              <span className="text-[10px] sm:text-[11px] leading-tight">Noon</span>
              <span className="text-[9px] font-bold mt-0.5">{timings?.afternoon ? 'YES' : 'OFF'}</span>
            </div>

            {/* Evening */}
            <div className={`p-1.5 sm:p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
              timings?.evening 
                ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold shadow-xs' 
                : 'bg-slate-50 border-slate-200/60 text-slate-300 opacity-60'
            }`}>
              <Sunset className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 ${timings?.evening ? 'text-rose-500' : 'text-slate-300'}`} />
              <span className="text-[10px] sm:text-[11px] leading-tight">Eve</span>
              <span className="text-[9px] font-bold mt-0.5">{timings?.evening ? 'YES' : 'OFF'}</span>
            </div>

            {/* Night */}
            <div className={`p-1.5 sm:p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
              timings?.night 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold shadow-xs' 
                : 'bg-slate-50 border-slate-200/60 text-slate-300 opacity-60'
            }`}>
              <Moon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5 ${timings?.night ? 'text-indigo-500' : 'text-slate-300'}`} />
              <span className="text-[10px] sm:text-[11px] leading-tight">Night</span>
              <span className="text-[9px] font-bold mt-0.5">{timings?.night ? 'YES' : 'OFF'}</span>
            </div>

          </div>
        </div>

        {/* Meal Timing Rule */}
        <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
          <Utensils className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-xs font-medium text-slate-600">Meal Rule:</span>
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold border ${getMealBadgeStyle(mealTiming)}`}>
            {mealTiming || 'After Meal'}
          </span>
        </div>

        {/* Specific Instructions summary */}
        <div className="bg-sky-50/70 border border-sky-100 p-2.5 rounded-xl flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-xs text-sky-900 font-medium line-clamp-2">
            {medicine.specificInstructions}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs truncate max-w-[60%]">
          <Building2 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs">{medicine.pharmacyName || 'Registered Pharmacy'}</span>
        </div>

        {isPharmacistView ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(medicine)}
              className="px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100 rounded-lg transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(medicine._id)}
              className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => onSelect(medicine)}
            className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 group-hover:translate-x-0.5 transition-all py-1"
          >
            <span>Full Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
