import { createFileRoute } from '@tanstack/react-router';
import { SettingsManager } from '@/components/admin/settings-pages';
export const Route=createFileRoute('/admin/homepage')({head:()=>({meta:[{title:'Ana Sayfa Yönetimi | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo Ana Sayfa Yönetimi ekranı.'},{property:'og:title',content:'Ana Sayfa Yönetimi | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <SettingsManager module="homepage"/>;}
