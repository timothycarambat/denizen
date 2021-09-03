import React, { useState } from 'react';

// interface Props {
//   forceOpen?: boolean;
//   label?: string;
//   withDivider?: boolean;
//   icon?: JSX.Element;
//   items: DDMItem[];
//   withBackground?: boolean;
// }

// DDMItem {
//   icon?: JSX.Element;
//   label: string;
//   desc?: string;
//   link?: string;
//   onClick?: func;
// }

const DropDownMenu = ({ props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={` ${props.withBackground ? 'border border-gray-300 bg-white dark:bg-gray-800 shadow-sm' : ''
            } flex items-center justify-center w-full rounded-md px-4 py-2 text-sm text-gray-600 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`}
          id="options-menu"
        >
          <p className='flex items-center mr-2 text-sm md:text-lg'>
            {props.label}
          </p>

          {props.icon}
        </button>
      </div>

      {(props.forceOpen || isOpen) && (
        <div className="origin-top-right z-20 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div
            className={`py-1 ${props.withDivider ? 'divide-y divide-gray-100' : ''}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {props.items.map((item) => {
              if (item.onClick) {
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`${item.icon ? 'flex w-full items-center' : 'flex w-full items-start'
                      } block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 space-x-3`}
                    role="menuitem"
                  >
                    {item.icon}
                    <span className="flex flex-col">
                      <span>{item.label}</span>
                      {item.desc && <span className="text-gray-400 text-xs">{item.desc}</span>}
                    </span>
                  </button>
                )
              }

              return (
                <a
                  key={item.label}
                  href={item.link || '#'}
                  className={`${item.icon ? 'flex items-center' : 'block'
                    } block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 space-x-3`}
                  role="menuitem"
                >
                  {item.icon}
                  <span className="flex flex-col">
                    <span>{item.label}</span>
                    {item.desc && <span className="text-gray-400 text-xs">{item.desc}</span>}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default DropDownMenu;