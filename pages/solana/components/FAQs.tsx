import { Fragment } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import Header from '../../../components_2/Header'
import Chevron from '../../../components_2/Chevron'

export const FaqPanel = ({ question, answer }) => {
  return (
    <div className="py-8 md:py-12">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full pr-4">
              <div className="flex items-start justify-between md:items-center">
                <div className="mb-0 font-sans text-left text-[18px] leading-[25.2px]">
                  {question}
                </div>
                <Chevron props={open} />
              </div>
            </Disclosure.Button>
            <Transition
              enter="transition duration-300 ease-in"
              enterFrom="transform opacity-0 pb-0"
              enterTo="transform opacity-100"
              leave="transition duration-300 ease-in"
              leaveFrom="transform opacity-100 "
              leaveTo="transform opacity-0"
            >
              <Disclosure.Panel>
                {/* <p className="pt-2 md:pb-3 text-md md:text-base opacity-70 md:w-2/3"> */}
                <div className="pt-2 md:pb-3 md:w-2/3 text-[16px] md:text-[18px] font-normal leading-[22.4px] md:leading-[25.2px] opacity-70">
                  {answer}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

const FAQs = [
  {
    question: "I still don't understand DAOs. Can you explain again?",
    answer:
      'Lorem ipsum on how DAOs on Realms works. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: 'Who can start a DAO?',
    answer:
      'Lorem ipsum on how DAOs on Realms works. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: 'Why should I use Solana for my DAO',
    answer:
      'Lorem ipsum on how DAOs on Realms works. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: 'What is SPL-Governance?',
    answer:
      'Lorem ipsum on how DAOs on Realms works. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    question: 'What is the environmental impact of running a DAO?',
    answer:
      'Lorem ipsum on how DAOs on Realms works. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

const FAQSection = () => {
  return (
    <div className="py-20 md:pt-36 md:pb-12">
      <div className="w-full text-left">
        <Header as="h2" withGradient>
          Frequently Asked Questions
        </Header>
      </div>
      <div>
        {FAQs.map((props, index) => (
          <Fragment key={index}>
            {index > 0 && <hr className="border-fgd-4" />}
            <FaqPanel {...props} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default FAQSection
