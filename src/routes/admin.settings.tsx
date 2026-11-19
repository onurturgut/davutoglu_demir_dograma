import { createFileRoute } from '@tanstack/react-router';
import { SettingsManager } from '@/components/admin/settings-pages';
export const Route=createFileRoute('/admin/settings')({head:()=>({meta:[{title:'Site Ayarları | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo Site Ayarları ekranı.'},{property:'og:title',content:'Site Ayarları | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <SettingsManager module="settings"/>;}
