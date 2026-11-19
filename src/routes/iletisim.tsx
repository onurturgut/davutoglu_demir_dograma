import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/site/pages';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/iletisim')({ head: () => pageHead('İletişim', 'Davutoğlu Demir Doğrama: 0543 127 43 23. WhatsApp, telefon ve Instagram üzerinden doğrudan iletişim.', '/iletisim'), component: ContactPage });
