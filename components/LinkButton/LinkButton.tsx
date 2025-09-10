import Link from 'next/link';

import Button, { IButtonProps } from '@/components/Button/Button';

interface ILinkButtonProps extends Partial<IButtonProps> {
  lang: string;
  signUp?: boolean;
}

function LinkButton({ lang, signUp, ...restProps }: ILinkButtonProps) {
  return (
    <div>
      <Link href={`/${lang}/auth/${signUp ? 'signup' : 'login'}`}>
        <Button key={`login-${lang}desc`} type={restProps.type} {...restProps}>
          {restProps.children}
        </Button>
      </Link>
    </div>
  );
}

export default LinkButton;
