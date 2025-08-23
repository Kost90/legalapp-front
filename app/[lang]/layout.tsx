import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { ModalProvider } from '@/components/Modals/ModalProvider';
import { ToasterProvider } from '@/components/ToastProvider/ToastProvider';
import { AuthProvider } from '@/context/AuthProvider';
import DeviceProvider from '@/context/DeviceProvider';
import QueryProvider from '@/context/QueryProvider';
import '@/styles/globals.css';
import { SiteContent } from '@/types/dictionaries';

import { getDictionary } from './dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/page';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t: SiteContent = await getDictionary(lang);

  // TODO: Заменить как будет доменное имя
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pageTitle = t.meta?.title || 'UDocument - Юридичні послуги';
  const pageDescription = t.meta?.description || 'Генерація юридичних документів та консультації.';

  return {
    title: {
      template: '%s | UDocument',
      default: pageTitle,
    },
    description: pageDescription,
    keywords: t.meta?.keywords || ['юридичні документи', 'адвокат', 'консультація'],
    authors: [{ name: 'UDocument', url: baseUrl }],

    openGraph: {
      title: t.meta?.ogTitle || pageTitle,
      description: t.meta?.ogDescription || pageDescription,
      url: `${baseUrl}/${lang}`,
      siteName: 'UDocument',
      images: [
        {
          url: `${baseUrl}/Logo_udocument.png`,
          width: 1200,
          height: 630,
          alt: 'UDocument Open Graph Image',
        },
      ],
      locale: lang === 'ua' ? 'uk_UA' : 'en_GB',
      type: 'website',
    },

    appleWebApp: {
      title: 'UDocument',
    },

    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'uk-UA': `${baseUrl}/ua`,
        'en-GB': `${baseUrl}/en`,
        'x-default': `${baseUrl}/ua`,
      },
    },
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
      <body className={clsx(roboto.className, 'text-main-black min-h-screen w-full antialiased')}>
        <QueryProvider>
          <DeviceProvider>
            <ModalProvider>
              <AuthProvider isAuth={accessToken && refreshToken ? true : false} lang={lang}>
                <ToasterProvider />
                <div className="relative isolate z-[1] flex min-h-screen w-full flex-col">
                  <Header lang={t} params={currentLang} />
                  <main className="w-full flex-grow overflow-x-hidden">{children}</main>
                  <Footer lang={lang} dictionary={t} />
                </div>
              </AuthProvider>
            </ModalProvider>
          </DeviceProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
