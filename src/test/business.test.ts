import { describe, expect, it } from 'vitest';
import { businessConfig, whatsappUrl } from '@/data/business';
import { articles, services } from '@/data/content';
describe('Business contact rules', () => {
 it('calls the supplied phone number', () => { expect(businessConfig.phoneHref).toBe('tel:+905431274323'); });
 it('opens the supplied Instagram account', () => { expect(businessConfig.instagram).toBe('https://www.instagram.com/davutogludemir/'); });
 it('addresses the correct WhatsApp number with the exact default message', () => { const url = new URL(whatsappUrl()); expect(url.pathname).toBe('/905431274323'); expect(url.searchParams.get('text')).toBe('Merhaba, Davutoğlu Demir Doğrama web siteniz üzerinden ulaşıyorum. Metal imalat hizmetleriniz hakkında bilgi ve fiyat teklifi almak istiyorum.'); });
 it('encodes a service-specific message', () => { expect(new URL(whatsappUrl('bahçe kapısı')).searchParams.get('text')).toBe('Merhaba, Davutoğlu Demir Doğrama web sitenizdeki bahçe kapısı hizmetiniz hakkında fiyat teklifi almak istiyorum.'); });
 it('resolves every article’s related service', () => { for (const article of articles) expect(services.some(s => s.slug === article.serviceSlug)).toBe(true); });
});
