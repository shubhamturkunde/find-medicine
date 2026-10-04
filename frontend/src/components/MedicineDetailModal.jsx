import React from 'react';
import { X, Sun, Sunset, Moon, Clock, Utensils, ShieldCheck, Thermometer, Pill, CheckCircle2, XCircle } from 'lucide-react';

export default function MedicineDetailModal({ medicine, onClose }) {
  if (!medicine) return null;

  const { timings, mealTiming } = medicine;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150 my-auto">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-teal-600 text-white p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              {medicine.category || 'General Medicine'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30">
              Verified Intake Schedule
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight pr-8">
            {medicine.name}
          </h2>

          {medicine.genericName && (
            <p className="text-sky-100 text-xs sm:text-sm font-medium mt-0.5">
              Generic Name: <span className="underline decoration-sky-300">{medicine.genericName}</span>
            </p>
          )}

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-white/20 text-xs font-bold flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-sky-200" />
              <span>Dosage: {medicine.dosage}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-white/20 text-xs font-bold flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-200" />
              <span>Timing: {mealTiming || 'After Meal'}</span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto">

          {/* Daily Schedule Breakdown */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Daily Timing Breakdown</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              
              {/* Morning */}
              <div className={`p-3 rounded-2xl border text-center transition-all ${
                timings?.morning
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-slate-50 border-slate-200 opacity-50'
              }`}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-1.5">
                  <Sun className={`w-4 h-4 sm:w-5 sm:h-5 ${timings?.morning ? 'text-amber-600' : 'text-slate-400'}`} />
                </div>
                <div className="font-bold text-xs text-slate-800">Morning</div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  {mealTiming === 'Before Meal' || mealTiming === 'Empty Stomach' ? 'Before Breakfast' : 'After Breakfast'}
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-0.5 text-[10px] font-bold">
                  {timings?.morning ? (
                    <span className="text-amber-700 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> TAKE
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-0.5">
                      <XCircle className="w-3.5 h-3.5 text-slate-300" /> SKIP
                    </span>
                  )}
                </div>
              </div>

              {/* Afternoon */}
              <div className={`p-3 rounded-2xl border text-center transition-all ${
                timings?.afternoon
                  ? 'bg-orange-50 border-orange-300 ring-2 ring-orange-400/20'
                  : 'bg-slate-50 border-slate-200 opacity-50'
              }`}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-1.5">
                  <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${timings?.afternoon ? 'text-orange-600' : 'text-slate-400'}`} />
                </div>
                <div className="font-bold text-xs text-slate-800">Afternoon</div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  {mealTiming === 'Before Meal' ? 'Before Lunch' : 'After Lunch'}
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-0.5 text-[10px] font-bold">
                  {timings?.afternoon ? (
                    <span className="text-orange-700 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" /> TAKE
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-0.5">
                      <XCircle className="w-3.5 h-3.5 text-slate-300" /> SKIP
                    </span>
                  )}
                </div>
              </div>

              {/* Evening */}
              <div className={`p-3 rounded-2xl border text-center transition-all ${
                timings?.evening
                  ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/20'
                  : 'bg-slate-50 border-slate-200 opacity-50'
              }`}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-1.5">
                  <Sunset className={`w-4 h-4 sm:w-5 sm:h-5 ${timings?.evening ? 'text-rose-600' : 'text-slate-400'}`} />
                </div>
                <div className="font-bold text-xs text-slate-800">Evening</div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  {mealTiming === 'Before Meal' ? 'Before Snacks' : 'With Snacks'}
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-0.5 text-[10px] font-bold">
                  {timings?.evening ? (
                    <span className="text-rose-700 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" /> TAKE
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-0.5">
                      <XCircle className="w-3.5 h-3.5 text-slate-300" /> SKIP
                    </span>
                  )}
                </div>
              </div>

              {/* Night */}
              <div className={`p-3 rounded-2xl border text-center transition-all ${
                timings?.night
                  ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-400/20'
                  : 'bg-slate-50 border-slate-200 opacity-50'
              }`}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-1.5">
                  <Moon className={`w-4 h-4 sm:w-5 sm:h-5 ${timings?.night ? 'text-indigo-600' : 'text-slate-400'}`} />
                </div>
                <div className="font-bold text-xs text-slate-800">Night</div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  {mealTiming === 'Before Meal' ? 'Before Dinner' : 'After Dinner'}
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-0.5 text-[10px] font-bold">
                  {timings?.night ? (
                    <span className="text-indigo-700 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> TAKE
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-0.5">
                      <XCircle className="w-3.5 h-3.5 text-slate-300" /> SKIP
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Specific Intake Instructions */}
          <div className="bg-sky-50 border border-sky-200/70 p-3.5 sm:p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>How & When to Take This Medicine</span>
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-sky-950 leading-relaxed">
              {medicine.specificInstructions}
            </p>
          </div>

          {/* Purpose & Indications */}
          {medicine.purpose && (
            <div>
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Medical Purpose / Uses
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                {medicine.purpose}
              </p>
            </div>
          )}

          {/* Storage Instructions */}
          {medicine.storageInfo && (
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Thermometer className="w-4 h-4 text-teal-600 shrink-0" />
              <span><strong>Storage:</strong> {medicine.storageInfo}</span>
            </div>
          )}

          {/* Verified Pharmacist Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              <p className="font-semibold text-slate-700">Added by Pharmacist:</p>
              <p className="text-slate-600">{medicine.pharmacyName || 'Verified Medical Practitioner'}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors text-center"
            >
              Close Guide
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
