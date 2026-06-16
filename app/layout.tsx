import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageTracker } from '@/components/PageTracker';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'fallback', // 100ms window then uses system font — avoids 1.4s LCP delay from font chain
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'fallback',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calculate-today.com'),
  title: {
    default: 'CalculateToday — Free Online Calculators',
    template: '%s | CalculateToday',
  },
  description:
    'Free, fast, and accurate online calculators for finance, health, business, and more. EMI, GST, BMI, PPC calculators — no sign-up required.',
  keywords: ['calculator', 'online calculator', 'EMI calculator', 'GST calculator', 'BMI calculator', 'PPC calculator'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'CalculateToday',
    // Note: title/description/url intentionally omitted here.
    // Next.js auto-fills them from each page's title/description so social
    // previews are per-page, not generic homepage copy.
    images: [
      {
        url: 'https://calculate-today.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CalculateToday — Free Indian Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    // title/description omitted — Next.js auto-fills from page metadata
    images: ['https://calculate-today.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        {/* TEMP nav-trap diagnostic — only active with ?debugnav=1. Captures any
            navigation back to "/" (and its stack) to sessionStorage and shows a
            red box on the next page so the redirect cause is visible without DevTools.
            Remove after the EMI/calculator redirect bug is diagnosed. */}
        <script
          dangerouslySetInnerHTML={{ __html: `(function(){try{
            var LS=window.localStorage; var loadT=Date.now();
            var box=function(a){try{if(document.getElementById('__nb'))return;var d=document.createElement('div');d.id='__nb';d.style.cssText='position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#b00;color:#fff;font:11px monospace;padding:8px;white-space:pre-wrap;max-height:92vh;overflow:auto';d.textContent='NAVTRAP @'+location.pathname+'\\n\\n'+a.map(function(r){return r.dt+'ms '+r.how+'  '+r.from+' -> '+r.to+'\\n'+r.stack;}).join('\\n\\n')+'\\n\\n[tap to clear]';d.onclick=function(){d.remove();try{LS.removeItem('__dbglog');}catch(e){}};(document.body||document.documentElement).appendChild(d);}catch(e){}};
            var cap=function(how,u){try{var to=String(u).replace(location.origin,'');var rec={how:how,to:to,from:location.pathname,dt:Date.now()-loadT,stack:(new Error().stack||'').split('\\n').slice(1,12).join(' || ')};var a=[];try{a=JSON.parse(LS.getItem('__dbglog')||'[]');}catch(e){}a.push(rec);if(a.length>40)a=a.slice(-40);try{LS.setItem('__dbglog',JSON.stringify(a));}catch(e){}
              if(/\\/calculators\\//.test(rec.from)&&(to=='/'||to=='')&&rec.dt<10000){box(a);}}catch(e){}};
            ['error','warn','log'].forEach(function(lvl){var orig=console[lvl];console[lvl]=function(){try{var m=Array.prototype.map.call(arguments,function(x){return typeof x==='string'?x:(x&&x.message)||'';}).join(' ');if(/RSC|payload|Failed to fetch|Falling back|browser navigation|hydrat/i.test(m)){var a=[];try{a=JSON.parse(LS.getItem('__dbglog')||'[]');}catch(e){}a.push({how:'CONSOLE.'+lvl,to:'',from:location.pathname,dt:Date.now()-loadT,stack:m.slice(0,300)});if(a.length>40)a=a.slice(-40);try{LS.setItem('__dbglog',JSON.stringify(a));}catch(e){}box(a);}}catch(e){}return orig.apply(console,arguments);};});
            var hp=history.pushState,hr=history.replaceState;
            history.pushState=function(s,t,u){cap('pushState',u);return hp.apply(history,arguments);};
            history.replaceState=function(s,t,u){cap('replaceState',u);return hr.apply(history,arguments);};
            try{var la=location.assign.bind(location);location.assign=function(u){cap('assign',u);return la(u);};}catch(e){}
            try{var lr=location.replace.bind(location);location.replace=function(u){cap('locReplace',u);return lr(u);};}catch(e){}
            window.addEventListener('popstate',function(){cap('popstate',location.pathname);});
            window.addEventListener('pagehide',function(){cap('pagehide',location.pathname);});
            window.addEventListener('beforeunload',function(){cap('beforeunload',location.pathname);});
            window.addEventListener('error',function(e){cap('ERR:'+(e.message||'').slice(0,90),location.pathname);});
            window.addEventListener('unhandledrejection',function(e){cap('REJECT:'+String(e.reason).slice(0,90),location.pathname);});
            if(window.navigation&&navigation.addEventListener){navigation.addEventListener('navigate',function(e){try{var d=e.destination&&e.destination.url?new URL(e.destination.url).pathname:'?';cap('NAVAPI('+(e.navigationType||'')+')',d);}catch(x){}});}
            var viewer=function(){try{if(location.search.indexOf('shownavlog')<0)return;var a=JSON.parse(LS.getItem('__dbglog')||'[]');var d=document.createElement('div');d.id='__nb';d.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#000;color:#0f0;font:12px monospace;padding:12px;white-space:pre-wrap;overflow:auto';d.textContent='=== CAPTURED NAV LOG ('+a.length+') ===\\n\\n'+(a.length?a.map(function(r){return r.dt+'ms '+r.how+'  '+r.from+' -> '+r.to+'\\n'+r.stack;}).join('\\n\\n'):'(empty — nothing captured)')+'\\n\\n[tap to clear]';d.onclick=function(){d.remove();LS.removeItem('__dbglog');};(document.body||document.documentElement).appendChild(d);}catch(e){}};
            var onhome=function(){try{viewer();if(location.pathname!=='/')return;var a=JSON.parse(LS.getItem('__dbglog')||'[]');if(a.some(function(r){return /\\/calculators\\//.test(r.from);}))box(a);}catch(e){}};
            window.addEventListener('DOMContentLoaded',onhome); setTimeout(onhome,600); setTimeout(onhome,2000);
          }catch(e){}})();` }}
        />
        {/* llms.txt — AI/LLM crawler discoverability */}
        <link rel="llms" href="/llms.txt" />
        {/* DNS prefetch for lazy-loaded third parties (preconnect would expire before lazyOnload fires) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        {/* Organization schema — Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'CalculateToday',
            alternateName: 'Calculate Today',
            url: 'https://calculate-today.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://calculate-today.com/og-image.png',
              width: 1200,
              height: 630,
            },
            description: 'Free, accurate online calculators for income tax, SIP, EMI, GST, loans and 38+ more. Built for India. No sign-up required.',
            foundingDate: '2025',
            areaServed: {
              '@type': 'Country',
              name: 'India',
            },
            knowsAbout: [
              'Income Tax Calculation',
              'SIP Investment Planning',
              'EMI Calculation',
              'GST Calculator',
              'PPF and EPF Savings',
              'Home Loan Eligibility',
            ],
            sameAs: [
              'https://calculate-today.com',
            ],
          }) }}
        />
        {/* WebSite schema — enables Google Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CalculateToday',
            url: 'https://calculate-today.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://calculate-today.com/?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
        {/* Impact.com site verification — Semrush affiliate */}
        <meta name="impact-site-verification" content="4a9b06a9-aae2-48a7-89e5-366158718a9a" />
        {/* DNS prefetch for AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        )}
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[--background] text-[--foreground]">
        <ThemeProvider>
          {/* Skip to main content — accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
          >
            Skip to main content
          </a>
          <PageTracker />
          <ScrollDepthTracker />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
        {/* Google AdSense — Auto Ads; publisher ID baked in at build time */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
        {/* Google Analytics — lazyOnload defers 63KB of GTM JS until browser is idle */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F4NF1E8QEN"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F4NF1E8QEN');
          `}
        </Script>
      </body>
    </html>
  );
}
