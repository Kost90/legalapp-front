import { Metadata } from 'next';

import PageTitle from '@/components/PageTitle/PageTitle';

export const metadata: Metadata = { title: 'Your documents' };

export default async function DocumentsPage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  return <PageTitle title="Your documents" />;
}
