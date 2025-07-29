import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';

import Header from '@/components/Header/Header';
import { ModalProvider } from '@/components/Modals/ModalProvider';
import { ToasterProvider } from '@/components/ToastProvider/ToastProvider';
import { AuthProvider } from '@/context/AuthProvider';
import DeviceProvider from '@/context/DeviceProvider';
import QueryProvider from '@/context/QueryProvider';
import '@/styles/globals.css';
import { SiteContent } from '@/types/dictionaries';

import { getDictionary } from './dictionaries';

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
    appleWebApp: {
      title: 'UDocument',
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

  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refresh_token')?.value;
  const accessToken = cookieStore.get('access_token')?.value;

  return (
    <html lang={currentLang} className="h-full">
      <body className={clsx(roboto.className, 'text-main-black bg-bg-body-main min-h-screen w-full antialiased')}>
        <QueryProvider>
          <DeviceProvider>
            <ModalProvider>
              <AuthProvider isAuth={accessToken && refreshToken ? true : false} lang={lang}>
                <ToasterProvider />
                <div className="relative isolate z-[1] flex min-h-screen w-full flex-col overflow-hidden">
                  <Header lang={t} params={currentLang} />
                  {/* <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main> */}
                  <main className="w-full flex-grow">{children}</main>
                </div>
                <div className="body-overlay overlay pointer-events-none !fixed z-[13]" />
              </AuthProvider>
            </ModalProvider>
          </DeviceProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
