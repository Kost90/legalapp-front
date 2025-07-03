import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';

import { generatePowerOfAttorney } from '@/api/documents/generatePowerOfAttorney';
import { ErrorModal } from '@/components/Modals/ErrorModal';
import { useModals } from '@/components/Modals/ModalProvider';
import { SuccessModal } from '@/components/Modals/SuccessModal';
import { useUser } from '@/context/user/UserProvider.client';
import { DOCUMENT_SCHEMAS } from '@/lib/documentsSchemas';
import { FORM_STEPS, GenerateStep } from '@/lib/formsSteps/forms-steps';
import { MODALS_MESSAGES_EN, MODALS_MESSAGES_UA } from '@/lib/modals-messages';
import { DocumentKey } from '@/types/documents';
import { prepareDataByDocumentType } from '@/utils/prepareFormData';

type GenerateDocumentContext = {
  step: GenerateStep;
  setStep: (value: GenerateStep) => void;
  onSubmit: ReturnType<UseFormReturn['handleSubmit']>;
  generatedPdfUrl: string;
  selectedDocument: DocumentKey;
  completedStepIndex: number;
  setCompletedStepIndex: (value: number) => void;
  isLoading: boolean;
};

type GenerateDocumentProviderProps<T extends DocumentKey> = {
  children: ReactNode;
  lang: 'ua' | 'en';
  selectedDocument: T;
};

const FormStateContext = createContext<GenerateDocumentContext | null>(null);

export function GenerateDocumentProvider<T extends DocumentKey>({ children, lang, selectedDocument }: GenerateDocumentProviderProps<T>) {
  const { open } = useModals();
  const { user } = useUser();
  const [step, setStep] = useState<GenerateStep>({ label: 'Данні особи яка надає документ', key: 'person' });
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState('');
  const [completedStepIndex, setCompletedStepIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schemaGetter = selectedDocument ? DOCUMENT_SCHEMAS[selectedDocument]?.schema : null;

  if (!schemaGetter) {
    throw new Error(`No schema found for document type: ${selectedDocument}`);
  }

  const form = useForm<(typeof DOCUMENT_SCHEMAS)[T]['type']>({
    resolver: zodResolver(schemaGetter(lang)),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (e) => {
    try {
      setIsLoading(true);
      const dataForSend = prepareDataByDocumentType(selectedDocument, e, lang, user);

      const documentBlob = await generatePowerOfAttorney(user.id, dataForSend);
      const fileURL = window.URL.createObjectURL(documentBlob);

      setGeneratedPdfUrl(fileURL);

      const nextStepIndex = selectedDocument ? FORM_STEPS[selectedDocument][lang].findIndex((s) => s.key === step.key) + 1 : 0;

      if (selectedDocument) {
        setIsLoading(false);
        setStep(FORM_STEPS[selectedDocument][lang][nextStepIndex]);
      }

      setCompletedStepIndex(nextStepIndex - 1);
      open(SuccessModal, {
        title: lang === 'ua' ? 'Вітаємо!' : 'Congratulation!',
        message: lang === 'ua' ? MODALS_MESSAGES_UA.SUCCESSFULL_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.SUCCESSFULL_GENERATE_DOCUMENT,
        lang: lang,
      });
    } catch (error: any) {
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
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
        generatedPdfUrl,
        selectedDocument,
        completedStepIndex,
        setCompletedStepIndex,
        isLoading,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </FormStateContext.Provider>
  );
}

export function useGenerateDocumentForm<T extends DocumentKey>() {
  const form = useFormContext<(typeof DOCUMENT_SCHEMAS)[T]['type']>();

  return form;
}

export const useGenerateDocument = () => {
  const ctx = useContext(FormStateContext);

  if (!ctx) {
    throw new Error('useOnboarding must be used within a OnboardingProvider');
  }

  return ctx;
};
