import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, Building, FileText, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function PharmacistRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    pharmacyName: '',
    licenseNumber: '',
    contactNumber: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.pharmacyName || !formData.licenseNumber) {
      return setError('Please fill in all required fields marked with *');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    try {
      setLoading(true);
      await register(formData);
      navigate('/pharmacist/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 max-w-lg w-full p-8 relative overflow-hidden">
        
        {/* Top Bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 absolute top-0 left-0 right-0" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Pharmacist Registration
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Register your medical practitioner account to publish medicine timing details.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Full Name (Pharmacist / Doctor) *
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Ramesh Sharma"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                required
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@pharmacy.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pharmacy Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Pharmacy / Hospital Name *
            </label>
            <div className="relative">
              <Building className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                name="pharmacyName"
                value={formData.pharmacyName}
                onChange={handleChange}
                placeholder="Apollo Care Pharmacy / LifeMed Clinic"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                required
              />
            </div>
          </div>

          {/* License Number & Contact Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                License Number *
              </label>
              <div className="relative">
                <FileText className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="e.g. DL-IND-99482"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Register Pharmacist Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          <p>
            Already registered?{' '}
            <Link to="/pharmacist/login" className="font-bold text-sky-700 hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
