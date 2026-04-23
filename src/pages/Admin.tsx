import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';
import { useAuth, UserRole } from '../context/AuthContext';
import { Plus, Trash2, LayoutDashboard, FileText, Share2, LogOut, Users, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Admin = () => {
  const { user, login, logout, isSuperAdmin, isContentManager, isStaff, role } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'cases' | 'users' | 'logs'>('posts');
  
  // Forms
  const [blogForm, setBlogForm] = useState({ title: '', url: '', thumbnail: '' });
  const [caseForm, setCaseForm] = useState({ title: '', category: '추나/교정', content: '' });

  const [blogSnap] = useCollection(query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'), limit(10)));
  const [casesSnap] = useCollection(query(collection(db, 'treatment_cases'), orderBy('createdAt', 'desc'), limit(10)));
  const [usersSnap] = useCollection(isSuperAdmin ? collection(db, 'users') : null);
  const [logsSnap] = useCollection(activeTab === 'logs' && isSuperAdmin ? query(collection(db, 'login_logs'), orderBy('timestamp', 'desc'), limit(50)) : null);

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isContentManager) return;
    await addDoc(collection(db, 'blog_posts'), { ...blogForm, createdAt: serverTimestamp() });
    setBlogForm({ title: '', url: '', thumbnail: '' });
  };

  const handleAddCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isContentManager) return;
    await addDoc(collection(db, 'treatment_cases'), { ...caseForm, createdAt: serverTimestamp() });
    setCaseForm({ title: '', category: '추나/교정', content: '' });
  };

  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    if (!isSuperAdmin) return;
    await updateDoc(doc(db, 'users', userId), { role: newRole });
  };

  const deleteItem = async (col: string, id: string) => {
    if (!isContentManager) return;
    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, col, id));
    }
  };

  if (!user || !isStaff) {
    return (
      <div className="section-padding min-h-screen flex items-center justify-center bg-slate-50">
        <SEO title="관리자 로그인" description="관리자 전용 대시보드입니다." />
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <LayoutDashboard className="text-primary" size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-4">관리자 접속</h1>
          <p className="text-slate-500 mb-6">권한이 있는 계정으로 로그인해 주세요.</p>
          {user && !isStaff && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              접속 권한이 없습니다. 슈퍼 관리자에게 문의하세요.
            </div>
          )}
          <button onClick={login} className="btn-primary w-full py-4 text-lg">
            구글 로그인
          </button>
          {user && <button onClick={logout} className="mt-4 text-slate-400 underline text-sm">다른 계정으로 로그인</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <SEO title="관리자 대시보드" description="평강한의원 콘텐츠 관리 시스템" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 sticky top-20 h-[calc(100vh-80px)]">
        <div className="mb-10 px-2 font-bold text-slate-400 text-xs uppercase tracking-widest">Navigation</div>
        <nav className="space-y-2 flex-grow">
          <button onClick={() => setActiveTab('posts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'posts' ? 'bg-primary text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Share2 size={20} /> 블로그 링크
          </button>
          <button onClick={() => setActiveTab('cases')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cases' ? 'bg-primary text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
            <FileText size={20} /> 치료 사례
          </button>
          {isSuperAdmin && (
            <>
              <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-secondary text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Users size={20} /> 관리자 설정
              </button>
              <button onClick={() => setActiveTab('logs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'logs' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}>
                <LayoutDashboard size={20} /> 로그인 이력
              </button>
            </>
          )}
        </nav>
        <div className="mt-auto pt-6 border-t">
          <div className="px-4 mb-4">
            <div className="text-xs text-slate-400">현재 역할</div>
            <div className="text-sm font-bold text-primary flex items-center gap-1">
              <ShieldCheck size={14} /> {role}
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={20} /> 로그아웃
          </button>
        </div>
      </aside>

      <main className="flex-grow p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900">
               {activeTab === 'posts' && '블로그 포스팅 관리'}
               {activeTab === 'cases' && '치료 사례 관리'}
               {activeTab === 'users' && '사용자 권한 관리'}
               {activeTab === 'logs' && '로그인 이력 확인'}
             </h2>
          </div>

          <div className="grid gap-12">
            {activeTab === 'logs' && isSuperAdmin ? (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b text-xs text-slate-400 uppercase tracking-widest">
                        <th className="pb-4">접속 시간</th>
                        <th className="pb-4">이메일</th>
                        <th className="pb-4 hidden md:table-cell">기기 정보</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {logsSnap?.docs.map(doc => (
                        <tr key={doc.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                          <td className="py-4 text-slate-900">{doc.data().timestamp?.toDate().toLocaleString()}</td>
                          <td className="py-4 text-slate-600">{doc.data().email}</td>
                          <td className="py-4 text-slate-400 text-xs truncate max-w-[200px] hidden md:table-cell">{doc.data().userAgent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : activeTab === 'users' && isSuperAdmin ? (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-6">시스템 사용자 목록</h3>
                <div className="space-y-4">
                  {usersSnap?.docs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div>
                        <div className="font-bold text-slate-900">{doc.data().displayName}</div>
                        <div className="text-xs text-slate-500">{doc.data().email}</div>
                      </div>
                      <select 
                        value={doc.data().role} 
                        onChange={(e) => handleUpdateRole(doc.id, e.target.value as UserRole)}
                        className="bg-white border text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="SUPER_ADMIN">슈퍼 관리자</option>
                        <option value="CONTENT_MANAGER">콘텐츠 매니저</option>
                        <option value="STAFF">스태프 (조회)</option>
                        <option value="null">권한 없음</option>
                      </select>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <>
                {/* Form Section */}
                {isContentManager && (
                  <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Plus size={20} className="text-primary" /> 
                      {activeTab === 'posts' ? '새 블로그 링크 등록' : '새 치료 사례 등록'}
                    </h3>
                    
                    {activeTab === 'posts' ? (
                      <form onSubmit={handleAddBlog} className="space-y-4">
                        <input required placeholder="블로그 제목" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                        <input required placeholder="네이버 블로그 URL" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" value={blogForm.url} onChange={e => setBlogForm({...blogForm, url: e.target.value})} />
                        <input required placeholder="썸네일 이미지 URL" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" value={blogForm.thumbnail} onChange={e => setBlogForm({...blogForm, thumbnail: e.target.value})} />
                        <button type="submit" className="btn-primary w-full py-4 rounded-2xl font-bold">등록하기</button>
                      </form>
                    ) : (
                      <form onSubmit={handleAddCase} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input required placeholder="환자 사례 제목" className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" value={caseForm.title} onChange={e => setCaseForm({...caseForm, title: e.target.value})} />
                          <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" value={caseForm.category} onChange={e => setCaseForm({...caseForm, category: e.target.value})}>
                            <option>추나/교정</option>
                            <option>교통사고</option>
                            <option>보약/체질</option>
                            <option>기타</option>
                          </select>
                        </div>
                        <textarea required placeholder="호전 내용 및 치료 과정" rows={5} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20" value={caseForm.content} onChange={e => setCaseForm({...caseForm, content: e.target.value})} />
                        <button type="submit" className="btn-primary w-full py-4 rounded-2xl font-bold">등록하기</button>
                      </form>
                    )}
                  </section>
                )}

                {/* List Section */}
                <section>
                   <h3 className="text-lg font-bold mb-6">최근 등록된 내역</h3>
                   <div className="space-y-4">
                     {activeTab === 'posts' ? (
                       blogSnap?.docs.map(doc => (
                         <div key={doc.id} className="bg-white p-6 rounded-2xl flex justify-between items-center border border-slate-100 hover:shadow-md transition-all">
                           <div>
                             <div className="font-bold text-slate-900">{doc.data().title}</div>
                             <div className="text-xs text-slate-400 mt-1">{doc.data().url}</div>
                           </div>
                           {isContentManager && (
                             <button onClick={() => deleteItem('blog_posts', doc.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                               <Trash2 size={20} />
                             </button>
                           )}
                         </div>
                       ))
                     ) : (
                       casesSnap?.docs.map(doc => (
                         <div key={doc.id} className="bg-white p-6 rounded-2xl flex justify-between items-center border border-slate-100 hover:shadow-md transition-all">
                           <div>
                             <div className="font-bold text-slate-900">{doc.data().title}</div>
                             <div className="text-xs text-primary font-bold mt-1 uppercase">{doc.data().category}</div>
                           </div>
                           {isContentManager && (
                             <button onClick={() => deleteItem('treatment_cases', doc.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                               <Trash2 size={20} />
                             </button>
                           )}
                         </div>
                       ))
                     )}
                   </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
