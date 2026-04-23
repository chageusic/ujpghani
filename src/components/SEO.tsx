import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | 운정 평강한의원`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [title, description]);

  return null;
};
