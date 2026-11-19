import { createFileRoute, notFound } from '@tanstack/react-router';
import { ProjectDetail } from '@/components/site/pages';
import { projects } from '@/data/content';
import { usePublicData } from '@/lib/cms/store';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/projeler_/$slug')({
 loader: ({ params }) => { const item = projects.find(i => i.slug === params.slug); return item; },
 head: ({ loaderData: item }) => item ? pageHead(item.title, item.description, '/projeler/' + item.slug, { '@type': 'CreativeWork', name: item.title, description: item.description }) : { meta: [{ title: 'İçerik bulunamadı | Davutoğlu Demir Doğrama' }, { name: 'robots', content: 'noindex' }] },
 component: Detail,
});
function Detail() { const {slug}=Route.useParams();const {projects}=usePublicData();const item=projects.find(e=>e.slug===slug);return item?< ProjectDetail item={item} />:<main className="container section"><h1>İçerik bulunamadı</h1><p>Bu içerik yerel olarak yayında değil.</p></main>; }
