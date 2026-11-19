import { createFileRoute, notFound } from '@tanstack/react-router';
import { ArticleDetail } from '@/components/site/pages';
import { articles } from '@/data/content';
import { usePublicData } from '@/lib/cms/store';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/blog_/$slug')({
 loader: ({ params }) => { const item = articles.find(i => i.slug === params.slug); return item; },
 head: ({ loaderData: item }) => item ? pageHead(item.title, item.excerpt, '/blog/' + item.slug, { '@type': 'BlogPosting', name: item.title, description: item.excerpt, ...( 'BlogPosting' === 'BlogPosting' ? { headline: item.title, author: { '@type': 'Organization', name: 'Davutoğlu Demir Doğrama' } } : {}) }) : { meta: [{ title: 'İçerik bulunamadı | Davutoğlu Demir Doğrama' }, { name: 'robots', content: 'noindex' }] },
 component: Detail,
});
function Detail() { const {slug}=Route.useParams();const {articles}=usePublicData();const item=articles.find(e=>e.slug===slug);return item?< ArticleDetail item={item} />:<main className="container section"><h1>İçerik bulunamadı</h1><p>Bu içerik yerel olarak yayında değil.</p></main>; }
