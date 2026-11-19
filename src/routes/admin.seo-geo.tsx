import { createFileRoute } from '@tanstack/react-router';
import { SettingsManager } from '@/components/admin/settings-pages';
export const Route=createFileRoute('/admin/seo-geo')({head:()=>({meta:[{title:'SEO ve GEO | Davutoğlu Yönetim'},{name:'description',content:'Davutoğlu Demir Doğrama yerel demo SEO ve GEO ekranı.'},{property:'og:title',content:'SEO ve GEO | Davutoğlu Yönetim'},{property:'og:description',content:'Tarayıcı içi içerik yönetimi.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex, nofollow'}]}),component:Page});
function Page(){return <SettingsManager module="seo-geo"/>;}
