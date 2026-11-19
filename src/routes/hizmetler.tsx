import { createFileRoute } from '@tanstack/react-router';
import { ServicesPage } from '@/components/site/pages';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/hizmetler')({ head: () => pageHead('Hizmetler', 'Elazığ’da demir kapı, merdiven, korkuluk, çardak ve özel metal imalat hizmetleri.', '/hizmetler'), component: ServicesPage });
