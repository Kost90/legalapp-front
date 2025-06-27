'use client';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

type DropdownItem = {
  label: string;
  value: string;
  icon?: () => React.ReactNode;
  rightLabel?: string;
  activeLabel?: string;
  searchAliases?: string[];
};

type DropdownProps = {
  items: DropdownItem[];
  value?: string;
  onChange: (value: string) => void;
  searchInput?: boolean;
  buttonClassName?: string;
  popoverAttributes?: {
    fullWidth?: boolean;
    placement?: string;
    wrapperClassName?: string;
  };
  syncWidth?: boolean;
};

export default function Dropdown({ items, value, onChange, searchInput = false, buttonClassName, popoverAttributes }: DropdownProps) {
  const selectedItem = items.find((item) => item.value === value) ?? items[0];
  const [query, setQuery] = useState('');

  const filteredItems = searchInput
    ? items.filter((item) => [item.label, ...(item.searchAliases ?? [])].join(' ').toLowerCase().includes(query.toLowerCase()))
    : items;

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={clsx('relative mt-1 mb-1', popoverAttributes?.wrapperClassName)}>
        <ListboxButton
          type="button"
          className={clsx(
            'border-btn-border-color relative flex h-full w-full items-center justify-center gap-1 rounded-md border bg-white p-2 px-2 text-sm transition-colors',
            buttonClassName,
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-1 truncate">
            {selectedItem.icon && selectedItem.icon()}
            <span className={clsx(!selectedItem && 'text-gray-400', 'truncate')}>{selectedItem.activeLabel || selectedItem.label}</span>
          </div>
          <ChevronsUpDownIcon className="h-3 w-3 text-gray-400" />
        </ListboxButton>

        <Transition
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <ListboxOptions
            className={clsx(
              'border-btn-border-color absolute z-10 mt-2 max-h-60 w-full min-w-[300px] overflow-auto rounded-md border bg-white py-1 text-sm shadow-lg focus:outline-none',
              popoverAttributes?.wrapperClassName,
            )}
          >
            {searchInput && (
              <div className="px-3 py-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-border-muted w-full rounded border px-2 py-1 text-sm focus:outline-none"
                  placeholder="Search..."
                />
              </div>
            )}

            {filteredItems.map((item) => (
              <ListboxOption
                key={item.value}
                value={item.value}
                className={({ selected }) =>
                  clsx('flex cursor-pointer items-center justify-between px-4 py-2', selected ? 'bg-gray-100 text-black' : 'text-gray-700')
                }
              >
                <div className="flex items-center gap-2">
                  {item.icon && item.icon()}
                  <span>{item.label}</span>
                </div>
                <span className="text-gray-500">{item.rightLabel}</span>
              </ListboxOption>
            ))}

            {filteredItems.length === 0 && <div className="px-4 py-2 text-gray-400">No results found</div>}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
