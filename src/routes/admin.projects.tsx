import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/editor';
export const Route=createFileRoute('/admin/projects')({head:()=>({meta:[{title:'Proje Yönetimi | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo Proje Yönetimi ekranı.'},{property:'og:title',content:'Proje Yönetimi | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <ContentManager type="projects"/>;}
