import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Car, Heart, Stethoscope } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Home = () => {
  const services = [
    { title: '추나요법', icon: <Stethoscope />, desc: '틀어진 관절과 근육을 바로잡아 통증의 원인을 치료합니다.', color: 'bg-green-50 text-green-700' },
    { title: '교통사고 클리닉', icon: <Car />, desc: '후유증 없는 일상 복귀를 위해 정밀 진단과 집중 치료를 제공합니다.', color: 'bg-blue-50 text-blue-700' },
    { title: '약침 치료', icon: <ShieldCheck />, desc: '한약 소염 성분을 직접 주입하여 빠른 염증 제거와 재생을 돕습니다.', color: 'bg-amber-50 text-amber-700' },
    { title: '수험생/성장 보약', icon: <Heart />, desc: '체질에 맞는 청정 약재를 사용하여 활력과 성장을 촉진합니다.', color: 'bg-red-50 text-red-700' },
  ];

  return (
    <div className="flex flex-col bg-white">
      <SEO title="운정 제일의 건강 파트너" description="파주 운정 한의원, 추나, 교통사고, 보약 전문. 일요일/공휴일 진료." />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-slate-900 text-white">
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
          alt="Clinic environment"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="relative section-padding w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-semibold mb-6">
              일요일 · 공휴일 진료 (오후 5시까지)
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              환자의 마음까지 <br />
              <span className="text-secondary italic">평평하고 평온하게</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              파주 운정신도시에서 가장 따뜻하고 <br /> 
              세밀한 진료를 약속드리는 평강한의원입니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/treatments" className="btn-primary">
                진료 안내 보기 <ChevronRight size={18} />
              </Link>
              <a href="https://m.booking.naver.com" className="btn-secondary">
                네이버 예약하기 
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">맞춤형 전문 진료</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{item.desc}</p>
              <Link to="/treatments" className="text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300">
                상세보기 <ChevronRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mid Info Section */}
      <section className="bg-slate-50">
        <div className="section-padding grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1542177306-039958999818?auto=format&fit=crop&q=80&w=1000" 
              alt="Oriental Herbs"
              className="rounded-[3rem] shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight">
              정직한 약재, <br />
              정확한 진단이 <br />
              건강의 시작입니다.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              평강한의원은 식약처 인증을 받은 엄선된 청정 한약재만을 사용합니다. <br />
              체계적인 검사와 상담을 통해 증상만이 아닌 병의 근본을 다스립니다.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                <span>야간 진료 (월/수/금 오후 8시까지)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                <span>토/일/공휴일 점심시간 없이 진료</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                <span>주차장 완비 및 대중교통 용이</span>
              </li>
            </ul>
            <Link to="/intro" className="text-lg font-bold border-b-2 border-primary pb-1 text-primary">
              한의원 더 알아보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
