import Link from 'next/link';
import Image from 'next/image';

import LogoSvg from '@/public/Print_Transparent.svg';
import glob from '@/public/globe.svg';

export default function Logo() {
  return (
    <Link href="/" className="text-xl font-bold text-white hover:text-gray-300">
      <Image src={LogoSvg} alt="logo picture of company" />
    </Link>
  );
}
