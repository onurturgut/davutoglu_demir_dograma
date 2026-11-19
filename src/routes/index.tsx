import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/site/pages';
import { pageHead } from '@/data/seo';
export const Route = createFileRoute('/')({ head: () => pageHead('Elazığ Demir Doğrama ve Metal İmalat', "Demir kapı, bahçe kapısı, korkuluk, metal merdiven ve özel imalat ihtiyaçlarınız için Davutoğlu Demir Doğrama ile iletişime geçin.", '/', { '@type': 'WebSite', name: 'Davutoğlu Demir Doğrama' }), component: HomePage });
