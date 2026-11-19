import { createFileRoute, notFound } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/site/pages';
import { services } from '@/data/content';
import { usePublicData } from '@/lib/cms/store';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/hizmetler_/$slug')({
 loader: ({ params }) => { const item = services.find(i => i.slug === params.slug); return item; },
 head: ({ loaderData: item }) => item ? pageHead(item.title, item.description, '/hizmetler/' + item.slug, { '@type': 'Service', name: item.title, description: item.description }) : { meta: [{ title: 'İçerik bulunamadı | Davutoğlu Demir Doğrama' }, { name: 'robots', content: 'noindex' }] },
 component: Detail,
});
function Detail() { const {slug}=Route.useParams();const {services}=usePublicData();const item=services.find(e=>e.slug===slug);return item?< ServiceDetail item={item} />:<main className="container section"><h1>İçerik bulunamadı</h1><p>Bu içerik yerel olarak yayında değil.</p></main>; }
