import { createFileRoute } from '@tanstack/react-router';
import { AdminPreview } from '@/components/admin/dashboard';
export const Route=createFileRoute('/admin/preview')({head:()=>({meta:[{title:'Taslak Önizleme | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo Taslak Önizleme ekranı.'},{property:'og:title',content:'Taslak Önizleme | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <AdminPreview/>;}
