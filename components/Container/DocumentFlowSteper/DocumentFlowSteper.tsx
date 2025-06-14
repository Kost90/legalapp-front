'use client';
import CardCategory from '@/components/CardCategory/CardCategory';
import DocumentSelector from '@/components/DocumentSelector/DocumentSelector';
import { useState } from 'react';

const DOCUMENT_CATEGORIES: Record<string, string[]> = {
  'Нотариальные документы': ['Доверенность на продажу недвижимости', 'Заявление о принятии наследства'],
  'Семейное право': ['Брачный договор', 'Согласие на выезд ребёнка'],
  'Корпоративное право': ['Устав ООО', 'Решение учредителя'],
  Договора: ['Договор аренды', 'Договор купли-продажи'],
};

export default function DocumentFlow() {
  const [step, setStep] = useState<'category' | 'select' | 'form' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<string>('');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setStep('select');
  };

  const handleGenerate = () => {
    // логика генерации формы и API-запроса
    setStep('result');
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

      {step === 'form' && (
        <div>
          {/* тут будет форма, можно позже встроить form-hook и поля */}
          <p className="mb-4 text-lg font-medium">Заполните данные для: {selectedDocument}</p>
          <button className="mt-2 px-4 py-2 bg-link-btn-text text-white rounded-md hover:opacity-90" onClick={handleGenerate}>
            Сгенерировать документ
          </button>
        </div>
      )}

      {step === 'result' && (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Документ успешно сгенерирован!</p>
          <a href="/example.pdf" download className="inline-block px-6 py-2 bg-link-btn-text text-white rounded-md hover:opacity-90">
            Скачать
          </a>
        </div>
      )}
    </div>
  );
}
