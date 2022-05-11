import Link from 'next/link'
import Button from '../../../components_2/Button'
import Header from '../../../components_2/Header'

const CreateDaoButton = ({ text, href, className }) => {
  return (
    <div className={className}>
      <Link href={href}>
        <Button inverse>
          {/* <div className="flex items-center justify-between w-full"> */}
          <div className="flex items-center justify-between min-w-[10rem] w-[250px]">
            <div className="pr-2">{text}</div>
            <img
              src="/img/realms-web/icons/arrow-thin-blue.png"
              className="w-4 h-4 starting-image"
              alt="arrow"
            />
            <img
              src="/img/realms-web/icons/arrow-thin-black.png"
              className="w-4 h-4 hover-image"
              alt="arrow"
            />
          </div>
        </Button>
      </Link>
    </div>
  )
}

export const SmallImageWithDescription = ({ src, label }) => (
  <div className="flex flex-col text-center">
    {/* NavyBox */}
    <img src={`/img/realms-web/icons/${src}.svg`} className="my-2 h-7" alt="" />
    <div className="text-sm opacity-70 max-w-[100px]">{label}</div>
  </div>
)

export const DAOType = ({
  // GreenBox
  mainImgSrc,
  headerText,
  descriptionText,
  smallImgSrcs,
  buttonText,
  buttonHref,
}) => (
  // GreenBox
  <div className="flex flex-col items-center md:items-start md:flex-row lg:flex-col min-w-[10rem]">
    {/* OrangeBox */}
    <div className="min-w-[150px] md:w-1/5">
      <img
        className="max-w-[200px] w-full md:w-[160px] lg:w-[180px]"
        src={`/img/realms-web/icons/${mainImgSrc}.png`}
        alt=""
      />
    </div>
    <div className="w-4/5 md:w-3/5 lg:w-full">
      <div className="text-center md:text-left">
        {/* LimeBox */}
        <Header as="h3" className="mb-2 md:mb-5">
          {headerText}
        </Header>
        {/* LavenderBox */}
        {/* <div className="text-sm md:text-base opacity-70"> */}
        <div className="font-light text-[14px] md:text-[18px] leading-[19.6px] md:leading-[25.2px] opacity-70">
          {descriptionText}
        </div>
      </div>
      {/* PurpleBox*/}
      {/* <div className="flex flex-row justify-between space-x-4 px-12 py-4 md:px-0 xl:px-4"> */}
      <div className="flex flex-row justify-center md:justify-start lg:justify-center py-4 px-12 md:px-4 lg:px-4 space-x-4 md:space-x-12 lg:space-px-4">
        {smallImgSrcs.map(({ smallSrc, label }, index) => (
          <SmallImageWithDescription
            key={`${label}-${index}`}
            src={smallSrc}
            label={label}
          />
        ))}
      </div>
      <CreateDaoButton
        text={buttonText}
        href={buttonHref}
        className="flex justify-center md:justify-start"
      />
    </div>
  </div>
)

export const ListOfDAOTypes = () => {
  return (
    <div className="flex flex-col justify-between space-y-5 md:space-y-20 lg:space-y-0 md:flex-col lg:flex-row lg:space-x-8 mt-8 md:mt-16">
      {/* <div className="flex flex-col justify-between md:flex-col lg:flex-row lg:space-x-8 mt-16"> */}
      <DAOType
        mainImgSrc="dao-type-medium-multisig"
        headerText="Multi-Signature DAO"
        descriptionText='A "multisig" DAO is a shared wallet, typically with two or more members authorizing transactions. This is a secure way for groups to store and access funds'
        smallImgSrcs={[
          { smallSrc: 'ukraine-dao', label: 'Ukraine.Sol' },
          { smallSrc: 'socean-dao', label: 'SOCEAN' },
          { smallSrc: 'sctf1-dao', label: 'SCTF1' },
        ]}
        buttonText="Start Multi-Signature DAO"
        buttonHref="/solana/create_dao/multisig"
      />

      <DAOType
        mainImgSrc="dao-type-medium-nft"
        headerText="HNFT Community DAO"
        descriptionText="NFT Community DAOs leverage NFTs as membership, giving holders of NFTs within specified collections voting power to make investment decisions."
        smallImgSrcs={[
          { smallSrc: 'cardinal-dao', label: 'Cardinall' },
          { smallSrc: 'serum-dao', label: 'Serum' },
          { smallSrc: 'monke-dao', label: 'MonkeDAO' },
        ]}
        buttonText="Start NFT Community DAO"
        buttonHref="/solana/create_dao/nft"
      />

      <DAOType
        mainImgSrc="dao-type-medium-govtoken"
        headerText="Governance Token DAO"
        descriptionText="Governance Token DAOs help orgs determine how its funds are used. This flat voting hierarchy allows anyone to participate in the decisions of the org."
        smallImgSrcs={[
          { smallSrc: 'mango-dao', label: 'MangoDAO' },
          { smallSrc: 'f-and-f-dao', label: 'Friends and Family DAO' },
          { smallSrc: 'metaplex-dao', label: 'Metaplex Foundation' },
        ]}
        buttonText="Start Gov Token DAO"
        buttonHref="/solana/create_dao/gov-token"
      />
    </div>
  )
}

const SelectDAOToCreate = () => {
  return (
    <div className="py-16 md:pt-24 md:pb-28 w-full">
      <div className="mb-4 text-center md:text-left">
        <Header as="h2" withGradient>
          What types of DAO <br /> would you like to create?
        </Header>
      </div>
      <ListOfDAOTypes />
    </div>
  )
}

export default SelectDAOToCreate
