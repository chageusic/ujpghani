import React from 'react';
import { Mail, MapPin, Clock, Calendar, Phone, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export const Intro = () => {
  const schedules = [
    { day: '월 / 수 / 금', time: '09:30 ~ 20:00', note: '야간진료' },
    { day: '화 / 목', time: '09:30 ~ 19:30', note: '평일진료' },
    { day: '토 / 일 / 공휴일', time: '09:30 ~ 17:00', note: '점심시간 없이 진료' },
    { day: '평일 점심시간', time: '13:00 ~ 14:00', note: '' },
  ];

  return (
    <div className="bg-white">
      <SEO title="한의원 소개" description="운정 평강한의원 의료진 및 오시는 길 안내. 일요일/공휴일 오후 5시까지 진료합니다." />
      
      {/* Hero */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="section-padding text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">한의원 소개</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            가장 편안한 공간에서, 가장 정직한 진료로 <br /> 
            여러분의 일상에 평온함을 되찾아 드립니다.
          </p>
        </div>
      </section>

      {/* Staff */}
      <section className="section-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1000" 
              alt="Doctor"
              className="rounded-3xl shadow-xl border-4 border-white aspect-[3/4] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block underline decoration-secondary decoration-4 underline-offset-4">Director Profile</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">원장 이평강</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              "한의학은 단순한 증상 치료를 넘어 사람 전체를 보는 의학입니다. <br />
              환자분들이 겪으시는 육체적 통증 뒤에 숨겨진 마음의 불편함까지 <br />
              세심히 살피는 평생 건강 주치의가 되겠습니다."
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="font-bold text-slate-900 w-24">전문 분야</div>
                <div className="text-slate-600">추나요법, 교통사고 후유증, 만성 통증 조절, 체질 개선</div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-slate-900 w-24">주요 약력</div>
                <ul className="text-slate-600 list-disc list-inside space-y-1">
                  <li>대한한의사협회 정회원</li>
                  <li>척추도인안교학회 정회원</li>
                  <li>전) OO한방병원 진료과장</li>
                  <li>OO대학교 한의과대학 학사/석사</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule & Info */}
      <section className="bg-slate-50 section-padding">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="text-primary" />
              <h3 className="text-2xl font-bold text-slate-900">진료 시간 안내</h3>
            </div>
            <div className="space-y-6">
              {schedules.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-bottom border-slate-50 border-b">
                  <div>
                    <div className="font-bold text-slate-900">{s.day}</div>
                    <div className="text-xs text-primary font-medium">{s.note}</div>
                  </div>
                  <div className="text-lg font-medium text-slate-700">{s.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-primary/5 rounded-xl flex items-start gap-3">
              <Info size={20} className="text-primary shrink-0 mt-1" />
              <p className="text-sm text-slate-600">
                토/일/공휴일은 점심시간 없이 진료하여 방문객들의 편의를 돕고 있습니다. 예약 시 대기 시간을 줄이실 수 있습니다.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="text-primary" />
              <h3 className="text-2xl font-bold text-slate-900">오시는 길</h3>
            </div>
            <div className="aspect-video bg-slate-200 rounded-2xl mb-6 overflow-hidden relative">
              {/* Mock Map */}
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
                alt="Map Placeholder"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <span className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-bounce">운정 평강한의원</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-slate-700 font-medium">경기 파주시 운정역 1번 출구 도보 3분 거리</p>
              <div className="flex gap-4 items-center pt-4 border-t border-slate-100">
                <a href="tel:031-123-4567" className="btn-primary w-full">
                  <Phone size={18} /> 전화 문의하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
