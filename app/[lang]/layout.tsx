// import type { Metadata } from 'next';
// import { Roboto } from 'next/font/google';
// import clsx from 'clsx';

// import { getDictionary } from './dictionaries';
// import DeviceProvider from '@/context/DeviceProvider';
// import QueryProvider from '@/context/QueryProvider';
// import Header from '@/components/Header/Header';
// import '@/styles/globals.css';
// import { SiteContent } from '@/types/dictionaries';

// const roboto = Roboto({
//   subsets: ['latin', 'cyrillic'],
//   weight: ['400', '500', '700'],
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   title: 'LelalApp Udocument',
//   description: 'Generate legal document',
// };

// export default async function RootLayout({
//   children,
//   params: { lang },
// }: Readonly<{
//   children: React.ReactNode;
//   params: { lang: string };
// }>) {
//   // TODO: Change meta tags
//   const t: SiteContent = await getDictionary(lang);

//   return (
//     <html lang="uk-UA">
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         {/* <link
//           href="/favicon-96x96.png"
//           rel="icon"
//           sizes="96x96"
//           type="image/png"
//         />
//         <link
//           href="/favicon.svg"
//           rel="icon"
//           type="image/svg+xml"
//         />
//         <link
//           href="/favicon.ico"
//           rel="shortcut icon"
//         />
//         <link
//           href="/apple-touch-icon.png"
//           rel="apple-touch-icon"
//           sizes="180x180"
//         />

//         <meta
//           content="Blackalgo"
//           name="apple-mobile-web-app-title"
//         />
//         <link
//           href="/site.webmanifest"
//           rel="manifest"
//         /> */}
//         {/* <meta
//           name="keywords"
//           content="юридические услуги, консультация, адвокатська допомога, оформлення нерухомості одеса"
//         />
//         <meta name="author" content="UDocument" />
//         <meta
//           property="og:title"
//           content="UDocument - Оформлення нерухомості в Одесі - Юридичні послуги з нерухомості"
//         />
//         <meta
//           property="og:description"
//           content="Професійні послуги з оформлення нерухомості в Одесі. Юридична перевірка, оформлення договорів купівлі-продажу. Дізнайтесь більше!"
//         />
//         <meta property="og:url" content="https://www.udocument.net/" />
//         <meta name="twitter:card" content="summary_large_image" /> */}
//         {/* <title>
//           UDocument - Оформлення нерухомості в Одесі - Юридичні послуги з
//           нерухомості
//         </title> */}
//       </head>
//       {/* Change text of body */}
//       <body className={clsx(`${roboto.className} antialiased`)}>
//         <QueryProvider>
//           <DeviceProvider>
//             <div className="relative overflow-hidden h-screen flex flex-col isolate z-[1]">
//               <Header lang={t} params={lang} />
//               {children}
//             </div>
//           </DeviceProvider>
//         </QueryProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import clsx from 'clsx';

import { getDictionary } from './dictionaries';
import DeviceProvider from '@/context/DeviceProvider';
import QueryProvider from '@/context/QueryProvider';
import Header from '@/components/Header/Header';
import '@/styles/globals.css';
import { SiteContent } from '@/types/dictionaries';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const t: SiteContent = await getDictionary(lang);

  const pageTitle = t.meta?.title || 'UDocument - Юридичні послуги';
  const pageDescription = t.meta?.description || 'Генерація юридичних документів та консультації.';

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: t.meta?.keywords || ['юридичні документи', 'адвокат', 'консультація'],
    authors: [{ name: 'UDocument', url: process.env.NEXT_PUBLIC_SITE_URL }],
    openGraph: {
      title: t.meta?.ogTitle || pageTitle,
      description: t.meta?.ogDescription || pageDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: 'UDocument',
      images: [
        {
          url: '/Logo_udocument.png',
          width: 1200,
          height: 630,
          alt: 'UDocument Open Graph Image',
        },
      ],
      locale: lang.replace('-', '_'),
      type: 'website',
    },
    // alternates: {
    //   canonical: `/${params.lang}`,
    //   languages: {
    //     'uk-UA': `/uk`,
    //     'en-US': `/en`,
    //   },
    // },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a202c' },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const { lang } = await params;
  const currentLang = lang;
  const t: SiteContent = await getDictionary(currentLang);

  return (
    <html lang={currentLang} className="h-full">
      <head>
        <meta content="UDocument" name="apple-mobile-web-app-title" />
      </head>

      <body className={clsx(roboto.className, 'antialiased bg-gray-100 text-gray-900 flex flex-col h-full')}>
        <QueryProvider>
          <DeviceProvider>
            <div className="flex flex-col min-h-screen">
              <Header lang={t} params={currentLang} />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            </div>
          </DeviceProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
