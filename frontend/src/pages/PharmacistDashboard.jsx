import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Pill, Building2, ShieldCheck, FileText, Phone, Search } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MedicineCard from '../components/MedicineCard';
import AddEditMedicineModal from '../components/AddEditMedicineModal';

export default function PharmacistDashboard({ isAddModalOpen, setIsAddModalOpen }) {
  const { pharmacist, isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [myMedicines, setMyMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMedicine, setEditingMedicine] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/pharmacist/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const fetchMyMedicines = async () => {
    try {
      setLoading(true);
      const res = await api.get('/medicines/my-medicines');
      setMyMedicines(res.data);
    } catch (error) {
      console.error('Error fetching pharmacist medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyMedicines();
    }
  }, [isAuthenticated]);

  const handleSaveMedicine = async (formData, id) => {
    if (id) {
      await api.put(`/medicines/${id}`, formData);
    } else {
      await api.post('/medicines', formData);
    }
    fetchMyMedicines();
  };

  const handleDeleteMedicine = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine timing record?')) {
      try {
        await api.delete(`/medicines/${id}`);
        fetchMyMedicines();
      } catch (error) {
        alert('Failed to delete medicine');
      }
    }
  };

  const filteredMedicines = myMedicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (med.category && med.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (authLoading || !pharmacist) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-600">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Pharmacist Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-900 to-teal-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
              <ShieldCheck className="w-7 h-7 sm:w-10 sm:h-10" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-teal-400/20 text-teal-200 border border-teal-400/30">
                  Verified Pharmacist
                </span>
                <span className="text-[11px] sm:text-xs text-slate-300">Lic: {pharmacist.licenseNumber}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                {pharmacist.name}
              </h1>
              <p className="text-xs sm:text-sm text-sky-200 flex flex-wrap items-center gap-2 mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>{pharmacist.pharmacyName}</span>
                </span>
                {pharmacist.contactNumber && (
                  <>
                    <span className="opacity-40 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-teal-400" />
                      <span>{pharmacist.contactNumber}</span>
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg transition-all hover:scale-105 text-xs sm:text-sm"
          >
            <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Medicine Schedule</span>
          </button>

        </div>
      </div>

      {/* Controls & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        
        <div>
          <h2 className="text-base sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 shrink-0" />
            <span>My Added Medicines</span>
            <span className="text-xs bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-bold">
              {myMedicines.length} Published
            </span>
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my medicines..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

      </div>

      {/* Medicines Display Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading your medicines...</p>
        </div>
      ) : filteredMedicines.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-lg mx-auto">
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
            No Medicines Added Yet
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            You haven't added any medicine timings yet. Click below to add your first record.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Add New Medicine Schedule
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMedicines.map((med) => (
            <MedicineCard
              key={med._id}
              medicine={med}
              isPharmacistView={true}
              onEdit={(medicine) => setEditingMedicine(medicine)}
              onDelete={handleDeleteMedicine}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddEditMedicineModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveMedicine}
        />
      )}

      {/* Edit Modal */}
      {editingMedicine && (
        <AddEditMedicineModal
          medicineToEdit={editingMedicine}
          onClose={() => setEditingMedicine(null)}
          onSave={handleSaveMedicine}
        />
      )}

    </div>
  );
}
