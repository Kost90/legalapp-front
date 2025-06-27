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
import { formatDateToString } from '@/schemas/utils/formatDateToString';
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
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (e) => {
    try {
      const { propertyAddress, ...rest } = e;

      const formattedData = {
        ...rest,
        birthDate: formatDateToString(rest.birthDate),
        passportIssueDate: formatDateToString(rest.passportIssueDate),
        representativeBirthDate: formatDateToString(rest.representativeBirthDate),
        date: formatDateToString(rest.date),
        validUntil: formatDateToString(rest.validUntil),
        ...(cleanPropertyAddress(propertyAddress) ? { propertyAddress: cleanPropertyAddress(propertyAddress) } : {}),
      };

      const dataForSend: PowerOfAttorney = {
        email: user.email,
        documentLang: lang,
        documentType: DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
        isPaid: true,
        details: formattedData,
      };

      setDocumentDetails(dataForSend);
      const documentBlob = await generatePowerOfAttorney(user.id, dataForSend);
      const fileURL = window.URL.createObjectURL(documentBlob);

      setGeneratedPdfUrl(fileURL);
      // TODO: Think how to make setCompletedStepIndex(3) - automated
      // const nextStepIndex = FORM_STEPS.findIndex((s) => s.key === 'result'); // Находим индекс шага "result"

      // if (nextStepIndex !== -1) {
      //   // Устанавливаем "выполненный" индекс на шаг *перед* результатом
      //   setCompletedStepIndex(nextStepIndex - 1);
      //   setStep(FORM_STEPS[nextStepIndex]);
      // } else {
      //   // Обработка случая, если шаг 'result' не найден
      //   // Можно просто перейти на последний шаг как запасной вариант
      //   setCompletedStepIndex(FORM_STEPS.length - 1);
      //   setStep(FORM_STEPS[FORM_STEPS.length - 1]);
      // }
      setCompletedStepIndex(3);
      setStep(FORM_STEPS[4]);
      open(SuccessModal, {
        title: lang === 'ua' ? 'Вітаємо!' : 'Congratulation!',
        message: lang === 'ua' ? MODALS_MESSAGES_UA.SUCCESSFULL_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.SUCCESSFULL_GENERATE_DOCUMENT,
        lang: lang,
      });
    } catch (error: any) {
      let parsedError;
      try {
        parsedError = JSON.parse(error.message);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: any) {
        parsedError = { message: error.message || (lang === 'ua' ? 'Сталася невідома помилка' : 'An unknown error occurred') };
      }

      if (parsedError.field) {
        form.setError(parsedError.field, { message: parsedError.message });
      }

      form.setError('root', { message: parsedError.message });

      open(ErrorModal, {
        title: lang === 'ua' ? 'Нажаль сталась помилка' : 'Sorry, an error occurred',
        message: lang === 'ua' ? MODALS_MESSAGES_UA.ERROR_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.ERROR_GENERATE_DOCUMENT,
        lang: lang,
      });
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
