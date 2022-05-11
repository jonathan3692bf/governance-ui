import Link from 'next/link'
import Button, { ReadTheDocsButton } from 'components_2/Button'
import Hero from 'components_2/Hero'
import Header from 'components_2/Header'

export default function KickstartSolana() {
  return (
    <Hero>
      <div className="text-center md:text-left">
        <Header as="h1">
          Kickstart your
          <br />
          community on Solana
        </Header>
        {/* <div className="text-sm md:text-base mt-4 mb-11 md:mb-14 text-white px-16 md:px-0"> */}
        <div className="mt-4 mb-11 md:mb-14 text-white px-16 md:px-0 text-[14px] md:text-[18px] font-normal trackings-tight leading-[19.6px] md:leading-[25.2px]">
          Create and participate in fully on-chain DAOs of all kinds.
        </div>
      </div>
      <div className="pb-12 space-y-4 text-center md:pb-24 md:text-left">
        <div>
          <Button>
            <Link href="/solana/create_dao">
              <div className="px-14">Create DAO</div>
            </Link>
          </Button>
        </div>
        <div className="block md:hidden">
          <ReadTheDocsButton />
        </div>
      </div>
    </Hero>
  )
}
