import { useMutation } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';

// import { resendVerificationEmail } from '@/api/auth/resendVerificationEmail';
import Button from '@/components/Button/Button';
// import Divider from '@/components/Divider/Divider';
// import { ResendButton } from '@/components/ResendButton/ResendButton';
import PageTitle from '../PageTitle/PageTitle';

type VerifyYourEmailProps = { onBack: () => void };

export default function VerifyYourEmail({ onBack }: VerifyYourEmailProps) {
  const email = useWatch({ name: 'email' });

//   const { mutate, isPending } = useMutation({ mutationFn: () => resendVerificationEmail({ email }) });

  return (
    <>
      <PageTitle className="mb-6" index={2} title="Almost there!" />

      <div className="text-body-large mb-4">Good news!</div>
      <div className="text-text-default">You&apos;re just one step away from being part of our community.</div>

      <div className="my-16 h-1 relative">
        {/* <Divider size="small" /> */}
      </div>

      <div className="text-text-default mb-24">
        To finish setting up your account, check your email. <br className="md-max:hidden" />
        We&apos;ve sent a link that you need to click Can&apos;t see it? Check your spam folder.
      </div>

      <div className="grid grid-cols-2 gap-16">
        <Button className="w-full" onClick={onBack}>
          Back
        </Button>

        {/* <ResendButton className="w-full" isLoading={isPending} onClick={() => mutate()} /> */}
      </div>
    </>
  );
}
