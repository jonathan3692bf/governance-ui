import { IconInfoBox } from '../../../components_2/IconInfoBox'
import Header from '../../../components_2/Header'

export default function PerfectForDAOs() {
  return (
    <div className="pt-10 pb-9 md:pt-20 md:pb-24">
      <div className="flex flex-wrap">
        <div className="w-full mb-10 text-left md:w-1/3 md:mb-0 md:pr-4 md:text-left">
          <Header as="h2" withGradient>
            Why is Solana <br /> perfect for DAOs?
          </Header>
        </div>
        <div className="flex flex-col w-full space-y-12 md:space-y-0 md:w-2/3 md:grid md:grid-cols-3 md:gap-16">
          <IconInfoBox imgSrc="pie-chart" title="Near-Zero Fees">
            Never worry about fees when launching a DAO, voting, or
            participating.
          </IconInfoBox>
          <IconInfoBox imgSrc="treasury" title="Treasury Management">
            Leverage shared wallets to decide as a community on resource
            allocation
          </IconInfoBox>
          <IconInfoBox imgSrc="blockchain" title="Fully On-Chain">
            Cement governance decisions to ensure censorship resistance
          </IconInfoBox>
          <IconInfoBox imgSrc="devices" title="One Product">
            All the tools and resources you need under the same roof
          </IconInfoBox>
          <IconInfoBox imgSrc="magic" title="Easy Creation">
            Create and participate in fully on-chain DAOs of all kinds
          </IconInfoBox>
          <div>
            <IconInfoBox imgSrc="solana-logo" title="Solana Standard">
              The standard framework for building and scaling DAOs on Solana
              <div>
                <a
                  href=""
                  className="inline-block mt-3 text-xs underline opacity-50 hover:text-realms-theme-blue hover:opacity-90 active:text-white"
                >
                  Learn More
                </a>
              </div>
            </IconInfoBox>
          </div>
        </div>
      </div>
    </div>
  )
}
