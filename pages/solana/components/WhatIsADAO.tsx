import Header from 'components_2/Header'

const TextBox = ({ title, text }) => {
  return (
    <div>
      {/* <div className="mb-6 text-md md:text-base"> */}
      <div className="text-[16px] md:text-[18px] font-light tracking-tight leading-[22.4px] md:leading-[25.2px]">
        {title}
      </div>
      <div className="text-sm opacity-70">{text}</div>
    </div>
  )
}

const WhatIsADAO = () => {
  return (
    <div className="pt-9 md:pt-24 pb-11 md:pb-32">
      <div className="pb-8 md:pb-12">
        <Header as="h2" withGradient>
          A DAO is a community working
          <br className="invisible lg:hidden" />
          together to make decisions
        </Header>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="md:pr-20">
            {/* <div className="mb-2 text-sm md:text-base opacity-70"> */}
            <div className="mb-2 text-[14px] md:text-[18px] font-light tracking-tight leading-[19.6px] md:leading-[25.2px] opacity-70">
              DAOs (decentralized autonomous organizations) are an effective and
              safe way to work with like-minded folks around the globe.
              <br />
              <br />
              Think of them like an internet-native business thats collectively
              owned and managed by its members. They have built-in treasuries
              that no one has the authority to access without the approval of
              the group. Decisions are governed by proposals and voting to
              ensure everyone in the organization has a voice.
            </div>
          </div>
        </div>
        <div className="w-full pt-5 md:w-1/2 md:pt-0">
          {/* <div className="mb-6 text-md md:text-base"> */}
          <div className="mb-6 text-[16px] md:text-[18px] font-light tracking-tight leading-[22.4px] md:leading-[25.2px]">
            Industries DAOs Impact:
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:gap-x-12">
            <TextBox title="Defi" text="Enable equitable financial markets" />
            <TextBox
              title="Gaming"
              text="Unlock new models of gameplay and digital content"
            />
            <TextBox title="Creators" text="No middlemen, own your work" />
            <TextBox title="Corporations" text="Reinvent loyalty programs" />
            <TextBox
              title="Investing"
              text="Inclusive group access to capital allocation"
            />
            <TextBox title="Communities" text="Build shared resources" />
            <TextBox
              title="Startups"
              text="Reward risk-taking contributors to new products and ideas"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatIsADAO
