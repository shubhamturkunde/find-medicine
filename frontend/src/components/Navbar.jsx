import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Pill, UserCheck, LogOut, PlusCircle, Search, ShieldCheck, Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar({ onOpenAddModal }) {
  const { pharmacist, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
            <Pill className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-700 to-teal-600 bg-clip-text text-transparent">
              MedTime
            </span>
            <span className="hidden xs:block text-[9px] sm:text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
              Medicine Schedule Guide
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links & Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'bg-sky-50 text-sky-700 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search Medicine</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/pharmacist/dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/pharmacist/dashboard'
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Dashboard</span>
              </Link>

              {onOpenAddModal && (
                <button
                  onClick={onOpenAddModal}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium shadow-xs transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Medicine</span>
                </button>
              )}

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>{pharmacist?.name || 'Pharmacist'}</span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center gap-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/pharmacist/login"
              className="flex items-center gap-1.5 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-sm font-medium shadow-xs transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Pharmacist Portal</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="p-2 bg-emerald-600 text-white rounded-lg shadow-xs"
              title="Add Medicine"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            onClick={closeMenu}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
              location.pathname === '/' ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4 text-sky-600" />
            <span>Search Medicine Schedules</span>
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/pharmacist/dashboard"
                onClick={closeMenu}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  location.pathname === '/pharmacist/dashboard' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Pharmacist Dashboard</span>
              </Link>

              {onOpenAddModal && (
                <button
                  onClick={() => {
                    closeMenu();
                    onOpenAddModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-sm shadow-xs"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Medicine</span>
                </button>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <UserCheck className="w-4 h-4 text-teal-600" />
                  <span>{pharmacist?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs font-bold text-red-600 px-3 py-1.5 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/pharmacist/login"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-sky-700 text-white font-semibold rounded-xl text-sm shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Pharmacist Portal (Login / Register)</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
