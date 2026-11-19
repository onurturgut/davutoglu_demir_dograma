import { createFileRoute } from '@tanstack/react-router';
import { ContentManager } from '@/components/admin/editor';
export const Route=createFileRoute('/admin/blog')({head:()=>({meta:[{title:'Blog Yönetimi | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo Blog Yönetimi ekranı.'},{property:'og:title',content:'Blog Yönetimi | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <ContentManager type="blog"/>;}
