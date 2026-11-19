import { createFileRoute } from '@tanstack/react-router';
import { ProjectsPage } from '@/components/site/pages';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/projeler')({ head: () => pageHead('Projeler ve Tasarım Seçkisi', 'Kapı, merdiven ve özel metal ürünlerden temsilî konsept seçkisini inceleyin.', '/projeler'), component: ProjectsPage });
