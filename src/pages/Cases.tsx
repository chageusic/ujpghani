import React from 'react';
import { SEO } from '../components/SEO';
import { Lock, ChevronRight, Search, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Cases = () => {
  const { user, login, logout, loading: authLoading } = useAuth();
  const [value, loading, error] = useCollection(
    query(collection(db, 'treatment_cases'), orderBy('createdAt', 'desc'))
  );

  return (
    <div className="bg-white min-h-screen">
      <SEO title="치료 사례" description="운정 평강한의원의 다양한 환자 호전 사례를 확인하세요. (로그인 필수)" />
      
      <section className="bg-primary py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="section-padding relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">함께 만든 건강한 결과</h1>
          <p className="opacity-80">환자분들이 직접 경험하신 놀라운 변화의 기록입니다.</p>
        </div>
      </section>

      <div className="section-padding">
        {!user ? (
          <div className="max-w-2xl mx-auto py-20 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
               <Lock className="text-slate-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 underline decoration-primary decoration-2 underline-offset-4">상세 사례 열람 권한 안내</h2>
            <p className="text-slate-600 leading-relaxed mb-10">
              의료법 제56조 및 동법 시행령에 따라, <br />
              환자의 치료 호전 사례는 <strong>로그인한 회원</strong>에 한하여 공개가 가능합니다. <br />
              번거로우시더라도 구글 로그인을 통해 1초 만에 확인해 보세요.
            </p>
            <div className="max-w-xs mx-auto">
              <button 
                onClick={login} 
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700 shadow-sm"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                구글로 1초만에 로그인
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
               <h2 className="text-2xl font-bold text-slate-900">최신 치료 사례</h2>
               <div className="text-sm text-slate-500">환영합니다, {user.displayName}님</div>
            </div>
            
            {loading ? (
              <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
            ) : (
              <div className="grid gap-4">
                {value?.docs.map(doc => (
                  <div key={doc.id} className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-left">
                        <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider w-fit">{doc.data().category}</span>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{doc.data().title}</h3>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="mt-4 text-slate-600 text-sm line-clamp-2 leading-relaxed">{doc.data().content}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="py-12 text-center">
               <p className="text-slate-400 text-sm">진료 기록의 보안은 평강한의원의 최우선 가치입니다.</p>
               <button onClick={logout} className="text-xs text-slate-300 mt-4 underline hover:text-slate-500">로그아웃</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

