import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = [
    { name: '한의원 소개', href: '/intro' },
    { name: '진료 안내', href: '/treatments' },
    { name: '치료 사례', href: '/cases' },
    { name: '의료 정보', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
              <img src="https://ais-pre-3uyvqyytuxwayd62buyypb-87627272699.asia-northeast1.run.app/logo.png" alt="운정 평강한의원 로고" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors">운정 <span className="text-primary">평강</span>한의원</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Pyeonggang Clinic</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <NavLink 
                key={item.name} 
                to={item.href}
                className={({isActive}) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                {item.name}
              </NavLink>
            ))}
            <Link to="/admin" className="text-xs text-slate-300 hover:text-slate-500 transition-colors pt-1">관리자</Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <NavLink 
                  key={item.name} 
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-slate-700 hover:text-primary"
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <a href="tel:031-123-4567" className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Phone size={16} className="text-primary" /> 031-123-4567
                </a>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} className="text-primary" /> 야간/주말 진료
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
