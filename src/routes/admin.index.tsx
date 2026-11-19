import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/admin/dashboard';
export const Route=createFileRoute('/admin/')({head:()=>({meta:[{title:'Genel Bakış | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo Genel Bakış ekranı.'},{property:'og:title',content:'Genel Bakış | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <Dashboard/>;}
