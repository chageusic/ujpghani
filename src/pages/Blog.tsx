import React from 'react';
import { SEO } from '../components/SEO';
import { ExternalLink, LayoutList, Loader2 } from 'lucide-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Blog = () => {
  const [value, loading] = useCollection(
    query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'))
  );

  return (
    <div className="bg-white min-h-screen">
      <SEO title="의료 정보" description="운정 평강한의원 공식 블로그의 최신 한방 건강 정보를 한눈에 확인하세요." />
      
      <section className="bg-slate-50 py-16">
        <div className="section-padding text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">평강 건강 리포트</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            네이버 공식 블로그의 유익한 정보들을 이곳에서 확인하실 수 있습니다. <br />
            매주 새로운 한방 지식과 원장님의 치료 철학을 공유합니다.
          </p>
        </div>
      </section>

      <div className="section-padding">
        <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-4">
           <div className="flex gap-2 items-center text-primary font-bold">
             <LayoutList size={20} />
             <span>블로그 컬렉션</span>
           </div>
           <a href="https://blog.naver.com" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
             공식 블로그 바로가기 <ExternalLink size={14} />
           </a>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {value?.docs.map(doc => {
              const post = doc.data();
              return (
                <a 
                  key={doc.id} 
                  href={post.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group block bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-primary mb-2 block uppercase tracking-tighter">Healthy Life</span>
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors mb-4 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : '최근 게시물'}</span>
                      <span className="group-hover:translate-x-1 transition-transform">더보기 →</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {value?.empty && !loading && (
          <div className="text-center py-20 text-slate-400">
            등록된 블로그 포스팅이 없습니다.
          </div>
        )}

        {/* CMS Notice for Admin */}
        <div className="mt-20 p-8 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col items-center text-center">
           <h4 className="font-bold text-primary mb-2 italic">원장님을 위한 팁</h4>
           <p className="text-sm text-slate-600">
              네이버 블로그에 포스팅을 작성하신 후, 관리자 페이지에서 URL만 등록하시면 <br />
              이곳에 자동으로 업데이트되어 방문자들에게 전문성을 어필할 수 있습니다.
           </p>
        </div>
      </div>
    </div>
  );
};

