export const SITE_URL = import.meta.env['VITE_SITE_URL']?.replace(/\/$/, '') || '';
export const businessConfig = {
  businessName: 'Davutoğlu Demir Doğrama',
  description: "Elazığ'da demir doğrama, metal imalat ve özel ölçülü metal tasarım çözümleri.",
  phone: '0543 127 43 23', phoneHref: 'tel:+905431274323',
  whatsapp: 'https://wa.me/905431274323', instagram: 'https://www.instagram.com/davutogludemir/',
  city: 'Elazığ Merkez', businessType: 'Metal İmalat ve Demir Doğrama', websiteUrl: SITE_URL,
};
export function whatsappUrl(service?: string) {
  const message = service
    ? `Merhaba, Davutoğlu Demir Doğrama web sitenizdeki ${service} hizmetiniz hakkında fiyat teklifi almak istiyorum.`
    : 'Merhaba, Davutoğlu Demir Doğrama web siteniz üzerinden ulaşıyorum. Metal imalat hizmetleriniz hakkında bilgi ve fiyat teklifi almak istiyorum.';
  return `${businessConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
