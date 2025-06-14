import PageTitle from '@/components/PageTitle/PageTitle';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Generate document' };

export default async function GeneratePage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  return <PageTitle title="Generate document" />;
}
