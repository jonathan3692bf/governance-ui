import Header from 'components_2/Header'
import Button from 'components_2/Button'

const SplGov = () => {
  return (
    <div className="bg-cover rounded pt-14 pb-14 md:px-16 md:pb-[90px] md:pt-12 md:bg-spl-gov ">
      <div className="flex items-center justify-start">
        <div>
          <img src="/img/realms-web/icons/solana-black.svg" className="mr-2" />
        </div>
        {/* <div className="text-md md:text-base text-black"> */}
        <div className="text-[16px] md:text-[18px] font-normal tracking-normal leading-[22.4px] md:leading-[25.2px] text-black">
          The Solana Standard
        </div>
      </div>
      <Header as="h2" className="pt-10 pb-6 md:pt-14 md:pb-9">
        SPL Governance
      </Header>
      <div className="flex flex-row flex-wrap lg:flex-nowrap">
        {/* <div className="space-y-6 text-sm md:text-base text-black md:pr-8"> */}
        <div className="space-y-6 text-[14px] md:text-[18px] font-normal tracking-tight leading-[19.6px] md:leading-[25.2px] text-black md:pr-8">
          The Solana Program Library (SPL) is a collection of on-chain programs
          targeting the Sealevel parallel runtime. These programs are tested
          against Solana`s implementation of Sealevel, solana-runtime, and
          deployed to its mainnet. As others implement Sealevel, we will
          graciously accept patches.
          <br />
          <br />
          The Token Swap Program allows simple trading of token pairs without a
          centralized limit order book. The program uses a mathematical formula
          called curve to calculate the price of all trades. Curves aim to mimic
          normal market dynamics: for example, as traders buy a lot of one token
          type, the value of the other token type goes up.
        </div>
        <div className="w-full md:min-w-[300px]">
          {/* <div className="space-y-6 text-sm md:text-base text-black md:pr-8"> */}
          <div className="space-y-6 text-[14px] md:text-[18px] font-normal tracking-tight leading-[19.6px] md:leading-[25.2px] text-black pt-7 lg:pt-0">
            Solana has compiled a robust library of information to read.
          </div>
          <div className="pt-6 text-center">
            <Button withBorder>
              <div className="relative flex items-center justify-center px-4">
                <img
                  src="/img/realms-web/icons/external-link-thin-white.png"
                  className="w-4 h-4 mr-3 starting-image"
                  alt="External link icon"
                />
                <img
                  src="/img/realms-web/icons/external-link-thin-black.png"
                  className="w-4 h-4 mr-3 hover-image"
                  alt="External link icon"
                />
                <div className="pr-2">Read about SPL Governance</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplGov
