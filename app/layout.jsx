import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'Abdullah Global Trade (AGT) | From Vision to Value',
  description: 'Premier B2B Corporate Merchandise & Promotional Product Sourcing for Pharmaceutical PMDs, Corporate Brands, and Institutional Partners in Bangladesh.',
  keywords: 'AGT, Abdullah Global Trade, Pharmaceutical Promotional Products, PMD Sourcing, Corporate Gifting Bangladesh, Doctor Gifts, Medical Conference Merchandise, Custom Logo Printing',
  openGraph: {
    title: 'Abdullah Global Trade (AGT) | Corporate Sourcing & Merchandise',
    description: 'Connecting Business | Building Partnerships | Delivering Growth',
    url: 'https://abdullahglobaltrade.netlify.app',
    siteName: 'Abdullah Global Trade',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F96XY586KK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F96XY586KK', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-cream-100 text-navy-950 antialiased selection:bg-gold-500 selection:text-white">
        {/* Subtle Warm Luxury Ambient Light */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(197,155,76,0.12),rgba(250,247,240,0))]"></div>
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_60%_at_85%_50%,rgba(236,225,207,0.4),rgba(250,247,240,0))]"></div>
        {children}
      </body>
    </html>
  );
}
