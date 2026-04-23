import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { FloatingMenu } from './components/FloatingMenu';
import { Home } from './pages/Home';
import { Intro } from './pages/Intro';
import { Treatments } from './pages/Treatments';
import { Cases } from './pages/Cases';
import { Blog } from './pages/Blog';

// Placeholder for Admin
const Admin = () => (
  <div className="section-padding min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6">
      <span className="text-3xl">⚙️</span>
    </div>
    <h1 className="text-4xl font-bold mb-4">관리자 대시보드</h1>
    <p className="text-lg text-slate-600 mb-8 max-w-md">
      원장님 전용 관리 페이지입니다. <br /> 
      통계 확인 및 콘텐츠 등록이 가능합니다.
    </p>
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-200 w-full max-w-md text-left">
      <h3 className="font-bold mb-4">로그인</h3>
      <input type="password" placeholder="관리자 암호" className="w-full p-3 border rounded-xl mb-4 focus:ring-primary focus:ring-2 outline-none" />
      <button className="btn-primary w-full">관리 시스템 접속</button>
    </div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 text-white py-12 md:py-20 mb-16 md:mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">운정 평강한의원</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                파주 운정 지역의 건강을 책임지는 <br />
                정직하고 따뜻한 진료를 지향합니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">진료 시간</h4>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>평일: 09:30 - 19:30</li>
                <li className="text-white font-bold underline decoration-secondary decoration-2 underline-offset-4">월/수/금: 야간진료 ~ 20:00</li>
                <li>토/일/공휴일: 09:30 - 17:00</li>
                <li>(공휴일/일요일 점심시간 없음)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">문의 및 예약</h4>
              <p className="text-2xl font-bold text-white mb-2">031-123-4567</p>
              <p className="text-sm text-slate-400">경기 파주시 운정역 1번 출구 앞</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">바로가기</h4>
              <ul className="text-sm text-slate-400 space-y-2">
                <li><a href="/intro" className="hover:text-white transition-colors">한의원 소개</a></li>
                <li><a href="https://blog.naver.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">공식 블로그</a></li>
                <li><a href="https://m.booking.naver.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">네이버 예약</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} 운정 평강한의원. All rights reserved. 의료법 제56조 준수.
          </div>
        </footer>
        <FloatingMenu />
      </div>
    </Router>
  );
}
