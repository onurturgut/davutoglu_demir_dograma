import { createFileRoute } from '@tanstack/react-router';
import { BlogPage } from '@/components/site/pages';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/blog')({ head: () => pageHead('Metal İşleri Rehberi', 'Metal kapı seçimi, merdivenler, korkuluklar, bakım ve özel imalat hakkında bilgilendirici rehberler.', '/blog'), component: BlogPage });
