import { createFileRoute } from '@tanstack/react-router';
import { MediaLibrary } from '@/components/admin/settings-pages';
export const Route=createFileRoute('/admin/media')({head:()=>({meta:[{title:'Medya Kütüphanesi | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo Medya Kütüphanesi ekranı.'},{property:'og:title',content:'Medya Kütüphanesi | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <MediaLibrary/>;}
