import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';

import { generatePowerOfAttorney } from '@/api/documents/generatePowerOfAttorney';
import { ErrorModal } from '@/components/Modals/ErrorModal';
import { useModals } from '@/components/Modals/ModalProvider';
import { SuccessModal } from '@/components/Modals/SuccessModal';
import { useUser } from '@/context/user/UserProvider.client';
import { DOCUMENT_TYPE } from '@/lib/constans';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { MODALS_MESSAGES_EN, MODALS_MESSAGES_UA } from '@/lib/modals-messages';
import { getPropertyPowerOfAttorneySchema, PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/powerOfAttorneySchema';
import { PowerOfAttorney } from '@/types/power-of-attorney';
import { cleanPropertyAddress } from '@/utils/cleanPropertyAddress';

type GenerateDocumentContext = {
  step: GenerateStep;
  setStep: (value: GenerateStep) => void;
  onSubmit: ReturnType<UseFormReturn['handleSubmit']>;
  //TODO:Add more types
  documentDetails: PowerOfAttorney | null;
  generatedPdfUrl: string;
  selectedDocument: string;
  completedStepIndex: number;
  setCompletedStepIndex: (value: number) => void;
};

const FormStateContext = createContext<GenerateDocumentContext | null>(null);

export type GenerateStep = (typeof FORM_STEPS)[number];

export function GenerateDocumentProvider({
  children,
  step,
  setStep,
  lang,
  selectedDocument,
}: {
  children: ReactNode;
  step: GenerateStep;
  setStep: (value: GenerateStep) => void;
  lang: string;
  selectedDocument: string;
}) {
  // const { setError } = useDashboardError();
  const { open } = useModals();
  const [documentDetails, setDocumentDetails] = useState<PowerOfAttorney | null>(null);
  const { user } = useUser();
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState('');
  const [completedStepIndex, setCompletedStepIndex] = useState(-1);

  // TODO: Think about make form reusable
  const form = useForm<PropertyPowerOfAttorneyFormData>({
    resolver: zodResolver(getPropertyPowerOfAttorneySchema(lang)),
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(async (e) => {
    try {
      const { propertyAddress, ...rest } = e;
      const cleanedAddress = cleanPropertyAddress(propertyAddress);

      const dataForSend: PowerOfAttorney = {
        email: user.email,
        documentLang: lang,
        documentType: DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
        isPaid: true,
        details: {
          ...rest,
          ...(cleanedAddress ? { propertyAddress: cleanedAddress } : {}),
        },
      };

      setDocumentDetails(dataForSend);
      const documentBlob = await generatePowerOfAttorney(user.id, dataForSend);
      const fileURL = window.URL.createObjectURL(documentBlob);

      setGeneratedPdfUrl(fileURL);
      // TODO: Think how to make setCompletedStepIndex(3) - automated
      setCompletedStepIndex(3);
      setStep(FORM_STEPS[4]);
      open(SuccessModal, {
        title: lang === 'ua' ? 'Вітаємо!' : 'Congratulation!',
        message: lang === 'ua' ? MODALS_MESSAGES_UA.SUCCESSFULL_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.SUCCESSFULL_GENERATE_DOCUMENT,
        lang: lang,
      });
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);

      if (parsedError.field) {
        form.setError(parsedError.field, { message: parsedError.message });
      }
      form.setError('root', { message: parsedError.message });
      open(ErrorModal, {
        title: lang === 'ua' ? 'Нажаль сталась помилка' : 'Sorry error in generating',
        message: lang === 'ua' ? MODALS_MESSAGES_UA.ERROR_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.ERROR_GENERATE_DOCUMENT,
        lang: lang,
      });
      // setError(parsedError.message);
    }
  });

  useEffect(() => {
    form.clearErrors('root');
  }, [step, form]);

  return (
    <FormStateContext.Provider
      value={{
        step,
        setStep,
        onSubmit,
        documentDetails,
        generatedPdfUrl,
        selectedDocument,
        completedStepIndex,
        setCompletedStepIndex,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </FormStateContext.Provider>
  );
}

export function useGenerateDocumentForm() {
  const form = useFormContext<PropertyPowerOfAttorneyFormData>();

  return form;
}

export const useGenerateDocument = () => {
  const ctx = useContext(FormStateContext);

  if (!ctx) {
    throw new Error('useOnboarding must be used within a OnboardingProvider');
  }

  return ctx;
};
