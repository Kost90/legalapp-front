'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm, UseFormReturn, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import CardCategory from '@/components/CardCategory/CardCategory';
import DocumentSelector from '@/components/DocumentSelector/DocumentSelector';
import DynamicFormFields, { FieldSchema } from '@/components/DynamicFormFields/DynamicFormFields';
import Button from '@/components/Button/Button';

import { useUser } from '@/context/user/UserProvider.client';
import { generatePowerOfAttorney } from '@/api/documents/generatePowerOfAttorney';
import { formFieldsSchemas, propertyPowerOfAttorneySchema } from '@/schemas/generateDocuments/powerOfAttorneySchema';
import { DOCUMENT_TYPE } from '@/lib/constans';
import { SiteContent } from '@/types/dictionaries';
import { PowerOfAttorney } from '@/types/documents/power-of-attorney';
import { zodToFieldSchema } from '@/utils/zodToFieldSchema';

type PropertyPowerOfAttorneyFormData = z.infer<typeof propertyPowerOfAttorneySchema>;
type Step = 'category' | 'select' | 'form' | 'result';

const DOCUMENT_CATEGORIES: Record<string, Record<string, string>[]> = {
  'Нотаріальні документи': [{ [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: 'Довіренність з оформлення нерухомості' }],
  'Семейное право': [],
  'Корпоративное право': [],
  Договора: [],
};

export default function DocumentFlow({ lang, dictionary }: { lang: string; dictionary: SiteContent }) {
  const { user } = useUser();
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState('');
  const [formFieldsSchema, setFormFieldsSchema] = useState<FieldSchema[] | null>(null);

  const form = useForm<PropertyPowerOfAttorneyFormData>({
    resolver: zodResolver(propertyPowerOfAttorneySchema),
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setStep('select');
  };

  useEffect(() => {
    if (selectedDocument) {
      setFormFieldsSchema(formFieldsSchemas[selectedDocument]?.[lang] ?? null);
    }
  }, [selectedDocument, lang]);

  // useEffect(() => {
  //   if (selectedDocument) {
  //     //TODO: Think about atomation choosing schema
  //     const schema = propertyPowerOfAttorneySchema;
  //     setFormFieldsSchema(zodToFieldSchema(schema, lang as 'ua'));
  //   }
  // }, [selectedDocument, lang]);

  const handleGenerate = async (formData: PropertyPowerOfAttorneyFormData) => {
    try {
      const { details } = formData;
      const { propertyAddress, ...restDetails } = details;

      const hasAddress = propertyAddress?.city || propertyAddress?.street || propertyAddress?.buildNumber;

      const cleanedAddress = hasAddress
        ? {
            city: propertyAddress?.city || '',
            street: propertyAddress?.street || '',
            buildNumber: propertyAddress?.buildNumber || '',
            ...(propertyAddress?.apartment ? { apartment: propertyAddress.apartment } : {}),
            ...(propertyAddress?.postCode ? { postCode: propertyAddress.postCode } : {}),
          }
        : undefined;

      const dataForSend: PowerOfAttorney = {
        email: user.email,
        documentLang: lang,
        documentType: DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
        isPaid: true,
        details: {
          ...restDetails,
          ...(cleanedAddress ? { propertyAddress: cleanedAddress } : {}),
        },
      };
      const documentBlob = await generatePowerOfAttorney(user.id, dataForSend);
      const fileURL = window.URL.createObjectURL(documentBlob);

      setGeneratedPdfUrl(fileURL);
      setStep('result');
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.field) {
        form.setError(parsedError.field, { message: parsedError.message });
      }
      form.setError('root', { message: parsedError.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {step === 'category' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(DOCUMENT_CATEGORIES).map(([category, docs]) => (
            <CardCategory
              key={category}
              title={category}
              description={`Документов: ${docs.length}`}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      )}

      {step === 'select' && (
        <DocumentSelector
          options={DOCUMENT_CATEGORIES[selectedCategory]}
          value={selectedDocument}
          onChange={setSelectedDocument}
          onBack={() => setStep('category')}
          onNext={() => setStep('form')}
        />
      )}

      {step === 'form' && formFieldsSchema && (
        <FormProvider {...form}>
          <DynamicForm form={form} formSchema={formFieldsSchema} handleSubmit={handleGenerate} lang={lang} />
        </FormProvider>
      )}

      {step === 'result' && (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Документ успешно сгенерирован!</p>
          <iframe src={generatedPdfUrl} className="w-full h-[80vh] border rounded" />
          <a
            href={generatedPdfUrl}
            download="generated.pdf"
            className="inline-block px-6 py-2 bg-link-btn-text text-white rounded-md hover:opacity-90"
          >
            Скачать
          </a>
        </div>
      )}
    </div>
  );
}

const DynamicForm = ({
  form,
  handleSubmit,
  lang,
  formSchema,
}: {
  form: UseFormReturn<PropertyPowerOfAttorneyFormData>;
  handleSubmit: (data: PropertyPowerOfAttorneyFormData) => void;
  lang: string;
  formSchema: FieldSchema[];
}) => {
  const { isSubmitting, isSubmitSuccessful } = useFormState({ control: form.control });
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="relative max-w-md mx-auto p-4 bg-white shadow rounded">
      <DynamicFormFields schema={formSchema} />
      <Button buttonType="submit" loading={isSubmitting || isSubmitSuccessful}>
        {lang === 'ua' ? 'Згенерувати' : 'Generate'}
      </Button>
    </form>
  );
};
