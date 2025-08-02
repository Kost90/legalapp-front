import Link from 'next/link';

import Button, { IButtonProps } from '@/components/Button/Button';

interface ILinkButtonProps extends Partial<IButtonProps> {
  lang: string;
}

function LinkButton({ ...props }: ILinkButtonProps) {
  return (
    <div>
      <Link href={`/${props.lang}/auth/login`}>
        <Button key={`login-${props.lang}desc`} type={props.type} {...props}>
          {props.children}
        </Button>
      </Link>
    </div>
  );
}

export default LinkButton;
