import Link from 'next/link'
import Button from '../../../components_2/Button'
import { DaoType2 } from '../../../components_2/DaoType2'
import { DaoIcon } from '../../../components_2/DaoIcon'
import Header from '../../../components_2/Header'

const CreateDaoButton = ({ text, href }) => {
  return (
    <Link href={href}>
      <Button inverse>
        <div className="flex items-center">
          <div className="pr-2 text-[18px]">{text}</div>
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
  )
}

export const ListOfDAOTypes = () => {
  return (
    // <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
    <div className="flex flex-wrap">
      {/* <div className="flex flex-col w-full md:w-[30%]"> */}
      <div className="flex flex-col w-full xl:w-[33%]">
        {/* <div> */}
        <DaoType2
          imgSrc="/img/realms-web/icons/dao-type-medium-multisig.png"
          daoTheme="Multi-Signature DAO"
          text='A "multisig" DAO is a shared wallet, typically with two or more members authorizing transactions. This is a secure way for groups to store and access funds'
        >
          <div className="pb-6 md:pb-8 flex justify-center md:justify-between md:pr-6 w-full pt-4 space-x-8 md:space-x-0 md:pt-6 min-h-[125px]">
            <DaoIcon imgSrc="ukraine-dao" daoName="Ukraine.Sol" />
            <DaoIcon imgSrc="socean-dao" daoName="SOCEAN" />
            <div className="hidden xl:block">
              <DaoIcon imgSrc="sctf1-dao" daoName="SCTF1" />
            </div>
          </div>

          {/* <div className="flex flex-col items-center justify-end md:items-start grow"> */}

          <div className="flex flex-col items-center justify-end md:items-start grow">
            {/* <div className="flex flex-col items-center justify-end md:w-3/4 md:items-start lg:items-start grow"> */}
            <CreateDaoButton
              text="Start Multi-Signature DAO"
              href="/solana/create_dao/multisig"
            />
          </div>
        </DaoType2>
      </div>

      <div className="flex flex-col w-full xl:w-[33%]">
        <DaoType2
          imgSrc="/img/realms-web/icons/dao-type-medium-nft.png"
          daoTheme="NFT Community DAO"
          text="NFT Community DAOs leverage NFTs as membership, giving holders of NFTs within specified collections voting power to make investment decisions."
        >
          <div className="pb-6 md:pb-8 flex justify-center md:justify-between md:pr-6 w-full pt-4 space-x-8 md:space-x-0 md:pt-6 min-h-[125px]">
            <DaoIcon imgSrc="cardinal-dao" daoName="Cardinall" />
            <DaoIcon imgSrc="serum-dao" daoName="Serum" />
            <div className="hidden xl:block">
              <DaoIcon imgSrc="monke-dao" daoName="MonkeDAO" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-end md:items-start grow">
            <CreateDaoButton
              text="Start NFT Community DAO"
              href="/solana/create_dao/nft"
            />
          </div>
        </DaoType2>
      </div>

      <div className="flex flex-col w-full xl:w-[33%]">
        <DaoType2
          imgSrc="/img/realms-web/icons/dao-type-medium-govtoken.png"
          daoTheme="Governance Token DAO"
          text="Governance Token DAOs help orgs determine how its funds are used. This flat voting hierarchy allows anyone to participate in the decisions of the org."
        >
          <div className="pb-6 md:pb-8 flex justify-center md:justify-between md:pr-6 w-full pt-4 space-x-8 md:space-x-0 md:pt-6 min-h-[125px]">
            <DaoIcon imgSrc="mango-dao" daoName="MangoDAO" />
            <DaoIcon imgSrc="f-and-f-dao" daoName="Friends and Family DAO" />
            <div className="hidden xl:block">
              <DaoIcon imgSrc="metaplex-dao" daoName="Metaplex Foundation" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-end md:items-start grow">
            <CreateDaoButton
              text="Start Gov Token DAO"
              href="/solana/create_dao/gov-token"
            />
          </div>
        </DaoType2>
      </div>
    </div>
  )
}

const SelectDAOToCreate2 = () => {
  return (
    <div className="py-16 md:pt-24 md:pb-28">
      <div className="mb-4 text-center md:text-left">
        <Header as="h2" withGradient>
          What types of DAO <br /> would you like to create?
        </Header>
      </div>
      <ListOfDAOTypes />
    </div>
  )
}

export default SelectDAOToCreate2
