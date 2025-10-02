import Link from 'next/link';

import Button, { IButtonProps } from '@/components/Button/Button';

interface ILinkButtonProps extends Partial<IButtonProps> {
  lang: string;
  href?: string;
  signUp?: boolean;
}

function LinkButton({ lang, href, signUp, ...restProps }: ILinkButtonProps) {
  return (
    <div>
      <Link href={href ? href : `/${lang}/auth/${signUp ? 'signup' : 'login'}`}>
        <Button key={`login-${lang}desc`} type={restProps.type} {...restProps}>
          {restProps.children}
        </Button>
      </Link>
    </div>
  );
}

export default LinkButton;
