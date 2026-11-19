import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/components/site/pages';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/hakkimizda')({ head: () => pageHead('Hakkımızda', 'Elazığ Merkez’de Davutoğlu Demir Doğrama ve metal imalat çalışma alanlarını tanıyın.', '/hakkimizda'), component: AboutPage });
