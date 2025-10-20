import PageTitle from '@/components/PageTitle/PageTitle';
import Button from '@/components/ui/button/Button';
import { SiteContent } from '@/types/dictionaries';

type VerifyYourEmailProps = { onBack: () => void; t: SiteContent };

export default function VerifyYourEmail({ onBack, t }: VerifyYourEmailProps) {
  return (
    <div className="mx-auto max-w-xl">
      <PageTitle className="mb-6" index={2} title={t.verify_email.title} />

      <div className="text-text-default mb-4">{t.verify_email.subtitle}</div>

      <div className="text-text-default mb-10">{t.verify_email.instructions}</div>

      <div className="grid grid-cols-2 gap-16">
        <Button className="w-full" onClick={onBack}>
          {t.verify_email.back_button}
        </Button>

        {/* <ResendButton className="w-full" isLoading={isPending} onClick={() => mutate()} /> */}
      </div>
    </div>
  );
}
