// 'use client';
// import { useState } from 'react';
// import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
// import { ChevronsUpDownIcon } from 'lucide-react';
// import clsx from 'clsx';

// type DropdownItem = {
//   label: string;
//   value: string;
//   icon?: () => React.ReactNode;
//   rightLabel?: string;
//   activeLabel?: string;
//   searchAliases?: string[];
// };

// type DropdownProps = {
//   items: DropdownItem[];
//   value?: string;
//   onChange: (value: string) => void;
//   searchInput?: boolean;
//   buttonClassName?: string;
//   popoverAttributes?: {
//     fullWidth?: boolean;
//     placement?: string;
//     wrapperClassName?: string;
//   };
//   syncWidth?: boolean;
// };

// export default function Dropdown({ items, value, onChange, searchInput = false, buttonClassName, popoverAttributes }: DropdownProps) {
//   const selectedItem = items.find((item) => item.value === value) ?? items[0];
//   const [query, setQuery] = useState('');

//   const filteredItems = searchInput
//     ? items.filter((item) => [item.label, ...(item.searchAliases ?? [])].join(' ').toLowerCase().includes(query.toLowerCase()))
//     : items;

//   return (
//     <Listbox value={value} onChange={onChange}>
//       <div className={clsx('relative mb-1 mt-1', popoverAttributes?.wrapperClassName)}>
//         <ListboxButton
//           type="button"
//           className={clsx(
//             'relative border border-btn-border-color rounded-md bg-white flex items-center justify-center gap-1 px-2 text-sm transition-colors h-full w-full p-2',
//             buttonClassName,
//           )}
//         >
//           <div className="flex items-center flex-1 gap-1 min-w-0 truncate">
//             {selectedItem.icon && selectedItem.icon()}
//             <span className={clsx(!selectedItem && 'text-gray-400', 'truncate')}>{selectedItem.activeLabel || selectedItem.label}</span>
//           </div>
//           <ChevronsUpDownIcon className="w-3 h-3 text-gray-400" />
//         </ListboxButton>

//         <Transition
//           enter="transition ease-out duration-150"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >
//           <ListboxOptions
//             className={clsx(
//               'absolute z-10 mt-2 max-h-60 min-w-[300px] w-full overflow-auto rounded-md bg-white py-1 shadow-lg border border-btn-border-color text-sm focus:outline-none',
//               popoverAttributes?.wrapperClassName,
//             )}
//           >
//             {searchInput && (
//               <div className="px-3 py-2">
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="w-full border border-border-muted rounded px-2 py-1 text-sm focus:outline-none"
//                   placeholder="Search..."
//                 />
//               </div>
//             )}

//             {filteredItems.map((item) => (
//               <ListboxOption
//                 key={item.value}
//                 value={item.value}
//                 className={({ selected }) =>
//                   clsx('cursor-pointer px-4 py-2 flex items-center justify-between', selected ? 'bg-gray-100 text-black' : 'text-gray-700')
//                 }
//               >
//                 <div className="flex items-center gap-2">
//                   {item.icon && item.icon()}
//                   <span>{item.label}</span>
//                 </div>
//                 <span className="text-gray-500">{item.rightLabel}</span>
//               </ListboxOption>
//             ))}

//             {filteredItems.length === 0 && <div className="px-4 py-2 text-gray-400">No results found</div>}
//           </ListboxOptions>
//         </Transition>
//       </div>
//     </Listbox>
//   );
// }
