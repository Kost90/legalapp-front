import Image from 'next/image';
import Link from 'next/link';

import LogoSvg from '@/public/Print_Transparent.svg';

export default function Logo({ lang }: { lang: string }) {
  return (
    <Link href={`/${lang}`} className="text-xl font-bold text-white hover:text-gray-300">
      <Image src={LogoSvg} alt="logo picture of company" />
    </Link>
  );
}
