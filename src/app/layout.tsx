import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/container";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bulgaros Ayuda",
  description: "Ayuda para hacer bulgaros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-analytics">
          {
            "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5N9HQHS8');"
          }
        </Script>
        <Script src="https://cdn.amplitude.com/libs/analytics-browser-2.7.4-min.js.gz"></Script>
        <Script src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.4.1-min.js.gz"></Script>
        <Script src="https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz"></Script>
        <Script id="amplitude-analytics">
          {
            "window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1})).promise.then(function() {window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());window.amplitude.init('788b4cb2d81c587e5e0a6f422fdda704');})"
          }
          ;
        </Script>
      </head>
      <body className={inter.className + "flex items-center justify-center"}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5N9HQHS8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
