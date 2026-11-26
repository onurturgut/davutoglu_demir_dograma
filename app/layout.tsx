import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles.css";
import { Providers } from "./providers";
import { LocalHead } from "@/components/admin/local-head";
import { publicMediaUrl } from "@/lib/media-url";

export const metadata: Metadata = {
  title: {
    default: "Davutoğlu Demir Doğrama",
    template: "%s | Davutoğlu Demir Doğrama",
  },
  description: "Elazığ demir doğrama ve özel metal imalat çözümleri.",
  icons: {
    icon: publicMediaUrl("/brand/davutoglu-icon.png"),
    apple: publicMediaUrl("/brand/davutoglu-icon.png"),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          <LocalHead />
          {children}
        </Providers>
      </body>
    </html>
  );
}
