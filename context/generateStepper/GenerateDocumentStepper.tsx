import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { generateDocumentAction } from '@/app/actions/documents';
import { ErrorModal } from '@/components/Modals/ErrorModal';
import { useModals } from '@/components/Modals/ModalProvider';
import { SuccessModal } from '@/components/Modals/SuccessModal';
import { useUser } from '@/context/user/UserProvider.client';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { FORM_STEPS, GenerateStep } from '@/lib/formsSteps/forms-steps';
import { MODALS_MESSAGES_EN, MODALS_MESSAGES_UA } from '@/lib/modals-messages';
import { DOCUMENT_SCHEMAS } from '@/schemas/documentsSchemas';

type GenerateDocumentContext = {
  step: GenerateStep;
  setStep: (value: GenerateStep) => void;
  onSubmit: ReturnType<UseFormReturn['handleSubmit']>;
  generatedPdfUrl: string;
  generatedDocument: string;
  selectedDocument: DOCUMENT_TYPE;
  completedStepIndex: number;
  setCompletedStepIndex: (value: number) => void;
  isLoading: boolean;
};

type GenerateDocumentProviderProps<T extends DOCUMENT_TYPE> = {
  children: ReactNode;
  lang: 'ua' | 'en';
  selectedDocument: T;
};

type SchemaType<T extends DOCUMENT_TYPE> = ReturnType<(typeof DOCUMENT_SCHEMAS)[T]['schema']>;

const FormStateContext = createContext<GenerateDocumentContext | null>(null);

export function GenerateDocumentProvider<T extends DOCUMENT_TYPE>({ children, lang, selectedDocument }: GenerateDocumentProviderProps<T>) {
  const { open } = useModals();
  const { user } = useUser();
  const [step, setStep] = useState<GenerateStep>({ label: 'Данні особи яка надає документ', key: 'person' });
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string>('');
  const [generatedDocument, setgeneratedDocument] = useState<string>('');
  const [completedStepIndex, setCompletedStepIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type FormData = z.infer<SchemaType<T>>;
  const schema = DOCUMENT_SCHEMAS[selectedDocument].schema(lang) as z.ZodType<FormData>;

  if (!schema) {
    throw new Error(`No schema found for document type: ${selectedDocument}`);
  }

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = form.handleSubmit(async (e) => {
    try {
      setIsLoading(true);

      const res = await generateDocumentAction(selectedDocument, e, lang, user);
      if (res.success) {
        const { html, url } = res.data;
        setgeneratedDocument(html);
        setGeneratedPdfUrl(url);

        const nextStepIndex = selectedDocument ? FORM_STEPS[selectedDocument][lang].findIndex((s) => s.key === step.key) + 1 : 0;

        if (selectedDocument) {
          setStep(FORM_STEPS[selectedDocument][lang][nextStepIndex]);
        }

        setCompletedStepIndex(nextStepIndex - 1);

        open(SuccessModal, {
          title: lang === 'ua' ? 'Вітаємо!' : 'Congratulation!',
          message: lang === 'ua' ? MODALS_MESSAGES_UA.SUCCESSFULL_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.SUCCESSFULL_GENERATE_DOCUMENT,
          lang: lang,
        });
      } else {
        const { error } = res;
        if (error.field) {
          form.setError(error.field as any, { message: error.message });
        }
        form.setError('root', { message: error.message });

        open(ErrorModal, {
          title: lang === 'ua' ? 'Нажаль сталась помилка' : 'Sorry, an error occurred',
          message:
            error.message || (lang === 'ua' ? MODALS_MESSAGES_UA.ERROR_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.ERROR_GENERATE_DOCUMENT),
          lang: lang,
        });
      }
    } catch (e) {
      console.error('Failed to call server action:', e);
      form.setError('root', { message: 'Failed to connect to the server.' });
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
        generatedDocument,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </FormStateContext.Provider>
  );
}

export function useGenerateDocumentForm<T extends DOCUMENT_TYPE>() {
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
