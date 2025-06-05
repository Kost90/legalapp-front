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
