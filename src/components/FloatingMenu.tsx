import React from 'react';
import { Calendar, Phone, MessageCircle } from 'lucide-react';

export const FloatingMenu = () => {
  return (
    <>
      {/* Desktop Floating Menu */}
      <div className="hidden md:flex fixed right-8 bottom-8 flex-col gap-3 z-40">
        <a 
          href="https://m.booking.naver.com" 
          target="_blank" 
          rel="noreferrer"
          className="btn-secondary flex flex-col items-center !p-4 !rounded-2xl floating-shadow"
        >
          <Calendar size={24} />
          <span className="text-xs mt-1 font-bold">네이버 예약</span>
        </a>
        <a 
          href="tel:031-123-4567"
          className="btn-primary flex flex-col items-center !p-4 !rounded-2xl floating-shadow"
        >
          <Phone size={24} />
          <span className="text-xs mt-1 font-bold">전화 상담</span>
        </a>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <a 
          href="tel:031-123-4567" 
          className="flex-1 flex flex-col items-center justify-center text-slate-600 border-r border-slate-100"
        >
          <Phone size={20} />
          <span className="text-[10px] mt-1">전화문의</span>
        </a>
        <a 
          href="https://m.booking.naver.com" 
          target="_blank" 
          rel="noreferrer"
          className="flex-[2] flex items-center justify-center bg-secondary text-white font-bold gap-2"
        >
          <Calendar size={20} />
          <span>네이버 예약하기</span>
        </a>
        <a 
          href="/cases" 
          className="flex-1 flex flex-col items-center justify-center text-slate-600 border-l border-slate-100"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] mt-1">치료사례</span>
        </a>
      </div>
    </>
  );
};
