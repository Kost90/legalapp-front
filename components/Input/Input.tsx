// 'use client';
// import { InputHTMLAttributes, useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import FormGroup from '@/components/FormGroup/FormGroup';
// import { cn } from '@/utils/cn';

// interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
//   name: string;
//   label: string;
//   description?: string;
//   labelClassName?: string;
// }

// export default function FormInput({ name, label, description, labelClassName, ...rest }: FormInputProps) {
//   const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const type = rest.type === 'password' && isShowPassword ? 'text' : rest.type;

//   const error = errors[name]?.message as string | undefined;

//   return (
//     <FormGroup label={label} description={description} error={error} labelClassName={labelClassName}>
//       <input
//         {...register(name)}
//         type={type}
//         {...rest}
//         className={cn(
//           'mt-1 block w-full px-3 py-2 border border-btn-border-color bg-white rounded-md focus:outline-none focus:ring-link-btn-text focus:border-link-btn-text sm:text-sm',
//           {
//             'border-red-500': error,
//           },
//         )}
//       />
//     </FormGroup>
//   );
// }
'use client';
import { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormGroup from '@/components/FormGroup/FormGroup';
import { cn } from '@/utils/cn';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  description?: string;
  labelClassName?: string;
}

export default function FormInput({ name, label, description, labelClassName, ...rest }: FormInputProps) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isPasswordType = rest.type === 'password';
  const type = isPasswordType && isShowPassword ? 'text' : rest.type;
  const error = errors[name]?.message as string | undefined;

  return (
    <FormGroup label={label} description={description} error={error} labelClassName={labelClassName}>
      <div className="relative">
        <input
          {...register(name)}
          {...rest}
          type={type}
          className={cn(
            'mt-1 block w-full px-3 py-2 pr-10 border border-btn-border-color bg-white rounded-md focus:outline-none focus:ring-link-btn-text focus:border-link-btn-text sm:text-sm',
            {
              'border-red-500': error,
            },
          )}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setIsShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {isShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </FormGroup>
  );
}
