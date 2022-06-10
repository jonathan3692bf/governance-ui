import { useState } from 'react'
import { Transition } from '@headlessui/react'
import Text from '@components/Text'

export default function AdvancedOptionsDropdown({
  className = 'mt-10 md:mt-16 w-fit',
  children,
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <button
        type="button"
        className={`flex items-center justify-center px-4 py-2 space-x-2 rounded-full h-fit outline ${
          open ? 'text-white/80 bg-white/5' : 'text-white/70'
        } outline-white/20 hover:outline-white/50 hover:text-white/70 focused:outline-white/50 focused:opacity-30 disabled:cursor-not-allowed`}
        onClick={() => setOpen(!open)}
      >
        <Text level="2" className="font-normal">
          Advanced Options
        </Text>
        <div
          className={`default-transition ${open ? 'transform rotate-180' : ''}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.99992 9.5858L12.2928 5.29291L13.707 6.70712L7.99992 12.4142L2.29282 6.70712L3.70703 5.29291L7.99992 9.5858Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
      <Transition
        show={open}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pl-2">
          <Text level="2" className="pt-4 pb-10 text-white/60">
            Advanced creators may adjust certain aspects of their DAOs.
          </Text>
          {children}
        </div>
      </Transition>
    </div>
  )
}