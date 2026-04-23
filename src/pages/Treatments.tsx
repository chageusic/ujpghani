import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { Stethoscope, Car, ShieldPlus, Brain, HeartPulse, UserCheck } from 'lucide-react';

export const Treatments = () => {
  const mainTreatments = [
    {
      title: '추나요법 (Manual Therapy)',
      icon: <Stethoscope size={40} />,
      desc: '의료진의 손이나 기구를 이용하여 어긋난 뼈와 관절을 바로잡습니다. 척추 질환, 골반 틀어짐, 거북목 교정에 효과적입니다.',
      img: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: '교통사고 후유증',
      icon: <Car size={40} />,
      desc: 'X-ray 상에서 발견되지 않는 미세 어혈과 심리적 불안을 함께 다스립니다. 본인 부담금 없이 집중 치료가 가능합니다.',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: '약침 / 봉침',
      icon: <ShieldPlus size={40} />,
      desc: '순수 한약재 추출물을 경혈에 주입하여 강력한 소염 진통 작용을 유도합니다. 만성 염증성 질환과 근육통에 탁월합니다.',
      img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800'
    },
  ];

  const subTreatments = [
    { title: '공진단/경옥고', icon: <HeartPulse />, desc: '원기 회복과 면역력 증강을 위한 보약' },
    { title: '다이어트 클리닉', icon: <UserCheck />, desc: '체질 분석을 통한 건강한 체중 감량' },
    { title: '수험생/성장', icon: <Brain />, desc: '집중력 향상 및 균형 잡힌 성장 촉진' },
  ];

  return (
    <div className="bg-white">
      <SEO title="진료 안내" description="추나요법, 교통사고 자동차보험 치료, 약침, 보약 전문 진료 과목 안내입니다." />
      
      <section className="bg-primary/5 py-16 text-center">
        <div className="section-padding">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">정밀하고 깊이 있는 진료</h1>
          <p className="text-slate-600">증상에 맞는 체계적인 한방 치료 솔루션을 제공합니다.</p>
        </div>
      </section>

      {/* Main Treatment Grid */}
      <section className="section-padding space-y-24">
        {mainTreatments.map((t, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
          >
            <div className="lg:w-1/2">
              <img 
                src={t.img} 
                alt={t.title} 
                className="rounded-[2rem] shadow-2xl w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="text-primary mb-4">{t.icon}</div>
              <h2 className="text-3xl font-bold text-slate-900">{t.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.desc}
              </p>
              <div className="pt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700">✓ 정밀 체형 분석</div>
                <div className="p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700">✓ 1:1 맞춤 강도 조절</div>
                <div className="p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700">✓ 건강보험/실비 적용 가능</div>
                <div className="p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700">✓ 체계적 사후 관리</div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Sub Treatments */}
      <section className="bg-slate-50 section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">맞춤형 보약 & 특수 진료</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {subTreatments.map((s, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="text-secondary mb-4 flex justify-center">
                 {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
