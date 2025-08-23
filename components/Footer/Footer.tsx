import { Mail, Phone, Instagram } from 'lucide-react';
import Link from 'next/link';

import { SiteContent } from '@/types/dictionaries';

type IFooterProps = {
  lang: string;
  dictionary: SiteContent;
};

const Footer = ({ lang, dictionary }: IFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-main-black text-text-grey mt-10 w-full md:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">UDocument</h3>
            <div className="space-y-2">
              <a href="mailto:contact@udocument.com" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail className="h-5 w-5" />
                {dictionary.footer.email}
              </a>
              <a href="tel:+380000000000" className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone className="h-5 w-5" />
                {dictionary.footer.phone}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold tracking-wider text-white uppercase">{dictionary.footer.legal_heading}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`${lang}/privacy`} className="transition-colors hover:text-white">
                  {dictionary.footer.privacy_policy}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold tracking-wider text-white uppercase">{dictionary.footer.follow_us_heading}</h4>
            <div className="mt-2 flex items-center gap-4">
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-border-border-grey mt-12 border-t pt-8 text-center">
          <p>
            &copy; {currentYear} UDocument. {dictionary.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
