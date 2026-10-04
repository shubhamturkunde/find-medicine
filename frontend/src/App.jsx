import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PublicSearchPage from './pages/PublicSearchPage';
import PharmacistLoginPage from './pages/PharmacistLoginPage';
import PharmacistRegisterPage from './pages/PharmacistRegisterPage';
import PharmacistDashboard from './pages/PharmacistDashboard';
import AddEditMedicineModal from './components/AddEditMedicineModal';
import api from './services/api';

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleGlobalAddSave = async (formData) => {
    await api.post('/medicines', formData);
    window.location.reload();
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

          <div className="flex-1">
            <Routes>
              {/* Public Patients Route */}
              <Route path="/" element={<PublicSearchPage />} />

              {/* Pharmacist Authentication & Dashboard Routes */}
              <Route path="/pharmacist/login" element={<PharmacistLoginPage />} />
              <Route path="/pharmacist/register" element={<PharmacistRegisterPage />} />
              <Route
                path="/pharmacist/dashboard"
                element={
                  <PharmacistDashboard
                    isAddModalOpen={isAddModalOpen}
                    setIsAddModalOpen={setIsAddModalOpen}
                  />
                }
              />
            </Routes>
          </div>

          {/* Global Add Modal triggered from Navbar */}
          {isAddModalOpen && (
            <AddEditMedicineModal
              onClose={() => setIsAddModalOpen(false)}
              onSave={handleGlobalAddSave}
            />
          )}

          {/* Footer */}
          <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-xs">
            <div className="max-w-7xl mx-auto px-4">
              <p className="font-semibold text-slate-300">MedTime — Find Medicine Intake Schedule & Timing Portal</p>
              <p className="mt-1 text-slate-500">
                Provides patients instant access to medicine take-times (Morning, Afternoon, Evening, Night, Before/After Lunch).
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
