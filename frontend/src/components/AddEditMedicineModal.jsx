import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertCircle, Sun, Clock, Sunset, Moon } from 'lucide-react';

export default function AddEditMedicineModal({ medicineToEdit, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: 'Analgesic',
    dosage: '',
    timings: {
      morning: false,
      afternoon: false,
      evening: false,
      night: false
    },
    mealTiming: 'After Meal',
    specificInstructions: '',
    purpose: '',
    sideEffects: '',
    storageInfo: ''
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (medicineToEdit) {
      setFormData({
        name: medicineToEdit.name || '',
        genericName: medicineToEdit.genericName || '',
        category: medicineToEdit.category || 'Analgesic',
        dosage: medicineToEdit.dosage || '',
        timings: medicineToEdit.timings || { morning: false, afternoon: false, evening: false, night: false },
        mealTiming: medicineToEdit.mealTiming || 'After Meal',
        specificInstructions: medicineToEdit.specificInstructions || '',
        purpose: medicineToEdit.purpose || '',
        sideEffects: medicineToEdit.sideEffects || '',
        storageInfo: medicineToEdit.storageInfo || ''
      });
    }
  }, [medicineToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimingChange = (timingKey) => {
    setFormData((prev) => ({
      ...prev,
      timings: {
        ...prev.timings,
        [timingKey]: !prev.timings[timingKey]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      return setError('Medicine Name is required');
    }
    if (!formData.dosage.trim()) {
      return setError('Dosage (e.g. 500mg, 1 Tablet) is required');
    }
    if (!formData.specificInstructions.trim()) {
      return setError('Please provide specific intake instructions');
    }

    try {
      setSubmitting(true);
      await onSave(formData, medicineToEdit?._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save medicine');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {medicineToEdit ? 'Edit Medicine Schedule' : 'Add New Medicine Details'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter intake instructions & dosage timings for patients
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Name & Generic Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Medicine Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Paracetamol / Pan-40"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Generic Formula / Name
              </label>
              <input
                type="text"
                name="genericName"
                value={formData.genericName}
                onChange={handleChange}
                placeholder="e.g. Acetaminophen"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Category & Dosage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Antibiotic, Antacid, Painkiller"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Dosage Unit *
              </label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="e.g. 1 Tablet (500mg) or 10ml"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Daily Timing Selection Checkboxes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Select Intake Times (When should patient take this?)
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Morning */}
              <button
                type="button"
                onClick={() => handleTimingChange('morning')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  formData.timings.morning
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="text-xs font-bold">Morning</span>
                <span className="text-[10px] opacity-80">{formData.timings.morning ? 'SELECTED' : 'OFF'}</span>
              </button>

              {/* Afternoon */}
              <button
                type="button"
                onClick={() => handleTimingChange('afternoon')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  formData.timings.afternoon
                    ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="text-xs font-bold">Afternoon</span>
                <span className="text-[10px] opacity-80">{formData.timings.afternoon ? 'SELECTED' : 'OFF'}</span>
              </button>

              {/* Evening */}
              <button
                type="button"
                onClick={() => handleTimingChange('evening')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  formData.timings.evening
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sunset className="w-5 h-5" />
                <span className="text-xs font-bold">Evening</span>
                <span className="text-[10px] opacity-80">{formData.timings.evening ? 'SELECTED' : 'OFF'}</span>
              </button>

              {/* Night */}
              <button
                type="button"
                onClick={() => handleTimingChange('night')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  formData.timings.night
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.02]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="text-xs font-bold">Night</span>
                <span className="text-[10px] opacity-80">{formData.timings.night ? 'SELECTED' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Meal Timing Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Relation to Meals *
            </label>
            <select
              name="mealTiming"
              value={formData.mealTiming}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
            >
              <option value="After Meal">After Meal (After Lunch / Dinner / Breakfast)</option>
              <option value="Before Meal">Before Meal (30 mins before eating)</option>
              <option value="Empty Stomach">Empty Stomach (First thing in morning)</option>
              <option value="With Food">With Food (Directly with meal)</option>
              <option value="As Needed">As Needed / When symptoms occur</option>
            </select>
          </div>

          {/* Specific Intake Instructions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Specific Intake Instructions *
            </label>
            <textarea
              name="specificInstructions"
              rows={2}
              value={formData.specificInstructions}
              onChange={handleChange}
              placeholder="e.g. Take 1 tablet after lunch with warm water. Do not lie down for 15 mins after taking."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              required
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Medical Purpose / Uses
            </label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="e.g. Fever reduction, stomach acidity, high blood pressure"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          {/* Side Effects & Storage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Side Effects / Warnings
              </label>
              <input
                type="text"
                name="sideEffects"
                value={formData.sideEffects}
                onChange={handleChange}
                placeholder="e.g. May cause mild drowsiness"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Storage Guidance
              </label>
              <input
                type="text"
                name="storageInfo"
                value={formData.storageInfo}
                onChange={handleChange}
                placeholder="e.g. Store below 25°C away from light"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all hover:shadow-lg disabled:opacity-50"
            >
              {submitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{medicineToEdit ? 'Update Medicine' : 'Save Medicine'}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
