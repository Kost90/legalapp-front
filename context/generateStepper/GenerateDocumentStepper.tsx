import { getPropertyPowerOfAttorneySchema, PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/powerOfAttorneySchema';
import { PowerOfAttorney } from '@/types/documents/power-of-attorney';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../user/UserProvider.client';
import { DOCUMENT_TYPE } from '@/lib/constans';
import { generatePowerOfAttorney } from '@/api/documents/generatePowerOfAttorney';
import { cleanPropertyAddress } from '@/utils/cleanPropertyAddress';

type GenerateDocumentContext = {
  step: GenerateStep;
  setStep: (value: GenerateStep) => void;
  onSubmit: ReturnType<UseFormReturn['handleSubmit']>;
  //TODO:Add more types
  documentDetails: PowerOfAttorney | null;
  generatedPdfUrl: string;
  selectedDocument: string;
};

const FormStateContext = createContext<GenerateDocumentContext | null>(null);

export type GenerateStep = (typeof FORM_STEPS)[number];
// TODO: Think about make it automation by choose different doc
export const FORM_STEPS = [
  {
    label: 'Данні особи яка надає доручення',
    key: 'person',
  },
  {
    label: 'Данні представника (на кого надається доручення)',
    key: 'representative',
  },
  {
    label: 'Данні обєкту нерухомості',
    key: 'property',
  },
  {
    label: 'Місце складання, строк дії доручення',
    key: 'meta',
  },
  {
    label: 'Документ успішно згенеровано',
    key: 'result',
  },
] as const;

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
  const [documentDetails, setDocumentDetails] = useState<PowerOfAttorney | null>(null);
  const { user } = useUser();
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState('');

  // TODO: Think about make form reusable
  const form = useForm<PropertyPowerOfAttorneyFormData>({
    resolver: zodResolver(getPropertyPowerOfAttorneySchema(lang)),
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
      //   await refreshUser();
      setStep(FORM_STEPS[4]);
      // TODO: Think about error message
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.field) {
        form.setError(parsedError.field, { message: parsedError.message });
      }
      form.setError('root', { message: parsedError.message });
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
