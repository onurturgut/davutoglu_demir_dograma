import Link from "next/link";
export default function NotFound() {
  return (
    <main className="section container">
      <h1>Sayfa bulunamadı</h1>
      <p>Aradığınız içerik kaldırılmış veya taşınmış olabilir.</p>
      <Link href="/">Ana sayfaya dön</Link>
    </main>
  );
}
